"use client";

import { useActionState, useState } from "react";
import {
  createOrUpdateReviewAction,
  type FormState,
} from "@/actions/reviews";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Review } from "@/types/database";

interface ReviewFormProps {
  providerId: string;
  providerName: string;
  existing?: Review | null;
  compact?: boolean;
}

const INITIAL: FormState = { error: null, success: null };

export function ReviewForm({
  providerId,
  providerName,
  existing,
  compact,
}: ReviewFormProps) {
  const [state, formAction, pending] = useActionState(
    createOrUpdateReviewAction,
    INITIAL,
  );
  const [rating, setRating] = useState(existing?.rating ?? 5);

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="provider_id" value={providerId} />
      <input type="hidden" name="rating" value={rating} />

      {!compact && (
        <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs uppercase tracking-wider text-stone-500">
            Prestataire évalué
          </p>
          <p className="mt-1 text-base font-semibold text-stone-900">
            {providerName}
          </p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-stone-700">Votre note</label>
        <div className="mt-2 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              className="rounded p-1 transition hover:bg-stone-100"
              aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className={cn(
                  "h-6 w-6",
                  n <= rating ? "text-amber-400" : "text-stone-300",
                )}
              >
                <path d="M12 2l2.39 4.84L20 8l-4 3.9.94 5.5L12 14.77 7.06 17.4 8 11.9 4 8l5.61-1.16L12 2z" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <Textarea
        label="Commentaire (optionnel)"
        name="comment"
        rows={3}
        defaultValue={existing?.comment ?? ""}
        placeholder="Partagez votre expérience…"
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

      <Button type="submit" disabled={pending}>
        {pending ? "Enregistrement…" : existing ? "Mettre à jour l'avis" : "Publier l'avis"}
      </Button>
    </form>
  );
}
