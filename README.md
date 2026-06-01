# ServicePro

Plateforme web de **mise en relation entre clients et prestataires de services** au Maroc
(plombier, électricien, menuisier, agent d'entretien, etc.).

Projet de fin de module couvrant **Développement Front-End**, **Gestion de projet** et **Entrepreneuriat**.

---

## 🚀 Stack technique

- **Next.js 16** (App Router) — framework principal
- **TypeScript** — typage strict côté client et serveur
- **Tailwind CSS v4** — design system utility-first
- **Supabase** — authentification et base de données PostgreSQL
- **Server Actions** Next.js — toutes les mutations (signup, login, demandes, avis, admin)
- **Middleware (`proxy.ts`)** Next.js 16 — protection des routes par rôle
- **Vercel** — déploiement recommandé

> Le projet ne contient **aucun backend séparé** (Express, Laravel, Django…) : tout passe par les
> Server Actions Next.js et l'API Supabase.

---

## ✨ Fonctionnalités principales

### Visiteur non connecté
- Page d'accueil avec hero, catégories, prestataires premium en vedette, bannières publicitaires
- Liste publique des prestataires avec recherche et filtres (ville, catégorie, note minimale, premium)
- Profil détaillé d'un prestataire (description, expérience, contact, avis)
- Pages d'inscription (choix client / prestataire) et de connexion

### Client
- Tableau de bord (statistiques de ses demandes)
- Édition du profil
- Liste de ses demandes (filtrable par statut)
- Envoi d'une demande de service à un prestataire
- Publication, édition et suppression d'avis

### Prestataire
- Tableau de bord (KPI + note moyenne + statut premium)
- Édition du profil pro (catégorie, description, expérience, ville, téléphone)
- Demandes reçues avec actions **Accepter / Refuser / Marquer terminée**
- Avis reçus avec distribution par étoiles
- Activation **Premium simulée** (un clic — paiement non réel)

### Administrateur
- Tableau de bord global (4 KPI + répartition des demandes par statut)
- Liste des utilisateurs avec suppression
- Liste des prestataires avec **toggle validation**, **toggle premium**, suppression
- CRUD complet des catégories
- Modération des avis
- Page statistiques détaillées (taux de conversion, taux premium…)

---

## 👥 Rôles utilisateurs

| Rôle        | Accès                                                |
| ----------- | ---------------------------------------------------- |
| Visiteur    | Pages publiques (`/`, `/providers`, `/categories`)   |
| Client      | Espace public + `/client/*`                          |
| Prestataire | Espace public + `/provider/*`                        |
| Admin       | Tout, y compris `/admin/*`                           |

Le rôle est stocké dans la table `profiles` et synchronisé automatiquement à l'inscription
via un trigger Supabase (`handle_new_user`).

---

## 📦 Installation locale

### Prérequis
- Node.js **18.18+** ou **20+**
- npm
- Un projet Supabase (gratuit) → [supabase.com](https://supabase.com)

### 1) Cloner et installer

```bash
git clone <url-du-repo>
cd projet_dev_front_end
npm install
```

### 2) Variables d'environnement

Copie le fichier d'exemple et remplis tes clés Supabase :

```bash
cp .env.local.example .env.local
```

Édite `.env.local` :

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_ADMIN_EMAIL=admin@servicepro.com
```

> Tu trouves les clés dans **Supabase → Project Settings → API**.
> ⚠ Ne commit jamais `.env.local`.

### 3) Configurer Supabase

Dans le **SQL Editor** de Supabase, exécute dans l'ordre :

1. `supabase/schema.sql` — crée les 6 tables, les politiques RLS et le trigger d'auto-création de profil
2. `supabase/seed.sql` — insère 9 catégories, 9 prestataires de démo, 11 avis, 3 publicités

Puis dans **Authentication → Providers → Email** :
- ✅ Active **Enable email signups**
- ❌ Désactive **Confirm email** (pour la démo, sinon il faut confirmer chaque inscription)

### 4) Créer le compte administrateur

Inscris-toi sur `/register/client` avec l'email défini dans `NEXT_PUBLIC_ADMIN_EMAIL`.
Le trigger te donnera automatiquement le rôle `admin` et tu seras redirigé vers `/admin/dashboard`.

### 5) Lancer le serveur de développement

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

---

## 🚢 Déploiement sur Vercel

1. Pousse le code sur GitHub
2. Sur [vercel.com/new](https://vercel.com/new), importe le repo
3. Dans **Environment Variables**, ajoute les mêmes clés que `.env.local` :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_ADMIN_EMAIL`
4. Clique **Deploy** — Vercel détecte Next.js automatiquement

> ℹ Si tu déploies sur un domaine custom, ajoute-le dans Supabase →
> Authentication → URL Configuration → Site URL & Redirect URLs.

---

## 🗂 Structure du projet

```
.
├── src/
│   ├── app/                       Routes Next.js (App Router)
│   │   ├── page.tsx               Accueil
│   │   ├── login/                 Connexion
│   │   ├── register/              Inscription (choix + client + prestataire)
│   │   ├── providers/             Liste publique + détail prestataire
│   │   ├── categories/            Page des catégories
│   │   ├── client/                Espace client (dashboard, profil, demandes, avis)
│   │   ├── provider/              Espace prestataire (dashboard, profil, demandes, avis, premium)
│   │   ├── admin/                 Dashboard admin (users, providers, categories, reviews, statistics)
│   │   └── auth/signout/route.ts  Route POST de déconnexion
│   ├── actions/                   Server Actions
│   │   ├── auth.ts                signIn, signUp, signOut
│   │   ├── profile.ts             updateProfile
│   │   ├── requests.ts            createRequest, updateRequestStatus
│   │   ├── reviews.ts             createOrUpdateReview, deleteReview
│   │   ├── provider.ts            updateProviderProfile, togglePremium
│   │   └── admin.ts               toutes les actions admin
│   ├── components/
│   │   ├── ui/                    Button, Input, Textarea, Select, Badge
│   │   ├── cards/                 ProviderCard, CategoryCard, ReviewCard, RequestCard, StatsCard
│   │   ├── forms/                 ProfileForm, RequestForm, ReviewForm, ProviderProfileForm, CategoryForm
│   │   ├── auth/                  LoginForm, RegisterClientForm, RegisterProviderForm
│   │   ├── layout/                Navbar, Footer, DashboardLayout, DashboardSidebar
│   │   ├── ads/AdBanner.tsx
│   │   ├── PremiumBadge.tsx
│   │   ├── SearchFilters.tsx
│   │   └── StarRating.tsx
│   ├── lib/
│   │   ├── supabase/              Clients browser, server, middleware
│   │   ├── auth.ts                Helpers serveur (requireAuth, getAuthContext)
│   │   ├── queries.ts             Toutes les requêtes (avec fallback démo)
│   │   ├── demo-data.ts           Données de démo (si Supabase non configuré)
│   │   ├── constants.ts           Constantes (villes, statuts…)
│   │   └── utils.ts               cn(), formatDate(), etc.
│   ├── types/database.ts          Types TypeScript du schéma
│   └── proxy.ts                   Middleware Next.js 16 (protection par rôle)
├── supabase/
│   ├── schema.sql                 Schéma SQL + RLS + trigger
│   └── seed.sql                   Données de démonstration
├── public/                        Assets statiques
├── .env.local.example             Modèle de variables d'environnement
└── package.json
```

---

## 💰 Modèle économique (entrepreneuriat)

L'application met en avant **deux sources de revenus** dans son UI :

1. **Abonnement Premium prestataire** — 99 DH / mois (paiement simulé)
   - Badge Premium visible
   - Apparition prioritaire dans les résultats
   - Mise en avant sur la page d'accueil

2. **Publicité** — bannières statiques sur la home et la page de liste
   - Stockées dans la table `ads`, gérées par l'admin
   - Ciblage par position (`home`, `providers`)

---

## 🗒 Backlog Taiga proposé

User stories à importer dans Taiga (Sprint 0) :

### Visiteur
- En tant que visiteur, je veux consulter la page d'accueil afin de comprendre le service.
- En tant que visiteur, je veux parcourir la liste des prestataires afin d'évaluer l'offre.
- En tant que visiteur, je veux filtrer les prestataires par ville et catégorie afin de trouver rapidement.

### Client
- En tant que client, je veux créer un compte client afin d'envoyer des demandes.
- En tant que client, je veux rechercher un prestataire afin de trouver le bon métier.
- En tant que client, je veux consulter le profil détaillé d'un prestataire afin de vérifier sa qualité.
- En tant que client, je veux envoyer une demande de service afin d'être contacté.
- En tant que client, je veux suivre le statut de mes demandes afin d'être informé.
- En tant que client, je veux laisser un avis afin d'évaluer un prestataire.
- En tant que client, je veux modifier mon profil afin de garder mes informations à jour.

### Prestataire
- En tant que prestataire, je veux créer un compte pro afin d'apparaître dans la plateforme.
- En tant que prestataire, je veux gérer mon profil afin de présenter mes services.
- En tant que prestataire, je veux consulter les demandes reçues afin de répondre aux clients.
- En tant que prestataire, je veux accepter ou refuser une demande afin de gérer mon planning.
- En tant que prestataire, je veux consulter mes avis afin d'évaluer ma performance.
- En tant que prestataire, je veux activer un abonnement Premium afin d'avoir plus de visibilité.

### Administrateur
- En tant qu'admin, je veux consulter la liste des utilisateurs afin de modérer la plateforme.
- En tant qu'admin, je veux valider un prestataire afin de garantir la qualité.
- En tant qu'admin, je veux gérer les catégories afin d'organiser les services.
- En tant qu'admin, je veux supprimer un avis afin de modérer le contenu inapproprié.
- En tant qu'admin, je veux consulter les statistiques afin de suivre l'activité.

---

## 👨‍👩‍👧 Répartition possible des tâches (groupe de 3)

| Membre   | Périmètre                                                                                  |
| -------- | ------------------------------------------------------------------------------------------ |
| Dev 1    | Pages publiques + auth (`/`, `/login`, `/register/*`, `/providers/*`, `/categories`)       |
| Dev 2    | Espace client + prestataire (`/client/*`, `/provider/*`) + Server Actions associées        |
| Dev 3    | Dashboard admin + base de données + déploiement (`/admin/*`, `supabase/`, Vercel)          |

Composants UI réutilisables (`src/components/ui`, `cards`, `layout`) à se partager au démarrage.

---

## 📸 Captures d'écran

À ajouter avant la soutenance :

- `screenshots/home.png` — Page d'accueil
- `screenshots/providers-list.png` — Liste filtrable
- `screenshots/provider-detail.png` — Profil prestataire
- `screenshots/client-dashboard.png` — Dashboard client
- `screenshots/provider-dashboard.png` — Dashboard prestataire
- `screenshots/admin-stats.png` — Statistiques admin
- `screenshots/premium.png` — Page d'activation Premium

---

## 🧪 Scripts npm

```bash
npm run dev       # Démarre le serveur de développement (http://localhost:3000)
npm run build     # Build de production
npm run start     # Lance le build de production
npm run lint      # Vérifie la qualité du code
```

---

## ✅ Limitations connues (assumées pour la démo)

- **Paiement Premium simulé** : un clic suffit à basculer `is_premium`, aucune intégration Stripe.
- **Suppression d'utilisateur** : l'admin supprime la ligne `profiles` mais pas la ligne `auth.users`
  (qui nécessite la clé `service_role`, non exposable côté client).
- **Pas de chat temps réel ni de notifications SMS/email** : la communication se fait via les
  coordonnées affichées sur la fiche prestataire.
- **Fallback données de démo** : si Supabase n'est pas configuré, les pages publiques s'affichent
  avec 9 prestataires fictifs (utile pour démo locale rapide ou screenshots).

---

## 📚 Ressources

- Next.js : <https://nextjs.org/docs>
- Supabase : <https://supabase.com/docs>
- Tailwind CSS v4 : <https://tailwindcss.com/docs>
