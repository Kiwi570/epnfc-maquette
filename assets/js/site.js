/* Effets propres au ParaClub Montbéliard (direction « Porte ouverte »). Le socle gère l'ouverture, le voile,
   l'en-tête, le menu, les boucles, les mesures et la bibliothèque d'effets (posés par attributs dans les pages).
   Effets du plan (data-effet) : porte, voile, trajectoire, rangee, manche-a-air, bon-cadeau, chrono, etapes,
   rec, journee, bandeau, embarquement, numero, carte. */
import { demarrer, boucle, etat, versObjet, quand } from './socle/index.js?v=2';

const gsap = window.gsap;
const ST = window.ScrollTrigger;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const ordinateur = () => window.matchMedia('(min-width: 761px)').matches;

/* ---------- Petite voile qui flotte (accueil, appel final, 404) : bouge toute seule. ---------- */
/* Ouverture de l'accueil : la vue respire doucement (lent zoom), la voile dérive dans le vent : le premier écran vit seul. */
function vueQuiRespire() {
  const img = $('.hero-media img');
  if (!img) return;
  let t0 = null;
  quand('pret', () => boucle(img, (dt, t) => {
    if (t0 === null) t0 = t;
    const s = t - t0;
    gsap.set(img, { scale: 1.065 + Math.sin(s * 0.35) * 0.03, xPercent: Math.sin(s * 0.22) * 1 });
  }));
}
function voilesQuiFlottent() {
  $$('.voile-svg[data-effet="voile"]').forEach((svg, k) => {
    const caissons = $$('.voile-caisson', svg);
    let t0 = null;
    quand('pret', () => {
      boucle(svg, (dt, t) => {
        if (t0 === null) t0 = t;
        const s = t - t0;
        gsap.set(svg, { rotation: Math.sin(s * 0.8 + k) * 6, y: Math.sin(s * 1.1 + k) * 12, x: Math.sin(s * 0.5 + k) * 14 });
        caissons.forEach((c, i) => gsap.set(c, { scaleY: 1 + Math.sin(s * 2.2 + i * 0.9) * 0.05 }));
      });
    });
  });
}
function gonfler(tl, svg, t) {
  if (!svg) return;
  tl.fromTo($$('.voile-caisson', svg), { scaleY: 0.15, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'back.out(2.2)' }, t)
    .fromTo($$('.voile-suspentes, .voile-pilote', svg), { opacity: 0 }, { opacity: 1, duration: 0.4 }, t + 0.15);
}

/* ---------- Accueil : trajectoire d'un tandem, de l'avion à la cible. ---------- */
function trajectoire() {
  const svg = $('.trajectoire');
  if (!svg || !ST) return;
  const trace = $('.traj-trace', svg), avion = $('.traj-avion', svg), point = $('.traj-point', svg), mini = $('.traj-mini-voile', svg);
  const mobile = $('.traj-mobile', svg), phases = $$('.traj-phase', svg), etapes = $$('.etape');
  const N = 160;
  let points = null, sommet = 0.45, ouverture = 0.62;
  /* Table des points calculée une fois, après l'ouverture (jamais pendant l'intro ni pendant le défilement) :
     on y repère le sommet de la montée (sortie de l'avion) et le point d'ouverture de la voile. */
  const table = () => {
    if (points) return;
    const longueur = trace.getTotalLength();
    points = Array.from({ length: N + 1 }, (_, i) => { const p = trace.getPointAtLength((i / N) * longueur); return [p.x, p.y]; });
    let iMin = 0; points.forEach((p, i) => { if (p[1] < points[iMin][1]) iMin = i; });
    sommet = iMin / N;
    let iOuv = iMin; points.forEach((p, i) => { if (i > iMin && Math.hypot(p[0] - 572, p[1] - 220) < Math.hypot(points[iOuv][0] - 572, points[iOuv][1] - 220)) iOuv = i; });
    ouverture = iOuv / N;
  };
  const poser = (p) => {
    trace.style.strokeDashoffset = (1 - p).toFixed(4);
    if (!points) return;
    const i = Math.min(N, Math.round(p * N)), [x, y] = points[i];
    const [x2, y2] = points[Math.min(N, i + 2)], [x0, y0] = points[Math.max(0, i - 2)];
    const angle = Math.atan2(y2 - y0, x2 - x0) * 180 / Math.PI;
    gsap.set(mobile, { x, y });
    const enAvion = p < sommet, sousVoile = p >= ouverture;
    gsap.set(avion, { opacity: enAvion ? 1 : 0, rotation: enAvion ? angle : 0, transformOrigin: '50% 50%' });
    gsap.set(point, { opacity: enAvion ? 0 : 1 });
    gsap.set(mini, { opacity: sousVoile ? 1 : 0, scale: sousVoile ? 1 : 0.3, transformOrigin: '50% 100%' });
    const phase = enAvion ? 0 : sousVoile ? 2 : 1;
    phases.forEach((t, k) => t.classList.toggle('actif', k === phase));
    const n = Math.min(etapes.length - 1, Math.floor(p * etapes.length * 0.999));
    etapes.forEach((e, k) => e.classList.toggle('actif', k === n));
  };
  gsap.set(mobile, { x: 60, y: 384 });
  gsap.set(point, { opacity: 0 });
  quand('pret', () => {
    table();
    const section = $('#deroule');
    ST.create({
      trigger: section,
      start: () => (ordinateur() ? 'top top' : 'top 60%'),
      end: () => (ordinateur() ? 'bottom bottom' : 'bottom 75%'),
      scrub: 0.5,
      invalidateOnRefresh: true,
      onUpdate: (st) => poser(st.progress),
      onRefresh: (st) => poser(st.progress),
    });
    ST.sort(); ST.refresh();
  });
}

/* ---------- Accueil : la rangée de photos du club glisse au défilement (sans épinglage). ---------- */
function rangee() {
  const piste = $('[data-effet="rangee"]');
  if (!piste || !ST) return;
  const r = piste.closest('.club-rangee');
  const mm = gsap.matchMedia();
  mm.add('(min-width: 761px)', () => {
    r.removeAttribute('tabindex'); r.removeAttribute('role');
    const distance = () => Math.max(0, piste.scrollWidth - r.clientWidth);
    const tw = gsap.fromTo(piste, { x: () => Math.min(120, distance() * 0.1) }, {
      x: () => -distance(), ease: 'none',
      scrollTrigger: { trigger: r, start: 'top bottom', end: 'bottom top', scrub: 0.6, invalidateOnRefresh: true },
    });
    return () => { tw.scrollTrigger && tw.scrollTrigger.kill(); tw.kill(); gsap.set(piste, { clearProps: 'transform' }); r.setAttribute('tabindex', '0'); r.setAttribute('role', 'region'); };
  });
}

/* ---------- Accueil : manche à air qui se gonfle avec la vitesse de défilement, et ondule toute seule. ---------- */
function mancheAAir() {
  const m = $('[data-effet="manche-a-air"]');
  if (!m) return;
  const corps = $('.manche-corps', m), segs = $$('.manche-seg', m);
  let vent = 0.35;
  boucle(m, (dt, t) => {
    window.__vitesse = (window.__vitesse || 0) * Math.max(0, 1 - dt * 4);
    const v = Math.min(1, Math.abs(window.__vitesse || 0) / 2500);
    const cible = 0.3 + v * 0.7;
    vent += (cible - vent) * Math.min(1, dt * 3);
    /* Vent faible : la manche retombe (rotation), vent fort : elle se tend à l'horizontale. */
    gsap.set(corps, { rotation: (1 - vent) * 38 + Math.sin(t * 3.1) * (3 + vent * 2) });
    segs.forEach((s, i) => gsap.set(s, { y: Math.sin(t * 5 + i * 0.9) * (0.6 + vent * 1.6), transformOrigin: '0% 50%' }));
  });
}
function suivreVitesse() {
  if (!ST) return;
  ST.create({ trigger: document.body, start: 0, end: 'max', onUpdate: (st) => { window.__vitesse = st.getVelocity(); } });
}

/* ---------- Accueil : bon cadeau, le talon se détache au défilement. ---------- */
function bonCadeau() {
  const b = $('[data-effet="bon-cadeau"]');
  if (!b || !ST) return;
  const corps = $('.billet-corps', b), talon = $('.billet-talon', b);
  gsap.timeline({ scrollTrigger: { trigger: b, start: 'top 85%', end: 'center 45%', scrub: 0.6 } })
    .fromTo(b, { y: 70, scale: 0.94 }, { y: 0, scale: 1, ease: 'none' }, 0)
    .fromTo(talon, { x: 0 }, { x: () => (ordinateur() ? 18 : 8), ease: 'none' }, 0.35)
    .fromTo(corps, { x: 0 }, { x: -4, ease: 'none' }, 0.35);
}

/* ---------- Tandem : photos du déroulé qui changent avec l'étape lue. ---------- */
function etapesPhotos() {
  const zone = $('[data-effet="etapes"]');
  if (!zone || !ST) return;
  const photos = $$('.etapes-photo', zone), items = $$('.etapes-liste li');
  const montrer = (n) => {
    photos.forEach((p, i) => p.classList.toggle('visible', i === Number(items[n]?.dataset.photo || 0)));
    items.forEach((it, i) => it.classList.toggle('actif', i === n));
  };
  montrer(0);
  items.forEach((it, i) => ST.create({ trigger: it, start: 'top 60%', end: 'bottom 60%', onToggle: (st) => st.isActive && montrer(i) }));
  /* Le cadre photo glisse doucement pendant la lecture. */
  const cadre = $('.etapes-cadre', zone);
  if (cadre) gsap.fromTo(cadre, { y: 30 }, { y: -30, ease: 'none', scrollTrigger: { trigger: zone, start: 'top bottom', end: 'bottom top', scrub: true } });
}

/* ---------- Tandem : cadre vidéo « REC » qui se dessine, point rouge qui clignote. ---------- */
function rec() {
  const r = $('[data-effet="rec"]');
  if (!r) return;
  const coins = $$('.rec-coin', r), point = $('.rec-point', r);
  if (ST) gsap.fromTo(coins, { scale: 1.4, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.08, ease: 'none', scrollTrigger: { trigger: r, start: 'top 85%', end: 'top 35%', scrub: 0.5 } });
  if (point) boucle(r, (dt, t) => gsap.set(point, { opacity: Math.sin(t * Math.PI) > 0 ? 1 : 0.25 }));
}

/* ---------- Initiation : la frise de la journée se trace (ouverture), puis glisse au défilement. ---------- */
function journee() {
  const j = $('[data-effet="journee"]');
  if (!j || !ST) return;
  gsap.fromTo($('.journee-ligne span', j), { scaleX: 0.05 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: j, start: 'top 95%', end: 'bottom 30%', scrub: 0.5 } });
}

/* ---------- Progression : le bandeau photo s'ouvre au défilement. ---------- */
function bandeau() {
  const b = $('[data-effet="bandeau"]');
  if (!b || !ST) return;
  gsap.fromTo(b, { clipPath: 'inset(0% 8% 0% 8% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
    scrollTrigger: { trigger: b, start: 'top 85%', end: 'bottom 40%', scrub: 0.5 } });
}

/* ---------- Réserver : la carte d'embarquement remonte, puis s'incline au défilement. ---------- */
function embarquement() {
  const e = $('[data-effet="embarquement"]');
  if (!e || !ST) return;
  gsap.fromTo(e, { y: 0, rotation: 0 }, { y: -50, rotation: -3, ease: 'none', scrollTrigger: { trigger: '#debut', start: 'top top', end: 'bottom top', scrub: 0.5 } });
}

/* ---------- Contact : carte d'accès, routes tracées et aérodrome qui pulse. ---------- */
function carte() {
  const c = $('[data-effet="carte"]');
  if (!c) return;
  const routes = $$('.carte-route', c), pulse = $('.carte-pulse', c);
  if (ST) gsap.fromTo(routes, { strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: c, start: 'top 85%', end: 'center 45%', scrub: 0.5 } });
  if (pulse) boucle(c, (dt, t) => { const k = (t % 2) / 2; gsap.set(pulse, { attr: { r: 10 + k * 26 }, opacity: 1 - k }); });
}

/* ---------- Réserver : réservation en quatre étapes, calendrier des jours de saut, récapitulatif. ---------- */
function joursFeries(an) {
  const f = (m, j) => `${an}-${String(m).padStart(2, '0')}-${String(j).padStart(2, '0')}`;
  /* Pâques (algorithme de Meeus), puis lundi de Pâques, Ascension, lundi de Pentecôte. */
  const a = an % 19, b = Math.floor(an / 100), c = an % 100, d = Math.floor(b / 4), e = b % 4, g = Math.floor((8 * b + 13) / 25);
  const h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mois = Math.floor((h + l - 7 * m + 114) / 31), jour = ((h + l - 7 * m + 114) % 31) + 1;
  const paques = new Date(Date.UTC(an, mois - 1, jour));
  const plus = (n) => { const x = new Date(paques); x.setUTCDate(x.getUTCDate() + n); return x.toISOString().slice(0, 10); };
  return new Set([f(1, 1), plus(1), f(5, 1), f(5, 8), plus(39), plus(50), f(7, 14), f(8, 15), f(11, 1), f(11, 11), f(12, 25)]);
}
/* Date du jour à l'heure du terrain (Europe/Paris), pas à celle du visiteur. */
function aujourdhuiParis() {
  const p = new Intl.DateTimeFormat('fr-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  return p;
}
function reservation() {
  const f = $('[data-calendrier]')?.closest('form');
  if (!f) return;
  const panneaux = $$('.resa-etape', f), puces = $$('.resa-puce');
  const recap = {
    formule: $('[data-recap="formule"]'), date: $('[data-recap="date"]'), personnes: $('[data-recap="personnes"]'), acompte: $('[data-recap="acompte"]'),
  };
  const vide = recap.formule ? recap.formule.textContent : '';
  let n = 0, choixDate = '';
  const cal = $('[data-calendrier]', f), grille = $('.cal-grille', cal), titre = $('.cal-mois', cal);
  const auj = aujourdhuiParis();
  const [ay, am] = auj.split('-').map(Number);
  let vue = new Date(Date.UTC(ay, am - 1, 1));
  const feries = new Map();
  const estFerie = (iso) => { const an = Number(iso.slice(0, 4)); if (!feries.has(an)) feries.set(an, joursFeries(an)); return feries.get(an).has(iso); };
  const nomMois = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric', timeZone: 'UTC' });
  const nomJour = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' });
  const lib = { ferie: cal.dataset.ferie || 'férié', auj: cal.dataset.aujourdhui || "aujourd'hui" };

  function dessiner() {
    titre.textContent = nomMois.format(vue);
    const an = vue.getUTCFullYear(), mo = vue.getUTCMonth();
    const premier = (new Date(Date.UTC(an, mo, 1)).getUTCDay() + 6) % 7;
    const jours = new Date(Date.UTC(an, mo + 1, 0)).getUTCDate();
    const cases = [];
    for (let i = 0; i < premier; i++) cases.push('<span class="cal-case cal-vide" aria-hidden="true"></span>');
    for (let j = 1; j <= jours; j++) {
      const iso = `${an}-${String(mo + 1).padStart(2, '0')}-${String(j).padStart(2, '0')}`;
      const js = new Date(Date.UTC(an, mo, j)).getUTCDay();
      const ferie = estFerie(iso), weekend = js === 0 || js === 6, passe = iso < auj, ouvert = (weekend || ferie) && !passe;
      const cls = ['cal-case', ouvert ? 'cal-ouvert' : 'cal-ferme', passe ? 'cal-passe' : '', iso === auj ? 'cal-auj' : '', ferie ? 'cal-ferie' : '', iso === choixDate ? 'cal-choisi' : ''].filter(Boolean).join(' ');
      const etiquette = nomJour.format(new Date(Date.UTC(an, mo, j))) + (ferie ? `, ${lib.ferie}` : '') + (iso === auj ? `, ${lib.auj}` : '');
      cases.push(ouvert
        ? `<button type="button" class="${cls}" data-date="${iso}"${iso === choixDate ? ' aria-current="date"' : ''} aria-label="${etiquette}">${j}</button>`
        : `<span class="${cls}" aria-label="${etiquette}" role="img">${j}</span>`);
    }
    grille.innerHTML = cases.join('');
    const prec = $('[data-cal="prec"]', cal);
    prec.disabled = an === ay && mo === am - 1;
  }
  cal.addEventListener('click', (e) => {
    const b = e.target.closest('[data-date]');
    if (b) { choixDate = b.dataset.date; $('input[name="date"]', f).value = choixDate; dessiner(); majRecap(); $('.cal-erreur', cal).hidden = true; return; }
    const nav = e.target.closest('[data-cal]');
    if (nav && !nav.disabled) { vue = new Date(Date.UTC(vue.getUTCFullYear(), vue.getUTCMonth() + (nav.dataset.cal === 'suiv' ? 1 : -1), 1)); dessiner(); }
  });

  function formule() { return $('input[name="formule"]:checked', f); }
  function majRecap() {
    const fo = formule();
    const cadeau = fo && fo.value === 'cadeau';
    f.classList.toggle('resa-cadeau', !!cadeau);
    if (recap.formule) recap.formule.textContent = fo ? fo.dataset.libelle : vide;
    if (recap.date) recap.date.textContent = cadeau ? (cal.dataset.cadeau || '') : (choixDate ? nomJour.format(new Date(choixDate + 'T00:00:00Z')) : vide);
    const p = Number($('[name="personnes"]', f).value || 1);
    if (recap.personnes) recap.personnes.textContent = String(p);
    if (recap.acompte) recap.acompte.textContent = `${p * 50} €`.replace(' ', ' ');
  }
  f.addEventListener('change', majRecap);
  f.addEventListener('input', majRecap);

  function valide(i) {
    if (i === 0) return !!formule();
    if (i === 1) { const ok = f.classList.contains('resa-cadeau') || !!choixDate; $('.cal-erreur', cal).hidden = ok; return ok; }
    if (i === 2) { const ok = $$('.resa-verif input[type="checkbox"]', f).every((c) => c.checked); $('.verif-erreur', f).hidden = ok; return ok; }
    return true;
  }
  function aller(i) {
    n = Math.max(0, Math.min(panneaux.length - 1, i));
    panneaux.forEach((p, k) => { p.hidden = k !== n; });
    puces.forEach((p, k) => { p.classList.toggle('actif', k === n); p.classList.toggle('fait', k < n); if (k === n) p.setAttribute('aria-current', 'step'); else p.removeAttribute('aria-current'); });
    if (gsap) gsap.fromTo(panneaux[n], { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' });
  }
  f.addEventListener('click', (e) => {
    const s = e.target.closest('[data-resa]');
    if (!s) return;
    if (s.dataset.resa === 'suivant') { if (valide(n)) { aller(n + 1); const t = panneaux[n].querySelector('legend, h3'); if (t) { t.setAttribute('tabindex', '-1'); t.focus({ preventScroll: true }); } } }
    else aller(n - 1);
  });
  /* Formule préremplie par l'adresse (?formule=cadeau, depuis « Offrir un saut »). */
  const q = new URLSearchParams(location.search).get('formule');
  if (q) { const r = $(`input[name="formule"][value="${CSS.escape(q)}"]`, f); if (r) r.checked = true; }
  dessiner(); majRecap(); aller(0);
}

/* ---------- Animations d'ouverture des pages (intro et arrivée sous le voile). ---------- */
function ouvertureDeLaPage(tl, t) {
  const page = document.body.dataset.page || $('main')?.dataset.page;
  const hero = $('.hero');
  if (hero) {
    tl.fromTo('.hero-surtitre', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, t)
      .fromTo('.hero-titre', { opacity: 0 }, { opacity: 1, duration: 0.01 }, t)
      .fromTo('.hero-mot', { yPercent: -120, opacity: 0, rotation: () => gsap.utils.random(-8, 8) }, { yPercent: 0, opacity: 1, rotation: 0, duration: 0.7, stagger: 0.12, ease: 'bounce.out' }, t + 0.05)
      .fromTo('.hero-intro, .hero-actions, .hero-info', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, t + 0.35);
    return tl;
  }
  const els = $$('[data-ouverture-page] [data-anime="gsap"]');
  if (els.length) tl.fromTo(els, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power3.out' }, t);
  const chrono = $('[data-effet="chrono"]');
  if (chrono) {
    const n = $('.chrono-n', chrono);
    tl.call(() => { const o = { v: 0 }; gsap.to(o, { v: 50, duration: 1.4, ease: 'power2.out', onUpdate: () => { n.textContent = Math.round(o.v); } }); }, null, t + 0.1);
  }
  const numero = $$('[data-effet="numero"] .numero-c');
  if (numero.length) tl.fromTo(numero, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: 'back.out(2)' }, t + 0.15);
  return tl;
}

demarrer({
  preparer() {
    voilesQuiFlottent();
    vueQuiRespire();
    trajectoire();
    rangee();
    suivreVitesse();
    mancheAAir();
    bonCadeau();
    etapesPhotos();
    rec();
    journee();
    bandeau();
    embarquement();
    carte();
    reservation();
  },
  /* Intro (2,3 s) : la voile et le nom, le logo glisse jusqu'à l'objet d'ouverture de la page, le panneau s'ouvre en
     cercle depuis lui ; sur l'accueil, la porte de l'avion s'élargit (on sort), puis « Sautez à 4 000 m » tombe. */
  jouer() {
    if (!gsap) return null;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('.ouverture-trait', { scaleX: 0 }, { scaleX: 1, duration: 0.45 })
      .to('.ouverture-nom, .ouverture-ligne, .ouverture-trait', { opacity: 0, duration: 0.25 }, 0.55);
    versObjet(tl, { a: 0.6, duree: 0.45, ouverture: 0.75 });
    const objet = $('[data-iris-centre]');
    if (objet && objet.classList.contains('voile-svg')) gonfler(tl, objet, 1.0);
    const trou = $('.hero-porte-trou');
    if (trou) {
      tl.fromTo(trou, { scale: 1 }, { scale: 5.2, duration: 0.95, ease: 'power2.in' }, 1.15)
        .fromTo('.hero-media img', { scale: 1.22 }, { scale: 1.065, duration: 1.2, ease: 'power2.out' }, 1.1);
    }
    ouvertureDeLaPage(tl, trou ? 1.55 : 1.35);
    return tl;
  },
  etatFinal() {
    if (!gsap) return;
    gsap.set('.numero-c, .hero-mot, .hero-surtitre, .hero-titre, .hero-intro, .hero-actions, .hero-info, [data-ouverture-page] [data-anime="gsap"]', { clearProps: 'transform,opacity' });
    $$('.voile-caisson, .voile-suspentes, .voile-pilote').forEach((el) => gsap.set(el, { clearProps: 'transform,opacity' }));
    const n = $('.chrono-n'); if (n) n.textContent = '50';
    const img = $('.hero-media img'); if (img) gsap.set(img, { scale: 1.065 });
  },
  arrivee() {
    if (!gsap) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.1 });
    const objet = $('[data-iris-centre]');
    if (objet && objet.classList.contains('voile-svg')) gonfler(tl, objet, 0);
    ouvertureDeLaPage(tl, 0.05);
  },
});
