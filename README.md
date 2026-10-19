# La Station Burger — site web

Site vitrine multipage de **La Station Burger** (41 rue de la Gare, 95170 Deuil-la-Barre) : burgers gourmets, steakhouse, burger vainqueur Île-de-France de la Coupe de France du Burger 2025.

> **Statut : proposition commerciale.** Le site n'est pas encore validé par le restaurant. Tant que `proposalMode` vaut `true` dans `src/data/site.ts`, un bandeau l'indique et l'indexation par les moteurs est bloquée. Les photos sont des illustrations provisoires (licence Unsplash), signalées sur chaque image.

## Démarrer

Prérequis : Node.js 22.22 ou plus.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # génère dist/
npm run preview    # sert dist/ en local
npm test           # tests unitaires (formulaire, cohérence de la carte et des horaires)
npm run check      # vérification TypeScript/Astro
npm run check:seo  # contrôle SEO statique de dist/ (après build)
```

Sous Windows avec une stratégie de contrôle d'applications qui bloque les binaires natifs non signés (erreur `4551`), installer le compilateur Astro en WebAssembly, localement uniquement :

```bash
npm i --no-save --force @astrojs/compiler-binding-wasm32-wasi@0.5.2
```

## Modifier le contenu

Tout le contenu éditable est dans `src/data/` :

| Fichier | Contenu |
|---|---|
| `site.ts` | Coordonnées, horaires, réseaux, plateformes de commande, distinction, mentions légales, `proposalMode` |
| `menu.ts` | Carte complète : catégories, produits, descriptions, prix seul / menu, étiquettes, mentions « à confirmer » |
| `images.ts` | Photos (texte alternatif, statut « illustration ») et ordre de la galerie |
| `nav.ts` | Menu de navigation |

- **Photos** : déposer les photos du restaurant dans `src/assets/photos/` sous le même nom (ex. `hero-burger.jpg`) puis passer `placeholder: false` dans `images.ts`. Elles sont converties en WebP et redimensionnées automatiquement.
- **Couleurs / typographies** : bloc `:root` de `src/styles/global.css`.
- **Logo / favicons / image Open Graph** : remplacer `src/assets/brand/logo-la-station.png` puis `node scripts/generate-assets.mjs`.

## Pages

| URL | Rôle |
|---|---|
| `/` | Accueil : accroche, engagements, burger primé, incontournables, univers, commande, infos |
| `/carte/` | Carte complète avec prix, navigation par catégorie, données structurées `Menu` |
| `/tissot-de-la-varenne/` | Burger primé : composition, histoire, palmarès sourcé, FAQ |
| `/notre-univers/` | Concept, cuisine, identité |
| `/galerie/` | Galerie avec visionneuse |
| `/infos-pratiques/` | Horaires (statut ouvert/fermé en direct), adresse, accès, carte, FAQ |
| `/commander/` | Livraison (Uber Eats, Deliveroo), à emporter, sur place |
| `/contact/` | Coordonnées + formulaire |
| `/mentions-legales/` | Mentions légales, données personnelles, crédits |
| `/llms.txt`, `/robots.txt`, `/sitemap-index.xml` | Fichiers pour moteurs et assistants IA |

## Formulaire de contact

Le formulaire envoie vers la fonction serverless `api/contact.js` (Vercel), qui utilise l'API **Resend** :

1. Créer un compte sur https://resend.com, vérifier le domaine d'envoi, créer une clé API.
2. Dans Vercel → projet → Settings → Environment Variables, ajouter :
   - `RESEND_API_KEY` : la clé API
   - `CONTACT_TO` : adresse qui reçoit les messages (ex. `sarl.amiburger@gmail.com`)
   - `CONTACT_FROM` : expéditeur vérifié (ex. `La Station Burger <contact@lastationburger.fr>`)
3. Redéployer.

Sans ces variables, le formulaire affiche un message invitant à appeler ou écrire par e-mail (réponse 503) : aucune donnée n'est perdue silencieusement. Protections : champ piège (honeypot), délai minimal de remplissage, limite de 5 envois / 10 min par IP, vérification d'origine, validation serveur, neutralisation des retours à la ligne dans les en-têtes.

## Commandes et réservations

- Livraison : liens officiels Uber Eats et Deliveroo (publiés sur le Linktree du restaurant).
- À emporter : par téléphone.
- Réservation : aucune réservation en ligne confirmée. Une entrée TheFork existe dans `site.ts` (`enabled: false`) ; l'activer seulement après confirmation du restaurant.
- Aucun paiement n'est traité par le site.

## Déploiement (Vercel)

Le dépôt GitHub est relié à Vercel : chaque `git push` sur `main` redéploie la production.

Variables utiles : `SITE_URL` (URL canonique, ex. `https://www.lastationburger.fr`), plus celles du formulaire.

### Brancher un nom de domaine

1. Acheter le domaine (ex. `lastationburger.fr`) chez un registrar (OVH, Gandi…) ou dans Vercel.
2. Vercel → projet → Settings → Domains → ajouter `lastationburger.fr` et `www.lastationburger.fr`.
3. Chez le registrar : enregistrement `A` de `@` vers `76.76.21.21`, et `CNAME` de `www` vers `cname.vercel-dns.com` (ou suivre les valeurs affichées par Vercel).
4. Définir `SITE_URL=https://www.lastationburger.fr` dans les variables d'environnement, redéployer.
5. Passer `proposalMode: false` dans `src/data/site.ts`, pousser, puis déclarer le sitemap dans Google Search Console et mettre l'URL du site sur la fiche Google Business Profile, Instagram, Facebook et le Linktree.

## Documentation

- `docs/SOURCES.md` : sources consultées et fiabilité de chaque information.
- `docs/A-CONFIRMER.md` : questions à valider avec le gérant.
