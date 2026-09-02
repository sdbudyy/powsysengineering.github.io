/* ---------------------------------------------------------------------------
   Generates src/data/na-map.ts from Natural Earth 110m country outlines.

   Natural Earth is public domain (CC0). This runs once, offline, and commits a
   plain SVG path string — the site itself ships no mapping library and makes
   no runtime request for geodata.

     node scripts/build-map.mjs

   Projection is Albers Equal Area Conic with the standard North American
   parameters, so shapes and relative distances are correct rather than the
   stretched-north look Mercator gives Canada. The same projection constants
   are exported so city markers land in the right place.
--------------------------------------------------------------------------- */

import { writeFileSync } from 'node:fs';

const SRC =
  'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson';

/* --- Albers Equal Area Conic (φ1 29.5°N, φ2 45.5°N, origin 23°N/96°W) ----- */
const rad = (d) => (d * Math.PI) / 180;
const PHI1 = rad(29.5);
const PHI2 = rad(45.5);
const PHI0 = rad(23);
const LAM0 = rad(-96);

const N = (Math.sin(PHI1) + Math.sin(PHI2)) / 2;
const C = Math.cos(PHI1) ** 2 + 2 * N * Math.sin(PHI1);
const RHO0 = Math.sqrt(C - 2 * N * Math.sin(PHI0)) / N;

const albers = (lon, lat) => {
  const theta = N * (rad(lon) - LAM0);
  const rho = Math.sqrt(C - 2 * N * Math.sin(rad(lat))) / N;
  return [rho * Math.sin(theta), RHO0 - rho * Math.cos(theta)];
};

/* --- Crop window. Alaska, Hawaii and the high Arctic are outside it, which
       keeps the frame tight on where PowSys actually works. ---------------- */
const CROP = { lonMin: -134, lonMax: -60, latMin: 24, latMax: 61 };

/* Projected bounds of the crop corners (sampled along the edges, because the
   projection curves the parallels). */
const samples = [];
for (let i = 0; i <= 40; i++) {
  const t = i / 40;
  const lon = CROP.lonMin + (CROP.lonMax - CROP.lonMin) * t;
  const lat = CROP.latMin + (CROP.latMax - CROP.latMin) * t;
  samples.push(albers(lon, CROP.latMin), albers(lon, CROP.latMax));
  samples.push(albers(CROP.lonMin, lat), albers(CROP.lonMax, lat));
}
const xs = samples.map((p) => p[0]);
const ys = samples.map((p) => p[1]);
const minX = Math.min(...xs);
const maxX = Math.max(...xs);
const minY = Math.min(...ys);
const maxY = Math.max(...ys);

const WIDTH = 1000;
const SCALE = WIDTH / (maxX - minX);
const HEIGHT = Math.round((maxY - minY) * SCALE);

const toXY = (lon, lat) => {
  const [x, y] = albers(lon, lat);
  // Albers y increases towards the north; SVG y increases downward, so the
  // vertical axis is flipped here. Without this the map renders upside-down.
  return [(x - minX) * SCALE, (maxY - y) * SCALE];
};

/* --- Build path data ------------------------------------------------------ */
const res = await fetch(SRC);
if (!res.ok) throw new Error(`Failed to fetch Natural Earth data: ${res.status}`);
const geo = await res.json();

const WANTED = { Canada: 'canada', 'United States of America': 'usa', Mexico: 'mexico' };

/** Skip rings that fall entirely outside the crop, plus specks too small to see. */
const keepRing = (ring) => {
  if (ring.length < 6) return false;
  const lons = ring.map((p) => p[0]);
  const lats = ring.map((p) => p[1]);
  const outside =
    Math.max(...lons) < CROP.lonMin - 12 ||
    Math.min(...lons) > CROP.lonMax + 12 ||
    Math.max(...lats) < CROP.latMin - 8 ||
    Math.min(...lats) > CROP.latMax + 14;
  if (outside) return false;
  const span = (Math.max(...lons) - Math.min(...lons)) * (Math.max(...lats) - Math.min(...lats));
  return span > 1.2;
};

const ringToPath = (ring) =>
  'M' +
  ring
    .map(([lon, lat]) => {
      const [x, y] = toXY(lon, lat);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join('L') +
  'Z';

const paths = {};
for (const f of geo.features) {
  const key = WANTED[f.properties.NAME] ?? WANTED[f.properties.ADMIN];
  if (!key) continue;
  const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  const d = polys
    .map((poly) => poly[0])
    .filter(keepRing)
    .map(ringToPath)
    .join('');
  paths[key] = d;
}

/* --- Emit ----------------------------------------------------------------- */
const out = `/* GENERATED FILE — do not edit by hand.
   Run \`node scripts/build-map.mjs\` to regenerate.

   Source: Natural Earth 110m admin-0 countries (public domain, CC0).
   Projection: Albers Equal Area Conic, standard parallels 29.5°N / 45.5°N,
   origin 23°N 96°W, cropped to lon ${CROP.lonMin}..${CROP.lonMax}, lat ${CROP.latMin}..${CROP.latMax}.

   \`project()\` uses the identical constants, so any lat/long plotted with it
   lands in the correct place on these paths. */

export const MAP_WIDTH = ${WIDTH};
export const MAP_HEIGHT = ${HEIGHT};

export const MAP_PATHS = {
  canada: '${paths.canada}',
  usa: '${paths.usa}',
  mexico: '${paths.mexico}',
};

const rad = (d: number) => (d * Math.PI) / 180;
const N = ${N};
const C = ${C};
const RHO0 = ${RHO0};
const LAM0 = ${LAM0};
const MIN_X = ${minX};
const MAX_Y = ${maxY};
const SCALE = ${SCALE};

/** Convert a longitude/latitude pair to a point in the SVG viewBox. */
export const project = (lon: number, lat: number): { x: number; y: number } => {
  const theta = N * (rad(lon) - LAM0);
  const rho = Math.sqrt(C - 2 * N * Math.sin(rad(lat))) / N;
  return {
    x: (rho * Math.sin(theta) - MIN_X) * SCALE,
    y: (MAX_Y - (RHO0 - rho * Math.cos(theta))) * SCALE,
  };
};
`;

writeFileSync('src/data/na-map.ts', out);
console.log(
  `wrote src/data/na-map.ts  ${WIDTH}x${HEIGHT}  ` +
    Object.entries(paths)
      .map(([k, v]) => `${k}:${(v.length / 1024).toFixed(1)}KB`)
      .join('  ')
);
