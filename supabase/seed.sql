-- ServicePro — Données de démonstration
-- À exécuter dans le SQL Editor de Supabase, après schema.sql.
-- Réexécutable : les providers/reviews de démo (user_id NULL, client_id NULL)
-- sont supprimés avant ré-insertion. Les utilisateurs inscrits ne sont PAS touchés.

-- ============================================================
-- CATEGORIES
-- ============================================================
insert into public.categories (name, description) values
  ('Plomberie', 'Installation, réparation et entretien sanitaire'),
  ('Électricité', 'Installation électrique, dépannage, mise aux normes'),
  ('Menuiserie', 'Bois, portes, fenêtres, meubles sur mesure'),
  ('Maçonnerie', 'Construction, rénovation, gros œuvre'),
  ('Climatisation', 'Installation et entretien de systèmes de climatisation'),
  ('Nettoyage', 'Ménage à domicile, entretien de bureaux'),
  ('Réparation électroménager', 'Réfrigérateur, lave-linge, four, etc.'),
  ('Aide à domicile', 'Assistance aux personnes âgées ou en perte d''autonomie'),
  ('Installation internet/fibre', 'Câblage, configuration et mise en service')
on conflict (name) do nothing;

-- ============================================================
-- NETTOYAGE des anciennes données de démo (idempotence)
-- ============================================================
delete from public.reviews   where client_id is null;
delete from public.providers where user_id  is null;

-- ============================================================
-- PROVIDERS DE DÉMO (67 profils, 10 villes, 9 catégories)
-- ============================================================

-- Plomberie (8 prestataires)
insert into public.providers (professional_name, category_id, description, experience_years, city, phone, is_premium, is_validated)
select v.professional_name, c.id, v.description, v.experience_years, v.city, v.phone, v.is_premium, true
from public.categories c, (values
  ('Plomberie Express Maroc', 'Spécialiste en dépannage rapide 24h/24 — fuites, débouchage, chauffe-eau.', 12, 'Casablanca', '+212 6 10 20 30 40', true),
  ('AquaPlomb Rabat', 'Plomberie générale et sanitaire, devis gratuit sous 24h.', 9, 'Rabat', '+212 6 17 23 31 42', true),
  ('Atlas Plomberie', 'Rénovation complète de salle de bain et installation sanitaire haut de gamme.', 15, 'Marrakech', '+212 6 24 26 32 44', false),
  ('Plomb&Co Tanger', 'Intervention rapide, équipe assurée, garantie sur pièces et main d''œuvre.', 6, 'Tanger', '+212 6 31 29 33 46', false),
  ('Fès Plombier Pro', 'Plombier de père en fils depuis 30 ans, savoir-faire artisanal traditionnel.', 18, 'Fès', '+212 6 38 32 34 48', false),
  ('Plomberie Agadir Sud', 'Dépannage chauffe-eau, fuites cachées, recherche de fuite par caméra.', 7, 'Agadir', '+212 6 45 35 35 50', true),
  ('Meknès Sanitaires', 'Installation neuve et remplacement de robinetterie, équipement WC.', 5, 'Meknès', '+212 6 52 38 36 52', false),
  ('Plombier Oriental', 'Service de plomberie tous travaux, intervention sous 2h sur Oujda.', 8, 'Oujda', '+212 6 59 41 37 54', false)
) as v(professional_name, description, experience_years, city, phone, is_premium)
where c.name = 'Plomberie';

-- Électricité (8 prestataires)
insert into public.providers (professional_name, category_id, description, experience_years, city, phone, is_premium, is_validated)
select v.professional_name, c.id, v.description, v.experience_years, v.city, v.phone, v.is_premium, true
from public.categories c, (values
  ('Élec Pro Rabat', 'Électricien certifié. Installations neuves, mise aux normes, dépannage urgent.', 8, 'Rabat', '+212 6 10 20 30 40', true),
  ('Casa Volt Électricité', 'Mise aux normes, tableau électrique, dépannage 7j/7.', 11, 'Casablanca', '+212 6 17 23 31 42', true),
  ('Lumière Marrakech', 'Éclairage intérieur et extérieur, domotique simple, installation prises.', 6, 'Marrakech', '+212 6 24 26 32 44', false),
  ('Tanger Électricité', 'Installation électrique complète, mise en sécurité, intervention rapide.', 9, 'Tanger', '+212 6 31 29 33 46', false),
  ('Fès Power', 'Électricien artisan, devis transparent, garantie 2 ans sur installations.', 14, 'Fès', '+212 6 38 32 34 48', false),
  ('Agadir Watt Service', 'Recherche de pannes, refonte tableau électrique, prise terre, normes NFC.', 10, 'Agadir', '+212 6 45 35 35 50', true),
  ('Meknès Élec Plus', 'Petits travaux et grosses rénovations électriques, tarifs négociés.', 4, 'Meknès', '+212 6 52 38 36 52', false),
  ('Sahara Électricité', 'Seul électricien certifié dans la région, intervention sur tout le sud.', 7, 'Laâyoune', '+212 6 59 41 37 54', false)
) as v(professional_name, description, experience_years, city, phone, is_premium)
where c.name = 'Électricité';

-- Menuiserie (7 prestataires)
insert into public.providers (professional_name, category_id, description, experience_years, city, phone, is_premium, is_validated)
select v.professional_name, c.id, v.description, v.experience_years, v.city, v.phone, v.is_premium, true
from public.categories c, (values
  ('Menuiserie El Amrani', 'Menuisier ébéniste artisan. Meubles sur mesure, restauration de boiseries.', 20, 'Fès', '+212 6 10 20 30 40', false),
  ('Bois & Style Casa', 'Cuisines, placards et bibliothèques sur mesure, finitions soignées.', 12, 'Casablanca', '+212 6 17 23 31 42', true),
  ('Atelier du Bois Rabat', 'Portes, fenêtres et meubles d''intérieur, bois massif et MDF.', 10, 'Rabat', '+212 6 24 26 32 44', false),
  ('Menuisier de l''Atlas', 'Spécialiste du cèdre de l''Atlas, mobilier rustique et contemporain.', 16, 'Marrakech', '+212 6 31 29 33 46', true),
  ('Tanger Création Bois', 'Aménagements intérieurs, dressings, têtes de lit sur mesure.', 8, 'Tanger', '+212 6 38 32 34 48', false),
  ('Menuiserie Agadir Atlas', 'Pose de parquets, lambris, escaliers et tous travaux bois.', 9, 'Agadir', '+212 6 45 35 35 50', false),
  ('Bois & Fer Meknès', 'Menuiserie mixte bois/métal, vérandas et garde-corps.', 11, 'Meknès', '+212 6 52 38 36 52', false)
) as v(professional_name, description, experience_years, city, phone, is_premium)
where c.name = 'Menuiserie';

-- Maçonnerie (7 prestataires)
insert into public.providers (professional_name, category_id, description, experience_years, city, phone, is_premium, is_validated)
select v.professional_name, c.id, v.description, v.experience_years, v.city, v.phone, v.is_premium, true
from public.categories c, (values
  ('BTP Atlas Construction', 'Maçonnerie générale, gros œuvre et rénovation complète clé en main.', 15, 'Marrakech', '+212 6 10 20 30 40', true),
  ('Casa Bâtir', 'Extension, surélévation, ravalement de façade et carrelage.', 18, 'Casablanca', '+212 6 17 23 31 42', true),
  ('Maçonnerie Rabat Pro', 'Construction neuve, gros œuvre, équipe expérimentée et assurée.', 13, 'Rabat', '+212 6 24 26 32 44', false),
  ('Fès Construction', 'Restauration d''anciennes maisons médinales, savoir-faire traditionnel.', 22, 'Fès', '+212 6 31 29 33 46', false),
  ('Tanger Bâti', 'Maçonnerie générale, carrelage, enduits intérieurs et extérieurs.', 10, 'Tanger', '+212 6 38 32 34 48', false),
  ('Maçon Agadir Sud', 'Petits et grands chantiers, remise aux normes parasismiques.', 14, 'Agadir', '+212 6 45 35 35 50', false),
  ('Sahara BTP', 'Maçonnerie adaptée au climat aride, fondations renforcées.', 11, 'Dakhla', '+212 6 52 38 36 52', true)
) as v(professional_name, description, experience_years, city, phone, is_premium)
where c.name = 'Maçonnerie';

-- Climatisation (7 prestataires)
insert into public.providers (professional_name, category_id, description, experience_years, city, phone, is_premium, is_validated)
select v.professional_name, c.id, v.description, v.experience_years, v.city, v.phone, v.is_premium, true
from public.categories c, (values
  ('Clim Service Tanger', 'Installation, maintenance et réparation toutes marques (LG, Samsung, Daikin).', 7, 'Tanger', '+212 6 10 20 30 40', false),
  ('Casa Froid', 'Climatisation split, multi-split et VRV, devis sous 24h.', 12, 'Casablanca', '+212 6 17 23 31 42', true),
  ('Marrakech Clim Express', 'Pose de climatiseurs, entretien annuel, recharge gaz toutes marques.', 9, 'Marrakech', '+212 6 24 26 32 44', true),
  ('Rabat Cool', 'Spécialiste de la pompe à chaleur réversible et climatisation silencieuse.', 8, 'Rabat', '+212 6 31 29 33 46', false),
  ('Fès Climatisation Plus', 'Devis gratuit, garantie 3 ans, installateur agréé constructeurs.', 10, 'Fès', '+212 6 38 32 34 48', false),
  ('Agadir Froid Sud', 'Climatisation domestique et professionnelle, intervention sous 24h.', 6, 'Agadir', '+212 6 45 35 35 50', false),
  ('Meknès Clim Pro', 'Entretien climatiseurs, dépannage, recharge fluide frigorigène.', 5, 'Meknès', '+212 6 52 38 36 52', false)
) as v(professional_name, description, experience_years, city, phone, is_premium)
where c.name = 'Climatisation';

-- Nettoyage (8 prestataires)
insert into public.providers (professional_name, category_id, description, experience_years, city, phone, is_premium, is_validated)
select v.professional_name, c.id, v.description, v.experience_years, v.city, v.phone, v.is_premium, true
from public.categories c, (values
  ('CleanHouse Casa', 'Service de nettoyage à domicile, équipe formée et assurée.', 5, 'Casablanca', '+212 6 10 20 30 40', false),
  ('Rabat Clean', 'Ménage régulier et ponctuel, fin de chantier, bureaux et résidences.', 6, 'Rabat', '+212 6 17 23 31 42', true),
  ('Marrakech Maison Propre', 'Spécialiste du grand ménage et de la remise en état de location.', 4, 'Marrakech', '+212 6 24 26 32 44', false),
  ('Tanger Propreté Pro', 'Nettoyage de vitres, tapis, canapés à la vapeur professionnelle.', 7, 'Tanger', '+212 6 31 29 33 46', false),
  ('Fès Net Service', 'Ménage à domicile à l''heure ou au forfait, produits écologiques.', 3, 'Fès', '+212 6 38 32 34 48', false),
  ('Agadir Sparkle', 'Nettoyage haut de gamme, villas, riads et résidences touristiques.', 8, 'Agadir', '+212 6 45 35 35 50', true),
  ('Meknès Brille', 'Équipe ponctuelle et discrète, devis transparents.', 4, 'Meknès', '+212 6 52 38 36 52', false),
  ('Oujda Nettoyage', 'Ménage régulier de logements et locaux professionnels.', 5, 'Oujda', '+212 6 59 41 37 54', false)
) as v(professional_name, description, experience_years, city, phone, is_premium)
where c.name = 'Nettoyage';

-- Réparation électroménager (7 prestataires)
insert into public.providers (professional_name, category_id, description, experience_years, city, phone, is_premium, is_validated)
select v.professional_name, c.id, v.description, v.experience_years, v.city, v.phone, v.is_premium, true
from public.categories c, (values
  ('Répar Électro Rabat', 'Réparation lave-linge, frigo, four, micro-ondes — toutes marques.', 10, 'Rabat', '+212 6 10 20 30 40', false),
  ('Casa Électro Service', 'Diagnostic gratuit à domicile, devis avant intervention, garantie 6 mois.', 12, 'Casablanca', '+212 6 17 23 31 42', true),
  ('Marrakech Répar Frigo', 'Spécialiste réfrigération, climatiseurs et électroménager froid.', 8, 'Marrakech', '+212 6 24 26 32 44', false),
  ('Tanger Électro Atlas', 'Lave-vaisselle, sèche-linge, plaques de cuisson — réparation rapide.', 7, 'Tanger', '+212 6 31 29 33 46', false),
  ('Fès Service Pro', 'Toutes marques, intervention à domicile sous 48h, pièces d''origine.', 9, 'Fès', '+212 6 38 32 34 48', false),
  ('Agadir Électroménager', 'Garantie sur la main d''œuvre, déplacement offert sur Agadir.', 6, 'Agadir', '+212 6 45 35 35 50', true),
  ('Meknès Répar Service', 'Réparation petits et gros électroménagers, devis transparent.', 5, 'Meknès', '+212 6 52 38 36 52', false)
) as v(professional_name, description, experience_years, city, phone, is_premium)
where c.name = 'Réparation électroménager';

-- Aide à domicile (7 prestataires)
insert into public.providers (professional_name, category_id, description, experience_years, city, phone, is_premium, is_validated)
select v.professional_name, c.id, v.description, v.experience_years, v.city, v.phone, v.is_premium, true
from public.categories c, (values
  ('Aide & Soutien Marrakech', 'Auxiliaire de vie expérimentée, assistance personnes âgées à domicile.', 6, 'Marrakech', '+212 6 10 20 30 40', false),
  ('Casa Confort Senior', 'Garde de jour, aide aux repas, accompagnement médical et courses.', 9, 'Casablanca', '+212 6 17 23 31 42', true),
  ('Rabat Bienveillance', 'Équipe d''aides à domicile diplômées, intervention 7j/7.', 7, 'Rabat', '+212 6 24 26 32 44', true),
  ('Tanger Aide Familiale', 'Maintien à domicile des personnes en perte d''autonomie.', 5, 'Tanger', '+212 6 31 29 33 46', false),
  ('Fès Compagnie', 'Présence, dialogue, soutien moral et stimulation cognitive.', 4, 'Fès', '+212 6 38 32 34 48', false),
  ('Agadir Auxiliaire Vie', 'Aide aux gestes du quotidien, hygiène et soins légers.', 6, 'Agadir', '+212 6 45 35 35 50', false),
  ('Meknès Senior Care', 'Service personnalisé, contrat clair, aide tarifs adaptés.', 3, 'Meknès', '+212 6 52 38 36 52', false)
) as v(professional_name, description, experience_years, city, phone, is_premium)
where c.name = 'Aide à domicile';

-- Installation internet/fibre (7 prestataires)
insert into public.providers (professional_name, category_id, description, experience_years, city, phone, is_premium, is_validated)
select v.professional_name, c.id, v.description, v.experience_years, v.city, v.phone, v.is_premium, true
from public.categories c, (values
  ('Fibre Connect Maroc', 'Installation fibre/ADSL, configuration box et réseaux Wi-Fi domestiques.', 4, 'Tanger', '+212 6 10 20 30 40', true),
  ('Casa Réseaux', 'Câblage Ethernet, Wi-Fi mesh, configuration box opérateur toutes marques.', 6, 'Casablanca', '+212 6 17 23 31 42', true),
  ('Rabat Net Service', 'Optimisation Wi-Fi, ajout amplificateurs, dépannage connexion.', 5, 'Rabat', '+212 6 24 26 32 44', false),
  ('Marrakech Fibre Express', 'Tirage de fibre, installation box, mise en service rapide.', 3, 'Marrakech', '+212 6 31 29 33 46', false),
  ('Fès Connect', 'Réseau Wi-Fi domestique, point d''accès, sécurité du réseau.', 4, 'Fès', '+212 6 38 32 34 48', false),
  ('Agadir Fibre Sud', 'Installation fibre, configuration TV/Internet, câblage maison entière.', 7, 'Agadir', '+212 6 45 35 35 50', true),
  ('Sahara Net', 'Couverture du sud marocain, internet par satellite et fibre.', 5, 'Laâyoune', '+212 6 52 38 36 52', false)
) as v(professional_name, description, experience_years, city, phone, is_premium)
where c.name = 'Installation internet/fibre';

-- ============================================================
-- REVIEWS DE DÉMO
-- ============================================================
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Travail impeccable, équipe ponctuelle et professionnelle.' from public.providers where professional_name = 'Plomberie Express Maroc' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 4, 'Travail bien fait, à recommander.' from public.providers where professional_name = 'Plomberie Express Maroc' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Très satisfait, intervention rapide et soignée.' from public.providers where professional_name = 'Plomberie Express Maroc' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Excellent service, je recommande vivement.' from public.providers where professional_name = 'AquaPlomb Rabat' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 4, 'Service de qualité, équipe sérieuse.' from public.providers where professional_name = 'AquaPlomb Rabat' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Très satisfait, intervention rapide et soignée.' from public.providers where professional_name = 'Atlas Plomberie' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 4, 'Bonne expérience, intervention propre.' from public.providers where professional_name = 'Atlas Plomberie' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Prestation au top, devis respecté.' from public.providers where professional_name = 'Plomb&Co Tanger' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Vraiment professionnel, savoir-faire évident.' from public.providers where professional_name = 'Fès Plombier Pro' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Travail impeccable, équipe ponctuelle et professionnelle.' from public.providers where professional_name = 'Plomberie Agadir Sud' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Excellent service, je recommande vivement.' from public.providers where professional_name = 'Meknès Sanitaires' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Prestation au top, devis respecté.' from public.providers where professional_name = 'Élec Pro Rabat' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Vraiment professionnel, savoir-faire évident.' from public.providers where professional_name = 'Élec Pro Rabat' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Vraiment professionnel, savoir-faire évident.' from public.providers where professional_name = 'Casa Volt Électricité' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Travail impeccable, équipe ponctuelle et professionnelle.' from public.providers where professional_name = 'Lumière Marrakech' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Excellent service, je recommande vivement.' from public.providers where professional_name = 'Tanger Électricité' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Très satisfait, intervention rapide et soignée.' from public.providers where professional_name = 'Fès Power' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Prestation au top, devis respecté.' from public.providers where professional_name = 'Agadir Watt Service' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Excellent service, je recommande vivement.' from public.providers where professional_name = 'Menuiserie El Amrani' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Très satisfait, intervention rapide et soignée.' from public.providers where professional_name = 'Bois & Style Casa' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 4, 'Service de qualité, équipe sérieuse.' from public.providers where professional_name = 'Bois & Style Casa' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Prestation au top, devis respecté.' from public.providers where professional_name = 'Atelier du Bois Rabat' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Vraiment professionnel, savoir-faire évident.' from public.providers where professional_name = 'Menuisier de l''Atlas' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Travail impeccable, équipe ponctuelle et professionnelle.' from public.providers where professional_name = 'Tanger Création Bois' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Excellent service, je recommande vivement.' from public.providers where professional_name = 'Menuiserie Agadir Atlas' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Prestation au top, devis respecté.' from public.providers where professional_name = 'BTP Atlas Construction' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Vraiment professionnel, savoir-faire évident.' from public.providers where professional_name = 'Casa Bâtir' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 4, 'Travail bien fait, à recommander.' from public.providers where professional_name = 'Casa Bâtir' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Travail impeccable, équipe ponctuelle et professionnelle.' from public.providers where professional_name = 'Maçonnerie Rabat Pro' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Excellent service, je recommande vivement.' from public.providers where professional_name = 'Fès Construction' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Très satisfait, intervention rapide et soignée.' from public.providers where professional_name = 'Tanger Bâti' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Travail impeccable, équipe ponctuelle et professionnelle.' from public.providers where professional_name = 'Clim Service Tanger' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Excellent service, je recommande vivement.' from public.providers where professional_name = 'Casa Froid' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 4, 'Bon prestataire, rapport qualité-prix correct.' from public.providers where professional_name = 'Casa Froid' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Très satisfait, intervention rapide et soignée.' from public.providers where professional_name = 'Marrakech Clim Express' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Prestation au top, devis respecté.' from public.providers where professional_name = 'Rabat Cool' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Vraiment professionnel, savoir-faire évident.' from public.providers where professional_name = 'Fès Climatisation Plus' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Travail impeccable, équipe ponctuelle et professionnelle.' from public.providers where professional_name = 'Agadir Froid Sud' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Très satisfait, intervention rapide et soignée.' from public.providers where professional_name = 'CleanHouse Casa' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Prestation au top, devis respecté.' from public.providers where professional_name = 'Rabat Clean' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Vraiment professionnel, savoir-faire évident.' from public.providers where professional_name = 'Rabat Clean' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Vraiment professionnel, savoir-faire évident.' from public.providers where professional_name = 'Marrakech Maison Propre' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Travail impeccable, équipe ponctuelle et professionnelle.' from public.providers where professional_name = 'Tanger Propreté Pro' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Excellent service, je recommande vivement.' from public.providers where professional_name = 'Fès Net Service' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Très satisfait, intervention rapide et soignée.' from public.providers where professional_name = 'Agadir Sparkle' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 4, 'Travail bien fait, à recommander.' from public.providers where professional_name = 'Répar Électro Rabat' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Excellent service, je recommande vivement.' from public.providers where professional_name = 'Casa Électro Service' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 4, 'Bonne expérience, intervention propre.' from public.providers where professional_name = 'Casa Électro Service' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Très satisfait, intervention rapide et soignée.' from public.providers where professional_name = 'Marrakech Répar Frigo' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Prestation au top, devis respecté.' from public.providers where professional_name = 'Tanger Électro Atlas' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Vraiment professionnel, savoir-faire évident.' from public.providers where professional_name = 'Fès Service Pro' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Très satisfait, intervention rapide et soignée.' from public.providers where professional_name = 'Aide & Soutien Marrakech' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Prestation au top, devis respecté.' from public.providers where professional_name = 'Casa Confort Senior' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Vraiment professionnel, savoir-faire évident.' from public.providers where professional_name = 'Casa Confort Senior' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Vraiment professionnel, savoir-faire évident.' from public.providers where professional_name = 'Rabat Bienveillance' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Travail impeccable, équipe ponctuelle et professionnelle.' from public.providers where professional_name = 'Tanger Aide Familiale' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Excellent service, je recommande vivement.' from public.providers where professional_name = 'Fès Compagnie' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Vraiment professionnel, savoir-faire évident.' from public.providers where professional_name = 'Fibre Connect Maroc' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Travail impeccable, équipe ponctuelle et professionnelle.' from public.providers where professional_name = 'Casa Réseaux' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Excellent service, je recommande vivement.' from public.providers where professional_name = 'Casa Réseaux' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Excellent service, je recommande vivement.' from public.providers where professional_name = 'Rabat Net Service' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Très satisfait, intervention rapide et soignée.' from public.providers where professional_name = 'Marrakech Fibre Express' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Prestation au top, devis respecté.' from public.providers where professional_name = 'Fès Connect' limit 1;
insert into public.reviews (provider_id, rating, comment) select id, 5, 'Vraiment professionnel, savoir-faire évident.' from public.providers where professional_name = 'Agadir Fibre Sud' limit 1;

-- ============================================================
-- ADS
-- ============================================================
delete from public.ads where title like '%— Outillage pro à prix discount' or title like 'Maison & Jardin —%' or title like 'Assurance Habitation Atlas';
insert into public.ads (title, description, position, active) values
  ('Brico Maroc — Outillage pro à prix discount', 'Tous les outils pour pros et particuliers', 'home',      true),
  ('Maison & Jardin — Soldes du moment',          '−30 % sur le mobilier d''extérieur',       'providers', true),
  ('Assurance Habitation Atlas',                  'Protégez votre logement dès 99 DH/mois',   'home',      true);
