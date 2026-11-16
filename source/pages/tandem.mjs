/* Tandem : ouverture scindée, « 50 s » en très grand à côté de la vraie photo du tandem au-dessus de Montbéliard. */
import { html } from '../../outils/gabarit.mjs';
import { appel } from '../gabarits/blocs.mjs';

export const page = { cle: 'tandem', fichier: 'tandem', imagePartage: 'tandem-ouverture-800.webp' };

const PHOTO = { 'tandem-cabine': 0, 'tandem-sortie': 1, 'tandem-voile': 2 };

export default (c) => html`
<section class="ouv ouv-tandem" id="debut" data-ouverture-page>
  <div class="conteneur ouv-tandem-grille">
    <div class="ouv-texte">
      <p class="surtitre" data-anime="gsap">${c.t('tandem.ouverture.surtitre')}</p>
      <h1 class="ouv-titre" data-anime="gsap">${c.t('tandem.ouverture.titre')}</h1>
      <p class="chrono" data-effet="chrono" data-iris-centre data-anime="gsap"><span class="chrono-chiffre"><span class="chrono-n chiffre">50</span><span class="chrono-u">${c.t('tandem.ouverture.chiffreUnite')}</span></span><span class="chrono-t">${c.t('tandem.ouverture.chiffreTexte')}</span></p>
      <p class="chapeau masque-ecran-bas" data-anime="gsap">${c.t('tandem.ouverture.texte')}</p>
      <p class="ouv-actions" data-anime="gsap">${c.lien('reserver', { ancre: 'reservation', params: 'formule=tandem', classe: 'bouton', texte: c.t('tandem.ouverture.action'), attrs: 'data-action-principale data-survol="magnetique"' })}</p>
      <p class="hero-info" data-info-cle data-anime="gsap"><span class="pastille" aria-hidden="true"></span>${c.t('tandem.ouverture.info')}</p>
    </div>
    ${c.media({ nom: 'tandem-ouverture', alt: c.s('tandem.ouverture.alt'), priorite: true, classe: 'ouv-tandem-media', cadrage: '46% 43%', sizes: '(max-width: 760px) 100vw, 42vw', attrs: 'data-fx="parallaxe" data-fx-force="8"' })}
  </div>
</section>

<section class="etapes" id="deroule" data-effet="etapes">
  <div class="conteneur">
    <div class="tete-section">
      <p class="surtitre" data-anime>${c.t('tandem.deroule.surtitre')}</p>
      <h2 class="titre-section" data-anime="lignes">${c.t('tandem.deroule.titre')}</h2>
      <p class="chapeau" data-anime>${c.t('tandem.deroule.texte')}</p>
    </div>
    <div class="etapes-grille">
      <ol class="etapes-liste">${c.donnees.etapes.map((e) => html`<li data-photo="${PHOTO[e.image]}">
        <p class="etape-num">${e.num} · ${e.lieu}</p>
        <h3>${e.titre}</h3>
        <p class="etapes-duree">${e.duree}</p>
        <p>${e.texte}</p>
      </li>`)}</ol>
      <div class="etapes-colonne">
        <div class="etapes-cadre">
          ${['tandem-cabine', 'tandem-sortie', 'tandem-voile'].map((n) => c.media({ nom: n, alt: c.donnees.images[n].alt, classe: 'etapes-photo', sizes: '(max-width: 760px) 100vw, 40vw' }))}
        </div>
      </div>
    </div>
  </div>
</section>

<section class="pose" id="pose">
  <div class="conteneur">
    <p class="pose-citation" data-anime="mots">${c.t('tandem.pose.citation')}</p>
    <p class="chapeau" data-anime>${c.t('tandem.pose.texte')}</p>
  </div>
</section>

<section class="video" id="video">
  <div class="conteneur video-grille">
    <div class="video-cadre" data-effet="rec">
      ${c.media({ nom: 'tandem-video', alt: c.donnees.images['tandem-video'].alt, classe: 'video-media', cadrage: '58% 50%', sizes: '(max-width: 760px) 100vw, 50vw', attrs: 'data-anime="rideau"' })}
      <span class="rec-coin rec-coin--hg" aria-hidden="true"></span><span class="rec-coin rec-coin--hd" aria-hidden="true"></span><span class="rec-coin rec-coin--bg" aria-hidden="true"></span><span class="rec-coin rec-coin--bd" aria-hidden="true"></span>
      <span class="rec" aria-hidden="true"><span class="rec-point"></span>${c.t('tandem.video.rec')}</span>
    </div>
    <div>
      <p class="surtitre" data-anime>${c.t('tandem.video.surtitre')}</p>
      <h2 class="titre-section" data-anime="lignes">${c.t('tandem.video.titre1')} <em>${c.t('tandem.video.titre2')}</em></h2>
      <p class="chapeau" data-anime>${c.t('tandem.video.texte')}</p>
      <p class="note" data-anime>${c.t('tandem.video.gopro')}</p>
      <p data-anime>${c.lien('reserver', { ancre: 'reservation', params: 'formule=video', classe: 'bouton', texte: c.t('tandem.video.action') })}</p>
    </div>
  </div>
</section>

<section class="conditions" id="conditions">
  <div class="conteneur">
    <div class="tete-section">
      <p class="surtitre" data-anime>${c.t('tandem.conditions.surtitre')}</p>
      <h2 class="titre-section" data-anime="lignes">${c.t('tandem.conditions.titre')}</h2>
    </div>
    <div class="listes-grille" data-anime="cascade">
      <article class="liste-carte"><h3>${c.t('tandem.conditions.conditionsTitre')}</h3><ul class="puces">${c.donnees.listes.conditionsTandem.map((x) => html`<li>${x}</li>`)}</ul></article>
      <article class="liste-carte liste-carte--nuit"><h3>${c.t('tandem.conditions.securiteTitre')}</h3><ul class="puces">${c.donnees.listes.securite.map((x) => html`<li>${x}</li>`)}</ul></article>
      <article class="liste-carte"><h3>${c.t('tandem.conditions.jourTitre')}</h3><ul class="puces">${c.donnees.listes.jourJ.map((x) => html`<li>${x}</li>`)}</ul></article>
    </div>
  </div>
</section>

${appel(c, { reserver: { page: 'reserver', ancre: 'reservation', params: 'formule=tandem' } })}
`;
