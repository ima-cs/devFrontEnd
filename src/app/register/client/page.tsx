import Link from "next/link";
import { RegisterClientForm } from "@/components/auth/RegisterClientForm";

export const metadata = { title: "Inscription client — ServicePro" };

export default function RegisterClientPage() {
  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <div className="text-center">
        <Link
          href="/register"
          className="text-sm text-stone-500 hover:text-purple-600"
        >
          ← Retour au choix du compte
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-stone-900">
          Inscription — Client
        </h1>
        <p className="mt-1 text-sm text-stone-600">
          Trouvez et contactez les meilleurs prestataires en quelques clics.
        </p>
      </div>

      <div className="mt-8 rounded-3xl border border-stone-200 bg-white/95 p-6 shadow-md backdrop-blur">
        <RegisterClientForm />
      </div>
    </section>
  );
}
