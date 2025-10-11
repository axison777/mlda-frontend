# 🎯 MLDA - Mode Démonstration

## 📋 Vue d'ensemble

Cette plateforme d'apprentissage du français est maintenant configurée en **mode démonstration** avec des données de test simulées. Tous les appels d'API ont été remplacés par un système de données mock pour permettre une présentation fluide sans backend.

## 🚀 Démarrage rapide

1. **Installer les dépendances** (si pas déjà fait) :
   ```bash
   npm install
   ```

2. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```

3. **Ouvrir dans le navigateur** :
   ```
   http://localhost:5173
   ```

## 🔐 Comptes de démonstration

### 👨‍💼 Administrateur
- **Email** : `admin@mlda.com`
- **Mot de passe** : `password123`
- **Accès** : Gestion complète de la plateforme

### 👨‍🏫 Professeur
- **Email** : `prof1@mlda.com`
- **Mot de passe** : `password123`
- **Accès** : Gestion des cours et étudiants

### 👨‍🎓 Étudiant
- **Email** : `student1@mlda.com`
- **Mot de passe** : `password123`
- **Accès** : Cours et progression

## 🎨 Fonctionnalités disponibles

### ✅ Authentification
- Connexion/Inscription
- Gestion des rôles (Admin, Professeur, Étudiant)
- Boutons de connexion rapide sur la page de login

### ✅ Gestion des cours
- Liste des cours avec filtres
- Détails des cours
- Création/Modification/Suppression (Admin/Prof)
- Système de niveaux (Débutant, Intermédiaire, Avancé)

### ✅ Système d'apprentissage
- Leçons avec différents types (Vidéo, Texte, Quiz, Devoir)
- Suivi de progression
- Système d'inscription aux cours

### ✅ Gestion des utilisateurs
- Liste des utilisateurs avec filtres
- Profils détaillés
- Gestion des rôles et statuts

### ✅ Produits/Boutique
- Catalogue de produits
- Gestion des produits (Admin)
- Système de catégories

### ✅ Tableaux de bord
- Statistiques personnalisées par rôle
- Métriques de performance
- Données de revenus (Admin/Prof)

### ✅ Notifications
- Centre de notifications
- Système de messages

## 📊 Données de test incluses

- **6 utilisateurs** (1 admin, 2 profs, 3 étudiants)
- **4 cours** de français avec différents niveaux
- **5 leçons** réparties sur les cours
- **3 produits** dans la boutique
- **4 inscriptions** d'étudiants
- **Statistiques complètes** pour chaque rôle

## 🔧 Architecture technique

### Fichiers modifiés
- `src/lib/api.ts` → Redirige vers le client mock
- `src/lib/mockApi.ts` → Client API simulé
- `src/lib/mockData.ts` → Données de test
- `src/lib/testCredentials.ts` → Identifiants de démonstration
- `src/pages/auth/LoginPage.tsx` → Boutons de connexion rapide
- `src/pages/auth/SignupPage.tsx` → Message d'information

### Fonctionnalités mock
- ✅ Délais de réponse simulés (200-700ms)
- ✅ Gestion d'erreurs simulées
- ✅ Pagination et recherche
- ✅ Persistance des données en mémoire
- ✅ Authentification simulée
- ✅ Gestion des rôles

## 🎯 Points de démonstration recommandés

1. **Page d'accueil** → Navigation et présentation
2. **Connexion** → Utiliser les boutons de connexion rapide
3. **Tableau de bord** → Montrer les statistiques par rôle
4. **Gestion des cours** → Créer/modifier des cours
5. **Apprentissage** → S'inscrire et suivre un cours
6. **Gestion des utilisateurs** → Lister et gérer les utilisateurs
7. **Boutique** → Parcourir les produits

## 🚨 Notes importantes

- **Toutes les données sont simulées** et ne persistent pas entre les sessions
- **Les mots de passe** sont simplifiés pour la démonstration
- **Les images** utilisent des URLs d'exemple (Unsplash)
- **Les vidéos** sont des URLs factices
- **Aucune donnée réelle** n'est envoyée à un serveur

## 🔄 Retour au mode production

Pour revenir au mode production avec un vrai backend :

1. Restaurer le fichier `src/lib/api.ts` original
2. Configurer les variables d'environnement
3. Démarrer le serveur backend
4. Supprimer les fichiers mock

---

**Prêt pour la démonstration ! 🎉**