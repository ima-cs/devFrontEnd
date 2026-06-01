import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = { title: "Connexion — ServicePro" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;

  return (
    <section className="relative mx-auto flex max-w-md flex-col px-4 py-16">
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-200/40 blur-3xl"
        aria-hidden
      />
      <div className="relative text-center">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-rose-500 text-base font-bold text-white shadow-md shadow-purple-500/30">
            S
          </div>
          <span className="text-xl font-semibold text-stone-900">ServicePro</span>
        </Link>
        <h1 className="mt-6 text-2xl font-bold text-stone-900">Bon retour 👋</h1>
        <p className="mt-1 text-sm text-stone-600">
          Connectez-vous pour accéder à votre espace.
        </p>
      </div>

      <div className="relative mt-8 rounded-3xl border border-stone-200 bg-white/95 p-6 shadow-md backdrop-blur">
        <LoginForm redirect={redirect} />
      </div>
    </section>
  );
}
