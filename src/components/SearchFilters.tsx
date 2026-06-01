"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { CITIES } from "@/lib/constants";
import type { Category } from "@/types/database";

interface SearchFiltersProps {
  categories: Category[];
}

export function SearchFilters({ categories }: SearchFiltersProps) {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  const [search, setSearch] = useState(params.get("search") ?? "");
  const [city, setCity] = useState(params.get("city") ?? "");
  const [category, setCategory] = useState(params.get("category") ?? "");
  const [minRating, setMinRating] = useState(params.get("minRating") ?? "");
  const [premium, setPremium] = useState(params.get("premium") === "1");

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const next = new URLSearchParams();
    if (search) next.set("search", search);
    if (city) next.set("city", city);
    if (category) next.set("category", category);
    if (minRating) next.set("minRating", minRating);
    if (premium) next.set("premium", "1");
    startTransition(() => {
      router.push(`/providers${next.toString() ? `?${next.toString()}` : ""}`);
    });
  };

  const reset = () => {
    setSearch("");
    setCity("");
    setCategory("");
    setMinRating("");
    setPremium(false);
    startTransition(() => router.push("/providers"));
  };

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Input
          label="Recherche"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Nom, mot-clé…"
        />
        <Select
          label="Ville"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          options={[
            { value: "", label: "Toutes les villes" },
            ...CITIES.map((c) => ({ value: c, label: c })),
          ]}
        />
        <Select
          label="Catégorie"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={[
            { value: "", label: "Toutes les catégories" },
            ...categories.map((c) => ({ value: c.id, label: c.name })),
          ]}
        />
        <Select
          label="Note minimale"
          name="minRating"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
          options={[
            { value: "", label: "Toutes les notes" },
            { value: "5", label: "5 étoiles" },
            { value: "4", label: "4 étoiles et +" },
            { value: "3", label: "3 étoiles et +" },
          ]}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <label className="inline-flex items-center gap-2 text-sm text-stone-700">
          <input
            type="checkbox"
            checked={premium}
            onChange={(e) => setPremium(e.target.checked)}
            className="h-4 w-4 rounded border-stone-300 text-purple-600 focus:ring-purple-500"
          />
          Prestataires Premium uniquement
        </label>

        <div className="flex items-center gap-2">
          <Button type="button" variant="ghost" onClick={reset} disabled={pending}>
            Réinitialiser
          </Button>
          <Button type="submit" disabled={pending}>
            {pending ? "Recherche…" : "Filtrer"}
          </Button>
        </div>
      </div>
    </form>
  );
}
