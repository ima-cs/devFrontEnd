import type {
  Ad,
  Category,
  ProviderWithStats,
  Review,
} from "@/types/database";

// Données de démonstration utilisées quand Supabase n'est pas configuré.
// Elles reflètent ce que `supabase/seed.sql` insère en base.

export const DEMO_CATEGORIES: Category[] = [
  { id: "c-plomberie",     name: "Plomberie",                  description: "Installation, réparation et entretien sanitaire", created_at: "" },
  { id: "c-electricite",   name: "Électricité",                description: "Installation électrique, dépannage, mise aux normes", created_at: "" },
  { id: "c-menuiserie",    name: "Menuiserie",                 description: "Bois, portes, fenêtres, meubles sur mesure", created_at: "" },
  { id: "c-maconnerie",    name: "Maçonnerie",                 description: "Construction, rénovation, gros œuvre", created_at: "" },
  { id: "c-climatisation", name: "Climatisation",              description: "Installation et entretien de systèmes de climatisation", created_at: "" },
  { id: "c-nettoyage",     name: "Nettoyage",                  description: "Ménage à domicile, entretien de bureaux", created_at: "" },
  { id: "c-electromenager",name: "Réparation électroménager", description: "Réfrigérateur, lave-linge, four, etc.", created_at: "" },
  { id: "c-aide-domicile", name: "Aide à domicile",            description: "Assistance aux personnes âgées ou en perte d'autonomie", created_at: "" },
  { id: "c-internet",      name: "Installation internet/fibre",description: "Câblage, configuration et mise en service", created_at: "" },
];

const catLink = (id: string) =>
  DEMO_CATEGORIES.find((c) => c.id === id)
    ? { id, name: DEMO_CATEGORIES.find((c) => c.id === id)!.name }
    : null;

// Helper compact pour générer un prestataire de démo.
function make(
  id: string,
  professional_name: string,
  category_id: string,
  city: string,
  description: string,
  experience_years: number,
  is_premium: boolean,
  reviews_count: number,
  average_rating: number,
): ProviderWithStats {
  return {
    id,
    user_id: null,
    professional_name,
    category_id,
    description,
    experience_years,
    city,
    phone: "+212 6 " + id.replace(/\D/g, "").padStart(8, "0").match(/.{2}/g)!.join(" "),
    avatar_url: null,
    is_premium,
    is_validated: true,
    created_at: "",
    categories: catLink(category_id),
    reviews_count,
    average_rating,
  };
}

// 9 catégories × ~7-8 prestataires = ~67 profils répartis dans 10 villes.
export const DEMO_PROVIDERS: ProviderWithStats[] = [
  // ─── Plomberie ────────────────────────────────────────────────────────────
  make("p-plomb-01", "Plomberie Express Maroc",  "c-plomberie", "Casablanca", "Spécialiste en dépannage rapide 24h/24 — fuites, débouchage, chauffe-eau.",      12, true,  3, 4.7),
  make("p-plomb-02", "AquaPlomb Rabat",          "c-plomberie", "Rabat",      "Plomberie générale et sanitaire, devis gratuit sous 24h.",                       9,  true,  2, 4.8),
  make("p-plomb-03", "Atlas Plomberie",          "c-plomberie", "Marrakech",  "Rénovation complète de salle de bain et installation sanitaire haut de gamme.",  15, false, 2, 4.5),
  make("p-plomb-04", "Plomb&Co Tanger",          "c-plomberie", "Tanger",     "Intervention rapide, équipe assurée, garantie sur pièces et main d'œuvre.",      6,  false, 1, 4.0),
  make("p-plomb-05", "Fès Plombier Pro",         "c-plomberie", "Fès",        "Plombier de père en fils depuis 30 ans, savoir-faire artisanal traditionnel.",  18, false, 1, 5.0),
  make("p-plomb-06", "Plomberie Agadir Sud",     "c-plomberie", "Agadir",     "Dépannage chauffe-eau, fuites cachées, recherche de fuite par caméra.",          7,  true,  1, 4.5),
  make("p-plomb-07", "Meknès Sanitaires",        "c-plomberie", "Meknès",     "Installation neuve et remplacement de robinetterie, équipement WC.",            5,  false, 1, 4.0),
  make("p-plomb-08", "Plombier Oriental",        "c-plomberie", "Oujda",      "Service de plomberie tous travaux, intervention sous 2h sur Oujda.",            8,  false, 0, 0),

  // ─── Électricité ─────────────────────────────────────────────────────────
  make("p-elec-01",  "Élec Pro Rabat",           "c-electricite", "Rabat",      "Électricien certifié. Installations neuves, mise aux normes, dépannage urgent.", 8,  true,  2, 5.0),
  make("p-elec-02",  "Casa Volt Électricité",    "c-electricite", "Casablanca", "Mise aux normes, tableau électrique, dépannage 7j/7.",                          11, true,  1, 4.5),
  make("p-elec-03",  "Lumière Marrakech",        "c-electricite", "Marrakech",  "Éclairage intérieur et extérieur, domotique simple, installation prises.",      6,  false, 1, 4.0),
  make("p-elec-04",  "Tanger Électricité",       "c-electricite", "Tanger",     "Installation électrique complète, mise en sécurité, intervention rapide.",      9,  false, 1, 4.5),
  make("p-elec-05",  "Fès Power",                "c-electricite", "Fès",        "Électricien artisan, devis transparent, garantie 2 ans sur installations.",     14, false, 1, 5.0),
  make("p-elec-06",  "Agadir Watt Service",      "c-electricite", "Agadir",     "Recherche de pannes, refonte tableau électrique, prise terre, normes NFC.",     10, true,  1, 4.5),
  make("p-elec-07",  "Meknès Élec Plus",         "c-electricite", "Meknès",     "Petits travaux et grosses rénovations électriques, tarifs négociés.",          4,  false, 0, 0),
  make("p-elec-08",  "Sahara Électricité",       "c-electricite", "Laâyoune",   "Seul électricien certifié dans la région, intervention sur tout le sud.",       7,  false, 0, 0),

  // ─── Menuiserie ──────────────────────────────────────────────────────────
  make("p-menu-01",  "Menuiserie El Amrani",     "c-menuiserie", "Fès",         "Menuisier ébéniste artisan. Meubles sur mesure, restauration de boiseries.",   20, false, 1, 5.0),
  make("p-menu-02",  "Bois & Style Casa",        "c-menuiserie", "Casablanca",  "Cuisines, placards et bibliothèques sur mesure, finitions soignées.",          12, true,  2, 4.5),
  make("p-menu-03",  "Atelier du Bois Rabat",    "c-menuiserie", "Rabat",       "Portes, fenêtres et meubles d'intérieur, bois massif et MDF.",                10, false, 1, 4.0),
  make("p-menu-04",  "Menuisier de l'Atlas",     "c-menuiserie", "Marrakech",   "Spécialiste du cèdre de l'Atlas, mobilier rustique et contemporain.",         16, true,  1, 5.0),
  make("p-menu-05",  "Tanger Création Bois",     "c-menuiserie", "Tanger",      "Aménagements intérieurs, dressings, têtes de lit sur mesure.",                 8,  false, 1, 4.5),
  make("p-menu-06",  "Menuiserie Agadir Atlas",  "c-menuiserie", "Agadir",      "Pose de parquets, lambris, escaliers et tous travaux bois.",                   9,  false, 1, 4.0),
  make("p-menu-07",  "Bois & Fer Meknès",        "c-menuiserie", "Meknès",      "Menuiserie mixte bois/métal, vérandas et garde-corps.",                        11, false, 0, 0),

  // ─── Maçonnerie ──────────────────────────────────────────────────────────
  make("p-maco-01",  "BTP Atlas Construction",   "c-maconnerie", "Marrakech",   "Maçonnerie générale, gros œuvre et rénovation complète clé en main.",         15, true,  1, 4.0),
  make("p-maco-02",  "Casa Bâtir",               "c-maconnerie", "Casablanca",  "Extension, surélévation, ravalement de façade et carrelage.",                  18, true,  2, 4.5),
  make("p-maco-03",  "Maçonnerie Rabat Pro",     "c-maconnerie", "Rabat",       "Construction neuve, gros œuvre, équipe expérimentée et assurée.",              13, false, 1, 4.0),
  make("p-maco-04",  "Fès Construction",         "c-maconnerie", "Fès",         "Restauration d'anciennes maisons médinales, savoir-faire traditionnel.",        22, false, 1, 5.0),
  make("p-maco-05",  "Tanger Bâti",              "c-maconnerie", "Tanger",      "Maçonnerie générale, carrelage, enduits intérieurs et extérieurs.",            10, false, 1, 4.5),
  make("p-maco-06",  "Maçon Agadir Sud",         "c-maconnerie", "Agadir",      "Petits et grands chantiers, remise aux normes parasismiques.",                 14, false, 0, 0),
  make("p-maco-07",  "Sahara BTP",               "c-maconnerie", "Dakhla",      "Maçonnerie adaptée au climat aride, fondations renforcées.",                   11, true,  0, 0),

  // ─── Climatisation ───────────────────────────────────────────────────────
  make("p-clim-01",  "Clim Service Tanger",      "c-climatisation", "Tanger",     "Installation, maintenance et réparation toutes marques (LG, Samsung, Daikin).", 7,  false, 1, 5.0),
  make("p-clim-02",  "Casa Froid",               "c-climatisation", "Casablanca", "Climatisation split, multi-split et VRV, devis sous 24h.",                     12, true,  2, 4.5),
  make("p-clim-03",  "Marrakech Clim Express",   "c-climatisation", "Marrakech",  "Pose de climatiseurs, entretien annuel, recharge gaz toutes marques.",         9,  true,  1, 4.5),
  make("p-clim-04",  "Rabat Cool",               "c-climatisation", "Rabat",      "Spécialiste de la pompe à chaleur réversible et climatisation silencieuse.",   8,  false, 1, 4.0),
  make("p-clim-05",  "Fès Climatisation Plus",   "c-climatisation", "Fès",        "Devis gratuit, garantie 3 ans, installateur agréé constructeurs.",            10, false, 1, 5.0),
  make("p-clim-06",  "Agadir Froid Sud",         "c-climatisation", "Agadir",     "Climatisation domestique et professionnelle, intervention sous 24h.",          6,  false, 1, 4.0),
  make("p-clim-07",  "Meknès Clim Pro",          "c-climatisation", "Meknès",     "Entretien climatiseurs, dépannage, recharge fluide frigorigène.",              5,  false, 0, 0),

  // ─── Nettoyage ───────────────────────────────────────────────────────────
  make("p-net-01",   "CleanHouse Casa",          "c-nettoyage", "Casablanca", "Service de nettoyage à domicile, équipe formée et assurée.",                     5,  false, 1, 4.0),
  make("p-net-02",   "Rabat Clean",              "c-nettoyage", "Rabat",      "Ménage régulier et ponctuel, fin de chantier, bureaux et résidences.",           6,  true,  2, 5.0),
  make("p-net-03",   "Marrakech Maison Propre",  "c-nettoyage", "Marrakech",  "Spécialiste du grand ménage et de la remise en état de location.",               4,  false, 1, 4.5),
  make("p-net-04",   "Tanger Propreté Pro",      "c-nettoyage", "Tanger",     "Nettoyage de vitres, tapis, canapés à la vapeur professionnelle.",               7,  false, 1, 4.0),
  make("p-net-05",   "Fès Net Service",          "c-nettoyage", "Fès",        "Ménage à domicile à l'heure ou au forfait, produits écologiques.",               3,  false, 1, 4.5),
  make("p-net-06",   "Agadir Sparkle",           "c-nettoyage", "Agadir",     "Nettoyage haut de gamme, villas, riads et résidences touristiques.",             8,  true,  1, 5.0),
  make("p-net-07",   "Meknès Brille",            "c-nettoyage", "Meknès",     "Équipe ponctuelle et discrète, devis transparents.",                             4,  false, 0, 0),
  make("p-net-08",   "Oujda Nettoyage",          "c-nettoyage", "Oujda",      "Ménage régulier de logements et locaux professionnels.",                         5,  false, 0, 0),

  // ─── Réparation électroménager ───────────────────────────────────────────
  make("p-elm-01",   "Répar Électro Rabat",      "c-electromenager", "Rabat",      "Réparation lave-linge, frigo, four, micro-ondes — toutes marques.",          10, false, 1, 3.0),
  make("p-elm-02",   "Casa Électro Service",     "c-electromenager", "Casablanca", "Diagnostic gratuit à domicile, devis avant intervention, garantie 6 mois.",  12, true,  2, 4.5),
  make("p-elm-03",   "Marrakech Répar Frigo",    "c-electromenager", "Marrakech",  "Spécialiste réfrigération, climatiseurs et électroménager froid.",            8,  false, 1, 4.0),
  make("p-elm-04",   "Tanger Électro Atlas",     "c-electromenager", "Tanger",     "Lave-vaisselle, sèche-linge, plaques de cuisson — réparation rapide.",       7,  false, 1, 4.5),
  make("p-elm-05",   "Fès Service Pro",          "c-electromenager", "Fès",        "Toutes marques, intervention à domicile sous 48h, pièces d'origine.",         9,  false, 1, 4.0),
  make("p-elm-06",   "Agadir Électroménager",    "c-electromenager", "Agadir",     "Garantie sur la main d'œuvre, déplacement offert sur Agadir.",               6,  true,  0, 0),
  make("p-elm-07",   "Meknès Répar Service",     "c-electromenager", "Meknès",     "Réparation petits et gros électroménagers, devis transparent.",               5,  false, 0, 0),

  // ─── Aide à domicile ─────────────────────────────────────────────────────
  make("p-aid-01",   "Aide & Soutien Marrakech", "c-aide-domicile", "Marrakech",  "Auxiliaire de vie expérimentée, assistance personnes âgées à domicile.",      6,  false, 1, 5.0),
  make("p-aid-02",   "Casa Confort Senior",      "c-aide-domicile", "Casablanca", "Garde de jour, aide aux repas, accompagnement médical et courses.",           9,  true,  2, 5.0),
  make("p-aid-03",   "Rabat Bienveillance",      "c-aide-domicile", "Rabat",      "Équipe d'aides à domicile diplômées, intervention 7j/7.",                    7,  true,  1, 4.5),
  make("p-aid-04",   "Tanger Aide Familiale",    "c-aide-domicile", "Tanger",     "Maintien à domicile des personnes en perte d'autonomie.",                    5,  false, 1, 4.5),
  make("p-aid-05",   "Fès Compagnie",            "c-aide-domicile", "Fès",        "Présence, dialogue, soutien moral et stimulation cognitive.",                4,  false, 1, 5.0),
  make("p-aid-06",   "Agadir Auxiliaire Vie",    "c-aide-domicile", "Agadir",     "Aide aux gestes du quotidien, hygiène et soins légers.",                     6,  false, 0, 0),
  make("p-aid-07",   "Meknès Senior Care",       "c-aide-domicile", "Meknès",     "Service personnalisé, contrat clair, aide tarifs adaptés.",                   3,  false, 0, 0),

  // ─── Installation internet/fibre ─────────────────────────────────────────
  make("p-int-01",   "Fibre Connect Maroc",      "c-internet", "Tanger",     "Installation fibre/ADSL, configuration box et réseaux Wi-Fi domestiques.",      4,  true,  1, 5.0),
  make("p-int-02",   "Casa Réseaux",             "c-internet", "Casablanca", "Câblage Ethernet, Wi-Fi mesh, configuration box opérateur toutes marques.",     6,  true,  2, 5.0),
  make("p-int-03",   "Rabat Net Service",        "c-internet", "Rabat",      "Optimisation Wi-Fi, ajout amplificateurs, dépannage connexion.",                5,  false, 1, 4.5),
  make("p-int-04",   "Marrakech Fibre Express",  "c-internet", "Marrakech",  "Tirage de fibre, installation box, mise en service rapide.",                    3,  false, 1, 4.0),
  make("p-int-05",   "Fès Connect",              "c-internet", "Fès",        "Réseau Wi-Fi domestique, point d'accès, sécurité du réseau.",                    4,  false, 1, 4.5),
  make("p-int-06",   "Agadir Fibre Sud",         "c-internet", "Agadir",     "Installation fibre, configuration TV/Internet, câblage maison entière.",        7,  true,  1, 5.0),
  make("p-int-07",   "Sahara Net",               "c-internet", "Laâyoune",   "Couverture du sud marocain, internet par satellite et fibre.",                  5,  false, 0, 0),
];

export const DEMO_REVIEWS: Record<string, Review[]> = {
  "p-plomb-01": [
    { id: "r-plomb-01-a", client_id: null, provider_id: "p-plomb-01", rating: 5, comment: "Très professionnel, intervention rapide et propre. Je recommande !",          created_at: "2026-03-12" },
    { id: "r-plomb-01-b", client_id: null, provider_id: "p-plomb-01", rating: 4, comment: "Bon travail, respectueux du devis. Petit retard sur la date.",                  created_at: "2026-02-05" },
    { id: "r-plomb-01-c", client_id: null, provider_id: "p-plomb-01", rating: 5, comment: "Deuxième fois que je fais appel à eux, toujours impeccable.",                    created_at: "2026-04-10" },
  ],
  "p-plomb-02": [
    { id: "r-plomb-02-a", client_id: null, provider_id: "p-plomb-02", rating: 5, comment: "Équipe à l'écoute, devis clair, finitions parfaites.",                            created_at: "2026-04-15" },
    { id: "r-plomb-02-b", client_id: null, provider_id: "p-plomb-02", rating: 4, comment: "Très bon service, je recommande pour la salle de bain.",                          created_at: "2026-01-30" },
  ],
  "p-plomb-03": [
    { id: "r-plomb-03-a", client_id: null, provider_id: "p-plomb-03", rating: 5, comment: "Travail soigné, équipe sérieuse et ponctuelle.",                                   created_at: "2026-03-20" },
    { id: "r-plomb-03-b", client_id: null, provider_id: "p-plomb-03", rating: 4, comment: "Belle rénovation, je suis ravie du résultat.",                                     created_at: "2026-02-10" },
  ],
  "p-plomb-04": [
    { id: "r-plomb-04-a", client_id: null, provider_id: "p-plomb-04", rating: 4, comment: "Bon plombier, prix corrects.",                                                     created_at: "2026-03-05" },
  ],
  "p-plomb-05": [
    { id: "r-plomb-05-a", client_id: null, provider_id: "p-plomb-05", rating: 5, comment: "Un vrai artisan, il connait son métier sur le bout des doigts.",                   created_at: "2026-04-02" },
  ],
  "p-plomb-06": [
    { id: "r-plomb-06-a", client_id: null, provider_id: "p-plomb-06", rating: 5, comment: "Recherche de fuite très efficace, gagne du temps et de l'argent.",                 created_at: "2026-03-18" },
  ],
  "p-plomb-07": [
    { id: "r-plomb-07-a", client_id: null, provider_id: "p-plomb-07", rating: 4, comment: "Travail correct, prix raisonnable.",                                              created_at: "2026-02-22" },
  ],

  "p-elec-01": [
    { id: "r-elec-01-a", client_id: null, provider_id: "p-elec-01", rating: 5, comment: "Excellent électricien, travail soigné aux normes.",                                  created_at: "2026-04-01" },
    { id: "r-elec-01-b", client_id: null, provider_id: "p-elec-01", rating: 5, comment: "Très réactif, intervention le jour même.",                                            created_at: "2026-03-22" },
  ],
  "p-elec-02": [
    { id: "r-elec-02-a", client_id: null, provider_id: "p-elec-02", rating: 4, comment: "Bon professionnel, tableau remis aux normes proprement.",                              created_at: "2026-04-12" },
  ],
  "p-elec-03": [
    { id: "r-elec-03-a", client_id: null, provider_id: "p-elec-03", rating: 4, comment: "Service convenable, à recommander.",                                                  created_at: "2026-02-28" },
  ],
  "p-elec-04": [
    { id: "r-elec-04-a", client_id: null, provider_id: "p-elec-04", rating: 5, comment: "Très professionnel, mise en sécurité rapide.",                                         created_at: "2026-03-30" },
  ],
  "p-elec-05": [
    { id: "r-elec-05-a", client_id: null, provider_id: "p-elec-05", rating: 5, comment: "Le meilleur électricien de la médina, confiance totale.",                              created_at: "2026-04-05" },
  ],
  "p-elec-06": [
    { id: "r-elec-06-a", client_id: null, provider_id: "p-elec-06", rating: 5, comment: "Diagnostic précis, intervention propre.",                                              created_at: "2026-03-25" },
  ],

  "p-menu-01": [
    { id: "r-menu-01-a", client_id: null, provider_id: "p-menu-01", rating: 5, comment: "Travail magnifique sur ma bibliothèque sur mesure, qualité exceptionnelle.",          created_at: "2026-03-22" },
  ],
  "p-menu-02": [
    { id: "r-menu-02-a", client_id: null, provider_id: "p-menu-02", rating: 5, comment: "Cuisine livrée parfaite, équipe pro et bonne communication.",                         created_at: "2026-04-08" },
    { id: "r-menu-02-b", client_id: null, provider_id: "p-menu-02", rating: 4, comment: "Bel ouvrage, finitions à la hauteur.",                                                 created_at: "2026-02-15" },
  ],
  "p-menu-03": [
    { id: "r-menu-03-a", client_id: null, provider_id: "p-menu-03", rating: 4, comment: "Portes installées proprement, bon rapport qualité/prix.",                              created_at: "2026-03-11" },
  ],
  "p-menu-04": [
    { id: "r-menu-04-a", client_id: null, provider_id: "p-menu-04", rating: 5, comment: "Un véritable artiste du bois, je recommande chaudement.",                              created_at: "2026-04-20" },
  ],
  "p-menu-05": [
    { id: "r-menu-05-a", client_id: null, provider_id: "p-menu-05", rating: 5, comment: "Dressing impeccable, équipe à l'écoute de mes besoins.",                               created_at: "2026-03-15" },
  ],
  "p-menu-06": [
    { id: "r-menu-06-a", client_id: null, provider_id: "p-menu-06", rating: 4, comment: "Beau parquet posé, travail soigné.",                                                  created_at: "2026-02-08" },
  ],

  "p-maco-01": [
    { id: "r-maco-01-a", client_id: null, provider_id: "p-maco-01", rating: 4, comment: "Équipe sérieuse, chantier livré dans les temps.",                                     created_at: "2026-01-18" },
  ],
  "p-maco-02": [
    { id: "r-maco-02-a", client_id: null, provider_id: "p-maco-02", rating: 5, comment: "Extension réalisée parfaitement, équipe ponctuelle.",                                  created_at: "2026-04-18" },
    { id: "r-maco-02-b", client_id: null, provider_id: "p-maco-02", rating: 4, comment: "Bonne expérience, ravalement très réussi.",                                             created_at: "2026-02-25" },
  ],
  "p-maco-03": [
    { id: "r-maco-03-a", client_id: null, provider_id: "p-maco-03", rating: 4, comment: "Travail propre, devis respecté.",                                                     created_at: "2026-03-08" },
  ],
  "p-maco-04": [
    { id: "r-maco-04-a", client_id: null, provider_id: "p-maco-04", rating: 5, comment: "Restauration de mon riad parfaite, dans les règles de l'art.",                         created_at: "2026-04-25" },
  ],
  "p-maco-05": [
    { id: "r-maco-05-a", client_id: null, provider_id: "p-maco-05", rating: 5, comment: "Très satisfait, équipe sérieuse et discrète.",                                         created_at: "2026-03-29" },
  ],

  "p-clim-01": [
    { id: "r-clim-01-a", client_id: null, provider_id: "p-clim-01", rating: 5, comment: "Installation clim parfaite, prix correct.",                                            created_at: "2026-04-29" },
  ],
  "p-clim-02": [
    { id: "r-clim-02-a", client_id: null, provider_id: "p-clim-02", rating: 5, comment: "Excellent service, équipe ponctuelle et propre.",                                      created_at: "2026-04-15" },
    { id: "r-clim-02-b", client_id: null, provider_id: "p-clim-02", rating: 4, comment: "Très bon prestataire, je recommande.",                                                  created_at: "2026-03-02" },
  ],
  "p-clim-03": [
    { id: "r-clim-03-a", client_id: null, provider_id: "p-clim-03", rating: 5, comment: "Maintenance rapide, technicien compétent.",                                            created_at: "2026-04-10" },
  ],
  "p-clim-04": [
    { id: "r-clim-04-a", client_id: null, provider_id: "p-clim-04", rating: 4, comment: "Pompe à chaleur installée correctement, silencieuse comme promis.",                    created_at: "2026-03-21" },
  ],
  "p-clim-05": [
    { id: "r-clim-05-a", client_id: null, provider_id: "p-clim-05", rating: 5, comment: "Devis transparent, installation soignée.",                                              created_at: "2026-04-04" },
  ],
  "p-clim-06": [
    { id: "r-clim-06-a", client_id: null, provider_id: "p-clim-06", rating: 4, comment: "Intervention rapide, bon technicien.",                                                  created_at: "2026-03-17" },
  ],

  "p-net-01": [
    { id: "r-net-01-a", client_id: null, provider_id: "p-net-01", rating: 4, comment: "Service correct, équipe ponctuelle.",                                                    created_at: "2026-03-30" },
  ],
  "p-net-02": [
    { id: "r-net-02-a", client_id: null, provider_id: "p-net-02", rating: 5, comment: "Maison impeccable, équipe discrète et efficace.",                                         created_at: "2026-04-22" },
    { id: "r-net-02-b", client_id: null, provider_id: "p-net-02", rating: 5, comment: "Très professionnel, je vais reprendre rendez-vous régulièrement.",                        created_at: "2026-03-14" },
  ],
  "p-net-03": [
    { id: "r-net-03-a", client_id: null, provider_id: "p-net-03", rating: 5, comment: "Grand ménage parfait avant l'arrivée des locataires.",                                    created_at: "2026-04-01" },
  ],
  "p-net-04": [
    { id: "r-net-04-a", client_id: null, provider_id: "p-net-04", rating: 4, comment: "Tapis et canapés comme neufs, très satisfait.",                                          created_at: "2026-03-09" },
  ],
  "p-net-05": [
    { id: "r-net-05-a", client_id: null, provider_id: "p-net-05", rating: 5, comment: "Produits écolos, équipe sympathique. Recommandé !",                                       created_at: "2026-04-14" },
  ],
  "p-net-06": [
    { id: "r-net-06-a", client_id: null, provider_id: "p-net-06", rating: 5, comment: "Nettoyage de villa au top, équipe vraiment sérieuse.",                                    created_at: "2026-04-26" },
  ],

  "p-elm-01": [
    { id: "r-elm-01-a", client_id: null, provider_id: "p-elm-01", rating: 3, comment: "Réparation OK mais délai d'attente un peu long.",                                        created_at: "2026-02-14" },
  ],
  "p-elm-02": [
    { id: "r-elm-02-a", client_id: null, provider_id: "p-elm-02", rating: 5, comment: "Diagnostic gratuit comme promis, réparation efficace.",                                  created_at: "2026-04-19" },
    { id: "r-elm-02-b", client_id: null, provider_id: "p-elm-02", rating: 4, comment: "Bon service, garantie respectée.",                                                       created_at: "2026-03-06" },
  ],
  "p-elm-03": [
    { id: "r-elm-03-a", client_id: null, provider_id: "p-elm-03", rating: 4, comment: "Frigo réparé, prix raisonnable.",                                                        created_at: "2026-02-19" },
  ],
  "p-elm-04": [
    { id: "r-elm-04-a", client_id: null, provider_id: "p-elm-04", rating: 5, comment: "Très bon technicien, lave-vaisselle remis à neuf.",                                       created_at: "2026-04-09" },
  ],
  "p-elm-05": [
    { id: "r-elm-05-a", client_id: null, provider_id: "p-elm-05", rating: 4, comment: "Intervention rapide, pièces d'origine, je recommande.",                                  created_at: "2026-03-12" },
  ],

  "p-aid-01": [
    { id: "r-aid-01-a", client_id: null, provider_id: "p-aid-01", rating: 5, comment: "Très bienveillante avec ma mère, je suis rassurée.",                                      created_at: "2026-04-08" },
  ],
  "p-aid-02": [
    { id: "r-aid-02-a", client_id: null, provider_id: "p-aid-02", rating: 5, comment: "Équipe d'aides à domicile fiable et professionnelle.",                                    created_at: "2026-04-23" },
    { id: "r-aid-02-b", client_id: null, provider_id: "p-aid-02", rating: 5, comment: "Mon père est en de très bonnes mains, merci.",                                            created_at: "2026-03-04" },
  ],
  "p-aid-03": [
    { id: "r-aid-03-a", client_id: null, provider_id: "p-aid-03", rating: 4, comment: "Bonne aide à domicile, équipe ponctuelle et professionnelle.",                            created_at: "2026-03-27" },
  ],
  "p-aid-04": [
    { id: "r-aid-04-a", client_id: null, provider_id: "p-aid-04", rating: 5, comment: "Service de qualité, écoute attentive aux besoins de la famille.",                         created_at: "2026-04-11" },
  ],
  "p-aid-05": [
    { id: "r-aid-05-a", client_id: null, provider_id: "p-aid-05", rating: 5, comment: "Compagnie attentive et chaleureuse, un soutien précieux.",                                created_at: "2026-03-18" },
  ],

  "p-int-01": [
    { id: "r-int-01-a", client_id: null, provider_id: "p-int-01", rating: 5, comment: "Installation fibre rapide, technicien à l'écoute.",                                      created_at: "2026-05-02" },
  ],
  "p-int-02": [
    { id: "r-int-02-a", client_id: null, provider_id: "p-int-02", rating: 5, comment: "Wi-Fi mesh installé, plus de zones blanches chez moi !",                                  created_at: "2026-04-28" },
    { id: "r-int-02-b", client_id: null, provider_id: "p-int-02", rating: 4, comment: "Câblage propre, débit au top.",                                                          created_at: "2026-03-13" },
  ],
  "p-int-03": [
    { id: "r-int-03-a", client_id: null, provider_id: "p-int-03", rating: 5, comment: "Wi-Fi optimisé, connexion stable partout dans la maison.",                                 created_at: "2026-04-17" },
  ],
  "p-int-04": [
    { id: "r-int-04-a", client_id: null, provider_id: "p-int-04", rating: 4, comment: "Box configurée, technicien sympa et compétent.",                                          created_at: "2026-03-19" },
  ],
  "p-int-05": [
    { id: "r-int-05-a", client_id: null, provider_id: "p-int-05", rating: 5, comment: "Bonne installation Wi-Fi, sécurité du réseau bien mise en place.",                        created_at: "2026-04-06" },
  ],
  "p-int-06": [
    { id: "r-int-06-a", client_id: null, provider_id: "p-int-06", rating: 5, comment: "Toute la maison câblée fibre, super travail.",                                            created_at: "2026-04-21" },
  ],
};

export const DEMO_ADS: Ad[] = [
  { id: "a1", title: "Brico Maroc — Outillage pro à prix discount", description: "Tous les outils pour pros et particuliers", image_url: null, position: "home",      active: true, created_at: "" },
  { id: "a2", title: "Maison & Jardin — Soldes du moment",          description: "−30 % sur le mobilier d'extérieur",       image_url: null, position: "providers", active: true, created_at: "" },
  { id: "a3", title: "Assurance Habitation Atlas",                  description: "Protégez votre logement dès 99 DH/mois",  image_url: null, position: "home",      active: true, created_at: "" },
];
