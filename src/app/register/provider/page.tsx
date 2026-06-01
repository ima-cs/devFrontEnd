import Link from "next/link";
import { RegisterProviderForm } from "@/components/auth/RegisterProviderForm";
import { getCategories } from "@/lib/queries";

export const metadata = { title: "Inscription prestataire — ServicePro" };

export default async function RegisterProviderPage() {
  const categories = await getCategories();

  return (
    <section className="mx-auto max-w-2xl px-4 py-16">
      <div className="text-center">
        <Link
          href="/register"
          className="text-sm text-stone-500 hover:text-purple-600"
        >
          ← Retour au choix du compte
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-stone-900">
          Inscription — Prestataire
        </h1>
        <p className="mt-1 text-sm text-stone-600">
          Présentez vos services et recevez des demandes de clients vérifiés.
        </p>
      </div>

      <div className="mt-8 rounded-3xl border border-stone-200 bg-white/95 p-6 shadow-md backdrop-blur">
        <RegisterProviderForm categories={categories} />
      </div>
    </section>
  );
}
