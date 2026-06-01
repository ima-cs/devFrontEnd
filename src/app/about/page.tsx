import Link from "next/link";

export const metadata = {
  title: "À propos — ServicePro",
  description:
    "ServicePro est une plateforme imaginée par Anas, Leila et Imane pour faciliter la mise en relation entre clients et prestataires de services au Maroc.",
};

const ADVANTAGES = [
  {
    title: "Centralisation",
    desc: "Tous les prestataires de confiance regroupés sur une seule plateforme.",
  },
  {
    title: "Transparence",
    desc: "Notes, avis et recommandations visibles avant tout contact.",
  },
  {
    title: "Rapidité",
    desc: "Trouvez un professionnel disponible en quelques clics, sans appeler vingt numéros.",
  },
  {
    title: "Comparaison facile",
    desc: "Comparez plusieurs profils, leurs services et leurs prix au même endroit.",
  },
  {
    title: "Sécurité",
    desc: "Profils vérifiés, contacts authentifiés, modération des avis par notre équipe.",
  },
  {
    title: "Gratuit pour les clients",
    desc: "Aucun frais d'inscription ni de mise en relation. Notre revenu vient des prestataires Premium.",
  },
];

const PROBLEMS = [
  "Difficulté à trouver rapidement un bon prestataire",
  "Manque de confiance",
  "Absence d'avis ou de recommandations fiables",
  "Perte de temps",
  "Difficulté à comparer plusieurs profils",
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-stone-200/70 bg-gradient-to-b from-purple-50 via-rose-50/40 to-white">
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-96 w-[120%] -translate-x-1/2 rounded-full bg-purple-200/30 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-5xl px-4 py-16 md:py-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
            À propos de{" "}
            <span className="bg-gradient-to-r from-purple-600 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent">
              ServicePro
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600">
            ServicePro est une plateforme conçue par <strong>Anas</strong>,{" "}
            <strong>Leila</strong> et <strong>Imane</strong>, trois étudiants
            qui ont voulu apporter une solution concrète à un problème du
            quotidien : trouver un prestataire de confiance au Maroc.
          </p>
        </div>
      </section>

      {/* IDÉE GÉNÉRALE */}
      <section className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <div className="grid gap-10 lg:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-purple-600">
                Idée
              </p>
              <h2 className="mt-2 text-2xl font-bold text-stone-900">
                L&apos;idée générale
              </h2>
            </div>
            <div className="lg:col-span-2 text-stone-700">
              <p>
                ServicePro est une plateforme web qui met en relation les{" "}
                <strong>clients</strong> avec des{" "}
                <strong>prestataires de services</strong> : maçon, carreleur,
                menuisier, serrurier, vitrier, couvreur, technicien
                climatisation, réparateur électroménager, installateur
                internet/fibre, agent d&apos;entretien, aide à domicile,
                laveur de vitres, nettoyeur de tapis et canapés, etc.
              </p>
              <p className="mt-4">
                L&apos;objectif est de permettre aux clients de trouver
                facilement un prestataire fiable, au lieu de chercher des
                contacts aléatoirement. La plateforme regroupe les profils
                des prestataires, leurs services, leurs villes, leurs notes,
                leurs recommandations et leurs coordonnées.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLÈME */}
      <section className="border-t border-stone-200 bg-stone-50">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <div className="grid gap-10 lg:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-red-600">
                Problème
              </p>
              <h2 className="mt-2 text-2xl font-bold text-stone-900">
                Pourquoi c&apos;est compliqué aujourd&apos;hui
              </h2>
            </div>
            <div className="lg:col-span-2">
              <p className="text-stone-700">
                Aujourd&apos;hui, lorsqu&apos;une personne cherche un artisan
                ou un prestataire de service, elle se base souvent sur des
                contacts personnels, des recommandations informelles, des
                recherches sur les réseaux sociaux ou même des numéros trouvés
                au hasard.
              </p>

              <p className="mt-3 text-stone-700">Cela pose plusieurs problèmes :</p>

              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {PROBLEMS.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2 rounded-lg border border-red-100 bg-white p-3 text-sm text-stone-800"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mt-0.5 h-4 w-4 shrink-0 text-red-500"
                      aria-hidden
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="border-t border-stone-200 bg-gradient-to-b from-emerald-50 to-white">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <div className="grid gap-10 lg:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-emerald-600">
                Solution
              </p>
              <h2 className="mt-2 text-2xl font-bold text-stone-900">
                Notre réponse
              </h2>
            </div>
            <div className="lg:col-span-2 text-stone-700">
              <p>
                La solution est une application web qui centralise les profils
                des prestataires de services. Le client peut rechercher un
                prestataire selon le métier, la ville ou la note, consulter
                son profil, lire les avis, puis le contacter ou lui envoyer
                une demande de service.
              </p>
              <p className="mt-4">
                De son côté, le prestataire peut créer un compte, présenter
                ses services et recevoir des demandes de clients qualifiés.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AVANTAGES */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-stone-900">
            Les avantages de ServicePro
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-stone-600">
            Pourquoi notre plateforme change la donne pour les clients
            et les professionnels.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map((a, i) => (
            <article
              key={a.title}
              className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-100"
            >
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-purple-100 to-rose-100 font-bold text-purple-700">
                {i + 1}
              </div>
              <h3 className="mt-3 text-base font-semibold text-stone-900">
                {a.title}
              </h3>
              <p className="mt-1 text-sm text-stone-600">{a.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-stone-200/70 bg-gradient-to-br from-purple-600 via-fuchsia-600 to-rose-500 text-white">
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-16 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">
            Prêt à essayer ?
          </h2>
          <p className="max-w-xl text-purple-50">
            Trouvez un prestataire en quelques clics ou inscrivez-vous pour
            faire grandir votre activité.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/providers"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-base font-semibold text-purple-700 shadow-lg shadow-purple-900/30 transition hover:-translate-y-0.5 hover:bg-purple-50"
            >
              Trouver un prestataire
            </Link>
            <Link
              href="/register/provider"
              className="inline-flex items-center justify-center rounded-2xl border-2 border-white/80 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              Devenir prestataire
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
