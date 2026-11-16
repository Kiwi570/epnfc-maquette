/* Réserver : plein cadre (Grok) avec la carte d'embarquement qui remonte, puis la réservation en quatre étapes,
   les tarifs par e-mail, l'acompte et la FAQ complète. Tout est simulé et le dit. */
import { html } from '../../outils/gabarit.mjs';
import { voile, appel } from '../gabarits/blocs.mjs';

export const page = { cle: 'reserver', fichier: 'reserver', imagePartage: 'grok/carte-initiation-784.webp' };

const FORMULES = [['tandem', 'fTandem'], ['video', 'fVideo'], ['initiation', 'fInitiation'], ['cadeau', 'fCadeau']];

export default (c) => {
  const F = (k) => c.t(`reserver.formulaire.${k}`);
  const O = (k) => c.t(`reserver.ouverture.${k}`);
  return html`
<section class="ouv ouv-resa" id="debut" data-ouverture-page>
  ${c.media({ nom: 'grok/reserver-ouverture', alt: c.s('reserver.ouverture.alt'), priorite: true, classe: 'ouv-resa-media', cadrage: '62% 28%', sizes: '100vw', attrs: 'data-fx="parallaxe" data-fx-force="8"' })}
  <div class="conteneur ouv-resa-grille">
    <div class="ouv-texte">
      <p class="surtitre" data-anime="gsap">${O('surtitre')}</p>
      <h1 class="ouv-titre" data-anime="gsap">${O('titre1')} <em>${O('titre2')}</em></h1>
      <p class="chapeau masque-ecran-bas" data-anime="gsap">${O('texte')}</p>
      <p class="ouv-actions" data-anime="gsap"><a class="bouton" href="#reservation" data-action-principale data-survol="magnetique">${O('action')}</a></p>
      <p class="hero-info" data-info-cle data-anime="gsap"><span class="pastille" aria-hidden="true"></span>${O('info')}</p>
    </div>
    <article class="embarquement" data-effet="embarquement" data-iris-centre aria-label="${c.s('reserver.ouverture.billetTitre')}">
      <div class="embarquement-tete"><img src="/assets/images/logo-clair.svg" alt="" width="36" height="36"><p>${O('billetTitre')}</p></div>
      <dl class="embarquement-infos">
        <div><dt>${O('billetVol')}</dt><dd>${O('billetVolValeur')}</dd></div>
        <div><dt>${O('billetJours')}</dt><dd>${O('billetJoursValeur')}</dd></div>
        <div><dt>${O('billetTandem')}</dt><dd>${O('billetTandemValeur')}</dd></div>
        <div><dt>${O('billetInitiation')}</dt><dd>${O('billetInitiationValeur')}</dd></div>
      </dl>
      <div class="embarquement-pied"><span class="code-barres" aria-hidden="true"></span>${voile('embarquement-voile')}</div>
    </article>
  </div>
</section>

<section class="resa" id="reservation">
  <div class="conteneur">
    <div class="tete-section">
      <p class="surtitre" data-anime>${F('surtitre')}</p>
      <h2 class="titre-section" data-anime="lignes">${F('titre')}</h2>
      <p class="chapeau" data-anime>${F('etapes')}</p>
    </div>
    <form class="resa-grille" data-formulaire novalidate>
      <div class="resa-principal">
        <ol class="resa-puces" aria-label="${c.s('reserver.formulaire.surtitre')}" data-anime="cascade">
          ${['e1', 'e2', 'e3', 'e4'].map((k, i) => html`<li class="resa-puce"><span>${i + 1}</span>${F(k)}</li>`)}
        </ol>
        <fieldset class="resa-etape">
          <legend>${F('formuleLegende')}</legend>
          <div class="resa-formules">${FORMULES.map(([v, k]) => html`<label class="formule"><input type="radio" name="formule" value="${v}" data-libelle="${c.s(`reserver.formulaire.${k}`)}"><span class="formule-nom">${F(k)}</span><span class="formule-detail">${F(k + 'Detail')}</span></label>`)}</div>
          <p class="resa-nav"><button type="button" class="bouton" data-resa="suivant">${F('suivant')}</button></p>
        </fieldset>
        <fieldset class="resa-etape" hidden>
          <legend>${F('dateLegende')}</legend>
          <p class="resa-aide">${F('dateAide')}</p>
          <p class="resa-aide resa-aide--cadeau">${F('dateCadeau')}</p>
          <div class="calendrier" data-calendrier data-ferie="${c.s('reserver.formulaire.ferie')}" data-aujourdhui="${c.s('reserver.formulaire.aujourdhui')}" data-cadeau="${c.s('reserver.formulaire.dateCadeau')}">
            <div class="cal-tete">
              <button type="button" class="cal-nav" data-cal="prec" aria-label="${c.s('reserver.formulaire.moisPrecedent')}">←</button>
              <p class="cal-mois" aria-live="polite"></p>
              <button type="button" class="cal-nav" data-cal="suiv" aria-label="${c.s('reserver.formulaire.moisSuivant')}">→</button>
            </div>
            <div class="cal-jours" aria-hidden="true"><span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span></div>
            <div class="cal-grille"></div>
            <ul class="cal-legende"><li><i class="l-ouvert"></i>${F('legendeOuvert')}</li><li><i class="l-ferie"></i>${F('legendeFerie')}</li><li><i class="l-auj"></i>${F('legendeAuj')}</li></ul>
            <p class="champ-erreur cal-erreur" hidden>${F('dateLegende')}</p>
          </div>
          <input type="hidden" name="date" value="">
          <p class="resa-nav"><button type="button" class="bouton bouton--contour" data-resa="precedent">${F('precedent')}</button><button type="button" class="bouton" data-resa="suivant">${F('suivant')}</button></p>
        </fieldset>
        <fieldset class="resa-etape resa-verif" hidden>
          <legend>${F('verifLegende')}</legend>
          <div class="champ champ--court"><label for="resa-personnes">${F('personnes')}</label><select id="resa-personnes" name="personnes">${[1, 2, 3, 4, 5, 6].map((n) => html`<option value="${n}">${n}</option>`)}</select></div>
          <label class="case"><input type="checkbox" name="v15"><span>${F('v15')}</span></label>
          <label class="case"><input type="checkbox" name="v90"><span>${F('v90')}</span></label>
          <label class="case"><input type="checkbox" name="vcertif"><span>${F('vCertif')}</span></label>
          <p class="champ-erreur verif-erreur" aria-live="polite" hidden>${F('verifErreur')}</p>
          <p class="resa-nav"><button type="button" class="bouton bouton--contour" data-resa="precedent">${F('precedent')}</button><button type="button" class="bouton" data-resa="suivant">${F('suivant')}</button></p>
        </fieldset>
        <fieldset class="resa-etape" hidden>
          <legend>${F('e4')}</legend>
          <div class="champ"><label for="resa-nom">${F('nom')}</label><input id="resa-nom" name="nom" autocomplete="name" required></div>
          <div class="champs-2">
            <div class="champ"><label for="resa-tel">${F('telephone')}</label><input id="resa-tel" name="telephone" type="tel" autocomplete="tel" required></div>
            <div class="champ"><label for="resa-email">${F('email')}</label><input id="resa-email" name="email" type="email" autocomplete="email" required></div>
          </div>
          <div class="champ"><label for="resa-message">${F('message')}</label><textarea id="resa-message" name="message" rows="3"></textarea></div>
          <p class="mention-donnees">${F('rgpd')} ${c.t('commun.confidentialite')}</p>
          <p class="resa-nav"><button type="button" class="bouton bouton--contour" data-resa="precedent">${F('precedent')}</button><button type="submit" class="bouton">${F('envoyer')}</button></p>
          <p data-message-envoi hidden>${F('simule')}</p>
        </fieldset>
      </div>
      <aside class="resa-recap" aria-live="polite">
        <p class="resa-recap-titre">${F('recapTitre')}</p>
        <dl>
          <div><dt>${F('recapFormule')}</dt><dd data-recap="formule">${F('recapVide')}</dd></div>
          <div><dt>${F('recapDate')}</dt><dd data-recap="date">${F('recapVide')}</dd></div>
          <div><dt>${F('recapPersonnes')}</dt><dd data-recap="personnes">1</dd></div>
          <div class="resa-recap-acompte"><dt>${F('recapAcompte')}</dt><dd data-recap="acompte" data-prix>50 €</dd></div>
        </dl>
        <p class="petit">${F('recapPaiement')}</p>
      </aside>
    </form>
  </div>
</section>

<section class="tarifs" id="tarifs">
  <div class="conteneur tarifs-grille">
    <div>
      <p class="surtitre surtitre--clair" data-anime>${c.t('reserver.tarifs.surtitre')}</p>
      <h2 class="titre-section" data-anime="lignes">${c.t('reserver.tarifs.titre')}</h2>
      <p class="chapeau" data-anime>${c.t('reserver.tarifs.texte')}</p>
    </div>
    <form class="tarifs-form" data-formulaire novalidate data-anime>
      <div class="champ"><label for="tarifs-email">${c.t('reserver.tarifs.email')}</label><input id="tarifs-email" name="email" type="email" autocomplete="email" required></div>
      <p class="mention-donnees">${c.t('reserver.formulaire.rgpd')} ${c.t('commun.confidentialite')}</p>
      <button type="submit" class="bouton">${c.t('reserver.tarifs.envoyer')}</button>
      <p data-message-envoi hidden>${c.t('reserver.tarifs.simule')}</p>
    </form>
  </div>
</section>

<section class="acompte" id="acompte">
  <div class="conteneur">
    <div class="tete-section">
      <p class="surtitre" data-anime>${c.t('reserver.acompte.surtitre')}</p>
      <h2 class="titre-section" data-anime="lignes">${c.t('reserver.acompte.titre')}</h2>
    </div>
    <div class="pratique-grille" data-anime="cascade">
      ${['a1', 'a2', 'a3', 'a4'].map((k, i) => html`<article class="pratique-carte${i === 0 ? ' pratique-carte--meteo' : ''}"><p class="pratique-num">0${i + 1}</p><h3>${c.t(`reserver.acompte.${k}Titre`)}</h3><p>${c.t(`reserver.acompte.${k}Texte`)}</p></article>`)}
    </div>
  </div>
</section>

<section class="faq" id="faq">
  <div class="conteneur faq-grille">
    <div class="faq-tete">
      <p class="surtitre" data-anime>${c.t('reserver.faq.surtitre')}</p>
      <h2 class="titre-section" data-anime="lignes">${c.t('reserver.faq.titre')}</h2>
      ${voile('faq-voile', 'data-effet="voile"')}
    </div>
    <div class="faq-liste" data-anime="cascade">${c.donnees.faq.map((f) => html`<details class="faq-item"><summary>${f.q}</summary><p>${f.r}</p></details>`)}</div>
  </div>
</section>

${appel(c)}
`;
};
