"use client";

import { useActionState } from "react";
import { updateProfileAction, type FormState } from "@/actions/profile";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { CITIES } from "@/lib/constants";
import type { Profile } from "@/types/database";

interface ProfileFormProps {
  profile: Profile;
}

const INITIAL: FormState = { error: null, success: null };

export function ProfileForm({ profile }: ProfileFormProps) {
  const [state, formAction, pending] = useActionState(updateProfileAction, INITIAL);

  return (
    <form action={formAction} className="space-y-4">
      <Input
        label="Nom complet"
        name="full_name"
        defaultValue={profile.full_name}
        required
      />
      <Input
        label="Email"
        name="email"
        value={profile.email}
        readOnly
        disabled
        hint="L'adresse email ne peut pas être modifiée ici."
      />
      <Input
        label="Téléphone"
        name="phone"
        type="tel"
        defaultValue={profile.phone ?? ""}
        placeholder="+212 6 12 34 56 78"
      />
      <Select
        label="Ville"
        name="city"
        defaultValue={profile.city ?? ""}
        placeholder="Sélectionnez votre ville"
        options={CITIES.map((c) => ({ value: c, label: c }))}
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
