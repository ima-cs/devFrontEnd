"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signInAction, type AuthState } from "@/actions/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface LoginFormProps {
  redirect?: string;
}

const INITIAL: AuthState = { error: null };

export function LoginForm({ redirect }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(signInAction, INITIAL);

  return (
    <form action={formAction} className="space-y-4">
      {redirect && <input type="hidden" name="redirect" value={redirect} />}

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
        autoComplete="current-password"
        placeholder="••••••••"
      />

      {state.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <Button type="submit" fullWidth size="lg" disabled={pending}>
        {pending ? "Connexion…" : "Se connecter"}
      </Button>

      <p className="text-center text-sm text-stone-600">
        Pas encore de compte ?{" "}
        <Link href="/register" className="font-medium text-purple-600 hover:underline">
          Créer un compte
        </Link>
      </p>
    </form>
  );
}
