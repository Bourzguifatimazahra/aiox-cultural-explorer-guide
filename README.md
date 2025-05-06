
# AIOX Explorer - Guide Culturel du Maroc

## À propos du projet

AIOX Explorer est une application web qui permet aux utilisateurs de découvrir le riche patrimoine culturel du Maroc. Notre plateforme offre:

- **Exploration culturelle**: Découvrez les sites historiques, les traditions et la cuisine marocaine
- **Planification de voyage personnalisée**: Créez des itinéraires sur mesure pour votre visite au Maroc
- **Blog & Articles**: Accédez à des contenus riches sur la culture marocaine
- **Interface interactive**: Navigation intuitive et responsive pour tous les appareils

## Fonctionnalités principales

- 🗺️ **Exploration géographique**: Carte interactive des lieux culturels 
- 🧳 **Plan de voyage**: Création d'itinéraires personnalisés
- 📝 **Blog**: Articles sur la culture, l'histoire et les traditions marocaines
- 👤 **Profil utilisateur**: Espace personnel pour sauvegarder vos favoris
- 🔍 **Recherche avancée**: Trouvez rapidement des informations spécifiques

## Technologies utilisées

Ce projet est construit avec:

- **Vite**: Environnement de développement rapide
- **TypeScript**: Typage statique pour plus de robustesse
- **React**: Bibliothèque UI pour construire des interfaces utilisateur
- **shadcn-ui**: Composants UI personnalisables et accessibles
- **Tailwind CSS**: Framework CSS utilitaire pour un design responsive
- **React Router**: Navigation entre les pages
- **Tanstack Query**: Gestion des requêtes de données

## Comment exécuter le projet localement

Prérequis: Node.js & npm doivent être installés - [installer avec nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

```sh
# Étape 1: Cloner le dépôt
git clone <URL_DU_PROJET_GIT>

# Étape 2: Naviguer vers le répertoire du projet
cd aiox-explorer

# Étape 3: Installer les dépendances nécessaires
npm i

# Étape 4: Démarrer le serveur de développement
npm run dev
```

## Déploiement

Pour déployer ce projet:

1. Ouvrez [Lovable](https://lovable.dev/projects/e42ab9ba-3615-467a-aee2-0c67c0d88c67)
2. Cliquez sur Partager -> Publier

## Structure du projet

```
src/
├── components/      # Composants UI réutilisables
├── hooks/           # Hooks personnalisés React
├── lib/             # Utilitaires et fonctions d'aide
├── pages/           # Composants de page pour chaque route
└── main.tsx         # Point d'entrée de l'application
```

## Personnalisation du domaine

Vous pouvez connecter un domaine personnalisé à votre projet Lovable:

1. Accédez à Projet > Paramètres > Domaines
2. Cliquez sur Connecter un Domaine
3. Suivez les instructions pour configurer votre domaine personnalisé

Pour plus d'informations: [Configuration d'un domaine personnalisé](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Licence

Ce projet est sous licence MIT.
