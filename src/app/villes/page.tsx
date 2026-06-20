import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getProviders } from "@/lib/queries";

export const metadata = {
  title: "Villes desservies — ServicePro",
  description:
    "ServicePro est présent dans 10 grandes villes à travers le Maroc, du Nord au Sud, incluant le Sahara marocain.",
};

interface CityPoint {
  name: string;
  region: string;
}

const CITIES: CityPoint[] = [
  { name: "Tanger",     region: "Nord — Détroit de Gibraltar" },
  { name: "Oujda",      region: "Oriental" },
  { name: "Rabat",      region: "Côte atlantique nord" },
  { name: "Fès",        region: "Centre nord" },
  { name: "Meknès",     region: "Centre nord" },
  { name: "Casablanca", region: "Côte atlantique" },
  { name: "Marrakech",  region: "Centre" },
  { name: "Agadir",     region: "Sud-Ouest" },
  { name: "Laâyoune",   region: "Sahara — Saguia el Hamra" },
  { name: "Dakhla",     region: "Sahara — Oued Ed-Dahab" },
];

export default async function VillesPage() {
  const providers = await getProviders();

  const countByCity = providers.reduce<Record<string, number>>((acc, p) => {
    if (p.city) acc[p.city] = (acc[p.city] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <>
      {/* HERO */}
      <section className="border-b border-stone-200/70 bg-gradient-to-b from-purple-50/80 via-rose-50/40 to-white">
        <div className="mx-auto max-w-5xl px-4 py-12 text-center">
          <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
            Notre présence
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
            Villes desservies au Maroc
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-stone-600">
            ServicePro est présent dans <strong>10 grandes villes</strong> à travers
            le Royaume du Maroc — du Nord au Sahara marocain. Trouvez un
            prestataire fiable près de chez vous.
          </p>
        </div>
      </section>

      {/* LIST */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Présence territoriale
            </p>
            <h2 className="mt-1 text-xl font-semibold text-stone-900">
              {CITIES.length} villes, du Nord au Sahara marocain
            </h2>
          </div>
        </div>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {CITIES.map((c, i) => {
            const count = countByCity[c.name] ?? 0;
            return (
              <li
                key={c.name}
                className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-3 transition hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-md"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-purple-100 to-rose-100 text-sm font-bold text-purple-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-stone-900">
                    {c.name}
                  </p>
                  <p className="text-xs text-stone-500">{c.region}</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-purple-700">
                  {count} prestataire{count > 1 ? "s" : ""}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-rose-50 p-5">
          <p className="text-sm font-semibold text-purple-900">
            Votre ville n&apos;est pas encore listée ?
          </p>
          <p className="mt-1 text-xs text-purple-800">
            Inscrivez-vous comme prestataire et faites grandir le réseau
            ServicePro dans votre région.
          </p>
          <Link href="/register/provider" className="mt-3 inline-block">
            <Button size="sm">Devenir prestataire</Button>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-stone-200/70 bg-gradient-to-b from-white to-rose-50/40">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-14 text-center">
          <h2 className="text-2xl font-bold text-stone-900">
            Trouvez un prestataire dans votre ville
          </h2>
          <p className="max-w-2xl text-stone-600">
            Filtrez les profils par ville et par métier pour trouver le
            professionnel qu&apos;il vous faut.
          </p>
          <Link
            href="/providers"
            className="inline-flex items-center justify-center rounded-2xl bg-purple-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-purple-900/20 transition hover:-translate-y-0.5 hover:bg-purple-700"
          >
            Voir les prestataires
          </Link>
        </div>
      </section>
    </>
  );
}
