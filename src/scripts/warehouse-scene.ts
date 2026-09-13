/* ---------------------------------------------------------------------------
   THE INSTRUMENTED WAREHOUSE — 3D scene

   Loaded on demand by warehouse-ui.ts via a dynamic import, so Three.js only
   ships to the one page that uses it, and only once a visitor reaches the
   stage. Everything the page needs to be useful without this module lives in
   warehouse-ui.ts; this file only draws.

   Named imports keep the bundle to the classes actually used.
--------------------------------------------------------------------------- */

import {
  BoxGeometry, CanvasTexture, CircleGeometry, Color, CylinderGeometry, DirectionalLight,
  EdgesGeometry, Fog, Group, HemisphereLight, LineBasicMaterial, LineSegments, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PCFSoftShadowMap, PerspectiveCamera,
  PlaneGeometry, Raycaster, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import type { WarehouseSystem } from '../data/warehouse';

export interface SceneHost {
  stage: HTMLElement;
  canvas: HTMLCanvasElement;
  pinsEl: HTMLElement;
  systems: WarehouseSystem[];
  small: boolean;
  reduced: boolean;
  instrumented: Set<string>;
  getSelected(): string | null;
  select(id: string | null): void;
  tourActive(): boolean;
  tourPause(v: boolean): void;
  tourTick(now: number): void;
  tourToggle(): void;
  resetAll(): void;
  clock: { get(): number; set(h: number): void; playing(): boolean };
  isVisible(): boolean;
  isOnScreen(): boolean;
  rectOnScreen(): boolean;
  setOnScreen(v: boolean): void;
  viewButtons: HTMLButtonElement[];
}

export interface SceneApi {
  setSystem(id: string, t: number): void;
  flyTo(pos: [number, number, number]): void;
  resetView(): void;
  refreshPins(): void;
  wake(): void;
}

type Pin = {
  h: WarehouseSystem; el: HTMLElement; chip: HTMLElement; v: Vector3; tmp: Vector3;
  anchor: Mesh; behind: boolean; off: boolean; lift: number; cw: number; ch: number; sx: number; sy: number;
};

export function buildScene(host: SceneHost): SceneApi {
  const { stage, canvas, pinsEl, systems: HOT, small, reduced, instrumented } = host;
  const P = {
    brand: 0x1a4194, b400: 0x4e76c8, b700: 0x14357b, b900: 0x0c2050, b200: 0xb9ccf0, b100: 0xdce6f8,
    b50: 0xeef3fc, lime: 0xb0d038, l300: 0xcbe070, l600: 0x89a521, tint: 0xf3f7fd, ink: 0x0e1b33,
    waste: 0xe08a2e, white: 0xffffff,
  };

  const renderer = new WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, small ? 1.5 : 2));
  renderer.shadowMap.enabled = !small;
  renderer.shadowMap.type = PCFSoftShadowMap;
  const scene = new Scene();
  scene.background = new Color(P.b50);
  scene.fog = new Fog(P.b50, 100, 190);
  const camera = new PerspectiveCamera(36, 1, 0.1, 400);

  /* ------------------------------------------------------------ navigation */
  const HOME = { yaw: 0.78, pitch: 0.5, dist: small ? 96 : 76, target: new Vector3(0, 3, 0) };
  const cur = { yaw: HOME.yaw, pitch: HOME.pitch, dist: HOME.dist, target: HOME.target.clone() };
  const goal = { yaw: HOME.yaw, pitch: HOME.pitch, dist: HOME.dist, target: HOME.target.clone() };
  let vYaw = 0, vPitch = 0, lastInput = -1e9, dragging = false, idlePitch: number | null = null;
  const damp = (a: number, b: number, l: number, dt: number) => b + (a - b) * Math.exp(-l * dt);
  const clampPitch = (p: number) => Math.max(0.1, Math.min(1.3, p));
  const clampDist = (d: number) => Math.max(34, Math.min(140, d));
  const smoothstep = (e0: number, e1: number, x: number) => { const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t); };

  // The left (−x) and back (−z) walls are full height, so a camera that swings
  // behind them sees nothing but wall. While idling, measure how far the camera
  // has strayed behind either wall and lift toward bird's-eye in proportion,
  // then settle back to the pitch the viewer left it at once clear.
  function obstruction() {
    const cx = goal.target.x + goal.dist * Math.cos(goal.pitch) * Math.sin(goal.yaw);
    const cz = goal.target.z + goal.dist * Math.cos(goal.pitch) * Math.cos(goal.yaw);
    const ang = Math.atan2(cx, cz);
    return smoothstep(-0.2, 0.5, Math.max(-Math.cos(ang), -Math.sin(ang)));
  }
  function placeCamera() {
    camera.position.set(
      cur.target.x + cur.dist * Math.cos(cur.pitch) * Math.sin(cur.yaw),
      cur.target.y + cur.dist * Math.sin(cur.pitch),
      cur.target.z + cur.dist * Math.cos(cur.pitch) * Math.cos(cur.yaw),
    );
    camera.lookAt(cur.target);
  }
  function stepCamera(dt: number, now: number) {
    if (!dragging && !reduced) {
      goal.yaw += vYaw * dt; goal.pitch = clampPitch(goal.pitch + vPitch * dt);
      vYaw *= Math.exp(-3.2 * dt); vPitch *= Math.exp(-3.2 * dt);
    }
    const idle = !reduced && !dragging && !host.tourActive() && now - lastInput > 6000;
    if (idle) {
      if (idlePitch === null) idlePitch = goal.pitch;
      goal.yaw += dt * 0.05;
      goal.pitch = idlePitch + (1.22 - idlePitch) * obstruction();
    } else idlePitch = null;
    if (reduced) { cur.yaw = goal.yaw; cur.pitch = goal.pitch; cur.dist = goal.dist; cur.target.copy(goal.target); }
    else {
      cur.yaw = damp(cur.yaw, goal.yaw, 9, dt); cur.pitch = damp(cur.pitch, goal.pitch, 9, dt);
      cur.dist = damp(cur.dist, goal.dist, 7, dt); cur.target.lerp(goal.target, 1 - Math.exp(-6 * dt));
    }
    placeCamera();
  }
  type View = { yaw: number; pitch: number; dist: number; target: [number, number, number] };
  // yaw is where the camera sits relative to the target, so a corner room is
  // viewed from outside its corner and the dock from the yard.
  const PRESETS: Record<string, View> = {
    overview: { yaw: HOME.yaw, pitch: HOME.pitch, dist: HOME.dist, target: [0, 3, 0] },
    roof: { yaw: 0.78, pitch: 1.22, dist: small ? 92 : 74, target: [0, 6, 0] },
    control: { yaw: -0.55, pitch: 0.34, dist: small ? 40 : 30, target: [-19, 3.5, 11] },
    dock: { yaw: 1.05, pitch: 0.32, dist: small ? 44 : 34, target: [22, 3.5, 6] },
  };
  function goTo(v: View) {
    goal.target.set(...v.target); goal.dist = v.dist; goal.pitch = v.pitch;
    let d = v.yaw - goal.yaw; d = Math.atan2(Math.sin(d), Math.cos(d)); goal.yaw += d;
    vYaw = vPitch = 0; lastInput = performance.now(); wake();
  }
  function markView(name: string | null) { host.viewButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.view === name))); }
  function flyTo(pos: [number, number, number]) {
    markView(null);
    const p = new Vector3(...pos);
    goal.target.copy(HOME.target).lerp(p, 0.62); goal.dist = small ? 60 : 48; goal.pitch = 0.4;
    const want = Math.atan2(p.x - HOME.target.x, p.z - HOME.target.z) + 0.45;
    let d = want - goal.yaw; d = Math.atan2(Math.sin(d), Math.cos(d)); goal.yaw += d;
    vYaw = vPitch = 0; lastInput = performance.now(); wake();
  }
  function resetView() { goTo(PRESETS.overview); markView('overview'); }
  host.viewButtons.forEach((b) => b.addEventListener('click', () => { goTo(PRESETS[b.dataset.view!]); markView(b.dataset.view!); host.tourPause(true); }));

  const ptrs = new Map<number, PointerEvent>();
  let lx = 0, ly = 0, lt = 0, pinch0 = 0, dist0 = 0;
  canvas.addEventListener('pointerdown', (e) => {
    markView(null); canvas.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, e); canvas.focus({ preventScroll: true });
    if (ptrs.size === 1) { dragging = true; lx = e.clientX; ly = e.clientY; lt = performance.now(); vYaw = vPitch = 0; canvas.classList.add('grabbing'); }
    else if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; pinch0 = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY); dist0 = goal.dist; dragging = false; }
    lastInput = performance.now(); host.tourPause(true); wake();
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!ptrs.has(e.pointerId)) return; ptrs.set(e.pointerId, e);
    if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; const d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY); goal.dist = clampDist(dist0 * pinch0 / Math.max(1, d)); return; }
    if (!dragging) return;
    const now = performance.now(), dt = Math.max(1, now - lt) / 1000, dx = e.clientX - lx, dy = e.clientY - ly;
    lx = e.clientX; ly = e.clientY; lt = now;
    goal.yaw -= dx * 0.0052; goal.pitch = clampPitch(goal.pitch + dy * 0.0038);
    vYaw = -dx * 0.0052 / dt * 0.35; vPitch = dy * 0.0038 / dt * 0.35; lastInput = now;
  });
  const endPtr = (e: PointerEvent) => { ptrs.delete(e.pointerId); if (ptrs.size === 0) { dragging = false; canvas.classList.remove('grabbing'); if (performance.now() - lt > 80) vYaw = vPitch = 0; } };
  canvas.addEventListener('pointerup', endPtr); canvas.addEventListener('pointercancel', endPtr);
  canvas.addEventListener('wheel', (e) => { e.preventDefault(); goal.dist = clampDist(goal.dist * (1 + Math.sign(e.deltaY) * 0.09)); lastInput = performance.now(); wake(); }, { passive: false });
  canvas.addEventListener('dblclick', resetView);
  canvas.addEventListener('keydown', (e) => {
    const k = e.key; let used = true;
    if (k === 'ArrowLeft') goal.yaw += 0.18; else if (k === 'ArrowRight') goal.yaw -= 0.18;
    else if (k === 'ArrowUp') goal.pitch = clampPitch(goal.pitch + 0.1); else if (k === 'ArrowDown') goal.pitch = clampPitch(goal.pitch - 0.1);
    else if (k === '+' || k === '=') goal.dist = clampDist(goal.dist * 0.86); else if (k === '-' || k === '_') goal.dist = clampDist(goal.dist * 1.16);
    else if (k === 'r' || k === 'R') host.resetAll(); else if (k === 't' || k === 'T') host.tourToggle(); else if (k === 'Escape') host.select(null);
    else if (/^[1-6]$/.test(k)) host.select(HOT[+k - 1].id); else used = false;
    if (used) { e.preventDefault(); lastInput = performance.now(); if (/^(Arrow|[+=_-])/.test(k)) markView(null); wake(); }
  });

  /* ---------------------------------------------------- sun and sky by clock */
  const hemi = new HemisphereLight(0xffffff, P.b200, 0.9); scene.add(hemi);
  const sun = new DirectionalLight(0xffffff, 0.75);
  sun.position.set(30, 50, 20); sun.castShadow = !small; sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -50, right: 50, top: 50, bottom: -50, near: 1, far: 150 }); scene.add(sun);
  const cNight = new Color(0x0f1a38), cDay = new Color(P.b50), cDusk = new Color(0xf2cfa6), cSunWarm = new Color(0xffd9a0), cSunWhite = new Color(0xffffff), cSkyNight = new Color(0x2a3b66);
  const daylight = { day: 0 };
  function applyTime(h: number) {
    const el = Math.sin((h - 6) / 12 * Math.PI);
    const day = Math.max(0, Math.min(1, el * 1.15));
    const dusk = 1 - Math.min(1, Math.abs(el) / 0.3);
    daylight.day = day;
    const a = (h - 6) / 12 * Math.PI;
    sun.position.set(45 * Math.cos(a), 12 + 55 * Math.max(0, el), 22 * Math.sin(a) + 10);
    sun.intensity = 0.85 * day; sun.color.copy(cSunWhite).lerp(cSunWarm, dusk);
    hemi.intensity = 0.25 + 0.7 * day; hemi.color.copy(cSkyNight).lerp(cSunWhite, day);
    (scene.background as Color).copy(cNight).lerp(cDay, day).lerp(cDusk, dusk * 0.35);
    (scene.fog as Fog).color.copy(scene.background as Color);
  }

  /* --------------------------------------------------------------- geometry */
  const occluders: Mesh[] = [];
  const edgeMat = new LineBasicMaterial({ color: P.b900, transparent: true, opacity: 0.2 });
  type MatOpts = { roughness?: number; transparent?: boolean; opacity?: number; edges?: boolean };
  const mat = (color: number, o: MatOpts = {}) => new MeshStandardMaterial({ color, roughness: o.roughness ?? 0.85, metalness: 0.05, transparent: o.transparent, opacity: o.opacity ?? 1 });
  const box = (w: number, h: number, d: number, color: number, x: number, y: number, z: number, o: MatOpts = {}) => {
    const g = new BoxGeometry(w, h, d); const m = new Mesh(g, mat(color, o)); m.position.set(x, y, z);
    m.castShadow = m.receiveShadow = !small; scene.add(m);
    if (!o.transparent) occluders.push(m);
    if (o.edges && !small) { const e = new LineSegments(new EdgesGeometry(g), edgeMat); e.position.copy(m.position); scene.add(e); }
    return m;
  };
  const W = 48, D = 30, H = 12, E: MatOpts = { edges: true };
  const ground = new Mesh(new PlaneGeometry(400, 400), mat(P.tint)); ground.rotation.x = -Math.PI / 2; ground.position.y = -0.02; ground.receiveShadow = true; scene.add(ground);
  box(W, 0.6, D, 0xe6edf8, 0, 0.3, 0, E); box(W, H, 0.6, P.b100, 0, H / 2 + 0.6, -D / 2, E); box(0.6, H, D, P.b100, -W / 2, H / 2 + 0.6, 0, E); box(0.6, H * 0.55, D, P.b100, W / 2, H * 0.275 + 0.6, 0, E);
  for (let i = -2; i <= 2; i++) box(0.5, 0.7, D, P.brand, i * 11, H + 0.9, 0, E);
  box(W, 0.7, 0.5, P.brand, 0, H + 0.9, -D / 2 + 0.3, E);
  box(0.7, 5.5, 7, P.b700, W / 2 + 0.1, 3.35, 6, E); box(8, 0.3, 9, 0xd9e2f1, W / 2 + 4.2, 0.15, 6);
  box(8, 5, 6, P.b200, -W / 2 + 4.6, 3.1, D / 2 - 3.6, { transparent: true, opacity: 0.55 }); box(8.2, 0.4, 6.2, P.brand, -W / 2 + 4.6, 5.8, D / 2 - 3.6, E);
  const skyMat = new MeshBasicMaterial({ color: P.white, transparent: true, opacity: 0.5, depthWrite: false });
  const skyPools: Mesh[] = [];
  [-10, 0, 10].forEach((z) => {
    const s = new Mesh(new PlaneGeometry(44, 2.6), skyMat); s.rotation.x = -Math.PI / 2; s.position.set(0, H + 0.55, z); scene.add(s);
    const pool = new Mesh(new PlaneGeometry(44, 5.5), new MeshBasicMaterial({ color: 0xfffbea, transparent: true, opacity: 0, depthWrite: false }));
    pool.rotation.x = -Math.PI / 2; pool.position.set(0, 0.66, z); scene.add(pool); skyPools.push(pool);
  });
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  [-9, -3, 3, 9].forEach((z) => {
    for (let b = 0; b < 6; b++) {
      const x = -16 + b * 6.4;
      for (const dz of [-1.1, 1.1]) { box(0.35, 7, 0.35, P.brand, x - 2.6, 4.1, z + dz); box(0.35, 7, 0.35, P.brand, x + 2.6, 4.1, z + dz); }
      for (const y of [1.3, 3.6, 5.9]) box(5.6, 0.18, 2.6, P.b200, x, y + 0.6, z, E);
      for (const y of [1.3, 3.6]) { if (rnd() < 0.8) box(2.2, 1.7, 2.0, 0xc7d6f0, x - 1.4 + rnd() * 0.5, y + 1.55, z); if (rnd() < 0.6) box(1.9, 1.5, 2.0, 0xb9ccf0, x + 1.5, y + 1.45, z); }
    }
  });

  /* --------------------------------------------------------------- lighting */
  const lamps: { m: Mesh; x: number; z: number }[] = [], pools: { m: Mesh; x: number; z: number }[] = [];
  [-12, -6, 0, 6, 12].forEach((z) => {
    for (let i = 0; i < 5; i++) {
      const x = -18 + i * 9;
      const lamp = new Mesh(new CylinderGeometry(0.9, 1.1, 0.35, 20), new MeshStandardMaterial({ color: P.white, emissive: P.white, emissiveIntensity: 1.6, roughness: 0.4 }));
      lamp.position.set(x, H + 0.35, z); scene.add(lamp);
      const pool = new Mesh(new CircleGeometry(4.2, 32), new MeshBasicMaterial({ color: 0xfff3d6, transparent: true, opacity: 0.55, depthWrite: false }));
      pool.rotation.x = -Math.PI / 2; pool.position.set(x, 0.62, z); scene.add(pool);
      lamps.push({ m: lamp, x, z }); pools.push({ m: pool, x, z });
    }
  });

  /* ------------------------------------------------- HVAC and heat-map floor */
  const hvac: { blade: Mesh }[] = [];
  [-14, 0, 14].forEach((x) => {
    box(5, 2.2, 4, P.b400, x, H + 2.1, -D / 2 + 5.5, { roughness: 0.6, edges: true });
    const fan = new Mesh(new CylinderGeometry(1.3, 1.3, 0.2, 24), mat(P.b900)); fan.position.set(x, H + 3.3, -D / 2 + 5.5); scene.add(fan);
    const blade = new Mesh(new BoxGeometry(2.2, 0.06, 0.35), mat(P.l300)); blade.position.copy(fan.position); blade.position.y += 0.14; scene.add(blade);
    hvac.push({ blade });
  });
  const ZONES = [{ x: -12, z: -7, demand: 0.35, found: 0.9 }, { x: 12, z: -7, demand: 0.9, found: 0.55 }, { x: -12, z: 7, demand: 0.2, found: 0.75 }, { x: 12, z: 7, demand: 0.6, found: 1.0 }];
  const hmCanvas = document.createElement('canvas'); hmCanvas.width = 256; hmCanvas.height = 160;
  const hctx = hmCanvas.getContext('2d')!;
  const hmTex = new CanvasTexture(hmCanvas);
  const heat = new Mesh(new PlaneGeometry(46, 28.8), new MeshBasicMaterial({ map: hmTex, transparent: true, opacity: 0.55, depthWrite: false }));
  heat.rotation.x = -Math.PI / 2; heat.position.set(0, 0.63, 0); scene.add(heat);
  const cWaste = new Color(P.waste), cOn = new Color(P.l600), cCool = new Color(P.b400), tmpC = new Color();
  let heatDrawn = -1;
  function drawHeat(k: number) {
    if (Math.abs(k - heatDrawn) < 0.02) return; heatDrawn = k;
    hctx.clearRect(0, 0, 256, 160);
    ZONES.forEach((zn) => {
      const px = (zn.x + 23) / 46 * 256, py = (zn.z + 14.4) / 28.8 * 160;
      tmpC.copy(cOn).lerp(cCool, zn.demand); const c = new Color().copy(cWaste).lerp(tmpC, k);
      const alpha = (0.35 + 0.55 * zn.found) * (1 - k) + 0.55 * k, r = 62 + 22 * k;
      const rgb = `${(c.r * 255) | 0},${(c.g * 255) | 0},${(c.b * 255) | 0}`;
      const g = hctx.createRadialGradient(px, py, 4, px, py, r); g.addColorStop(0, `rgba(${rgb},${alpha})`); g.addColorStop(1, `rgba(${rgb},0)`);
      hctx.fillStyle = g; hctx.fillRect(0, 0, 256, 160);
    });
    hmTex.needsUpdate = true;
  }

  /* --------------------------------------------- panels, meters, life safety */
  box(0.5, 4.2, 2.6, P.b900, -W / 2 + 0.55, 3.2, -D / 2 + 9, E);
  const panelLed = new Mesh(new SphereGeometry(0.22, 12, 12), new MeshStandardMaterial({ color: P.waste, emissive: P.waste, emissiveIntensity: 0.6 }));
  panelLed.position.set(-W / 2 + 0.85, 4.9, -D / 2 + 9); scene.add(panelLed);
  box(0.5, 3.4, 2, P.b700, -W / 2 + 0.55, 2.8, -D / 2 + 3.5, E);
  const screens: Mesh[] = [];
  [-D / 2 + 3.5, -D / 2 + 9, 14].forEach((z, i) => {
    const sc = new Mesh(new PlaneGeometry(1.2, 0.7), new MeshStandardMaterial({ color: P.ink, emissive: P.lime, emissiveIntensity: 0 }));
    if (i < 2) { sc.rotation.y = Math.PI / 2; sc.position.set(-W / 2 + 0.82, 3.6 + (i ? 0.8 : 0), z); } else sc.position.set(-W / 2 + 4.6, 3.6, D / 2 - 0.55);
    scene.add(sc); screens.push(sc);
  });
  const strobe = new Mesh(new SphereGeometry(0.3, 12, 12), new MeshStandardMaterial({ color: 0xc8102e, emissive: 0xc8102e, emissiveIntensity: 0.3 }));
  strobe.position.set(W / 2 - 0.7, 8.5, 6); scene.add(strobe);

  /* ------------------------------------------------------ forklifts, people */
  type Mover = { g: Group; route: number[][]; seg: number; t: number; yaw: number; speed: number; pos: Vector3 };
  function makeForklift() {
    const g = new Group();
    const body = new Mesh(new BoxGeometry(2.6, 1.1, 1.5), mat(P.lime, { roughness: 0.6 })); body.position.y = 0.95; body.castShadow = !small; g.add(body);
    const seat = new Mesh(new BoxGeometry(1.0, 0.5, 1.1), mat(P.b900)); seat.position.set(-0.3, 1.75, 0); g.add(seat);
    [[-0.9, 0.6], [-0.9, -0.6], [0.9, 0.6], [0.9, -0.6]].forEach(([px, pz]) => { const post = new Mesh(new BoxGeometry(0.12, 2.0, 0.12), mat(P.b900)); post.position.set(px - 0.1, 2.5, pz); g.add(post); });
    const roof = new Mesh(new BoxGeometry(2.0, 0.08, 1.4), mat(P.b900)); roof.position.set(-0.1, 3.5, 0); g.add(roof);
    const mast = new Mesh(new BoxGeometry(0.3, 3.2, 1.3), mat(P.b700)); mast.position.set(1.45, 2.0, 0); g.add(mast);
    [0.35, -0.35].forEach((pz) => { const fork = new Mesh(new BoxGeometry(1.4, 0.08, 0.14), mat(P.b900)); fork.position.set(2.3, 0.35, pz); g.add(fork); });
    const pallet = new Mesh(new BoxGeometry(1.2, 0.9, 1.1), mat(0xc7d6f0)); pallet.position.set(2.25, 0.9, 0); g.add(pallet);
    [[-0.8, 0.7], [-0.8, -0.7], [0.9, 0.7], [0.9, -0.7]].forEach(([px, pz]) => { const w = new Mesh(new CylinderGeometry(0.38, 0.38, 0.3, 14), mat(P.ink)); w.rotation.x = Math.PI / 2; w.position.set(px, 0.38, pz); g.add(w); });
    const beacon = new Mesh(new SphereGeometry(0.14, 8, 8), new MeshStandardMaterial({ color: P.waste, emissive: P.waste, emissiveIntensity: 1.2 })); beacon.position.set(-0.6, 3.65, 0); g.add(beacon);
    scene.add(g); return g;
  }
  const ROUTES = [
    [[-20, -6], [20, -6], [22, -2], [22, 2], [20, 6], [-20, 6], [-22, 2], [-22, -2]],
    [[20, 12], [-20, 12], [-22, 8], [-22, 3], [-20, 0], [20, 0], [22, 4], [22, 8]],
  ];
  const trucks: Mover[] = ROUTES.map((route, i) => ({ g: makeForklift(), route, seg: 0, t: i * 0.5, yaw: 0, speed: 5.2 - i * 0.6, pos: new Vector3(route[0][0], 0.02, route[0][1]) }));
  function advance(m: Mover, dt: number, yOffset: number, turnRate: number, facing: number) {
    const a = m.route[m.seg], b = m.route[(m.seg + 1) % m.route.length];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]); m.t += (reduced ? 0 : dt * m.speed) / len;
    if (m.t >= 1) { m.t -= 1; m.seg = (m.seg + 1) % m.route.length; }
    const a2 = m.route[m.seg], b2 = m.route[(m.seg + 1) % m.route.length];
    m.pos.set(a2[0] + (b2[0] - a2[0]) * m.t, yOffset, a2[1] + (b2[1] - a2[1]) * m.t);
    const want = Math.atan2(b2[0] - a2[0], b2[1] - a2[1]) + facing;
    let d = want - m.yaw; d = Math.atan2(Math.sin(d), Math.cos(d)); m.yaw += d * Math.min(1, dt * turnRate);
    m.g.position.copy(m.pos); m.g.rotation.y = m.yaw;
  }
  type Person = Mover & { legL: Mesh; legR: Mesh; armL: Mesh; armR: Mesh; phase: number };
  function makePerson(hat: number) {
    const g = new Group();
    const legL = new Mesh(new BoxGeometry(0.22, 0.8, 0.22), mat(P.b900)); legL.position.set(0, 0.4, 0.14);
    const legR = legL.clone(); legR.position.z = -0.14;
    const torso = new Mesh(new BoxGeometry(0.42, 0.7, 0.5), mat(P.lime, { roughness: 0.7 })); torso.position.y = 1.15;
    const armL = new Mesh(new BoxGeometry(0.14, 0.6, 0.14), mat(P.b400)); armL.position.set(0, 1.12, 0.34);
    const armR = armL.clone(); armR.position.z = -0.34;
    const head = new Mesh(new SphereGeometry(0.19, 10, 10), mat(0xe9cbb0)); head.position.y = 1.68;
    const helmet = new Mesh(new SphereGeometry(0.22, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2), mat(hat)); helmet.position.y = 1.7;
    g.add(legL, legR, torso, armL, armR, head, helmet); scene.add(g);
    return { g, legL, legR, armL, armR };
  }
  const WALKS = [
    { route: [[-21, -13.4], [21, -13.4], [21, 13.4], [-21, 13.4]], hat: P.white, speed: 1.7 },
    { route: [[-20, -0.5], [20, -0.5], [20, 0.5], [-20, 0.5]], hat: P.brand, speed: 1.5 },
    { route: [[-18, 11], [19, 11], [22.5, 7], [19, 3], [-18, 3]], hat: P.white, speed: 1.6 },
    { route: [[19, -6.5], [-19, -6.5], [-19, -5.5], [19, -5.5]], hat: P.b400, speed: 1.4 },
  ];
  const people: Person[] = WALKS.map((w, i) => ({ ...makePerson(w.hat), route: w.route, seg: (i * 2) % w.route.length, t: 0.3 * i, yaw: 0, speed: w.speed, phase: i * 1.7, pos: new Vector3(w.route[0][0], 0.6, w.route[0][1]) }));
  function stepMovers(dt: number, now: number) {
    trucks.forEach((tr) => advance(tr, dt, 0.02, 6, -Math.PI / 2));
    people.forEach((pe) => {
      advance(pe, dt, 0.6, 6, 0);
      const s = reduced ? 0 : Math.sin(now / 140 + pe.phase);
      pe.g.position.y += 0.03 * Math.abs(s);
      pe.legL.rotation.x = 0.55 * s; pe.legR.rotation.x = -0.55 * s; pe.armL.rotation.x = -0.45 * s; pe.armR.rotation.x = 0.45 * s;
    });
  }
  // occupancy: trucks light a wide patch, people a tighter one
  const occupancyAt = (x: number, z: number) => {
    let o = 0;
    trucks.forEach((tr) => { const d = Math.hypot(tr.pos.x - x, tr.pos.z - z); o = Math.max(o, 1 - Math.max(0, Math.min(1, (d - 7) / 6))); });
    people.forEach((pe) => { const d = Math.hypot(pe.pos.x - x, pe.pos.z - z); o = Math.max(o, 1 - Math.max(0, Math.min(1, (d - 5) / 5))); });
    return o;
  };

  /* ------------------------------------------------------- per-system state */
  const sys: Record<string, { k: number; t: number }> = Object.fromEntries(HOT.map((h) => [h.id, { k: 0, t: 0 }]));
  HOT.forEach((h) => { if (instrumented.has(h.id)) sys[h.id].t = sys[h.id].k = 1; });
  function setSystem(id: string, t: number) { sys[id].t = t; wake(); }

  /* --------------------------------------------------- callouts and readouts */
  const pins: Pin[] = HOT.map((h, i) => {
    const anchor = new Mesh(new SphereGeometry(0.28, 12, 12), new MeshStandardMaterial({ color: P.b200, emissive: P.b200, emissiveIntensity: 0.4 }));
    anchor.position.set(...h.pos); scene.add(anchor);
    const el = document.createElement('div'); el.className = 'iw-pin';
    el.innerHTML = `<button class="iw-chip" type="button" aria-label="${i + 1}. ${h.title}" data-tip="${h.title}"><b>${i + 1}</b><i>${h.label}</i></button><span class="iw-stem"></span><span class="iw-dot"></span>`;
    const chip = el.querySelector<HTMLElement>('.iw-chip')!;
    chip.addEventListener('click', (e) => { e.stopPropagation(); host.select(h.id); });
    pinsEl.appendChild(el);
    return { h, el, chip, v: new Vector3(...h.pos), tmp: new Vector3(), anchor, behind: false, off: false, lift: 22, cw: 80, ch: 28, sx: 0, sy: 0 };
  });
  const BASE_LIFT = 22, MAX_LIFT = 120;
  function measureChips() { pins.forEach((p) => { p.cw = p.chip.offsetWidth || p.cw; p.ch = p.chip.offsetHeight || p.ch; }); }
  measureChips();
  // Label collision avoidance: chips are pushed apart vertically by lengthening
  // the stem of whichever callout is further from the camera, so the nearer one
  // stays close to its equipment. Ghosted labels are still drawn, so they still collide.
  function resolveLabels() {
    const want = pins.map(() => BASE_LIFT);
    const vis = pins.map((p) => !p.off);
    for (let pass = 0; pass < 3; pass++) {
      for (let i = 0; i < pins.length; i++) for (let j = i + 1; j < pins.length; j++) {
        if (!vis[i] || !vis[j]) continue;
        const a = pins[i], b = pins[j];
        const overlapX = Math.min(a.sx + a.cw / 2, b.sx + b.cw / 2) - Math.max(a.sx - a.cw / 2, b.sx - b.cw / 2) + 8;
        if (overlapX <= 0) continue;
        const aBot = a.sy - want[i] - 14, aTop = aBot - a.ch, bBot = b.sy - want[j] - 14, bTop = bBot - b.ch;
        const overlapY = Math.min(aBot, bBot) - Math.max(aTop, bTop) + 6;
        if (overlapY <= 0) continue;
        const pushA = a.tmp.z > b.tmp.z || (a.tmp.z === b.tmp.z && a.sy < b.sy);
        if (pushA) want[i] = Math.min(MAX_LIFT, want[i] + overlapY); else want[j] = Math.min(MAX_LIFT, want[j] + overlapY);
      }
    }
    pins.forEach((p, i) => { p.lift += (want[i] - p.lift) * (reduced ? 1 : 0.25); p.el.style.setProperty('--lift', p.lift.toFixed(1) + 'px'); });
  }
  type Readout = { sys: string; pos: [number, number, number]; label: string; fn: (s: Sim) => string; el: HTMLElement; span: HTMLElement; v: Vector3; tmp: Vector3 };
  type Sim = { kw: number; thd: number; temps: number[] };
  const READ: Readout[] = ([
    { sys: 'meter', pos: [-W / 2 + 1.4, 2.2, -D / 2 + 3.5], label: 'kW', fn: (s: Sim) => s.kw.toFixed(0) },
    { sys: 'pq', pos: [-W / 2 + 4.6, 2.2, D / 2 - 0.6], label: 'THD', fn: (s: Sim) => s.thd.toFixed(1) + '%' },
    { sys: 'hvac', pos: [-14, H + 4.9, -D / 2 + 5.5], label: 'Z1', fn: (s: Sim) => s.temps[0].toFixed(1) + '°C' },
    { sys: 'hvac', pos: [0, H + 4.9, -D / 2 + 5.5], label: 'Z2', fn: (s: Sim) => s.temps[1].toFixed(1) + '°C' },
    { sys: 'hvac', pos: [14, H + 4.9, -D / 2 + 5.5], label: 'Z3', fn: (s: Sim) => s.temps[2].toFixed(1) + '°C' },
  ] as Omit<Readout, 'el' | 'span' | 'v' | 'tmp'>[]).map((r) => {
    const el = document.createElement('div'); el.className = 'iw-ro'; el.innerHTML = `<small>${r.label}</small><span></span>`; pinsEl.appendChild(el);
    return { ...r, el, span: el.querySelector<HTMLElement>('span')!, v: new Vector3(...r.pos), tmp: new Vector3() };
  });
  const sim: Sim = { kw: 0, thd: 0, temps: [0, 0, 0] }; let simAt = 0;
  function simulate(now: number, lightLoad: number, kh: number) {
    if (now - simAt < 300) return; simAt = now;
    const n = Math.sin(now / 700) * 0.5 + Math.sin(now / 1900) * 0.5;
    sim.kw = 118 + 62 * lightLoad + 140 * (1 - 0.38 * kh) + 4 * n;
    sim.thd = 5.6 - 1.9 * sys.pq.k + 0.15 * n;
    const found = [19.4, 24.9, 22.3], target = 21.5;
    sim.temps = found.map((f, i) => f + (target - f) * kh + 0.12 * Math.sin(now / 1100 + i));
  }
  const ray = new Raycaster(), cLime = new Color(P.lime), cB200 = new Color(P.b200);
  function refreshPins() {
    const selected = host.getSelected();
    pins.forEach((p) => { p.el.classList.toggle('done', instrumented.has(p.h.id)); p.el.classList.toggle('sel', selected === p.h.id); p.el.classList.toggle('dim', !!selected && selected !== p.h.id && !p.behind); });
    wake();
  }
  function project(v: Vector3, tmp: Vector3, el: HTMLElement, anchorY: string, out?: Pin) {
    tmp.copy(v).project(camera); const off = tmp.z > 1;
    const sx = (tmp.x * 0.5 + 0.5) * stage.clientWidth, sy = (-tmp.y * 0.5 + 0.5) * stage.clientHeight;
    el.style.transform = `translate(${sx.toFixed(1)}px, ${sy.toFixed(1)}px) translate(-50%,${anchorY})`;
    el.style.zIndex = String(1000 - Math.round(tmp.z * 500));
    if (out) { out.sx = sx; out.sy = sy; out.off = off; }
    return off;
  }
  function updateLabels(now: number, frameNo: number) {
    const selected = host.getSelected();
    pins.forEach((p, i) => {
      const off = project(p.v, p.tmp, p.el, '-100%', p);
      if (frameNo % 3 === i % 3) { const dir = p.v.clone().sub(camera.position); const len = dir.length(); dir.normalize(); ray.set(camera.position, dir); ray.far = len - 0.6; p.behind = ray.intersectObjects(occluders, false).length > 0; }
      p.el.classList.toggle('off', off); p.el.classList.toggle('behind', !off && p.behind);
      const k = sys[p.h.id].k;
      const am = p.anchor.material as MeshStandardMaterial;
      am.color.copy(cB200).lerp(cLime, k); am.emissive.copy(am.color); am.emissiveIntensity = (selected === p.h.id ? 1.4 : 0.4) + 0.5 * k + 0.2 * Math.sin(now / 500 + i);
    });
    resolveLabels();
    READ.forEach((r) => { const off = project(r.v, r.tmp, r.el, '-50%'); r.el.classList.toggle('on', !off && sys[r.sys].k > 0.6); r.span.textContent = r.fn(sim); });
  }

  /* --------------------------------------------------------- loop with pause */
  let last = performance.now(), frameNo = 0, running = false;
  function resize() { const w = stage.clientWidth, h = stage.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); measureChips(); wake(); }
  new ResizeObserver(resize).observe(stage); resize();
  const cWarm = new Color(0xfff3d6), cLimeSoft = new Color(0xeaf3cf);
  function wake() { if (!running && host.isVisible() && host.isOnScreen()) { running = true; last = performance.now(); requestAnimationFrame(frame); } }
  function frame(now: number) {
    if (!host.isVisible() || !host.isOnScreen()) { running = false; return; }
    const dt = Math.min(0.05, (now - last) / 1000); last = now; frameNo++;
    if (frameNo % 30 === 0) host.setOnScreen(host.rectOnScreen());
    HOT.forEach((h) => { const s = sys[h.id]; s.k = reduced ? s.t : s.k + (s.t - s.k) * Math.min(1, dt * 3.2); });
    if (host.clock.playing()) host.clock.set((host.clock.get() + dt * 0.9) % 24);
    applyTime(host.clock.get()); stepCamera(dt, now); host.tourTick(now); stepMovers(dt, now);
    const { day } = daylight, kl = sys.lighting.k, kh = sys.hvac.k, km = sys.meter.k, kp = sys.panel.k, kf = sys.life.k, kq = sys.pq.k;
    let lightSum = 0;
    lamps.forEach((l, i) => {
      const occ = occupancyAt(l.x, l.z); const want = Math.max(0.12, occ) * (1 - 0.7 * day); const lvl = 1 + (want - 1) * kl;
      (l.m.material as MeshStandardMaterial).emissiveIntensity = 0.25 + 1.5 * lvl; lightSum += lvl;
      const pm = pools[i].m.material as MeshBasicMaterial; pm.opacity = 0.55 * lvl; pm.color.copy(cWarm).lerp(cLimeSoft, kl);
    });
    skyPools.forEach((p) => { (p.material as MeshBasicMaterial).opacity = 0.28 * day; }); skyMat.opacity = 0.25 + 0.4 * day; skyMat.color.copy(cSkyNight).lerp(cSunWhite, day);
    drawHeat(kh); hvac.forEach((h, i) => { const demand = [0.35, 0.9, 0.5][i]; h.blade.rotation.y += 0.18 * (1 + (demand - 1) * kh); });
    const lm = panelLed.material as MeshStandardMaterial; lm.color.copy(cWaste).lerp(cLime, kp); lm.emissive.copy(lm.color); lm.emissiveIntensity = 0.6 + 0.8 * kp;
    (screens[0].material as MeshStandardMaterial).emissiveIntensity = km * (0.9 + 0.3 * Math.sin(now / 400));
    (screens[1].material as MeshStandardMaterial).emissiveIntensity = km * (0.9 + 0.3 * Math.sin(now / 400 + 1));
    (screens[2].material as MeshStandardMaterial).emissiveIntensity = kq * (0.9 + 0.3 * Math.sin(now / 400 + 2));
    (strobe.material as MeshStandardMaterial).emissiveIntensity = 0.3 + 0.7 * kf * (0.5 + 0.5 * Math.sin(now / 300));
    simulate(now, lightSum / lamps.length, kh); updateLabels(now, frameNo);
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  applyTime(host.clock.get()); placeCamera(); refreshPins(); wake();
  return { setSystem, flyTo, resetView, refreshPins, wake };
}
