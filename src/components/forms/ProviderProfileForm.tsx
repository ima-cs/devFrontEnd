"use client";

import { useActionState } from "react";
import {
  updateProviderProfileAction,
  type FormState,
} from "@/actions/provider";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { CITIES } from "@/lib/constants";
import type { Category, Profile, Provider } from "@/types/database";

interface ProviderProfileFormProps {
  profile: Profile;
  provider: Provider;
  categories: Category[];
}

const INITIAL: FormState = { error: null, success: null };

export function ProviderProfileForm({
  profile,
  provider,
  categories,
}: ProviderProfileFormProps) {
  const [state, formAction, pending] = useActionState(
    updateProviderProfileAction,
    INITIAL,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Nom complet"
          name="full_name"
          required
          defaultValue={profile.full_name}
        />
        <Input
          label="Nom professionnel / Entreprise"
          name="professional_name"
          required
          defaultValue={provider.professional_name}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Select
          label="Catégorie"
          name="category_id"
          required
          defaultValue={provider.category_id ?? ""}
          placeholder="Choisissez votre métier"
          options={categories.map((c) => ({ value: c.id, label: c.name }))}
        />
        <Input
          label="Années d'expérience"
          name="experience_years"
          type="number"
          min={0}
          max={60}
          defaultValue={provider.experience_years}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Select
          label="Ville d'activité"
          name="city"
          defaultValue={provider.city ?? ""}
          placeholder="Sélectionnez une ville"
          options={CITIES.map((c) => ({ value: c, label: c }))}
        />
        <Input
          label="Téléphone"
          name="phone"
          type="tel"
          defaultValue={provider.phone ?? ""}
          placeholder="+212 6 12 34 56 78"
        />
      </div>

      <Textarea
        label="Description de l'activité"
        name="description"
        rows={5}
        defaultValue={provider.description ?? ""}
        placeholder="Décrivez vos services, vos spécialités, votre zone d'intervention…"
      />

      {state.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </div>
      )}
      {state.success && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          {state.success}
        </div>
      )}

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Enregistrement…" : "Enregistrer"}
      </Button>
    </form>
  );
}
