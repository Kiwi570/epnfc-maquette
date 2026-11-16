/* Initiation : la porte de l'avion (Grok) à gauche, le titre à droite, la frise de la journée dessous. */
import { html } from '../../outils/gabarit.mjs';
import { appel } from '../gabarits/blocs.mjs';

export const page = { cle: 'initiation', fichier: 'initiation', imagePartage: 'grok/initiation-ouverture-640.webp' };

const JOURNEE = ['h8', 'h6', 'midi', 'saut', 'debrief'];

export default (c) => html`
<section class="ouv ouv-init" id="debut" data-ouverture-page>
  <div class="conteneur ouv-init-grille">
    ${c.media({ nom: 'grok/initiation-ouverture', alt: c.s('initiation.ouverture.alt'), priorite: true, classe: 'ouv-init-media', cadrage: '50% 45%', sizes: '(max-width: 760px) 100vw, 40vw', attrs: 'data-fx="parallaxe" data-fx-force="8"' })}
    <div class="ouv-texte">
      <p class="surtitre" data-anime="gsap">${c.t('initiation.ouverture.surtitre')}</p>
      <h1 class="ouv-titre" data-iris-centre data-anime="gsap">${c.t('initiation.ouverture.titre1')} <em>${c.t('initiation.ouverture.titre2')}</em></h1>
      <p class="chapeau masque-ecran-bas" data-anime="gsap">${c.t('initiation.ouverture.texte')}</p>
      <p class="ouv-actions" data-anime="gsap">${c.lien('reserver', { ancre: 'reservation', params: 'formule=initiation', classe: 'bouton', texte: c.t('initiation.ouverture.action'), attrs: 'data-action-principale data-survol="magnetique"' })}</p>
      <p class="hero-info" data-info-cle data-anime="gsap"><span class="pastille" aria-hidden="true"></span>${c.t('initiation.ouverture.info')}</p>
    </div>
  </div>
</section>

<section class="journee" id="journee" data-effet="journee">
  <div class="conteneur">
    <h2 class="journee-titre" data-anime="lignes">${c.t('initiation.journee.titre')}</h2>
    <div class="journee-ligne" aria-hidden="true"><span></span></div>
    <ol class="journee-liste" data-anime="cascade">${JOURNEE.map((k) => html`<li><p class="journee-heure">${c.t(`initiation.journee.${k}`)}</p><p>${c.t(`initiation.journee.${k}Texte`)}</p></li>`)}</ol>
  </div>
</section>

<section class="formation" id="formation">
  <div class="conteneur formation-grille">
    <div>
      <p class="surtitre" data-anime>${c.t('initiation.formation.surtitre')}</p>
      <h2 class="titre-section" data-anime="lignes">${c.t('initiation.formation.titre1')} <em>${c.t('initiation.formation.titre2')}</em></h2>
      <p class="chapeau" data-anime>${c.t('initiation.formation.texte')}</p>
    </div>
    <div class="formation-photos">
      ${c.media({ nom: 'initiation-cours', alt: c.donnees.images['initiation-cours'].alt, classe: 'formation-a', sizes: '(max-width: 760px) 100vw, 40vw', attrs: 'data-anime="rideau"' })}
      ${c.media({ nom: 'initiation-maquette', alt: c.donnees.images['initiation-maquette'].alt, classe: 'formation-b', sizes: '(max-width: 760px) 50vw, 22vw', attrs: 'data-fx="parallaxe" data-fx-force="10"' })}
      ${c.media({ nom: 'initiation-groupe', alt: c.donnees.images['initiation-groupe'].alt, classe: 'formation-c', sizes: '(max-width: 760px) 50vw, 22vw', attrs: 'data-fx="zoom"' })}
    </div>
  </div>
</section>

<section class="saut" id="saut">
  <div class="conteneur saut-grille">
    ${c.media({ nom: 'grok/carte-initiation', alt: c.donnees.images['grok/carte-initiation'].alt, classe: 'saut-media', cadrage: '50% 35%', sizes: '(max-width: 760px) 100vw, 36vw', attrs: 'data-fx="zoom"' })}
    <div>
      <p class="surtitre surtitre--clair" data-anime>${c.t('initiation.saut.surtitre')}</p>
      <h2 class="titre-section" data-anime="lignes">${c.t('initiation.saut.titre')}</h2>
      <ul class="chiffres saut-chiffres" data-anime="cascade">
        <li><strong class="chiffre" data-compteur="1200">1 200</strong><span>${c.t('initiation.saut.altitude')}</span></li>
        <li><strong class="chiffre" data-compteur="3">3</strong><span>${c.t('initiation.saut.secondes')}</span></li>
        <li><strong class="chiffre saut-radio">${c.t('initiation.saut.radio')}</strong><span>${c.t('initiation.saut.radioTexte')}</span></li>
      </ul>
      <p class="saut-debrief" data-anime>${c.t('initiation.saut.debrief')}</p>
    </div>
  </div>
</section>

<section class="conditions" id="preparer">
  <div class="conteneur">
    <div class="tete-section">
      <p class="surtitre" data-anime>${c.t('initiation.preparer.surtitre')}</p>
      <h2 class="titre-section" data-anime="lignes">${c.t('initiation.preparer.titre')}</h2>
    </div>
    <div class="listes-grille listes-grille--2" data-anime="cascade">
      <article class="liste-carte"><h3>${c.t('initiation.preparer.conditionsTitre')}</h3><ul class="puces">${c.donnees.listes.conditionsInitiation.map((x) => html`<li>${x}</li>`)}</ul></article>
      <article class="liste-carte"><h3>${c.t('initiation.preparer.apporterTitre')}</h3><ul class="puces">${c.donnees.listes.apporter.map((x) => html`<li>${x}</li>`)}</ul></article>
    </div>
  </div>
</section>

<section class="apres" id="apres">
  <div class="conteneur apres-grille">
    ${c.media({ nom: 'progression-parc', alt: c.donnees.images['progression-parc'].alt, classe: 'apres-media', sizes: '(max-width: 760px) 100vw, 30vw', attrs: 'data-anime="rideau"' })}
    <div>
      <p class="surtitre" data-anime>${c.t('initiation.apres.surtitre')}</p>
      <h2 class="titre-section" data-anime="lignes">${c.t('initiation.apres.titre')}</h2>
      <p class="chapeau" data-anime>${c.t('initiation.apres.texte')}</p>
      <p data-anime>${c.lien('progression', { classe: 'bouton bouton--contour', texte: c.t('initiation.apres.lien') })}</p>
    </div>
  </div>
</section>

${appel(c, { reserver: { page: 'reserver', ancre: 'reservation', params: 'formule=initiation' } })}
`;
