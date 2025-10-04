# Guide de Démarrage du Backend - Plateforme MLDA

Ce document explique comment installer, configurer et lancer le serveur backend de la plateforme de formation en ligne MLDA.

## 1. Prérequis

Avant de commencer, assurez-vous d'avoir installé les logiciels suivants sur votre machine :

-   **Node.js** (version 16 ou supérieure recommandée)
-   **npm** (généralement inclus avec Node.js)
-   **Un serveur de base de données MySQL** (par exemple, via WAMP, MAMP, XAMPP, ou une installation Docker)

## 2. Installation

Suivez ces étapes pour préparer votre environnement de développement.

### a. Installation des dépendances

Placez-vous dans le dossier `backend` et installez toutes les dépendances du projet avec npm.

```bash
cd backend
npm install
```

### b. Configuration de l'environnement

Le backend a besoin d'un fichier `.env` pour stocker les informations sensibles comme les identifiants de la base de données.

1.  **Créez un fichier `.env`** à la racine du dossier `backend`.
2.  **Copiez le contenu** du fichier `.env.example` (s'il existe) ou utilisez le modèle ci-dessous et collez-le dans votre nouveau fichier `.env`.

```dotenv
# =================================================
# ==           VARIABLES D'ENVIRONNEMENT         ==
# =================================================

# --- Base de données (à remplacer par vos informations) ---
# Format: mysql://USER:PASSWORD@HOST:PORT/DATABASE
DATABASE_URL="mysql://root:password@localhost:3306/mlda_db"

# --- Authentification ---
# Changez cette clé secrète pour une chaîne de caractères longue et aléatoire !
JWT_SECRET="votre_secret_jwt_super_secret_a_changer"
JWT_EXPIRES_IN="7d"

# --- Serveur ---
PORT=3000
```

3.  **Mettez à jour la variable `DATABASE_URL`** avec les informations de connexion de votre propre serveur MySQL.

## 3. Configuration de la Base de Données

### a. Création de la base de données

Assurez-vous que la base de données que vous avez spécifiée dans `DATABASE_URL` (par exemple, `mlda_db`) existe bien sur votre serveur MySQL. Si ce n'est pas le cas, créez-la.

### b. Application des migrations

Une fois votre fichier `.env` configuré et votre base de données créée, vous devez créer les tables et les colonnes. Prisma, notre ORM, s'en charge automatiquement.

Exécutez la commande suivante depuis le dossier `backend` :

```bash
npx prisma migrate dev
```

Cette commande va :
-   Lire le fichier `prisma/schema.prisma`.
-   Comparer le schéma avec l'état de votre base de données.
-   Générer et exécuter les requêtes SQL nécessaires pour créer toutes les tables.

## 4. Lancer le Serveur

Vous avez deux options pour lancer le serveur :

### a. En mode développement

C'est le mode recommandé pour travailler sur le code. Il utilise `nodemon` pour redémarrer automatiquement le serveur à chaque modification de fichier.

```bash
npm run dev
```

### b. En mode production

Pour un déploiement en production, vous devez d'abord compiler le code TypeScript en JavaScript, puis lancer le serveur.

```bash
# 1. Compiler le code
npm run build

# 2. Démarrer le serveur
npm run start
```

## 5. Accéder à l'API et à la Documentation

Une fois le serveur lancé (en mode `dev` ou `start`) :

-   **L'API** est accessible à l'adresse : `http://localhost:3000/api`
-   **La documentation Swagger interactive** est disponible ici : `http://localhost:3000/api-docs`

Vous pouvez utiliser l'interface Swagger pour explorer visuellement tous les points d'API, voir leurs paramètres, et même les tester directement depuis votre navigateur. C'est l'outil idéal pour comprendre le fonctionnement du backend.