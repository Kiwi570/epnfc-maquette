# Maquette ParaClub Montbéliard (EPNFC)

Maquette de démonstration du futur site de l'École de Parachutisme Nord Franche-Comté (ParaClub Montbéliard), d'après le site actuel epnfc.fr.
Adresse de la maquette : https://epnfc-maquette.vercel.app

Direction « Porte ouverte » : fond ciel, bleu nuit, orange voile ; titres en Archivo Expanded, texte en Manrope.
Pages de la v1 : accueil, tandem, initiation, progression, réserver, contact, 404.

## Fiche à compléter par le club

À fournir avant la mise en ligne définitive :

- **Mentions légales** : à compléter (éditeur : association EPNFC, responsable de publication, numéro RNA ou SIRET).
- **Politique de confidentialité** : à compléter (formulaires de réservation, de tarifs et de contact).
- **Hébergeur** : Vercel Inc., siège à San Francisco (Californie, États-Unis). L'adresse postale varie selon les sources (340 Pine Street, San Francisco, CA 94104, ou 440 N Barranca Ave #4133, Covina, CA 91723) : la vérifier sur vercel.com au moment de la mise en ligne.
- **Logo officiel** : le site actuel n'en publie pas de fichier (on ne le voit qu'en petit sur l'image du bon cadeau). La maquette utilise un logo typographique provisoire (petite voile orange).
- **Assurances** : l'extrait du contrat d'assurance des sauts tandem et initiation (PDF du site actuel) à relier.
- **Certificat médical** : le formulaire PDF du site actuel à relier depuis la page Réserver.
- **Crédits des illustrations générées** : les images marquées « Illustration générée » ont été créées par IA (Grok). Garder la mention sur le site final.
- **Crédit photo** : la photo de précision d'atterrissage porte un filigrane « ©2012 Montfortis » : demander l'accord ou la retirer.

Retiré du site ou remplacé faute d'information :

- **Tarifs** (page Réserver) : non affichés, comme sur le site actuel (« club associatif »). Remplacés par une demande de tarifs par e-mail (simulée). Seul l'acompte de 50 € par formule, public sur le site actuel, est affiché.
- **Horaires** (toutes les pages) : seulement « samedis, dimanches et jours fériés ». Aucune heure ni statut « ouvert maintenant » tant que les horaires précis ne sont pas fournis.
- **Équipe et moniteurs** : aucune présentation (absente du site actuel). Une section équipe pourra être ajoutée avec les noms et photos fournis.
- **Validité des bons cadeaux** : non indiquée sur le site actuel, donc non affichée.
- **Avis clients** : aucun avis affiché (aucun sur le site actuel).

Incohérences relevées sur le site actuel : nom « Paraclub-Montbeliard » dans les métadonnées et « EPNFC » ailleurs ; adresse « Courcelles » ou « Courcelles-lès-Montbéliard » ; montée « 10 à 20 min » (page Tandem) et « environ 15 min » (page Le club) ; plusieurs grands titres par page ; textes alternatifs vides.

## À retirer ou garder à la mise en ligne définitive

- Retirer : la consigne `noindex` (balise robots dans `source/gabarits/commun.mjs`, en-tête X-Robots-Tag dans `vercel.json`) ; les formulaires et la réservation simulés (à relier au vrai traitement) ; les mentions « à compléter » du pied de page.
- Garder : la mention « Illustration générée » sur les images créées par IA.

## Travailler sur la maquette

- Textes : `donnees/textes/fr.json` ; données (étapes, brevets, FAQ, listes, photos du club) : `donnees/*.json`.
- Pages : `source/pages/*.mjs` ; style : `assets/css/site.css` ; effets : `assets/js/site.js`.
- Générer les pages : `node outils/generer.mjs` (ne jamais modifier les `.html` à la main).
- Audit : `node _audit/audit.mjs` (rapport dans `_audit/rapport/rapport.md`).
