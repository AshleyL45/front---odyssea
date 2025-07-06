
# ReadMe Front-end 

Ce projet est une application React permettant aux utilisateurs de réserver des voyages autour du monde haut de gamme et personnalisés. Réalisé en groupe, l'objectif était de proposer une expérience utilisateur optimale grâce à un site web sobre, élégant et intuitif.

## Équipe

Kenza Chrifi - Web Designer / Directrice Artistique / Conceptrice => Front-end

Liliana Amangoua - Scrum Master / Responsable Debuggage => Fullstack

Ashley Labory - Cheffe de Projet / Référente Git => Back-end

## Fonctionnalités :

- Ajouter des itinéraires en favoris : Les utilisateurs peuvent sauvegarder les voyages qui les intéressent afin de les retrouver facilement pour consultation ou réservation ultérieure;

- Réserver des itinéraires standards ou personnalisés : Les utilisateurs peuvent réserver directement des voyages prédéfinis ou composer leurs propres itinéraires en sélectionnant les destinations, hôtels, activités et options souhaitées;

- Découvrir et réserver des itinéraires mystère : Une fonctionnalité permettant aux utilisateurs de réserver des voyages surprises, où les destinations et activités sont révélées seulement après la réservation, apportant une dimension de découverte et de surprise;

- Gérer ses réservations et favoris via un tableau de bord interactif : Chaque utilisateur bénéficie d'un tableau de bord personnel clair et interactif pour suivre facilement ses réservations, gérer ses favoris, et consulter les détails de ses prochains voyages.

## Technologies utilisées

- React 

- TypeScript 

- MUI 

- Leaflet 

- Swiper 

- Axios 

- Figma
## Structure

```bash
├── .gitattributes
├── .gitignore
├── .idea
│   ├── .gitignore
│   ├── dataSources.xml
│   ├── front-odyssea.iml
│   ├── inspectionProfiles
│   │   └── Project_Default.xml
│   ├── material_theme_project_new.xml
│   ├── modules.xml
│   └── vcs.xml
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── carouselImages.json
│   ├── favicon.ico
│   ├── index.html
│   ├── logo-odyssea-symbol.png
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── @types
│   │   ├── City.ts
│   │   ├── Country.ts
│   │   ├── DailyPlanWithCityDto.ts
│   │   ├── ItineraryDetailsResponse.ts
│   │   ├── Option.ts
│   │   ├── PersonalizeTrip.ts
│   │   ├── MyBookings.ts
│   │   ├── ReservationRequest.ts
│   │   ├── Trip.ts
│   │   └── type.ts
│   ├── API
│   │   └── api.ts
│   ├── components
│   ├── pages
│   ├── assets
│   ├── contexts
│   ├── images
│   ├── layout
│   ├── styles
│   ├── App.tsx
│   ├── index.tsx
│   └── react-app-env.d.ts
└── tsconfig.json
```

## Installation

Clonez le projet et installez les dépendances :

```
git clone front---odyssea
cd front---odyssea
npm install
```

Démarrez le serveur local :

```
npm start
```


Accédez à l'application sur : http://localhost:3000

## Méthodologie de gestion de projet

Application de la méthode Kanban pour un flux de travail continu.

Utilisation de l'outil Trello pour organiser les tâches : "À faire", "En cours", "Terminé".
