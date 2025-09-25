### **Workflow et Flux de Données**

#### **Scénario 1 : Inscription d'un nouvel utilisateur (`Signup`)**

Ce workflow décrit ce qui se passe lorsqu'un visiteur remplit le formulaire d'inscription et crée un compte.

1.  **Frontend (Interface Utilisateur)**
    *   Un utilisateur se rend sur la `SignupPage.tsx`.
    *   Il remplit les champs : prénom, nom, email, mot de passe.
    *   Il clique sur le bouton "S'inscrire".

2.  **Frontend (Logique d'Appel API)**
    *   Une fonction dans le composant React appelle `apiClient.register()` depuis `src/lib/api.ts`, en lui passant les données de l'utilisateur.

3.  **Transit Réseau**
    *   Le `apiClient` envoie une requête `POST` à l'URL du backend : `http://localhost:3000/api/auth/register`. Le corps de la requête contient les données de l'utilisateur au format JSON.

4.  **Backend (Serveur Express.js)**
    *   **Routeur (`auth.routes.ts`)** : Le serveur Express reçoit la requête et, en se basant sur le chemin `/auth/register`, la dirige vers le contrôleur d'authentification.
    *   **Contrôleur (`auth.controller.ts`)** : La fonction `register` du contrôleur est exécutée. Elle utilise **Zod** pour valider que les données reçues (email, mot de passe, etc.) sont bien formatées. Si la validation échoue, il renvoie une erreur 400.
    *   **Service (`auth.service.ts`)** : Si les données sont valides, le contrôleur appelle la fonction `registerUser` du service d'authentification.
        *   Le service **hache le mot de passe** de l'utilisateur avec une bibliothèque comme `bcrypt` pour ne jamais le stocker en clair.
        *   Il appelle le client Prisma pour créer un nouvel utilisateur dans la base de données.
    *   **ORM (Prisma)** : Prisma traduit l'appel du service en une requête SQL `INSERT INTO User (...) VALUES (...)`.

5.  **Base de Données (MySQL)**
    *   La base de données exécute la requête `INSERT` et crée une nouvelle ligne dans la table `User`. Elle retourne l'ID du nouvel utilisateur.

6.  **Retour du Flux**
    *   **ORM (Prisma)** : Prisma reçoit la confirmation de la base de données et retourne l'objet `User` complet au service.
    *   **Service (`auth.service.ts`)** : Le service génère un **JSON Web Token (JWT)** qui contient l'ID et le rôle de l'utilisateur. Ce token servira à authentifier ses futures requêtes.
    *   **Contrôleur (`auth.controller.ts`)** : Le contrôleur reçoit l'objet utilisateur et le token. Il prépare une réponse JSON.
    *   **Serveur Express.js** : Le serveur envoie une réponse `201 Created` au frontend, avec `{ user, token }` dans le corps de la réponse.

7.  **Frontend (Mise à jour de l'état)**
    *   Le `apiClient` reçoit la réponse.
    *   Le `authStore` (Zustand) est utilisé pour stocker le token (dans `localStorage` pour la persistance) et les informations de l'utilisateur dans l'état global de l'application.
    *   L'utilisateur est automatiquement connecté et redirigé vers son tableau de bord (`StudentDashboard.tsx`).

#### **Scénario 2 : Marquer une leçon comme "Terminée"**

Ce workflow décrit ce qui se passe quand un étudiant clique sur un bouton pour valider une leçon.

1.  **Frontend (Interface Utilisateur)**
    *   Un étudiant est sur la page d'un cours (`ContinueCourse.tsx`).
    *   Il clique sur le bouton "Marquer comme terminée" à côté d'une leçon.

2.  **Frontend (Logique d'Appel API)**
    *   Une fonction appelle `apiClient.updateLessonProgress()` avec l'ID de la leçon et `{ completed: true }`.
    *   Le `apiClient` ajoute automatiquement le **JWT** de l'utilisateur (stocké lors du login) dans l'en-tête `Authorization: Bearer <token>` de la requête.

3.  **Transit Réseau**
    *   Le `apiClient` envoie une requête `POST` à `http://localhost:3000/api/progress/lesson/:lessonId`.

4.  **Backend (Serveur Express.js)**
    *   **Routeur (`progress.routes.ts`)** : La requête est dirigée vers la route correspondante.
    *   **Middleware (`auth.middleware.ts`)** : **AVANT** d'atteindre le contrôleur, le middleware d'authentification s'exécute.
        *   Il vérifie la présence et la validité du JWT dans l'en-tête.
        *   Si le token est valide, il décode l'ID de l'utilisateur et l'attache à l'objet `request` (ex: `req.user`).
        *   Si le token est invalide ou absent, il renvoie une erreur 401 Unauthorized.
    *   **Contrôleur (`progress.controller.ts`)** : La fonction `updateProgress` est exécutée. Elle récupère l'ID de l'utilisateur depuis `req.user` et l'ID de la leçon depuis les paramètres de l'URL.
    *   **Service (`progress.service.ts`)** : Le contrôleur appelle le service.
        *   Le service utilise Prisma pour créer ou mettre à jour l'entrée dans la table `LessonProgress` correspondant à cet utilisateur et cette leçon.
        *   Ensuite, il recalcule le pourcentage de progression global pour le cours (nombre de leçons terminées / nombre total de leçons) et met à jour le champ `progress` dans la table `Enrollment`.
    *   **ORM (Prisma)** : Prisma génère et exécute les requêtes SQL `UPDATE` ou `INSERT` nécessaires sur les tables `LessonProgress` et `Enrollment`.

5.  **Base de Données (MySQL)**
    *   Les enregistrements sont mis à jour.

6.  **Retour du Flux**
    *   Prisma retourne les données mises à jour au service, qui les passe au contrôleur.
    *   Le contrôleur envoie une réponse `200 OK` avec les nouvelles données de progression.

7.  **Frontend (Mise à jour de l'UI)**
    *   Le `apiClient` reçoit la réponse.
    *   L'état local ou global du composant est mis à jour.
    *   L'interface se rafraîchit : l'icône de la leçon passe au vert, la barre de progression du cours avance.