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
  x: number;
  y: number;
  labelDx?: number;
  labelDy?: number;
  anchor?: "start" | "end" | "middle";
}

// Carte du Royaume du Maroc, viewBox 0 0 400 600.
// Coordonnées géographiques converties : x = (17 + lon) * 25, y = (36 - lat) * 36.67
// Les villes sont placées sur leurs vraies coordonnées (lat/lon réelles).
const CITIES: CityPoint[] = [
  { name: "Tanger",     region: "Nord — Détroit de Gibraltar",   x: 280, y: 9,   labelDx: 12,  anchor: "start" },
  { name: "Oujda",      region: "Oriental",                       x: 377, y: 49,  labelDx: -8,  anchor: "end" },
  { name: "Rabat",      region: "Côte atlantique nord",           x: 254, y: 73,  labelDx: -12, anchor: "end" },
  { name: "Fès",        region: "Centre nord",                    x: 300, y: 72,  labelDx: 12,  anchor: "start" },
  { name: "Meknès",     region: "Centre nord",                    x: 286, y: 90,  labelDx: 14,  labelDy: 4,  anchor: "start" },
  { name: "Casablanca", region: "Côte atlantique",                x: 235, y: 89,  labelDx: -12, anchor: "end" },
  { name: "Marrakech",  region: "Centre",                         x: 225, y: 160, labelDx: 12,  anchor: "start" },
  { name: "Agadir",     region: "Sud-Ouest",                      x: 185, y: 205, labelDx: -12, anchor: "end" },
  { name: "Laâyoune",   region: "Sahara — Saguia el Hamra",       x: 95,  y: 325, labelDx: 12,  anchor: "start" },
  { name: "Dakhla",     region: "Sahara — Oued Ed-Dahab",         x: 28,  y: 451, labelDx: 14,  anchor: "start" },
];

// Contour du Royaume du Maroc, Sahara marocain inclus.
// Lignes droites uniquement, angles francs (style cartographique
// administratif) :
//   - Côte méditerranéenne avec un seul pic clair au Cap Trois Fourches
//   - Bulge marqué de Figuig sur la frontière algérienne
//   - Cassure nette à la transition Maroc proper / Sahara marocain
//   - Sahara marocain en parallélogramme aux côtés droits
//   - Base sud quasi-horizontale et pointe nette de Cap Blanc
//   - Côte atlantique en diagonale continue sans micro-courbes
// Sens horaire depuis Cap Spartel.
const MOROCCO_OUTLINE = `
M 278 8

L 282 10 L 290 13 L 298 17 L 308 22 L 320 25
L 332 27 L 343 22 L 350 18 L 358 22 L 365 28
L 371 33 L 376 38 L 378 50

L 378 80 L 377 115 L 379 135 L 392 145 L 396 152
L 392 160 L 388 168 L 384 178 L 380 188 L 378 198

L 374 215 L 364 235 L 348 258 L 327 280 L 300 295
L 268 308 L 235 315 L 220 320

L 218 345 L 213 375 L 205 405 L 192 435 L 175 462
L 158 478

L 130 480 L 100 482 L 70 485 L 40 492 L 18 502

L 5 514 L 2 510 L 4 498 L 10 488

L 18 472 L 24 455 L 28 451 L 32 438 L 38 420
L 45 398 L 53 375 L 62 352 L 72 330 L 82 312
L 90 295 L 97 278 L 103 263 L 112 250 L 125 240
L 140 230 L 158 222 L 172 215 L 182 205 L 185 192
L 182 178 L 180 162 L 184 145 L 192 128 L 200 112
L 210 100 L 220 93 L 232 89 L 240 84 L 248 76
L 254 68 L 259 58 L 263 45 L 267 32 L 271 20
L 275 12 L 278 8 Z
`.trim();

// Reliefs intérieurs : Atlas en diagonale NE→SW. Décoratif uniquement.
const ATLAS_HINT = `
M 295 50 L 320 75 L 345 95
M 240 115 L 245 150 L 230 185
M 215 195 L 180 240 L 130 305
`.trim();

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

      {/* MAP + LIST */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Carte SVG */}
          <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Carte
            </p>
            <h2 className="mt-1 text-base font-semibold text-stone-900">
              Royaume du Maroc — Sahara marocain inclus
            </h2>

            <svg
              viewBox="0 0 400 600"
              className="mt-4 h-auto w-full"
              role="img"
              aria-label="Carte du Maroc avec les villes desservies par ServicePro"
            >
              <defs>
                <linearGradient id="grad-morocco" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ede9fe" />
                  <stop offset="55%" stopColor="#e9d5ff" />
                  <stop offset="100%" stopColor="#fce7f3" />
                </linearGradient>
                <radialGradient id="grad-halo" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Pays */}
              <path
                d={MOROCCO_OUTLINE}
                fill="url(#grad-morocco)"
                stroke="#7c3aed"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />

              {/* Lignes de relief intérieur */}
              <path
                d={ATLAS_HINT}
                stroke="#c4b5fd"
                strokeWidth="0.8"
                strokeDasharray="3 3"
                fill="none"
              />

              {/* Étiquette Sahara marocain */}
              <text
                x="80"
                y="395"
                fontSize="9"
                fontWeight="600"
                fill="#7c3aed"
                opacity="0.55"
                letterSpacing="2"
              >
                SAHARA MAROCAIN
              </text>

              {/* Points des villes */}
              {CITIES.map((c) => {
                const count = countByCity[c.name] ?? 0;
                const isMajor = count >= 6;
                return (
                  <g key={c.name}>
                    <circle cx={c.x} cy={c.y} r={14} fill="url(#grad-halo)" />
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={isMajor ? 5.5 : 4}
                      fill="#a21caf"
                      stroke="#ffffff"
                      strokeWidth="1.8"
                    />
                    <text
                      x={c.x + (c.labelDx ?? 10)}
                      y={c.y + (c.labelDy ?? 4)}
                      fontSize="11"
                      fontWeight={isMajor ? 700 : 600}
                      textAnchor={c.anchor ?? "start"}
                      fill="#1f1029"
                    >
                      {c.name}
                    </text>
                    <text
                      x={c.x + (c.labelDx ?? 10)}
                      y={c.y + (c.labelDy ?? 4) + 11}
                      fontSize="9"
                      textAnchor={c.anchor ?? "start"}
                      fill="#6b7280"
                    >
                      {count} prestataire{count > 1 ? "s" : ""}
                    </text>
                  </g>
                );
              })}

              {/* Légende */}
              <g transform="translate(20, 580)">
                <circle cx="0" cy="0" r="5.5" fill="#a21caf" stroke="#ffffff" strokeWidth="1.8" />
                <text x="12" y="4" fontSize="10" fill="#52525b">
                  Forte présence
                </text>
                <circle cx="130" cy="0" r="4" fill="#a21caf" stroke="#ffffff" strokeWidth="1.8" />
                <text x="140" y="4" fontSize="10" fill="#52525b">
                  Ville desservie
                </text>
              </g>
            </svg>
          </div>

          {/* Liste des villes */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Présence territoriale
            </p>
            <h2 className="mt-1 text-base font-semibold text-stone-900">
              {CITIES.length} villes, du Nord au Sahara marocain
            </h2>

            <ul className="mt-4 space-y-2">
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

            <div className="mt-6 rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-rose-50 p-5">
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
          </div>
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
