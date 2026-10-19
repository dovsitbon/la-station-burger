# À valider avec le gérant de La Station

Avant mise en ligne officielle, faire confirmer ces points (modifications dans `src/data/`).

## Carte (`src/data/menu.ts`)
1. Nom exact du burger mozzarella panée / aubergines grillées / green sauce (affiché « Green »).
2. Nom exact du burger au cabillaud pané (affiché « Fish »).
3. Prix de la pièce du boucher (lu 18,90 €).
4. Menus midi : prix (lus 9,90 € et 7,90 €) et créneau horaire exact.
5. Prix des suppléments frites (cheddar, bacon, cheddar-bacon, chili con carne).
6. La carte 2025 est-elle toujours en vigueur (prix, produits, « Smash burger » vu sur Uber Eats mais absent de la carte) ?
7. Desserts du moment à mettre en avant ?

## Informations pratiques (`src/data/site.ts`)
8. Horaires du dimanche : 18h (Instagram) ou 18h30 (Le Bonbon) ? Fermetures exceptionnelles, jours fériés ?
9. Mention halal : souhaitée sur le site ? Pour quels produits ?
10. Réservation : TheFork est-il actif ? (activer `enabled: true` sur l'entrée `thefork`) Ou réservation par téléphone uniquement ?
11. Commande à emporter par téléphone : confirmée ?
12. Adresse e-mail à afficher et à utiliser pour le formulaire de contact.

## Légal (`site.legal`)
13. Raison sociale (SARL AMIBURGER ?), SIRET (884 458 076 00020 ?), siège, directeur de la publication.

## Contenus
14. Photos : fournir les photos des plats, de la salle et de l'équipe (ou autoriser la reprise des photos Instagram). Les déposer dans `src/assets/photos/` sous les mêmes noms, puis passer `placeholder: false` dans `src/data/images.ts`.
15. Validation des textes « Notre univers » (parcours de Tanesh Thanaratnam repris de la presse).
16. Nom de domaine souhaité (Facebook mentionne `lastationburger.fr`, actuellement non enregistré/inactif).

Une fois validé : passer `proposalMode` à `false` dans `src/data/site.ts` (retire le bandeau et autorise l'indexation Google).
