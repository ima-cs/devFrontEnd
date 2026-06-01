-- ServicePro — Données de démonstration
-- À exécuter UNE FOIS dans le SQL Editor de Supabase, après schema.sql.
-- Les providers/reviews/ads de démo ont user_id NULL : ils s'affichent sans authentification.

-- ============================================================
-- CATEGORIES
-- ============================================================
insert into public.categories (name, description) values
  ('Plomberie',                  'Installation, réparation et entretien sanitaire'),
  ('Électricité',                'Installation électrique, dépannage, mise aux normes'),
  ('Menuiserie',                 'Bois, portes, fenêtres, meubles sur mesure'),
  ('Maçonnerie',                 'Construction, rénovation, gros œuvre'),
  ('Climatisation',              'Installation et entretien de systèmes de climatisation'),
  ('Nettoyage',                  'Ménage à domicile, entretien de bureaux'),
  ('Réparation électroménager', 'Réfrigérateur, lave-linge, four, etc.'),
  ('Aide à domicile',            'Assistance aux personnes âgées ou en perte d''autonomie'),
  ('Installation internet/fibre','Câblage, configuration et mise en service')
on conflict (name) do nothing;

-- ============================================================
-- PROVIDERS DE DÉMO
-- ============================================================
insert into public.providers (professional_name, category_id, description, experience_years, city, phone, is_premium, is_validated)
select 'Plomberie Express Maroc', id,
       'Spécialiste en dépannage rapide 24h/24 — fuites, débouchage, chauffe-eau.',
       12, 'Casablanca', '+212 6 11 22 33 44', true, true
from public.categories where name = 'Plomberie';

insert into public.providers (professional_name, category_id, description, experience_years, city, phone, is_premium, is_validated)
select 'Élec Pro Rabat', id,
       'Électricien certifié. Installations neuves, mise aux normes, dépannage urgent.',
       8, 'Rabat', '+212 6 22 33 44 55', true, true
from public.categories where name = 'Électricité';

insert into public.providers (professional_name, category_id, description, experience_years, city, phone, is_premium, is_validated)
select 'Menuiserie El Amrani', id,
       'Menuisier ébéniste artisan. Meubles sur mesure, restauration de boiseries.',
       20, 'Fès', '+212 6 33 44 55 66', false, true
from public.categories where name = 'Menuiserie';

insert into public.providers (professional_name, category_id, description, experience_years, city, phone, is_premium, is_validated)
select 'BTP Atlas Construction', id,
       'Maçonnerie générale, gros œuvre et rénovation complète clé en main.',
       15, 'Marrakech', '+212 6 44 55 66 77', true, true
from public.categories where name = 'Maçonnerie';

insert into public.providers (professional_name, category_id, description, experience_years, city, phone, is_premium, is_validated)
select 'Clim Service Tanger', id,
       'Installation, maintenance et réparation toutes marques (LG, Samsung, Daikin).',
       7, 'Tanger', '+212 6 55 66 77 88', false, true
from public.categories where name = 'Climatisation';

insert into public.providers (professional_name, category_id, description, experience_years, city, phone, is_premium, is_validated)
select 'CleanHouse Casa', id,
       'Service de nettoyage à domicile, équipe formée et assurée.',
       5, 'Casablanca', '+212 6 66 77 88 99', false, true
from public.categories where name = 'Nettoyage';

insert into public.providers (professional_name, category_id, description, experience_years, city, phone, is_premium, is_validated)
select 'Répar Électro Rabat', id,
       'Réparation lave-linge, frigo, four, micro-ondes — toutes marques.',
       10, 'Rabat', '+212 6 77 88 99 00', false, true
from public.categories where name = 'Réparation électroménager';

insert into public.providers (professional_name, category_id, description, experience_years, city, phone, is_premium, is_validated)
select 'Aide & Soutien Marrakech', id,
       'Auxiliaire de vie expérimentée, assistance personnes âgées à domicile.',
       6, 'Marrakech', '+212 6 88 99 00 11', false, true
from public.categories where name = 'Aide à domicile';

insert into public.providers (professional_name, category_id, description, experience_years, city, phone, is_premium, is_validated)
select 'Fibre Connect Maroc', id,
       'Installation fibre/ADSL, configuration box et réseaux Wi-Fi domestiques.',
       4, 'Tanger', '+212 6 99 00 11 22', true, true
from public.categories where name = 'Installation internet/fibre';

-- ============================================================
-- REVIEWS DE DÉMO
-- ============================================================
insert into public.reviews (provider_id, rating, comment)
select id, 5, 'Très professionnel, intervention rapide et propre. Je recommande !'
from public.providers where professional_name = 'Plomberie Express Maroc';

insert into public.reviews (provider_id, rating, comment)
select id, 4, 'Bon travail, respectueux du devis. Petit retard sur la date.'
from public.providers where professional_name = 'Plomberie Express Maroc';

insert into public.reviews (provider_id, rating, comment)
select id, 5, 'Deuxième fois que je fais appel à eux, toujours impeccable.'
from public.providers where professional_name = 'Plomberie Express Maroc';

insert into public.reviews (provider_id, rating, comment)
select id, 5, 'Excellent électricien, travail soigné aux normes.'
from public.providers where professional_name = 'Élec Pro Rabat';

insert into public.reviews (provider_id, rating, comment)
select id, 5, 'Travail magnifique sur ma bibliothèque sur mesure, qualité exceptionnelle.'
from public.providers where professional_name = 'Menuiserie El Amrani';

insert into public.reviews (provider_id, rating, comment)
select id, 4, 'Équipe sérieuse, chantier livré dans les temps.'
from public.providers where professional_name = 'BTP Atlas Construction';

insert into public.reviews (provider_id, rating, comment)
select id, 5, 'Installation clim parfaite, prix correct.'
from public.providers where professional_name = 'Clim Service Tanger';

insert into public.reviews (provider_id, rating, comment)
select id, 4, 'Service correct, équipe ponctuelle.'
from public.providers where professional_name = 'CleanHouse Casa';

insert into public.reviews (provider_id, rating, comment)
select id, 3, 'Réparation OK mais délai d''attente un peu long.'
from public.providers where professional_name = 'Répar Électro Rabat';

insert into public.reviews (provider_id, rating, comment)
select id, 5, 'Très bienveillante avec ma mère, je suis rassurée.'
from public.providers where professional_name = 'Aide & Soutien Marrakech';

insert into public.reviews (provider_id, rating, comment)
select id, 5, 'Installation fibre rapide, technicien à l''écoute.'
from public.providers where professional_name = 'Fibre Connect Maroc';

-- ============================================================
-- ADS
-- ============================================================
insert into public.ads (title, description, position, active) values
  ('Brico Maroc — Outillage pro à prix discount', 'Tous les outils pour pros et particuliers', 'home',      true),
  ('Maison & Jardin — Soldes du moment',          '−30 % sur le mobilier d''extérieur',       'providers', true),
  ('Assurance Habitation Atlas',                  'Protégez votre logement dès 99 DH/mois',   'home',      true);
