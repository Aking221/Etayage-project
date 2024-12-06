# Test Usage API - Dashboard Application

## Objectif
Ce projet répond aux exigences du test technique visant à démontrer l'autonomie et les compétences techniques dans l'utilisation des API pour concevoir une application minimaliste mais complète. L'objectif était d'intégrer et de mettre en valeur un jeu de données issu de l'opendata à travers une interface conviviale.

---

## Fonctionnalités principales

### 1. Buses en temps réel
- Affichage des horaires des prochains passages de bus via l'API STAR (Rennes Métropole).

### 2. Places de parking disponibles
- Visualisation des parkings disponibles ainsi que leurs tarifs en temps réel via l'API Citedia.

### 3. Planificateur de trajets (Section Trip)
- Permet de planifier un itinéraire avec les options suivantes :
  - Bus.
  - Parking.
  - Services de proximité.
- **Limitation actuelle** : Bien que fonctionnelle, cette section peut être optimisée pour des recommandations personnalisées.

### 4. Visualisation sur carte interactive
- Utilisation de **React-Leaflet** pour afficher :
  - Arrêts de bus.
  - Parkings disponibles.
  - Autres services de proximité.

---

## Architecture du projet

### Backend
- Framework : **Node.js (Express)**
- Responsabilités :
  - Gestion des appels API.
  - Traitement des réponses JSON.
  - Logique métier.

### Frontend
- Framework : **React**
- Fonctionnalités :
  - Interface utilisateur réactive.
  - Gestion de l'état avec **React Context**.

### Styling
- **SCSS** : Gestion modulable des styles et variables.

### Packaging et déploiement
- Conteneurisation avec **Docker**.
- Commandes `docker-compose` pour synchroniser le backend et le frontend.

---

## Prérequis
- **Installer Docker** : [Lien vers Docker](https://www.docker.com/).
- **Cloner le dépôt Git** :
```bash
  git clone https://github.com/Aking221/Etayage-project
```

---

## Lancer l'application

### 1. Construire et lancer les conteneurs
```bash
  docker-compose up
```

### 2. Accéder à l'application
- **Backend** : [http://localhost:3001](http://localhost:3001)
- **Frontend** : [http://localhost:3000](http://localhost:3000)

---

## Documentation incluse
- **README.md** : Guide complet pour exécuter l'application.
- **docker-compose.yml** : Script pour déployer l'application.
- **Code source** : Commenté pour faciliter la compréhension et la maintenance.

---

## Améliorations futures

### Section "Trip"
- **Optimisation des trajets** :
  - Calcul avancé pour recommander des itinéraires personnalisés.
  - Combinaison des modes de transport.

- **Filtrage avancé** :
  - Ajouter des options pour les préférences utilisateur (temps, coût, accessibilité).

- **Intégration cartographique dynamique** :
  - Afficher les itinéraires optimisés directement sur la carte.

---

## Défis rencontrés
- **Gestion des erreurs API** :
  - Gestion des indisponibilités temporaires des services tiers.

- **Synchronisation backend/frontend** :
  - Conception et test simultanés des deux services pour une cohérence parfaite.

---

## Résultats obtenus

### Niveau d'atteinte du résultat
- **Atteint** : L'application répond à toutes les contraintes avec une interface intuitive et des données en temps réel.
- **Dépassement** : Ajout d'une carte interactive pour améliorer l'expérience utilisateur.

### Qualité
- **Démarche structurée** :
  - Pratiques modernes et modularité du code.
- **Conception réutilisable** :
  - Composants isolés et extensibles.

---

## Conclusion
Cette application montre la capacité à transformer des données open data en une solution utile, autonome et documentée. Avec des améliorations prévues, notamment pour la section "Trip", l'application pourrait devenir un outil encore plus puissant pour les utilisateurs.
