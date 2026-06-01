// Auth de démonstration basée sur cookies — utilisée quand Supabase n'est pas
// configuré (.env.local manquant). Permet à un évaluateur d'inscrire un compte,
// se connecter et naviguer dans les espaces protégés sans aucune dépendance
// externe. NE PAS utiliser en production : les mots de passe sont stockés en
// clair dans le cookie utilisateurs.

import { cookies } from "next/headers";
import type { UserRole } from "@/types/database";

export const DEMO_SESSION_COOKIE = "sp_demo_session";
export const DEMO_USERS_COOKIE = "sp_demo_users";

export interface DemoSessionUser {
  id: string;
  profile_id: string;
  email: string;
  full_name: string;
  phone: string | null;
  city: string | null;
  role: UserRole;
  password: string;
  // Lien optionnel vers un prestataire des données démo (pour /provider/*)
  provider_id?: string | null;
}

// Comptes pré-enregistrés — toujours acceptés à la connexion.
export const DEMO_SEED_USERS: DemoSessionUser[] = [
  {
    id: "demo-admin",
    profile_id: "demo-admin",
    email: "admin@servicepro.com",
    full_name: "Admin ServicePro",
    phone: "+212 6 00 00 00 00",
    city: "Casablanca",
    role: "admin",
    password: "admin123",
  },
  {
    id: "demo-client",
    profile_id: "demo-client",
    email: "client@demo.com",
    full_name: "Mohamed Client",
    phone: "+212 6 11 22 33 44",
    city: "Casablanca",
    role: "client",
    password: "demo123",
  },
  {
    id: "demo-provider",
    profile_id: "demo-provider",
    email: "provider@demo.com",
    full_name: "Karim Plombier",
    phone: "+212 6 11 22 33 55",
    city: "Casablanca",
    role: "provider",
    password: "demo123",
    provider_id: "p-plomb-01",
  },
];

function encode(value: unknown): string {
  return encodeURIComponent(JSON.stringify(value));
}

function decode<T>(value: string | undefined): T | null {
  if (!value) return null;
  try {
    return JSON.parse(decodeURIComponent(value)) as T;
  } catch {
    return null;
  }
}

export async function getDemoSession(): Promise<DemoSessionUser | null> {
  const store = await cookies();
  return decode<DemoSessionUser>(store.get(DEMO_SESSION_COOKIE)?.value);
}

export async function setDemoSession(user: DemoSessionUser): Promise<void> {
  const store = await cookies();
  store.set(DEMO_SESSION_COOKIE, encode(user), {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearDemoSession(): Promise<void> {
  const store = await cookies();
  store.delete(DEMO_SESSION_COOKIE);
}

export async function getDemoUsers(): Promise<DemoSessionUser[]> {
  const store = await cookies();
  const registered = decode<DemoSessionUser[]>(store.get(DEMO_USERS_COOKIE)?.value) ?? [];
  // Les comptes pré-enregistrés priment sur les éventuels doublons.
  const seedEmails = new Set(DEMO_SEED_USERS.map((u) => u.email.toLowerCase()));
  const extra = registered.filter((u) => !seedEmails.has(u.email.toLowerCase()));
  return [...DEMO_SEED_USERS, ...extra];
}

export async function addDemoUser(user: DemoSessionUser): Promise<void> {
  const store = await cookies();
  const registered = decode<DemoSessionUser[]>(store.get(DEMO_USERS_COOKIE)?.value) ?? [];
  const filtered = registered.filter(
    (u) => u.email.toLowerCase() !== user.email.toLowerCase(),
  );
  // On garde uniquement les 10 derniers comptes pour ne pas dépasser la
  // taille maximum d'un cookie (~4 ko).
  const next = [...filtered, user].slice(-10);
  store.set(DEMO_USERS_COOKIE, encode(next), {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}

// Variante "request scoped" — utilisable depuis proxy.ts où on n'a pas accès
// à l'API `cookies()` de next/headers mais à `request.cookies`.
export function decodeDemoSession(rawCookie: string | undefined): DemoSessionUser | null {
  return decode<DemoSessionUser>(rawCookie);
}
