"use client";

import { useActionState } from "react";
import {
  createCategoryAction,
  updateCategoryAction,
  type FormState,
} from "@/actions/admin";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import type { Category } from "@/types/database";

interface CategoryFormProps {
  existing?: Category;
  onDone?: () => void;
}

const INITIAL: FormState = { error: null, success: null };

export function CategoryForm({ existing }: CategoryFormProps) {
  const action = existing ? updateCategoryAction : createCategoryAction;
  const [state, formAction, pending] = useActionState(action, INITIAL);

  return (
    <form action={formAction} className="space-y-3">
      {existing && <input type="hidden" name="id" value={existing.id} />}

      <Input
        label="Nom de la catégorie"
        name="name"
        required
        defaultValue={existing?.name}
        placeholder="Ex : Plomberie"
      />
      <Textarea
        label="Description"
        name="description"
        rows={2}
        defaultValue={existing?.description ?? ""}
        placeholder="Description courte (optionnel)"
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

      <Button type="submit" size="sm" disabled={pending}>
        {pending ? "Enregistrement…" : existing ? "Mettre à jour" : "Ajouter la catégorie"}
      </Button>
    </form>
  );
}
