import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryIcon } from "@/components/CategoryIcon";
import { ProviderCard } from "@/components/cards/ProviderCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getCategoryById, getProviders } from "@/lib/queries";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const category = await getCategoryById(id);
  return {
    title: category
      ? `${category.name} — ServicePro`
      : "Catégorie — ServicePro",
  };
}

const CATEGORY_INFO: Record<string, { howItHelps: string; commonServices: string[] }> = {
  Plomberie: {
    howItHelps:
      "Que ce soit une fuite urgente, un chauffe-eau en panne ou une rénovation complète de salle de bain, nos plombiers interviennent rapidement avec un savoir-faire reconnu.",
    commonServices: [
      "Dépannage de fuites et canalisations",
      "Installation et remplacement de chauffe-eau",
      "Rénovation de salle de bain",
      "Débouchage et entretien des canalisations",
      "Pose de robinetterie et sanitaires",
    ],
  },
  Électricité: {
    howItHelps:
      "Nos électriciens certifiés garantissent des installations conformes aux normes en vigueur, pour votre sécurité au quotidien.",
    commonServices: [
      "Installation électrique complète",
      "Mise aux normes du tableau",
      "Dépannage urgent",
      "Pose de luminaires et prises",
      "Domotique et éclairage intelligent",
    ],
  },
  Menuiserie: {
    howItHelps:
      "De la fabrication de meubles sur mesure à la restauration de boiseries anciennes, nos menuisiers artisans subliment le bois.",
    commonServices: [
      "Meubles sur mesure",
      "Pose de portes et fenêtres",
      "Restauration de boiseries",
      "Aménagements intérieurs",
      "Création de placards",
    ],
  },
  Maçonnerie: {
    howItHelps:
      "Du gros œuvre à la rénovation complète, nos maçons réalisent vos projets de construction avec rigueur et professionnalisme.",
    commonServices: [
      "Construction et extension",
      "Rénovation complète",
      "Pose de carrelage",
      "Création de murs et cloisons",
      "Ravalement de façade",
    ],
  },
  Climatisation: {
    howItHelps:
      "Installation, entretien et réparation de tous types de systèmes de climatisation, pour votre confort été comme hiver.",
    commonServices: [
      "Installation split et multi-split",
      "Maintenance annuelle",
      "Réparation toutes marques",
      "Recharge en gaz",
      "Conseil énergétique",
    ],
  },
  Nettoyage: {
    howItHelps:
      "Une équipe formée et assurée pour le nettoyage régulier ou ponctuel de votre domicile ou de vos bureaux.",
    commonServices: [
      "Ménage à domicile",
      "Nettoyage de fin de chantier",
      "Entretien de bureaux",
      "Lavage de vitres",
      "Nettoyage de tapis et canapés",
    ],
  },
  "Réparation électroménager": {
    howItHelps:
      "Donnez une seconde vie à vos appareils. Réparation toutes marques avec garantie sur la main d'œuvre.",
    commonServices: [
      "Lave-linge et lave-vaisselle",
      "Réfrigérateurs et congélateurs",
      "Fours et micro-ondes",
      "Plaques de cuisson",
      "Diagnostic gratuit",
    ],
  },
  "Aide à domicile": {
    howItHelps:
      "Un accompagnement bienveillant pour les personnes âgées ou en perte d'autonomie, par des professionnels qualifiés.",
    commonServices: [
      "Accompagnement des personnes âgées",
      "Aide aux repas et aux courses",
      "Assistance administrative",
      "Compagnie et stimulation cognitive",
      "Soins d'hygiène",
    ],
  },
  "Installation internet/fibre": {
    howItHelps:
      "Pose de la fibre, configuration de votre box et optimisation de votre réseau Wi-Fi domestique.",
    commonServices: [
      "Tirage de fibre optique",
      "Installation et configuration box",
      "Réseau Wi-Fi domestique",
      "Câblage Ethernet",
      "Dépannage connexion",
    ],
  },
};

export default async function CategoryDetailPage({ params }: PageProps) {
  const { id } = await params;
  const category = await getCategoryById(id);
  if (!category) notFound();

  const providers = await getProviders({ categoryId: category.id });
  const info = CATEGORY_INFO[category.name];
  const premiumCount = providers.filter((p) => p.is_premium).length;
  const cities = Array.from(new Set(providers.map((p) => p.city).filter(Boolean)));

  return (
    <>
      {/* HERO catégorie */}
      <section className="relative overflow-hidden border-b border-stone-200/70 bg-gradient-to-b from-purple-50 via-rose-50/40 to-white">
        <div
          className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-5xl px-4 py-12">
          <Link
            href="/categories"
            className="text-sm text-stone-500 hover:text-purple-600"
          >
            ← Toutes les catégories
          </Link>

          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-center">
            <CategoryIcon name={category.name} size="lg" />
            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
                {category.name}
              </h1>
              <p className="mt-2 text-base text-stone-600">
                {category.description ?? "Trouvez un professionnel qualifié dans cette catégorie."}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Badge variant="info">
                  {providers.length} prestataire{providers.length > 1 ? "s" : ""}
                </Badge>
                {premiumCount > 0 && (
                  <Badge variant="premium">
                    {premiumCount} Premium
                  </Badge>
                )}
                {cities.length > 0 && (
                  <Badge variant="default">
                    {cities.length} ville{cities.length > 1 ? "s" : ""}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/providers?category=${category.id}`}>
              <Button size="lg">Voir tous les prestataires</Button>
            </Link>
            <Link href="/providers">
              <Button size="lg" variant="outline">
                Explorer d&apos;autres métiers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        {/* Présentation détaillée */}
        {info && (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-stone-900">
                En quoi {category.name.toLowerCase()} peut vous aider
              </h2>
              <p className="mt-3 text-sm text-stone-700">{info.howItHelps}</p>

              <h3 className="mt-6 text-sm font-semibold text-stone-900">
                Services couramment proposés
              </h3>
              <ul className="mt-3 space-y-2">
                {info.commonServices.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-stone-700">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mt-0.5 h-4 w-4 text-purple-600"
                      aria-hidden
                    >
                      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                    </svg>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="space-y-3">
              <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-wider text-stone-500">
                  Bon à savoir
                </p>
                <p className="mt-2 text-sm text-stone-700">
                  Tous les prestataires sont vérifiés par notre équipe et
                  peuvent être notés par leurs clients.
                </p>
              </div>

              <div className="rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-50 to-rose-50 p-5">
                <p className="text-sm font-semibold text-purple-900">
                  Vous exercez ce métier ?
                </p>
                <p className="mt-1 text-xs text-purple-800">
                  Inscrivez-vous gratuitement et recevez des demandes.
                </p>
                <Link href="/register/provider" className="mt-3 inline-block">
                  <Button size="sm">Devenir prestataire</Button>
                </Link>
              </div>
            </aside>
          </div>
        )}

        {/* Liste de prestataires */}
        <div className="mt-12">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold text-stone-900">
                Prestataires disponibles
              </h2>
              <p className="mt-1 text-sm text-stone-600">
                {providers.length === 0
                  ? "Aucun prestataire actif pour cette catégorie."
                  : "Les prestataires Premium apparaissent en premier."}
              </p>
            </div>
            {providers.length > 0 && (
              <Link
                href={`/providers?category=${category.id}`}
                className="hidden text-sm font-medium text-purple-600 hover:underline md:inline"
              >
                Voir tout →
              </Link>
            )}
          </div>

          {providers.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center">
              <p className="text-sm font-medium text-stone-900">
                Aucun prestataire ne propose encore ce service.
              </p>
              <Link href="/register/provider" className="mt-4 inline-block">
                <Button>Devenir le premier prestataire</Button>
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {providers.slice(0, 6).map((p) => (
                <ProviderCard key={p.id} provider={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
