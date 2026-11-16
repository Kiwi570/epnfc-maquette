/* Contact : le numéro en très grand, la voiture du club, la carte d'accès schématique, le formulaire et les amis. */
import { html } from '../../outils/gabarit.mjs';
import { appel } from '../gabarits/blocs.mjs';

export const page = { cle: 'contact', fichier: 'contact', imagePartage: 'contact-ouverture-1280.webp' };

export default (c) => {
  const A = (k) => c.t(`contact.acces.${k}`);
  const F = (k) => c.t(`contact.formulaire.${k}`);
  const tel = c.site.contact.telephone;
  return html`
<section class="ouv ouv-contact" id="debut" data-ouverture-page>
  <div class="conteneur ouv-contact-grille">
    <div class="ouv-texte">
      <p class="surtitre" data-anime="gsap">${c.t('contact.ouverture.surtitre')}</p>
      <h1 class="ouv-titre ouv-contact-titre" data-anime="gsap">${c.t('contact.ouverture.titre')}</h1>
      <p class="numero-ligne" data-anime="gsap"><a class="numero" href="tel:${c.site.contact.telephoneLien}" data-effet="numero" data-iris-centre data-action-principale aria-label="${c.s('commun.appeler')} ${tel}">${[...tel].map((ch) => (ch === ' ' ? html`<span class="numero-espace"> </span>` : html`<span class="numero-c">${ch}</span>`))}</a></p>
      <p class="hero-info" data-info-cle data-anime="gsap"><span class="pastille" aria-hidden="true"></span>${c.t('contact.ouverture.info')}</p>
      <p class="chapeau masque-ecran-bas" data-anime="gsap">${c.t('contact.ouverture.texte')}</p>
      <p class="ouv-actions" data-anime="gsap"><a class="bouton bouton--clair" href="#formulaire">${c.t('contact.ouverture.ecrire')}</a> <a class="lien-fleche" href="mailto:${c.site.contact.email}">${c.site.contact.email}</a></p>
    </div>
    ${c.media({ nom: 'contact-ouverture', alt: c.s('contact.ouverture.alt'), priorite: true, classe: 'ouv-contact-media', cadrage: '57% 40%', sizes: '(max-width: 760px) 100vw, 45vw', attrs: 'data-fx="parallaxe" data-fx-force="8"' })}
  </div>
</section>

<section class="acces" id="acces">
  <div class="conteneur acces-grille">
    <div>
      <p class="surtitre surtitre--clair" data-anime>${A('surtitre')}</p>
      <h2 class="titre-section" data-anime="lignes">${A('titre')}</h2>
      <p class="chapeau" data-anime>${A('texte')}</p>
      <p class="acces-adresse" data-anime>${c.site.contact.adresse}</p>
    </div>
    <figure class="carte" data-effet="carte">
      <svg viewBox="0 0 600 420" role="img" aria-labelledby="carte-titre">
        <title id="carte-titre">${A('carteTitre')}</title>
        <path class="carte-frontiere" d="M110 420 C 200 360, 280 332, 360 324 C 430 316, 486 252, 532 200"/>
        <path class="carte-frontiere" d="M532 200 C 546 140, 550 70, 562 0"/>
        <path class="carte-route" pathLength="1" d="M300 230 C 312 210, 318 180, 320 140"/>
        <path class="carte-route" pathLength="1" d="M300 230 C 350 200, 400 150, 440 120"/>
        <path class="carte-route" pathLength="1" d="M440 120 C 446 90, 448 60, 450 30"/>
        <path class="carte-route" pathLength="1" d="M300 230 C 220 250, 140 280, 70 300"/>
        <circle class="carte-ville" cx="320" cy="140" r="6"/><text x="308" y="136" text-anchor="end">${A('belfort')}</text>
        <circle class="carte-ville" cx="440" cy="120" r="6"/><text x="420" y="104" text-anchor="end">${A('mulhouse')}</text>
        <circle class="carte-ville" cx="450" cy="30" r="6"/><text x="436" y="34" text-anchor="end">${A('colmar')}</text>
        <circle class="carte-ville" cx="70" cy="300" r="6"/><text x="70" y="326" text-anchor="middle">${A('besancon')}</text>
        <circle class="carte-ville" cx="332" cy="206" r="5"/><text x="344" y="210">${A('montbeliard')}</text>
        <text class="carte-pays" x="300" y="384">${A('suisse')}</text>
        <circle class="carte-pulse" cx="300" cy="230" r="10"/>
        <circle class="carte-aerodrome" cx="300" cy="230" r="11"/>
        <text class="carte-aero-txt" x="288" y="214" text-anchor="end">${A('aerodrome')}</text>
      </svg>
      <figcaption>${A('schema')}</figcaption>
    </figure>
  </div>
</section>

<section class="ecrire" id="formulaire">
  <div class="conteneur ecrire-grille">
    <div>
      <p class="surtitre" data-anime>${F('surtitre')}</p>
      <h2 class="titre-section" data-anime="lignes">${F('titre')}</h2>
      <p class="chapeau" data-anime>${c.t('contact.ouverture.texte')}</p>
    </div>
    <form class="ecrire-form" data-formulaire novalidate data-anime>
      <div class="champ"><label for="c-sujet">${F('sujet')}</label><select id="c-sujet" name="sujet">
        <option value="tandem">${F('sTandem')}</option><option value="initiation">${F('sInitiation')}</option><option value="progression">${F('sProgression')}</option><option value="cadeau">${F('sCadeau')}</option><option value="autre">${F('sAutre')}</option>
      </select></div>
      <div class="champs-2">
        <div class="champ"><label for="c-nom">${F('nom')}</label><input id="c-nom" name="nom" autocomplete="name" required></div>
        <div class="champ"><label for="c-email">${F('email')}</label><input id="c-email" name="email" type="email" autocomplete="email" required></div>
      </div>
      <div class="champ"><label for="c-tel">${F('telephone')}</label><input id="c-tel" name="telephone" type="tel" autocomplete="tel"></div>
      <div class="champ"><label for="c-message">${F('message')}</label><textarea id="c-message" name="message" rows="4" required></textarea></div>
      <p class="mention-donnees">${F('rgpd')} ${c.t('commun.confidentialite')}</p>
      <button type="submit" class="bouton">${F('envoyer')}</button>
      <p data-message-envoi hidden>${F('simule')}</p>
    </form>
  </div>
</section>

<section class="amis" id="amis">
  <div class="conteneur">
    <div class="tete-section">
      <p class="surtitre" data-anime>${c.t('contact.amis.surtitre')}</p>
      <h2 class="titre-section" data-anime="lignes">${c.t('contact.amis.titre')}</h2>
      <p class="chapeau" data-anime>${c.t('contact.amis.texte')}</p>
    </div>
    <ul class="amis-liste" data-anime="cascade">
      <li><a class="ami ami--reseau" href="${c.site.reseaux.facebook}" target="_blank" rel="noopener">${c.t('commun.facebook')}<span class="visuellement-cache"> ${c.t('commun.nouvelOnglet')}</span></a></li>
      <li><a class="ami ami--reseau" href="${c.site.reseaux.instagram}" target="_blank" rel="noopener">${c.t('commun.instagram')}<span class="visuellement-cache"> ${c.t('commun.nouvelOnglet')}</span></a></li>
      ${c.donnees.listes.amis.map((a) => html`<li><a class="ami" href="${a.url}" target="_blank" rel="noopener">${a.nom}<span class="visuellement-cache"> ${c.t('commun.nouvelOnglet')}</span></a></li>`)}
    </ul>
  </div>
</section>

${appel(c)}
`;
};
