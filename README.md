# 🧠 WorkSphere - Virtual Workspace

## 🎯 Objectif du projet
WorkSphere est une application web interactive de gestion du personnel en temps réel. Elle permet d’ajouter, déplacer et supprimer des employés sur un plan d’étage, tout en respectant les règles métier liées aux rôles et aux zones autorisées. Le projet vise à offrir une interface moderne, responsive et intuitive accessible sur tous les appareils.

## 🏢 Contexte
L’entreprise WorkSphere souhaite optimiser la gestion visuelle de ses espaces de travail. Cette application centralise la répartition spatiale des employés et les données RH dans une seule plateforme.

## 🛠️ Technologies utilisées
- HTML5 / CSS3 / JavaScript
- Tailwind CSS
- Git & GitHub
- Flexbox & Grid
- Regex pour validation
- LocalStorage (bonus)
- GitHub Pages / Vercel (déploiement)

## 📐 Fonctionnalités principales
- Ajout d’employés via une modale avec prévisualisation de photo
- Formulaire dynamique pour les expériences professionnelles
- Validation des champs avec REGEX
- Affichage du plan d’étage avec 6 zones :
  - Salle de conférence
  - Réception
  - Salle des serveurs
  - Salle de sécurité
  - Salle du personnel
  - Salle d’archives
- Restrictions d’accès selon le rôle
- Drag & Drop des employés (bonus)
- Profil détaillé des employés
- Boutons “+” et “X” pour assigner ou retirer un employé
- Responsive design pour tous les formats d’écran
- Sauvegarde automatique dans le localStorage (bonus)
- Mode “Réorganisation automatique” (bonus)

## 📱 Responsive Design
| Appareil              | Largeur écran        |
|----------------------|----------------------|
| Grand écran desktop  | > 1280px             |
| Petit écran desktop  | 1024px – 1279px      |
| Tablette (portrait)  | 768px – 1023px       |
| Mobile (portrait)    | < 767px              |
| Mobile (paysage)     | 768px – 1023px       |
| Tablette (paysage)   | 1024px – 1279px      |

## 📋 User Stories
- Interface intuitive et fluide
- Palette de couleurs cohérente
- Design moderne avec formes arrondies et boutons colorés
- Gestion des employés non assignés
- Zones vides obligatoires en rouge pâle
- Limitation du nombre d’employés par zone
- Recherche et filtrage par nom ou rôle (bonus)
- Photo par défaut pour les employés sans image (bonus)

## 📦 Installation
```bash
git clone https://github.com/votre-utilisateur/worksphere.git
cd worksphere
npm install


├── dist/
│   └── output.css
├── images/
├── node_modules/
├── src/
│   └── index.html
├── index.js
├── style.css
├── tailwind.config.js
├── package.json
└── README.md


