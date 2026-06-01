"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signUpProviderAction, type AuthState } from "@/actions/auth";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { CITIES } from "@/lib/constants";
import type { Category } from "@/types/database";

interface RegisterProviderFormProps {
  categories: Category[];
}

const INITIAL: AuthState = { error: null };

export function RegisterProviderForm({ categories }: RegisterProviderFormProps) {
  const [state, formAction, pending] = useActionState(signUpProviderAction, INITIAL);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Nom complet"
          name="full_name"
          required
          placeholder="Mohamed Alami"
        />
        <Input
          label="Nom professionnel / Entreprise"
          name="professional_name"
          required
          placeholder="Plomberie Alami"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Adresse email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="contact@entreprise.com"
        />
        <Input
          label="Mot de passe"
          name="password"
          type="password"
          required
          minLength={6}
          autoComplete="new-password"
          hint="6 caractères minimum"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Téléphone"
          name="phone"
          type="tel"
          required
          placeholder="+212 6 12 34 56 78"
        />
        <Select
          label="Ville d'activité"
          name="city"
          required
          placeholder="Sélectionnez une ville"
          options={CITIES.map((c) => ({ value: c, label: c }))}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Select
          label="Catégorie de service"
          name="category_id"
          required
          placeholder="Choisissez votre métier"
          options={categories.map((c) => ({ value: c.id, label: c.name }))}
        />
        <Input
          label="Années d'expérience"
          name="experience_years"
          type="number"
          min={0}
          max={60}
          defaultValue={0}
        />
      </div>

      <Textarea
        label="Description de votre activité"
        name="description"
        rows={4}
        placeholder="Décrivez vos services, vos spécialités, votre zone d'intervention…"
      />

      {state.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <Button type="submit" fullWidth size="lg" disabled={pending}>
        {pending ? "Création du compte…" : "Créer mon compte prestataire"}
      </Button>

      <p className="text-center text-sm text-stone-600">
        Déjà un compte ?{" "}
        <Link href="/login" className="font-medium text-purple-600 hover:underline">
          Se connecter
        </Link>
      </p>
    </form>
  );
}
