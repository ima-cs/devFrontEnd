const STEPS = [
  {
    n: 1,
    title: "Cherchez le bon prestataire",
    desc: "Filtrez par métier, ville et note. Consultez les profils détaillés et les avis clients.",
    color: "bg-purple-100 text-purple-700",
    icon: (
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    ),
  },
  {
    n: 2,
    title: "Envoyez votre demande",
    desc: "Décrivez votre besoin, indiquez la date souhaitée et la ville. Le prestataire reçoit votre demande instantanément.",
    color: "bg-amber-100 text-amber-700",
    icon: (
      <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
    ),
  },
  {
    n: 3,
    title: "Recevez une réponse rapide",
    desc: "Le prestataire accepte ou refuse votre demande. Vous échangez ensuite par téléphone ou email pour finaliser.",
    color: "bg-emerald-100 text-emerald-700",
    icon: (
      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
    ),
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="text-center">
        <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
          Comment ça marche
        </span>
        <h2 className="mt-3 text-3xl font-bold text-stone-900">
          Trouvez un prestataire en 3 étapes
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-stone-600">
          Un parcours simple, sans inscription requise pour explorer.
        </p>
      </div>

      <div className="relative mt-12 grid gap-6 md:grid-cols-3">
        {/* ligne de connexion entre les étapes (sur md+) */}
        <div className="absolute left-0 right-0 top-12 hidden h-0.5 bg-gradient-to-r from-purple-200 via-purple-300 to-purple-200 md:block" aria-hidden />

        {STEPS.map((s) => (
          <article
            key={s.n}
            className="relative flex flex-col items-center text-center"
          >
            <div className={`relative z-10 grid h-24 w-24 place-items-center rounded-2xl bg-white shadow-md ring-1 ring-stone-200`}>
              <div className={`grid h-16 w-16 place-items-center rounded-xl ${s.color}`}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8" aria-hidden>
                  {s.icon}
                </svg>
              </div>
            </div>
            <span className="mt-3 inline-flex items-center rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-stone-600">
              Étape {s.n}
            </span>
            <h3 className="mt-2 text-lg font-semibold text-stone-900">{s.title}</h3>
            <p className="mt-1 max-w-xs text-sm text-stone-600">{s.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
