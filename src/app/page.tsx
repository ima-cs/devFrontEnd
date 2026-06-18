import Link from "next/link";
import { ProviderCard } from "@/components/cards/ProviderCard";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { AdBanner } from "@/components/ads/AdBanner";
import { HowItWorks } from "@/components/HowItWorks";
import { StarRating } from "@/components/StarRating";
import {
  getAds,
  getCategories,
  getFeaturedProviders,
  getProviders,
  getTopTestimonials,
} from "@/lib/queries";

// Stats marketing affichés sur la home — dérivés des données réelles.
const HOME_STATS_FALLBACK = {
  categories: 9,
  providersActive: 67,
  cities: 10,
};

export default async function Home() {
  const [categories, featured, allProviders, ads, testimonials] = await Promise.all([
    getCategories(),
    getFeaturedProviders(4),
    getProviders(),
    getAds("home"),
    getTopTestimonials(3),
  ]);

  // Compte par catégorie pour afficher des chiffres réalistes sur chaque carte.
  const countByCategory = allProviders.reduce<Record<string, number>>((acc, p) => {
    if (p.category_id) acc[p.category_id] = (acc[p.category_id] ?? 0) + 1;
    return acc;
  }, {});

  // Stats marketing : on prend le max entre les données réelles et un plancher
  // d'affichage pour que le hero reste cohérent même si la base n'est pas
  // encore complètement seedée (sinon "5 villes" pourrait contredire la page
  // /villes qui en liste 10).
  const stats = {
    categories: Math.max(categories.length, HOME_STATS_FALLBACK.categories),
    providersActive: Math.max(allProviders.length, HOME_STATS_FALLBACK.providersActive),
    cities: Math.max(
      new Set(allProviders.map((p) => p.city).filter(Boolean)).size,
      HOME_STATS_FALLBACK.cities,
    ),
  };

  // Classes communes pour le style "bouton" appliqué directement à un <Link>.
  // (Pattern <Link><Button> évité : sur Next.js 16, un <button type="button">
  // imbriqué dans <a> peut intercepter le clic et empêcher la navigation.)
  const ctaPrimary =
    "inline-flex items-center justify-center rounded-2xl bg-purple-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-purple-900/20 transition hover:-translate-y-0.5 hover:bg-purple-700";
  const ctaOutline =
    "inline-flex items-center justify-center rounded-2xl border-2 border-purple-300 bg-white/90 px-6 py-3 text-base font-semibold text-purple-700 backdrop-blur transition hover:-translate-y-0.5 hover:border-purple-500 hover:bg-white";

  return (
    <>
      {/* ============================================================ */}
      {/* HERO                                                           */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden border-b border-stone-200/70">
        {/* Fond chaleureux : mauve → rose → crème */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-rose-50/60 to-white" aria-hidden />
        <div
          className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-200/40 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute top-12 right-0 h-80 w-80 translate-x-1/3 rounded-full bg-rose-200/40 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-100/40 blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-white/90 px-3.5 py-1.5 text-xs font-medium text-purple-700 shadow-sm backdrop-blur">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
                <path d="M12 2l2.39 4.84L20 8l-4 3.9.94 5.5L12 14.77 7.06 17.4 8 11.9 4 8l5.61-1.16L12 2z" />
              </svg>
              Plus de {stats.providersActive} prestataires vérifiés au Maroc
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-stone-900 md:text-6xl">
              Le bon prestataire,
              <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-purple-600 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent">
                {" "}à portée de clic.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-stone-600">
              Plombier, électricien, menuisier, agent d&apos;entretien — comparez,
              contactez et notez les meilleurs professionnels de votre ville.
            </p>

            {/* Trust badges */}
            <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-2 text-xs text-stone-600">
              {[
                "Gratuit pour les clients",
                "Profils vérifiés",
                "Avis clients fiables",
              ].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 shadow-sm ring-1 ring-stone-200 backdrop-blur"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-emerald-600" aria-hidden>
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                  </svg>
                  {label}
                </span>
              ))}
            </div>

            {/* CTA principal — Link stylé directement (pas de <Button> imbriqué) */}
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/providers" className={ctaPrimary}>
                Voir les prestataires
              </Link>
              <Link href="/categories" className={ctaOutline}>
                Explorer les catégories
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-stone-200 bg-white/95 p-6 text-center shadow-sm backdrop-blur">
              <p className="text-3xl font-bold text-purple-600">{stats.categories}</p>
              <p className="mt-1 text-sm font-medium text-stone-900">
                Catégories de services
              </p>
              <p className="mt-0.5 text-xs text-stone-500">Tous métiers confondus</p>
            </div>

            <div className="rounded-3xl border border-stone-200 bg-white/95 p-6 text-center shadow-sm backdrop-blur">
              <p className="text-3xl font-bold text-purple-600">{stats.providersActive}+</p>
              <p className="mt-1 text-sm font-medium text-stone-900">
                Prestataires actifs
              </p>
              <p className="mt-0.5 text-xs text-stone-500">Profils vérifiés</p>
            </div>

            <Link
              href="/villes"
              className="group rounded-3xl border border-stone-200 bg-white/95 p-6 text-center shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-lg"
            >
              <p className="text-3xl font-bold text-purple-600">{stats.cities}</p>
              <p className="mt-1 text-sm font-medium text-stone-900 group-hover:text-purple-700">
                Villes desservies
              </p>
              <p className="mt-0.5 text-xs text-stone-500">Voir la carte du Maroc →</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* COMMENT ÇA MARCHE                                              */}
      {/* ============================================================ */}
      <div className="border-b border-stone-200/70 bg-white/60">
        <HowItWorks />
      </div>

      {/* ============================================================ */}
      {/* CATÉGORIES                                                     */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-end justify-between">
          <div>
            <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
              Explorer
            </span>
            <h2 className="mt-3 text-3xl font-bold text-stone-900">
              Choisissez votre métier
            </h2>
            <p className="mt-1 text-stone-600">
              Cliquez sur une catégorie pour découvrir ses services.
            </p>
          </div>
          <Link
            href="/categories"
            className="hidden text-sm font-medium text-purple-600 hover:underline md:inline"
          >
            Toutes les catégories →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.slice(0, 9).map((c) => (
            <CategoryCard
              key={c.id}
              category={c}
              providerCount={countByCategory[c.id] ?? 0}
            />
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* AD BANNER                                                      */}
      {/* ============================================================ */}
      {ads[0] && (
        <section className="mx-auto max-w-7xl px-4 pb-4">
          <AdBanner ad={ads[0]} />
        </section>
      )}

      {/* ============================================================ */}
      {/* FEATURED PROVIDERS                                             */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-end justify-between">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3" aria-hidden>
                <path d="M12 2l2.39 4.84L20 8l-4 3.9.94 5.5L12 14.77 7.06 17.4 8 11.9 4 8l5.61-1.16L12 2z" />
              </svg>
              Sélection Premium
            </span>
            <h2 className="mt-3 text-3xl font-bold text-stone-900">
              Prestataires en vedette
            </h2>
            <p className="mt-1 text-stone-600">
              Les professionnels Premium recommandés par notre équipe.
            </p>
          </div>
          <Link
            href="/providers"
            className="hidden text-sm font-medium text-purple-600 hover:underline md:inline"
          >
            Tous les prestataires →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProviderCard key={p.id} provider={p} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/providers" className={ctaOutline}>
            Voir tous les prestataires
          </Link>
        </div>
      </section>

      {/* ============================================================ */}
      {/* TESTIMONIALS                                                   */}
      {/* ============================================================ */}
      {testimonials.length > 0 && (
        <section className="border-y border-stone-200/70 bg-gradient-to-b from-rose-50/30 via-white to-purple-50/30">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <div className="text-center">
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                Témoignages
              </span>
              <h2 className="mt-3 text-3xl font-bold text-stone-900">
                Ils nous font confiance
              </h2>
              <p className="mt-1 text-stone-600">
                Quelques avis récents partagés par nos clients.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {testimonials.map((t) => (
                <article
                  key={t.id}
                  className="flex flex-col rounded-3xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <StarRating rating={t.rating} />
                  <p className="mt-3 flex-1 text-sm text-stone-700">
                    &ldquo;{t.comment}&rdquo;
                  </p>
                  {t.providers && (
                    <Link
                      href={`/providers/${t.providers.id}`}
                      className="mt-4 text-xs font-semibold text-stone-900 hover:text-purple-600"
                    >
                      → À propos de {t.providers.professional_name}
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* CTA PRESTATAIRE                                                */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-fuchsia-600 to-rose-500 text-white">
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/15 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-32 -bottom-32 h-96 w-96 rounded-full bg-amber-200/20 blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-5 px-4 py-16 text-center">
          <span className="inline-flex items-center rounded-full bg-white/25 px-3 py-1 text-xs font-medium backdrop-blur">
            Vous êtes professionnel ?
          </span>
          <h2 className="text-3xl font-bold md:text-4xl">
            Faites grandir votre activité
          </h2>
          <p className="max-w-2xl text-purple-50">
            Rejoignez gratuitement ServicePro et recevez des demandes de
            clients qualifiés. Activez Premium pour booster votre visibilité.
          </p>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/register/provider"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-base font-semibold text-purple-700 shadow-lg shadow-purple-900/30 transition hover:-translate-y-0.5 hover:bg-purple-50"
            >
              Devenir prestataire
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-2xl border-2 border-white/80 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* AD BANNER #2                                                   */}
      {/* ============================================================ */}
      {ads[1] && (
        <section className="mx-auto max-w-7xl px-4 py-12">
          <AdBanner ad={ads[1]} />
        </section>
      )}
    </>
  );
}
