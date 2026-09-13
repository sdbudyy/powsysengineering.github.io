/* ---------------------------------------------------------------------------
   THE INSTRUMENTED WAREHOUSE — page behaviour

   Everything here works with no 3D at all: the six-system list, the card, the
   visibility gauge, the guided tour and the clock all run on plain DOM state.
   The scene (warehouse-scene.ts, which carries Three.js) is fetched only when
   the stage scrolls into view or the visitor presses "Explore in 3D", and it
   reads its state from here rather than the other way round — so a visitor
   whose device never loads WebGL still gets a working, crawlable section.
--------------------------------------------------------------------------- */

import type { WarehouseSystem } from '../data/warehouse';
import type { SceneApi, SceneHost } from './warehouse-scene';

export function mountWarehouse(root: HTMLElement, systems: WarehouseSystem[]) {
  const HOT = systems;
  const q = <T extends HTMLElement = HTMLElement>(sel: string) => root.querySelector<T>(`[data-iw="${sel}"]`)!;
  const stage = q('stage'), canvas = q<HTMLCanvasElement>('canvas'), pinsEl = q('pins'), poster = q('poster');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Mobile layout keys off a class rather than a media query so it can be
  // forced with ?mobile for review on a desktop.
  const params = new URLSearchParams(location.search);
  const mq = matchMedia('(max-width: 640px)');
  const setMobile = () => root.classList.toggle('iw-mobile', params.has('mobile') || mq.matches);
  setMobile(); mq.addEventListener('change', setMobile);
  const small = params.has('mobile') || mq.matches;

  /* ------------------------------------------------------------ state */
  const instrumented = new Set<string>();
  let selected: string | null = null, scene3d: SceneApi | null = null, ctaShown = false, ctaTimer = 0;
  const gbar = q('gbar'); HOT.forEach(() => gbar.appendChild(document.createElement('i')));
  const cta = q('cta');
  function updateGauge() {
    const n = instrumented.size;
    q('gv').textContent = String(Math.round(n / HOT.length * 100)); q('gcount').textContent = `${n} / ${HOT.length} systems`;
    [...gbar.children].forEach((i, k) => { i.classList.toggle('on', instrumented.has(HOT[k].id)); i.classList.toggle('now', HOT[k].id === selected && instrumented.has(selected!)); });
    if (n === HOT.length && !ctaShown) { ctaShown = true; ctaTimer = window.setTimeout(() => cta.classList.add('show'), reduced ? 0 : 900); }
  }
  q('ctaClose').addEventListener('click', () => cta.classList.remove('show'));

  const list = q('list');
  const listItems = [...list.querySelectorAll<HTMLElement>('.iw-sys')];
  listItems.forEach((li, i) => li.addEventListener('click', () => { select(HOT[i].id); stage.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' }); }));
  const card = q('card');
  function renderCard() {
    listItems.forEach((li, i) => { li.classList.toggle('sel', HOT[i].id === selected); li.classList.toggle('done', instrumented.has(HOT[i].id)); });
    if (!selected) { card.classList.remove('show'); return; }
    const i = HOT.findIndex((h) => h.id === selected), h = HOT[i], on = instrumented.has(h.id);
    q('cn').textContent = String(i + 1); q('ct').textContent = h.tag; q('ch').textContent = h.title; q('cp').textContent = h.body;
    q('cm').innerHTML = h.metrics.map(([v, l]) => `<div><b>${v}</b><span>${l}</span></div>`).join('');
    q('cstate').classList.toggle('on', on); q('cstateT').textContent = on ? 'Instrumented — measurable' : 'As found — not measured';
    card.classList.add('show');
  }
  function instrument(id: string) { if (instrumented.has(id)) return; instrumented.add(id); updateGauge(); scene3d?.setSystem(id, 1); }
  function select(id: string | null, opts: { fromTour?: boolean } = {}) {
    selected = id;
    if (id) { instrument(id); scene3d?.flyTo(HOT.find((h) => h.id === id)!.pos); }
    renderCard(); updateGauge(); scene3d?.refreshPins();
    if (!opts.fromTour) tourPause(true);
  }
  function resetAll() {
    instrumented.clear(); selected = null; ctaShown = false; clearTimeout(ctaTimer); cta.classList.remove('show');
    tourStop(false); renderCard(); updateGauge();
    if (scene3d) { HOT.forEach((h) => scene3d!.setSystem(h.id, 0)); scene3d.resetView(); scene3d.refreshPins(); }
  }
  function instrumentAll() { HOT.forEach((h) => instrument(h.id)); select(null); }
  q('cx').addEventListener('click', () => select(null));
  q('prev').addEventListener('click', () => { const i = HOT.findIndex((h) => h.id === selected); select(HOT[(i + HOT.length - 1) % HOT.length].id); });
  q('next').addEventListener('click', () => { const i = HOT.findIndex((h) => h.id === selected); select(HOT[(i + 1) % HOT.length].id); });
  q('allBtn').addEventListener('click', instrumentAll);
  q('resetBtn').addEventListener('click', resetAll);
  // mobile sheet gestures: swipe sideways for prev/next; drag down closes only
  // when the sheet is already scrolled to the top, so scrolling it never closes it
  let sx = 0, sy = 0, atTop = true;
  card.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; atTop = card.scrollTop <= 0; }, { passive: true });
  card.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) q(dx < 0 ? 'next' : 'prev').click();
    else if (atTop && dy > 70 && Math.abs(dy) > Math.abs(dx)) select(null);
  }, { passive: true });

  /* ------------------------------------------------------------ clock */
  // Starts at noon, and "play" always runs from noon, so the day/night sweep
  // is the same every time rather than picking up from wherever the slider was.
  const tod = q<HTMLInputElement>('tod'); let hour = 12, todPlaying = false;
  const fmt = (h: number) => `${String(Math.floor(h) % 24).padStart(2, '0')}:${String(Math.round((h % 1) * 60)).padStart(2, '0')}`;
  const showHour = () => { tod.value = hour.toFixed(2); q('todT').textContent = fmt(hour); };
  showHour();
  tod.addEventListener('input', () => { hour = +tod.value; q('todT').textContent = fmt(hour); scene3d?.wake(); });
  const todPlay = q('todPlay');
  todPlay.addEventListener('click', () => {
    todPlaying = !todPlaying;
    if (todPlaying) { hour = 12; showHour(); }
    todPlay.setAttribute('aria-pressed', String(todPlaying)); todPlay.textContent = todPlaying ? '■ Stop' : '▶ 24 h';
    scene3d?.wake();
  });

  /* ------------------------------------------------------------- tour */
  const STEP = reduced ? 3200 : 5600;
  const tour = { active: false, paused: false, idx: -1, t0: 0, elapsed: 0 };
  const dots = q('tourDots'); HOT.forEach(() => dots.appendChild(document.createElement('i')));
  const tourEl = q('tour'), tourBtn = q('tourBtn'), tourPauseBtn = q('tourPause'), ring = q('ringFg');
  function tourStart() { ensure3d(); tour.active = true; tour.paused = false; tour.idx = -1; tourEl.classList.add('show'); tourBtn.textContent = '■ Stop tour'; tourNext(); }
  function tourNext() {
    tour.idx++;
    if (tour.idx >= HOT.length) { tourStop(true); return; }
    select(HOT[tour.idx].id, { fromTour: true });
    [...dots.children].forEach((d, k) => { d.classList.toggle('done', k < tour.idx); d.classList.toggle('now', k === tour.idx); });
    q('tourText').textContent = `Tour · ${tour.idx + 1} / ${HOT.length}`;
    tour.t0 = performance.now(); tour.elapsed = 0;
  }
  function tourTick(now: number) {
    if (!tour.active || tour.paused) return;
    tour.elapsed = now - tour.t0;
    ring.style.strokeDashoffset = String(62.8 * (1 - Math.min(1, tour.elapsed / STEP)));
    if (tour.elapsed >= STEP) tourNext();
  }
  function tourPause(v: boolean) { if (!tour.active) return; tour.paused = v; if (!v) tour.t0 = performance.now() - tour.elapsed; tourPauseBtn.textContent = v ? 'Resume' : 'Pause'; }
  function tourStop(finished: boolean) { tour.active = false; tourEl.classList.remove('show'); tourBtn.textContent = '▶ Guided tour'; if (finished) { select(null); scene3d?.resetView(); } }
  const tourToggle = () => (tour.active ? tourStop(false) : tourStart());
  tourBtn.addEventListener('click', tourToggle);
  tourPauseBtn.addEventListener('click', () => tourPause(!tour.paused));

  /* ---------------------------------------------- lazy load + render pause */
  const launch = q<HTMLButtonElement>('launch'), launchNote = q('launchNote');
  let loading = false;
  const noPause = params.has('nopause');   // test hook: keep rendering in a hidden tab
  let visible = noPause || !document.hidden, onScreen = true;
  // Geometry is the authority on whether the stage is on screen. IntersectionObserver
  // is only a fast wake-up: some embedded browsers deliver one false reading and then
  // nothing, which would otherwise leave the scene frozen with no event to revive it.
  const rectOnScreen = () => { const r = stage.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; };
  // The scene chunk is fetched and parsed ahead of time - when the stage is
  // within 800px, or the moment a pointer reaches the launch button - so the
  // click itself only has to build, not download.
  let sceneModule: Promise<typeof import('./warehouse-scene')> | null = null;
  const preload = () => (sceneModule ??= import('./warehouse-scene'));
  launch.addEventListener('pointerenter', preload, { once: true });
  launch.addEventListener('focus', preload, { once: true });

  async function ensure3d() {
    if (scene3d || loading) return; loading = true;
    launch.disabled = true; launch.classList.add('is-loading'); launch.textContent = 'Loading…';
    launchNote.textContent = 'Building the scene';
    try {
      const { buildScene } = await preload();
      // let the loading state paint before the build starts; the timeout keeps a
      // hidden tab (where rAF never fires) from stalling here
      await new Promise<void>((r) => { let done = false; const go = () => { if (!done) { done = true; r(); } }; requestAnimationFrame(go); setTimeout(go, 80); });
        const host: SceneHost = {
          stage, canvas, pinsEl, systems: HOT, small, reduced, instrumented,
          getSelected: () => selected, select, tourActive: () => tour.active, tourPause, tourTick, tourToggle, resetAll,
          clock: { get: () => hour, set: (h) => { hour = h; showHour(); }, playing: () => todPlaying },
          isVisible: () => visible, isOnScreen: () => onScreen, rectOnScreen, setOnScreen: (v) => { onScreen = v; },
          viewButtons: [...root.querySelectorAll<HTMLButtonElement>('[data-view]')],
        };
        scene3d = await buildScene(host, {
          onFirstFrame: () => { poster.classList.add('gone'); poster.setAttribute('aria-hidden', 'true'); },
        });
    } catch {
      loading = false; launch.disabled = false; launch.classList.remove('is-loading'); launch.textContent = 'Explore in 3D';
      launchNote.textContent = 'The 3D scene could not load — the list below still works.';
    }
  }
  launch.addEventListener('click', ensure3d);
  new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) preload(); }), { rootMargin: '800px' }).observe(stage);
  new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) ensure3d(); }), { rootMargin: '120px' }).observe(stage);
  document.addEventListener('visibilitychange', () => { visible = noPause || !document.hidden; scene3d?.wake(); });
  new IntersectionObserver(() => { onScreen = rectOnScreen(); scene3d?.wake(); }, { threshold: 0.05 }).observe(stage);
  addEventListener('scroll', () => { onScreen = rectOnScreen(); if (onScreen) ensure3d(); scene3d?.wake(); }, { passive: true });

  updateGauge(); renderCard();
}
