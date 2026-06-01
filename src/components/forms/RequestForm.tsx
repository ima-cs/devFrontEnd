"use client";

import { useActionState } from "react";
import { createRequestAction, type FormState } from "@/actions/requests";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { CITIES } from "@/lib/constants";
import type { ProviderWithStats } from "@/types/database";

interface RequestFormProps {
  provider: ProviderWithStats;
  defaultCity?: string | null;
}

const INITIAL: FormState = { error: null, success: null };

export function RequestForm({ provider, defaultCity }: RequestFormProps) {
  const [state, formAction, pending] = useActionState(createRequestAction, INITIAL);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="provider_id" value={provider.id} />

      <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
        <p className="text-xs uppercase tracking-wider text-stone-500">Prestataire</p>
        <p className="mt-1 text-base font-semibold text-stone-900">
          {provider.professional_name}
        </p>
        <p className="text-xs text-stone-500">
          {provider.categories?.name ?? "Service"}
          {provider.city ? ` · ${provider.city}` : ""}
        </p>
      </div>

      <Input
        label="Type de service"
        name="service_type"
        defaultValue={provider.categories?.name ?? ""}
        placeholder="Ex : Plomberie, Électricité…"
      />

      <Textarea
        label="Description du besoin"
        name="description"
        rows={5}
        required
        placeholder="Décrivez précisément le problème, les travaux à réaliser, vos contraintes…"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Select
          label="Ville de l'intervention"
          name="city"
          defaultValue={defaultCity ?? provider.city ?? ""}
          placeholder="Sélectionnez la ville"
          options={CITIES.map((c) => ({ value: c, label: c }))}
        />
        <Input
          label="Date souhaitée"
          name="desired_date"
          type="date"
        />
      </div>

      {state.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <Button type="submit" size="lg" fullWidth disabled={pending}>
        {pending ? "Envoi…" : "Envoyer la demande"}
      </Button>
    </form>
  );
}
