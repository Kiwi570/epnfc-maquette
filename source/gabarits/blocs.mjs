/* Blocs communs aux pages du projet : appel final, petite voile dessinée. */
import { html, brut } from '../../outils/gabarit.mjs';

/* Petite voile (parachute rectangulaire vu de face) : caissons qui se gonflent (effet « voile »). */
export const voile = (classe = '', attrs = '') => html`<svg class="voile-svg ${classe}" viewBox="0 0 200 150" aria-hidden="true" focusable="false"${brut(attrs ? ' ' + attrs : '')}>
  <g class="voile-caissons">
    <path class="voile-caisson" d="M14 52 Q30 34 50 27 L54 44 Q36 50 24 62 Z"/>
    <path class="voile-caisson voile-caisson--b" d="M50 27 Q75 19 100 18 L100 36 Q78 37 54 44 Z"/>
    <path class="voile-caisson" d="M100 18 Q125 19 150 27 L146 44 Q122 37 100 36 Z"/>
    <path class="voile-caisson voile-caisson--b" d="M150 27 Q170 34 186 52 L176 62 Q164 50 146 44 Z"/>
  </g>
  <g class="voile-suspentes" fill="none" stroke-width="1.4" stroke-linecap="round">
    <path d="M24 62 L100 122 M54 44 L100 122 M100 36 L100 122 M146 44 L100 122 M176 62 L100 122"/>
  </g>
  <g class="voile-pilote"><circle cx="100" cy="127" r="6"/><path d="M95 133 L100 146 L105 133 Z"/></g>
</svg>`;

/* Appel final de chaque page : fond de nuages (Grok), voile, deux actions. */
export const appel = (c, { reserver = { page: 'reserver', ancre: 'reservation', params: '' }, offrir = true } = {}) => html`
<section class="appel" id="appel">
  ${c.media({ nom: 'grok/appel-fond', alt: '', classe: 'appel-fond', sizes: '100vw', attrs: 'data-fx="parallaxe" data-fx-force="12"' })}
  <div class="appel-contenu conteneur">
    ${voile('appel-voile', 'data-effet="voile" data-grille="fil"')}
    <p class="surtitre surtitre--clair" data-anime>${c.t('commun.appel.surtitre')}</p>
    <h2 class="appel-titre" data-anime="lignes">${c.t('commun.appel.titre1')} <em>${c.t('commun.appel.titre2')}</em></h2>
    <p class="appel-texte" data-anime>${c.t('commun.appel.texte')}</p>
    <p class="appel-actions" data-anime>
      ${c.lien(reserver.page, { ancre: reserver.ancre, params: reserver.params, classe: 'bouton', texte: c.t('commun.appel.reserver'), attrs: 'data-survol="magnetique"' })}
      ${offrir ? c.lien('reserver', { ancre: 'reservation', params: 'formule=cadeau', classe: 'bouton bouton--clair', texte: c.t('commun.appel.offrir'), attrs: 'data-survol="magnetique"' }) : ''}
      <a class="appel-tel" href="tel:${c.site.contact.telephoneLien}">${c.site.contact.telephone}</a>
    </p>
  </div>
</section>`;
