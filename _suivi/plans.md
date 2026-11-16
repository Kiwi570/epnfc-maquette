# Plans v1 : ParaClub Montbéliard, direction « Porte ouverte »

Palette : fond ciel #F5F8FB · second fond #E3ECF4 · bleu nuit #0C1A2E (ouverture des pages sombres, appel final, pied, voile) · orange voile #FF5A1F (boutons, un mot par titre ; texte orange seulement en grand).
Typographies : Archivo Expanded (titres, 800-900) · Manrope (texte). Voile de transition : iris, bleu nuit, petite voile orange et nom de la page.

## Plan du site (v1)

| Page | Ouverture | Sections |
|---|---|---|
| Accueil | Plein cadre : la vue par la porte ouverte (Grok), cadre de porte qui s'élargit | Deux façons de sauter · Le tandem en 5 temps (trajectoire épinglée) · Le terrain en chiffres · La vie au club (galerie) · Progresser (frise des brevets) · Offrir un saut (bon cadeau) · Avant de venir (conditions, météo, manche à air) + 3 questions · Appel final |
| Tandem | Scindée : « 50 s » de chute en très grand, photo réelle du tandem au-dessus de Montbéliard à droite | Déroulé en 5 étapes (photos réelles) · Citation du posé · Option vidéo (caméraman HD, clé USB, GoPro interdite) · Conditions · Sécurité · Accompagnants · Appel |
| Initiation | Photo Grok de la porte à gauche, titre à droite, frise de la journée (8 h → débrief) dessous | La journée · Le saut (1 200 m, ouverture auto, radio) · À apporter · Conditions · Et après : brevet A · Appel |
| Progression | Grand titre puis bandeau photo VR8 qui s'ouvre | Brevets A et B · Spécialités B1 à B5 · C, D, BPA · Vol relatif · Freefly · Le matériel et le club pour progresser · Appel « Rejoindre le club » |
| Réserver | Plein cadre Grok (voile qui arrive sur la zone) + carte d'embarquement qui remonte | Réservation en 4 étapes (formule, date week-end/férié, vérifications, coordonnées → récap avec acompte 50 €) · Recevoir les tarifs par e-mail · Offrir (bon cadeau) · Acompte et annulation · FAQ complète |
| Contact | Numéro de téléphone en très grand + photo du véhicule du club | Adresse, accès et carte (Montbéliard, Belfort, Mulhouse 30 min, Colmar 45 min, Suisse) · Formulaire simulé · Réseaux · Nos amis |
| 404 | Manche à air au repos (Grok) | « Posé hors zone » + retour |

Pages non reprises en v1 (v2 possible) : Le club, La vie au club, Vol relatif, Freefly (résumées dans Progression), Vidéos, Nos amis (dans Contact).

## Plan d'animation

Intro de l'accueil (2,3 s) : 0 s bleu nuit, la petite voile orange et « ParaClub Montbéliard » au centre · 0,5 s le logo glisse vers la voile du ciel · 0,9 s le panneau s'ouvre en cercle depuis la voile ; on voit le ciel par le cadre sombre de la porte · 1,2 s la porte s'élargit et sort de l'écran (on sort de l'avion), la photo se resserre · 1,4-2 s « Sautez à » puis « 4 000 m » tombent mot par mot avec un rebond · 2-2,3 s texte, info clé et boutons montent ; la voile se balance.

Effets propres (data-effet) :
- `porte` : cadre de la porte qui s'élargit à l'intro puis s'efface au défilement.
- `voile` : petite voile dont les caissons se gonflent (ouverture, cartes, appel final).
- `trajectoire` : tracé en pointillés avion → sortie → chute → voile → cible, piloté par le défilement, étapes qui s'allument (épinglé sur ordinateur).
- `manche-a-air` : manche à air qui se gonfle et ondule selon la vitesse de défilement.
- `embarquement` : carte d'embarquement qui remonte à l'ouverture de Réserver.
- `chrono` : « 50 » qui défile à l'ouverture de Tandem.

Bibliothèque : lignes/mots sur les titres, cascade sur les cartes, compteurs des chiffres, galerie épinglée (vie au club, sans anticipatePin), parallaxe et zoom sur les photos, trace pour la frise des brevets et la journée d'initiation.
