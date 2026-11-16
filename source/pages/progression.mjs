/* Progression : grand titre, puis bandeau photo de l'étoile à huit qui s'ouvre au défilement. */
import { html } from '../../outils/gabarit.mjs';
import { appel } from '../gabarits/blocs.mjs';

export const page = { cle: 'progression', fichier: 'progression', imagePartage: 'progression-ouverture-1280.webp' };

const carte = (b, cls = '') => html`<article class="brevet ${cls}"><p class="brevet-code">${b.code}</p><h3>${b.titre}</h3><p>${b.texte}</p></article>`;

export default (c) => {
  const B = c.donnees.brevets;
  const D = (k) => c.t(`progression.disciplines.${k}`);
  return html`
<section class="ouv ouv-prog" id="debut" data-ouverture-page>
  <div class="conteneur ouv-prog-tete">
    <p class="surtitre" data-anime="gsap">${c.t('progression.ouverture.surtitre')}</p>
    <h1 class="ouv-titre ouv-prog-titre" data-iris-centre data-anime="gsap">${c.t('progression.ouverture.titre1')} <em>${c.t('progression.ouverture.titre2')}</em></h1>
    <div class="ouv-prog-bas">
      <p class="chapeau masque-ecran-bas" data-anime="gsap">${c.t('progression.ouverture.texte')}</p>
      <div data-anime="gsap">
        <p class="ouv-actions">${c.lien('contact', { ancre: 'formulaire', params: 'sujet=progression', classe: 'bouton', texte: c.t('progression.ouverture.action'), attrs: 'data-action-principale data-survol="magnetique"' })}</p>
        <p class="hero-info" data-info-cle><span class="pastille" aria-hidden="true"></span>${c.t('progression.ouverture.info')}</p>
      </div>
    </div>
  </div>
  <div class="ouv-prog-bandeau" data-effet="bandeau">
    ${c.media({ nom: 'progression-ouverture', alt: c.s('progression.ouverture.alt'), priorite: true, classe: 'ouv-prog-media', cadrage: '51% 50%', sizes: '100vw', attrs: 'data-fx="parallaxe" data-fx-force="8"' })}
  </div>
</section>

<section class="brevets" id="brevets">
  <div class="conteneur">
    <div class="tete-section">
      <p class="surtitre" data-anime>${c.t('progression.brevets.surtitre')}</p>
      <h2 class="titre-section" data-anime="lignes">${c.t('progression.brevets.titre')}</h2>
      <p class="chapeau" data-anime>${c.t('progression.brevets.texte')}</p>
    </div>
    <div class="brevets-autonomie" data-anime="cascade">${B.autonomie.map((b) => carte(b, 'brevet--grand'))}</div>
    <svg class="brevets-trait" viewBox="0 0 1200 24" preserveAspectRatio="none" aria-hidden="true" data-fx="trace"><path d="M4 12 C 300 0, 600 24, 1196 12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>
    <h3 class="brevets-sous-titre" data-anime>${c.t('progression.brevets.specialites')}</h3>
    <div class="brevets-grille" data-anime="cascade">${B.specialites.map((b) => carte(b))}</div>
    <h3 class="brevets-sous-titre" data-anime>${c.t('progression.brevets.encadrer')}</h3>
    <div class="brevets-grille brevets-grille--3" data-anime="cascade">${B.encadrement.map((b) => carte(b, 'brevet--nuit'))}</div>
  </div>
</section>

<section class="disciplines" id="disciplines">
  <div class="conteneur">
    <div class="tete-section">
      <p class="surtitre surtitre--clair" data-anime>${D('surtitre')}</p>
      <h2 class="titre-section" data-anime="lignes">${D('titre')}</h2>
    </div>
    <article class="discipline">
      ${c.media({ nom: 'progression-vr', alt: c.donnees.images['progression-vr'].alt, classe: 'discipline-media', sizes: '(max-width: 760px) 100vw, 50vw', attrs: 'data-fx="parallaxe" data-fx-force="10"' })}
      <div class="discipline-texte">
        <h3>${D('vrTitre')}</h3>
        <p>${D('vrTexte')}</p>
        <ul class="chiffres discipline-chiffres" data-anime="cascade">
          <li><strong class="chiffre">${D('vrChiffre1')}</strong><span>${D('vrChiffre1Texte')}</span></li>
          <li><strong class="chiffre">${D('vrChiffre2')}</strong><span>${D('vrChiffre2Texte')}</span></li>
          <li><strong class="chiffre" data-compteur="10">10</strong><span>${D('vrChiffre3Texte')}</span></li>
        </ul>
        <p class="etiquette">${D('vrBrevet')}</p>
      </div>
    </article>
    <article class="discipline discipline--inverse">
      ${c.media({ nom: 'accueil-freefly', alt: c.donnees.images['accueil-freefly'].alt, classe: 'discipline-media', cadrage: '52% 40%', sizes: '(max-width: 760px) 100vw, 50vw', attrs: 'data-fx="parallaxe" data-fx-force="10"' })}
      <div class="discipline-texte">
        <h3>${D('ffTitre')}</h3>
        <p>${D('ffTexte')}</p>
        <p class="etiquette">${D('ffBrevet')}</p>
      </div>
    </article>
    <div class="disciplines-petites" data-anime="cascade">
      <article class="discipline-petite">${c.media({ nom: 'progression-precision', alt: c.donnees.images['progression-precision'].alt, classe: 'discipline-petite-media', sizes: '(max-width: 760px) 100vw, 25vw' })}<div><h3>${D('precisionTitre')}</h3><p>${D('precisionTexte')}</p></div></article>
      <article class="discipline-petite">${c.media({ nom: 'progression-voile', alt: c.donnees.images['progression-voile'].alt, classe: 'discipline-petite-media', sizes: '(max-width: 760px) 100vw, 25vw' })}<div><h3>${D('voileTitre')}</h3><p>${D('voileTexte')}</p></div></article>
    </div>
  </div>
</section>

<section class="materiel" id="materiel">
  <div class="conteneur materiel-grille">
    <div>
      <p class="surtitre" data-anime>${c.t('progression.club.surtitre')}</p>
      <h2 class="titre-section" data-anime="lignes">${c.t('progression.club.titre')}</h2>
      <p class="chapeau" data-anime>${c.t('progression.club.texte')}</p>
      <ul class="chiffres terrain-chiffres" data-anime="cascade">
        <li><strong class="chiffre materiel-petit">${c.t('progression.club.voiles1')}</strong><span>${c.t('progression.club.voiles1Texte')}</span></li>
        <li><strong class="chiffre materiel-petit">${c.t('progression.club.voiles2')}</strong><span>${c.t('progression.club.voiles2Texte')}</span></li>
        <li><strong class="chiffre" data-compteur="25">25</strong><span>${c.t('progression.club.hebergementTexte')}</span></li>
        <li><strong class="chiffre materiel-petit">${c.t('progression.club.hangar')}</strong><span>${c.t('progression.club.hangarTexte')}</span></li>
      </ul>
    </div>
    ${c.media({ nom: 'progression-parc', alt: c.donnees.images['progression-parc'].alt, classe: 'materiel-media', sizes: '(max-width: 760px) 100vw, 40vw', attrs: 'data-anime="rideau"' })}
  </div>
</section>

${appel(c)}
`;
};
