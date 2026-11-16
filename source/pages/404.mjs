/* Page 404 : posé hors zone. Une seule version (langue par défaut). */
import { html } from '../../outils/gabarit.mjs';
import { voile } from '../gabarits/blocs.mjs';

export const page = { cle: '404', fichier: '404', langues: ['fr'], partage: false };

export default (c) => html`
<section class="introuvable" id="debut">
  ${c.media({ nom: 'grok/appel-fond', alt: '', priorite: true, classe: 'introuvable-media', sizes: '100vw', attrs: 'data-fx="parallaxe" data-fx-force="8"' })}
  <div class="introuvable-texte conteneur">
    ${c.media({ nom: 'grok/page-404', alt: c.s('introuvable.alt'), classe: 'introuvable-carte', cadrage: '80% 50%', sizes: '(max-width: 760px) 60vw, 26vw', attrs: 'data-fx="zoom"' })}
    ${voile('introuvable-voile', 'data-iris-centre data-effet="voile"')}
    <h1 class="introuvable-titre" data-anime="lettres">${c.t('introuvable.titre')}</h1>
    <p data-anime>${c.t('introuvable.texte')}</p>
    <p data-anime>${c.lien('accueil', { classe: 'bouton', texte: c.t('introuvable.retour'), attrs: 'data-action-principale' })}</p>
    <p class="hero-info" data-info-cle>${c.t('commun.ouvert')}</p>
  </div>
</section>
`;
