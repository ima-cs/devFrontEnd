import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200/70 bg-gradient-to-b from-white to-purple-50/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-rose-500 text-base font-bold text-white shadow-md shadow-purple-500/30">
              S
            </div>
            <span className="text-lg font-semibold text-stone-900">{APP_NAME}</span>
          </div>
          <p className="mt-3 text-sm text-stone-600">
            Trouvez un prestataire de confiance en quelques clics, partout au Maroc.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-stone-900">Plateforme</h4>
          <ul className="mt-3 space-y-2 text-sm text-stone-600">
            <li>
              <Link href="/" className="hover:text-purple-600">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/providers" className="hover:text-purple-600">
                Prestataires
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-purple-600">
                Catégories
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-stone-900">Compte</h4>
          <ul className="mt-3 space-y-2 text-sm text-stone-600">
            <li>
              <Link href="/login" className="hover:text-purple-600">
                Se connecter
              </Link>
            </li>
            <li>
              <Link href="/register/client" className="hover:text-purple-600">
                Devenir client
              </Link>
            </li>
            <li>
              <Link href="/register/provider" className="hover:text-purple-600">
                Devenir prestataire
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-stone-900">À propos</h4>
          <ul className="mt-3 space-y-2 text-sm text-stone-600">
            <li>
              <Link href="/about" className="hover:text-purple-600">
                Notre équipe
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-purple-600">
                Notre mission
              </Link>
            </li>
            <li className="text-xs text-stone-500 pt-1">
              Projet académique réalisé par Anas, Leila et Imane.
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-200 py-4 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} {APP_NAME} — Tous droits réservés
      </div>
    </footer>
  );
}
