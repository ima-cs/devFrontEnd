# ServicePro

Plateforme web de **mise en relation entre clients et prestataires de services** au Maroc
(plombier, électricien, menuisier, agent d'entretien, climaticien, etc.).

Projet de fin de module couvrant **Développement Front-End**, **Gestion de projet** et **Entrepreneuriat**.

Réalisé par **Anas**, **Leila** et **Imane**.

---

## Stack technique

- **Next.js 16** (App Router, Turbopack)
- **TypeScript** — typage strict côté client et serveur
- **Tailwind CSS v4** — design utility-first, palette mauve/rose chaleureuse
- **Supabase** — authentification (`auth.users`) et base de données PostgreSQL avec **Row Level Security**
- **Server Actions** Next.js — toutes les mutations (signup, login, demandes, avis, admin)
- **Middleware (`proxy.ts`)** — protection des routes `/client`, `/provider`, `/admin` par rôle
- Aucun backend séparé : tout passe par les Server Actions et l'API Supabase.

---

## Fonctionnalités

### Visiteur (non connecté)
- Accueil : hero, 9 catégories de services, prestataires Premium en vedette, témoignages, bannières
- Liste publique `/providers` avec recherche + filtres (ville, catégorie, note minimale, Premium)
- Fiche détaillée d'un prestataire (`/providers/[id]`) avec description, expérience, avis
- Carte du Maroc `/villes` (Sahara marocain inclus, points par ville selon le nombre de prestataires)
- Page `/about` (équipe, mission, problème adressé)

### Client (rôle `client`)
- Inscription / connexion
- Dashboard `/client/dashboard` avec stats personnelles
- Envoi de demande de service à un prestataire (`/client/requests/new?provider=...`)
- Liste de ses demandes + suivi du statut (pending → accepted / rejected → completed)
- Dépose d'avis sur un prestataire (1–5 étoiles + commentaire)
- Modification de son profil

### Prestataire (rôle `provider`)
- Inscription avec nom commercial, catégorie, ville, années d'expérience, description
- Dashboard `/provider/dashboard` (demandes reçues, note moyenne, statut Premium)
- Réponse aux demandes : accepter, refuser, marquer comme terminée
- Lecture des avis reçus
- Passage Premium (`/provider/premium`)
- Modification de la fiche professionnelle

### Admin (rôle `admin`)
- Dashboard de statistiques globales (`/admin/dashboard`, `/admin/statistics`)
- Gestion des utilisateurs (`/admin/users`)
- Modération des prestataires : validation, suppression, toggle Premium (`/admin/providers`)
- Modération des avis (`/admin/reviews`)
- Gestion des catégories (`/admin/categories`)

---

## Installation locale

```bash
# 1. Cloner et installer
git clone https://github.com/ima-cs/devFrontEnd
cd devFrontEnd
npm install

# 2. Configurer les variables d'environnement
cp .env.local.example .env.local
# puis éditer .env.local (voir section Supabase ci-dessous)

# 3. Lancer le serveur de développement
npm run dev
# → http://localhost:3000
```

---

## Configuration Supabase

Créer un projet gratuit sur https://supabase.com, puis :

### 1. Exécuter le schéma

Dans **SQL Editor** Supabase, exécuter dans l'ordre :

1. `supabase/schema.sql` — crée les 6 tables (`profiles`, `categories`, `providers`, `service_requests`, `reviews`, `ads`), active **Row Level Security**, déclare les politiques d'accès, installe le trigger `on_auth_user_created` qui crée automatiquement le profil au signup.
2. `supabase/seed.sql` — insère les 9 catégories, 66 prestataires de démo répartis dans 10 villes, des avis et 3 bannières publicitaires. **Réexécutable** : nettoie les anciens enregistrements de démo (`user_id IS NULL`) avant de réinsérer, sans toucher aux comptes réels.

### 2. Désactiver la confirmation par email

Pour permettre une inscription instantanée (présentation/démo) :

**Authentication → Providers → Email → décocher « Confirm email » → Save**

### 3. Récupérer les clés API

**Project Settings → API** :
- `Project URL`
- `Project API keys → anon public` (ou la nouvelle `Publishable key` au format `sb_publishable_…`)

### 4. Remplir `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxxxxxxxxxxxxx
NEXT_PUBLIC_ADMIN_EMAIL=tonemail@exemple.com
```

L'utilisateur qui s'inscrit avec l'email correspondant à `NEXT_PUBLIC_ADMIN_EMAIL` reçoit automatiquement le rôle `admin`.

---

## Mode démo (sans Supabase)

Si `.env.local` est absent ou si les clés Supabase ne sont pas renseignées, **l'application bascule automatiquement en mode démo** :

- Les données métier (catégories, prestataires, avis) viennent de `src/lib/demo-data.ts` (66 prestataires factices)
- L'authentification utilise des **cookies** au lieu de Supabase Auth (`src/lib/demo-auth.ts`)
- Les comptes sont stockés dans le navigateur uniquement, 7 jours de durée de vie
- Trois comptes pré-enregistrés sont toujours disponibles :

  | Rôle | Email | Mot de passe |
  | --- | --- | --- |
  | Admin | `admin@servicepro.com` | `admin123` |
  | Client | `client@demo.com` | `demo123` |
  | Prestataire | `provider@demo.com` | `demo123` |

Pratique pour une démonstration hors-ligne ou pour qui veut tester sans configurer Supabase. **Le mode démo n'est pas adapté à la production** (mots de passe en clair dans le cookie, données non partagées entre navigateurs).

---

## Arborescence

```
src/
├── actions/          Server Actions (auth, profile, requests, reviews, provider, admin)
├── app/
│   ├── (public)      page.tsx (home), /providers, /categories, /villes, /about
│   ├── login/        Connexion
│   ├── register/     Inscription client / prestataire
│   ├── client/       Espace client (dashboard, demandes, avis, profil)
│   ├── provider/     Espace prestataire (dashboard, demandes, avis, profil, premium)
│   ├── admin/        Espace admin (dashboard, users, providers, reviews, categories, stats)
│   ├── auth/signout/ Route POST de déconnexion
│   ├── layout.tsx    Layout racine (Navbar + Footer)
│   └── globals.css   Tailwind + fond gradient
├── components/
│   ├── ui/           Button, Input, Select, Textarea, Badge (composants atomiques)
│   ├── cards/        ProviderCard, CategoryCard, ReviewCard, RequestCard, StatsCard
│   ├── forms/        Formulaires métier (Profile, Request, Review, etc.)
│   ├── layout/       Navbar, Footer, DashboardLayout, DashboardSidebar
│   ├── auth/         LoginForm, RegisterClientForm, RegisterProviderForm
│   ├── ads/AdBanner, CategoryIcon, HowItWorks, StarRating, PremiumBadge, ...
├── lib/
│   ├── supabase/     Clients server/browser + middleware
│   ├── auth.ts       getAuthContext, requireAuth, getProviderForCurrentUser
│   ├── demo-auth.ts  Fallback cookie-based
│   ├── demo-data.ts  66 prestataires + catégories + avis + pubs
│   ├── queries.ts    Toutes les lectures Supabase (fallback démo intégré)
│   ├── constants.ts  CITIES, ROLES, STATUS_LABELS, getAdminEmail
│   └── utils.ts      cn, formatDate, isSupabaseConfigured
├── types/database.ts Types TypeScript des tables Supabase
└── proxy.ts          Middleware Next.js 16 (protection des routes par rôle)

supabase/
├── schema.sql        Tables + RLS + trigger profil
└── seed.sql          Données de démo (66 prestataires + avis + pubs)
```

---

## Scripts npm

| Commande | Action |
| --- | --- |
| `npm run dev` | Serveur de dev avec Turbopack (http://localhost:3000) |
| `npm run build` | Build de production |
| `npm run start` | Lance le build de production |
| `npm run lint` | ESLint |

---

## Points d'attention pour la soutenance

- **Row Level Security activée** sur toutes les tables sensibles — démontrable dans Supabase Table Editor
- **Trigger PostgreSQL** `on_auth_user_created` qui synchronise `auth.users` ↔ `public.profiles`
- **Server Components** par défaut + `'use client'` ciblé pour les formulaires interactifs
- **`useActionState`** (React 19) pour la gestion d'erreur des formulaires sans hook personnalisé
- **Carte SVG du Maroc** dessinée à la main, avec le Sahara marocain et les coordonnées géographiques réelles des 10 villes
- **Mode démo** comme plan B en cas de panne réseau ou de problème Supabase pendant la démo

---

## Licence

Projet académique — usage pédagogique uniquement.
