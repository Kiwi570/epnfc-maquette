/* Parcours propres au ParaClub Montbéliard : réservation en quatre étapes (formule, date un week-end ou un jour férié,
   vérifications, coordonnées), acompte recalculé, formule préremplie par l'adresse, jours passés non cliquables. */
export default async function ({ contexte, attendrePret, attendre, BASE, R, T }) {
  for (const taille of ['390×844', '1366×768']) {
    const { ctx, page } = await contexte({ taille: T(taille) });
    try {
      await page.goto(BASE + '/reserver?formule=initiation#reservation', { waitUntil: 'load' });
      await attendrePret(page);
      const pre = await page.evaluate(() => document.querySelector('input[name="formule"]:checked')?.value || '');
      if (pre !== 'initiation') R.echec('réservation', `formule non préremplie par l'adresse (${pre || 'aucune'})`, { page: '/reserver', taille });
      /* Étape 1 → 2. */
      await page.locator('.resa-etape:not([hidden]) [data-resa="suivant"]').click();
      await attendre(400);
      /* Aucun jour passé ni jour de semaine non férié n'est cliquable. */
      const mauvais = await page.evaluate(() => {
        const auj = new Intl.DateTimeFormat('fr-CA', { timeZone: 'Europe/Paris' }).format(new Date());
        return [...document.querySelectorAll('[data-date]')].filter((b) => b.dataset.date < auj).length;
      });
      if (mauvais) R.echec('réservation', `${mauvais} jour(s) passé(s) cliquable(s) dans le calendrier`, { page: '/reserver', taille });
      /* Sans date : on reste sur l'étape 2 avec un message. */
      await page.locator('.resa-etape:not([hidden]) [data-resa="suivant"]').click();
      await attendre(300);
      const bloque = await page.evaluate(() => !document.querySelector('.cal-erreur').hidden);
      if (!bloque) R.echec('réservation', 'on passe l’étape de la date sans choisir de jour', { page: '/reserver', taille });
      /* Choix d'un jour ouvert (mois suivant si besoin). */
      let jours = await page.locator('[data-date]').count();
      if (!jours) { await page.locator('[data-cal="suiv"]').click(); await attendre(200); jours = await page.locator('[data-date]').count(); }
      if (!jours) { R.echec('réservation', 'aucun jour de saut proposé', { page: '/reserver', taille }); continue; }
      await page.locator('[data-date]').first().click();
      await page.locator('.resa-etape:not([hidden]) [data-resa="suivant"]').click();
      await attendre(400);
      /* Étape 3 : 3 personnes → acompte de 150 €. */
      await page.selectOption('#resa-personnes', '3');
      await attendre(200);
      const acompte = await page.evaluate(() => document.querySelector('[data-recap="acompte"]').textContent.replace(/\s/g, ''));
      if (acompte !== '150€') R.echec('réservation', `acompte affiché ${acompte} au lieu de 150 € pour 3 personnes`, { page: '/reserver', taille });
      /* Sans les vérifications cochées : bloqué. */
      await page.locator('.resa-etape:not([hidden]) [data-resa="suivant"]').click();
      await attendre(300);
      if (await page.evaluate(() => document.querySelector('.verif-erreur').hidden)) R.echec('réservation', 'on passe les vérifications sans les cocher', { page: '/reserver', taille });
      for (const n of ['v15', 'v90', 'vcertif']) await page.check(`input[name="${n}"]`);
      await page.locator('.resa-etape:not([hidden]) [data-resa="suivant"]').click();
      await attendre(400);
      /* Étape 4 : envoi simulé, pas de double envoi. */
      await page.fill('#resa-nom', 'Camille Essai');
      await page.fill('#resa-tel', '06 12 34 56 78');
      await page.fill('#resa-email', 'camille@exemple.fr');
      const envoyer = page.locator('.resa-etape:not([hidden]) button[type="submit"]');
      await envoyer.click();
      await attendre(400);
      const fin = await page.evaluate(() => ({ msg: !document.querySelector('.resa [data-message-envoi]').hidden, bloque: document.querySelector('.resa-etape:not([hidden]) button[type="submit"]').disabled }));
      if (!fin.msg) R.echec('réservation', 'aucun message après l’envoi simulé', { page: '/reserver', taille });
      if (!fin.bloque) R.regarder('réservation', 'le bouton d’envoi reste actif après le premier clic', { page: '/reserver', taille });
    } catch (err) {
      R.echec('réservation', `parcours interrompu : ${err.message.split('\n')[0]}`, { page: '/reserver', taille });
    } finally { await ctx.close(); }
  }
}
