import Link from "next/link";
import { getAuthContext } from "@/lib/auth";
import { APP_NAME } from "@/lib/constants";

export async function Navbar() {
  const ctx = await getAuthContext();

  const isAuthed = ctx !== null;
  const role = ctx?.profile.role ?? null;
  const fullName = ctx?.profile.full_name ?? null;

  const dashboardHref =
    role === "admin"
      ? "/admin/dashboard"
      : role === "provider"
        ? "/provider/dashboard"
        : "/client/dashboard";

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-white/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-rose-500 text-base font-bold text-white shadow-md shadow-purple-500/30">
            S
          </div>
          <span className="text-lg font-semibold text-stone-900">{APP_NAME}</span>
        </Link>

        <div className="hidden items-center gap-6 text-sm font-medium text-stone-700 md:flex">
          <Link href="/" className="hover:text-purple-600">
            Accueil
          </Link>
          <Link href="/providers" className="hover:text-purple-600">
            Prestataires
          </Link>
          <Link href="/categories" className="hover:text-purple-600">
            Catégories
          </Link>
          <Link href="/about" className="hover:text-purple-600">
            À propos
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {isAuthed ? (
            <>
              <Link
                href={dashboardHref}
                className="hidden text-sm font-medium text-stone-700 hover:text-purple-600 sm:inline-flex"
              >
                {fullName || "Mon espace"}
              </Link>
              <form action="/auth/signout" method="POST">
                <button
                  type="submit"
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-stone-700 hover:bg-stone-100"
                >
                  Déconnexion
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-stone-700 hover:text-purple-600"
              >
                Se connecter
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-purple-600/25 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-600/40"
              >
                Créer un compte
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
