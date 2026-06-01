"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signUpClientAction, type AuthState } from "@/actions/auth";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { CITIES } from "@/lib/constants";

const INITIAL: AuthState = { error: null };

export function RegisterClientForm() {
  const [state, formAction, pending] = useActionState(signUpClientAction, INITIAL);

  return (
    <form action={formAction} className="space-y-4">
      <Input
        label="Nom complet"
        name="full_name"
        required
        placeholder="Mohamed Alami"
      />
      <Input
        label="Adresse email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="vous@exemple.com"
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
      <Input
        label="Téléphone"
        name="phone"
        type="tel"
        placeholder="+212 6 12 34 56 78"
      />
      <Select
        label="Ville"
        name="city"
        placeholder="Sélectionnez votre ville"
        options={CITIES.map((c) => ({ value: c, label: c }))}
      />

      {state.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <Button type="submit" fullWidth size="lg" disabled={pending}>
        {pending ? "Création du compte…" : "Créer mon compte client"}
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
