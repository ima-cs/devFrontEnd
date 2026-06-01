"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { CITIES } from "@/lib/constants";
import type { Category } from "@/types/database";

interface HomeSearchBarProps {
  categories: Category[];
}

export function HomeSearchBar({ categories }: HomeSearchBarProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (city) params.set("city", city);
    startTransition(() => {
      router.push(`/providers${params.toString() ? `?${params.toString()}` : ""}`);
    });
  };

  return (
    <form
      onSubmit={submit}
      className="mx-auto mt-8 grid w-full max-w-3xl gap-3 rounded-2xl border border-stone-200 bg-white p-3 shadow-xl shadow-purple-100/40 md:grid-cols-[1fr_1fr_auto] md:gap-2"
    >
      <label className="relative flex items-center md:col-span-2">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="absolute left-3 h-4 w-4 text-stone-400"
          aria-hidden
        >
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Quel service cherchez-vous ?"
          className="w-full rounded-xl border-0 bg-stone-50 py-3 pl-10 pr-3 text-sm text-stone-900 placeholder:text-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
        />
      </label>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="rounded-xl border-0 bg-stone-50 px-3 py-3 text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
      >
        <option value="">Toutes les catégories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="rounded-xl border-0 bg-stone-50 px-3 py-3 text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
      >
        <option value="">Toutes les villes</option>
        {CITIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <Button type="submit" size="lg" disabled={pending} className="md:col-start-3 md:row-start-1 md:row-span-2">
        {pending ? "Recherche…" : "Rechercher"}
      </Button>
    </form>
  );
}
