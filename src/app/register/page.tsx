import Link from "next/link";

export const metadata = { title: "Créer un compte — ServicePro" };

export default function RegisterChoicePage() {
  return (
    <section className="relative mx-auto max-w-3xl px-4 py-16">
      <div
        className="pointer-events-none absolute -top-16 left-1/2 h-80 w-[60%] -translate-x-1/2 rounded-full bg-purple-200/35 blur-3xl"
        aria-hidden
      />
      <div className="relative text-center">
        <h1 className="text-3xl font-bold text-stone-900">Créer un compte ✨</h1>
        <p className="mt-2 text-stone-600">
          Choisissez le type de compte qui vous correspond.
        </p>
      </div>

      <div className="relative mt-10 grid gap-4 md:grid-cols-2">
        <Link
          href="/register/client"
          className="group flex flex-col rounded-3xl border border-stone-200 bg-white/95 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-lg"
        >
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-purple-100 to-rose-100 text-purple-700">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden>
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
          </div>
          <h2 className="mt-4 text-lg font-semibold text-stone-900 group-hover:text-purple-700">
            Je suis client
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Je cherche un prestataire fiable pour réaliser un service à domicile.
          </p>
          <span className="mt-4 text-sm font-medium text-purple-600">
            Créer un compte client →
          </span>
        </Link>

        <Link
          href="/register/provider"
          className="group flex flex-col rounded-3xl border border-stone-200 bg-white/95 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-lg"
        >
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-amber-100 to-rose-100 text-amber-700">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden>
              <path d="M22 9l-10-7L2 9l10 7 10-7zm-10 9l-7-4.9V18l7 4 7-4v-4.9L12 18z" />
            </svg>
          </div>
          <h2 className="mt-4 text-lg font-semibold text-stone-900 group-hover:text-purple-700">
            Je suis prestataire
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Je propose mes services et veux recevoir des demandes de clients.
          </p>
          <span className="mt-4 text-sm font-medium text-purple-600">
            Créer un compte prestataire →
          </span>
        </Link>
      </div>

      <p className="relative mt-8 text-center text-sm text-stone-600">
        Déjà un compte ?{" "}
        <Link href="/login" className="font-medium text-purple-600 hover:underline">
          Se connecter
        </Link>
      </p>
    </section>
  );
}
