/* Accueil : direction « Porte ouverte ». On sort de l'avion (intro), on choisit son premier saut, on suit la trajectoire
   d'un tandem, on découvre le terrain et la vie du club, la progression, le bon cadeau, puis les infos pratiques. */
import { html } from '../../outils/gabarit.mjs';
import { voile, appel } from '../gabarits/blocs.mjs';

export const page = { cle: 'accueil', fichier: 'index', imagePartage: 'grok/accueil-ouverture-1280.webp' };

const L = (c) => c.donnees.listes;

export default (c) => html`
<section class="hero" id="debut">
  <div class="hero-fond">
    ${c.media({ nom: 'grok/accueil-ouverture', alt: c.donnees.images['grok/accueil-ouverture']?.alt || '', priorite: true, classe: 'hero-media', sizes: '100vw', cadrage: '60% 55%', attrs: 'data-fx="parallaxe" data-fx-force="8"' })}
  </div>
  <div class="hero-porte" aria-hidden="true" data-effet="porte"><span class="hero-porte-trou"></span></div>
  ${voile('hero-voile', 'data-iris-centre data-effet="voile"')}
  <div class="hero-texte conteneur">
    <p class="surtitre hero-surtitre masque-ecran-tres-bas" data-anime="gsap">${c.t('accueil.hero.surtitre')}</p>
    <h1 class="hero-titre" data-anime="gsap" data-grille="typo"><span class="hero-mot">${c.t('accueil.hero.mot1')}</span> <span class="hero-mot">${c.t('accueil.hero.mot2')}</span><br><span class="hero-mot hero-mot--accent">${c.t('accueil.hero.mot3')}</span></h1>
    <p class="hero-intro masque-ecran-bas" data-anime="gsap">${c.t('accueil.hero.texte')}</p>
    <p class="hero-actions" data-anime="gsap">
      ${c.lien('reserver', { ancre: 'reservation', classe: 'bouton', texte: c.t('accueil.hero.action'), attrs: 'data-action-principale' })}
      ${c.lien('reserver', { ancre: 'reservation', params: 'formule=cadeau', classe: 'bouton bouton--clair', texte: c.t('accueil.hero.offrir') })}
    </p>
    <p class="hero-info" data-info-cle data-anime="gsap"><span class="pastille" aria-hidden="true"></span>${c.t('accueil.hero.info')}</p>
  </div>
</section>

<section class="deux" id="premier-saut">
  <div class="conteneur">
    <div class="tete-section">
      <p class="surtitre" data-anime>${c.t('accueil.deux.surtitre')}</p>
      <h2 class="titre-section" data-anime="lignes">${c.t('accueil.deux.titre1')} <em>${c.t('accueil.deux.titre2')}</em></h2>
      <p class="chapeau" data-anime>${c.t('accueil.deux.texte')}</p>
    </div>
    <div class="deux-cartes" data-anime="cascade">
      <article class="carte-saut">
        ${c.media({ nom: 'carte-tandem', alt: c.donnees.images['carte-tandem'].alt, classe: 'carte-saut-media', cadrage: '50% 40%', sizes: '(max-width: 760px) 100vw, 45vw', attrs: 'data-fx="zoom"' })}
        <div class="carte-saut-corps">
          <p class="carte-saut-chiffre"><strong class="chiffre" data-compteur="4000">4 000</strong> m</p>
          <h3>${c.t('accueil.deux.tandemTitre')}</h3>
          <ul class="puces">${L(c).tandemPoints.map((p) => html`<li>${p}</li>`)}</ul>
          ${c.lien('tandem', { classe: 'lien-fleche', texte: c.t('accueil.deux.tandemLien') })}
        </div>
      </article>
      <article class="carte-saut">
        ${c.media({ nom: 'grok/carte-initiation', alt: c.donnees.images['grok/carte-initiation'].alt, classe: 'carte-saut-media', cadrage: '50% 35%', sizes: '(max-width: 760px) 100vw, 45vw', attrs: 'data-fx="zoom"' })}
        <div class="carte-saut-corps">
          <p class="carte-saut-chiffre"><strong class="chiffre" data-compteur="1200">1 200</strong> m</p>
          <h3>${c.t('accueil.deux.initiationTitre')}</h3>
          <ul class="puces">${L(c).initiationPoints.map((p) => html`<li>${p}</li>`)}</ul>
          ${c.lien('initiation', { classe: 'lien-fleche', texte: c.t('accueil.deux.initiationLien') })}
        </div>
      </article>
    </div>
    <p class="bandeau-conditions" data-anime>${c.t('accueil.deux.conditions')}</p>
  </div>
</section>

<section class="deroule" id="deroule" data-scene>
  <div class="deroule-collant" data-collant>
    <div class="conteneur deroule-tete">
      <p class="surtitre surtitre--clair" data-anime>${c.t('accueil.deroule.surtitre')}</p>
      <h2 class="titre-section" data-anime="lignes">${c.t('accueil.deroule.titre')}</h2>
      <p class="deroule-aide masque-ecran-bas" data-anime>${c.t('accueil.deroule.aide')} ${c.lien('tandem', { ancre: 'deroule', classe: 'lien-fleche lien-fleche--clair', texte: c.t('accueil.deroule.lien') })}</p>
    </div>
    <div class="conteneur deroule-scene">
      <svg class="trajectoire" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet" data-effet="trajectoire" data-superpose aria-hidden="true" focusable="false">
        <path class="traj-sol" d="M0 384 H1000"/>
        <g class="traj-reperes"><path d="M14 30 H40 M14 384 H40"/><text x="46" y="35">4 000 m</text><text x="46" y="376">0 m</text></g>
        <g class="traj-cible"><circle cx="900" cy="384" r="26"/><circle cx="900" cy="384" r="12"/><text x="900" y="358" text-anchor="middle">${c.t('accueil.deroule.sol')}</text></g>
        <path class="traj-fond" d="M60 384 C 220 360, 420 120, 520 30 C 548 90, 566 160, 572 220 C 640 238, 700 300, 780 316 C 860 332, 900 352, 900 380"/>
        <path class="traj-trace" pathLength="1" d="M60 384 C 220 360, 420 120, 520 30 C 548 90, 566 160, 572 220 C 640 238, 700 300, 780 316 C 860 332, 900 352, 900 380"/>
        <g class="traj-phases">
          <text class="traj-phase" data-phase="0" x="250" y="250" text-anchor="end">${c.t('accueil.deroule.phaseMontee')}</text>
          <text class="traj-phase" data-phase="1" x="600" y="110">${c.t('accueil.deroule.phaseChute')}</text>
          <text class="traj-phase" data-phase="2" x="700" y="250">${c.t('accueil.deroule.phaseVoile')}</text>
        </g>
        <g class="traj-mobile">
          <g class="traj-avion"><path d="M-26 -2 L14 -4 Q24 -4 26 0 Q24 4 14 4 L-26 3 Z"/><path d="M-4 -3 L-10 -18 L2 -18 L8 -3 Z"/><path d="M-22 -2 L-28 -12 L-22 -12 L-16 -2 Z"/></g>
          <circle class="traj-point" r="8"/>
          <g class="traj-mini-voile"><path d="M-22 -26 Q0 -40 22 -26 L18 -20 Q0 -31 -18 -20 Z"/><path class="traj-mini-suspentes" d="M-18 -20 L0 -4 L18 -20"/></g>
        </g>
      </svg>
      <ol class="deroule-etapes">${c.donnees.etapes.map((e, i) => html`<li class="etape" style="--i:${i}" data-etape="${i}">
        <p class="etape-num">${e.num} · ${e.lieu}</p>
        <h3 class="etape-titre">${e.titre}</h3>
        <p class="etape-duree">${e.duree}</p>
        <p class="etape-texte masque-ecran-bas">${e.texte}</p>
      </li>`)}</ol>
    </div>
  </div>
</section>

<section class="terrain" id="terrain">
  <div class="conteneur terrain-grille">
    <div class="terrain-texte">
      <p class="surtitre" data-anime>${c.t('accueil.terrain.surtitre')}</p>
      <h2 class="titre-section" data-anime="lignes">${c.t('accueil.terrain.titre1')} <em>${c.t('accueil.terrain.titre2')}</em></h2>
      <p class="chapeau" data-anime>${c.t('accueil.terrain.texte')}</p>
      <ul class="chiffres terrain-chiffres" data-anime="cascade">
        <li class="terrain-chiffre--large"><strong class="chiffre">${c.t('accueil.terrain.zone')}</strong><span>${c.t('accueil.terrain.zoneTexte')}</span></li>
        <li><strong class="chiffre" data-compteur="6">6</strong><span>${c.t('accueil.terrain.places')}</span></li>
        <li><strong class="chiffre" data-compteur="15">15</strong><span>${c.t('accueil.terrain.minutes')}</span></li>
        <li><strong class="chiffre" data-compteur="500">500</strong><span>${c.t('accueil.terrain.hangar')}</span></li>
        <li><strong class="chiffre" data-compteur="25">25</strong><span>${c.t('accueil.terrain.couchages')}</span></li>
      </ul>
    </div>
    <div class="terrain-photos">
      ${c.media({ nom: 'terrain-avion', alt: c.donnees.images['terrain-avion'].alt, classe: 'terrain-avion', cadrage: '40% 55%', sizes: '(max-width: 760px) 100vw, 45vw', attrs: 'data-anime="rideau"' })}
      ${c.media({ nom: 'terrain-hangar', alt: c.donnees.images['terrain-hangar'].alt, classe: 'terrain-hangar', sizes: '(max-width: 760px) 70vw, 25vw', attrs: 'data-fx="parallaxe" data-fx-force="10" data-superpose' })}
    </div>
  </div>
</section>

<section class="club" id="club">
  <div class="conteneur club-tete">
    <div>
      <p class="surtitre" data-anime>${c.t('accueil.club.surtitre')}</p>
      <h2 class="titre-section" data-anime="lignes">${c.t('accueil.club.titre1')} <em>${c.t('accueil.club.titre2')}</em></h2>
    </div>
    <p class="chapeau" data-anime>${c.t('accueil.club.texte')}</p>
  </div>
  <div class="club-rangee" data-galerie tabindex="0" role="region" aria-label="${c.s('accueil.club.region')}">
    <ul class="club-piste" data-effet="rangee">${c.donnees.club.map((p) => html`<li class="club-photo" style="--ratio:${p.ratio}">
      ${c.media({ nom: p.image, alt: c.donnees.images[p.image].alt, classe: 'club-media', sizes: '(max-width: 760px) 78vw, 30vw' })}
      <p class="club-legende">${p.legende}</p>
    </li>`)}</ul>
  </div>
  <p class="conteneur glisser-aide" aria-hidden="true">${c.t('accueil.club.aide')} →</p>
</section>

<section class="progresser" id="progresser">
  <div class="conteneur progresser-grille">
    ${c.media({ nom: 'accueil-etoile', alt: c.donnees.images['accueil-etoile'].alt, classe: 'progresser-media', cadrage: '50% 50%', sizes: '(max-width: 760px) 100vw, 40vw', attrs: 'data-fx="zoom"' })}
    <div class="progresser-texte">
      <p class="surtitre" data-anime>${c.t('accueil.progresser.surtitre')}</p>
      <h2 class="titre-section" data-anime="lignes">${c.t('accueil.progresser.titre1')} <em>${c.t('accueil.progresser.titre2')}</em></h2>
      <p class="chapeau" data-anime>${c.t('accueil.progresser.texte')}</p>
      <div class="frise">

        <ol class="frise-brevets" data-anime="cascade">${L(c).frise.map((b) => html`<li>${b}</li>`)}</ol>
        <svg class="frise-trait" viewBox="0 0 600 12" preserveAspectRatio="none" aria-hidden="true" data-fx="trace"><path d="M2 6 H598" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>
      </div>
      <p data-anime>${c.lien('progression', { classe: 'bouton bouton--contour', texte: c.t('accueil.progresser.lien') })}</p>
    </div>
  </div>
</section>

<section class="offrir" id="offrir">
  <div class="conteneur offrir-grille">
    <div class="offrir-texte">
      <p class="surtitre" data-anime>${c.t('accueil.offrir.surtitre')}</p>
      <h2 class="titre-section" data-anime="lignes">${c.t('accueil.offrir.titre1')} <em>${c.t('accueil.offrir.titre2')}</em></h2>
      <p class="chapeau" data-anime>${c.t('accueil.offrir.texte')}</p>
      <p data-anime>${c.lien('reserver', { ancre: 'reservation', params: 'formule=cadeau', classe: 'bouton', texte: c.t('accueil.offrir.action'), attrs: 'data-survol="magnetique"' })}</p>
      <p class="petit" data-anime>${c.t('accueil.offrir.acompte')}</p>
    </div>
    <div class="billet" data-effet="bon-cadeau" data-visuel>
      <div class="billet-corps">
        <p class="billet-marque"><img src="/assets/images/logo.svg" alt="" width="32" height="32"> ParaClub Montbéliard</p>
        <p class="billet-titre">${c.t('accueil.offrir.billetTitre')}</p>
        <dl class="billet-infos">
          <div><dt>${c.t('accueil.offrir.billetPour')}</dt><dd>${c.t('accueil.offrir.billetPourValeur')}</dd></div>
          <div><dt>${c.t('accueil.offrir.billetVol')}</dt><dd>${c.t('accueil.offrir.billetVolValeur')}</dd></div>
          <div><dt>${c.t('accueil.offrir.billetAltitude')}</dt><dd>${c.t('accueil.offrir.billetAltitudeValeur')}</dd></div>
          <div><dt>${c.t('accueil.offrir.billetDepart')}</dt><dd>${c.t('accueil.offrir.billetDepartValeur')}</dd></div>
        </dl>
      </div>
      <div class="billet-talon">
        <p class="billet-porte">${c.t('accueil.offrir.billetPorte')}</p>
        <p class="billet-porte-valeur">${c.t('accueil.offrir.billetPorteValeur')}</p>
        ${voile('billet-voile')}
      </div>
    </div>
  </div>
</section>

<section class="pratique" id="pratique">
  <div class="conteneur">
    <div class="tete-section">
      <p class="surtitre" data-anime>${c.t('accueil.pratique.surtitre')}</p>
      <h2 class="titre-section" data-anime="lignes">${c.t('accueil.pratique.titre')}</h2>
    </div>
    <div class="pratique-grille" data-anime="cascade">
      <article class="pratique-carte"><p class="pratique-num">01</p><h3>${c.t('accueil.pratique.quiTitre')}</h3><p>${c.t('accueil.pratique.quiTexte')}</p></article>
      <article class="pratique-carte pratique-carte--meteo">
        <svg class="manche" viewBox="0 0 220 120" aria-hidden="true" focusable="false" data-effet="manche-a-air">
          <path class="manche-mat" d="M20 118 V14"/>
          <g class="manche-corps"><path class="manche-seg manche-seg--r" d="M22 16 L64 20 L64 46 L22 50 Z"/><path class="manche-seg" d="M64 20 L102 24 L102 42 L64 46 Z"/><path class="manche-seg manche-seg--r" d="M102 24 L136 27 L136 39 L102 42 Z"/><path class="manche-seg" d="M136 27 L164 29 L164 37 L136 39 Z"/><path class="manche-seg manche-seg--r" d="M164 29 L186 31 L186 35 L164 37 Z"/></g>
        </svg>
        <p class="pratique-num">02</p><h3>${c.t('accueil.pratique.meteoTitre')}</h3><p>${c.t('accueil.pratique.meteoTexte')}</p></article>
      <article class="pratique-carte"><p class="pratique-num">03</p><h3>${c.t('accueil.pratique.jourTitre')}</h3><p>${c.t('accueil.pratique.jourTexte')}</p></article>
      <article class="pratique-carte"><p class="pratique-num">04</p><h3>${c.t('accueil.pratique.prochesTitre')}</h3><p>${c.t('accueil.pratique.prochesTexte')}</p></article>
    </div>
    <p class="pratique-lien" data-anime>${c.lien('reserver', { ancre: 'faq', classe: 'lien-fleche', texte: c.t('accueil.pratique.lien') })}</p>
  </div>
</section>

${appel(c)}
`;
