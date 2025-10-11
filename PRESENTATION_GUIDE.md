# 🎯 Guide de Présentation - MLDA

## 🚀 Démarrage Rapide

1. **Lancer la plateforme** :
   ```bash
   npm run dev
   ```

2. **Ouvrir dans le navigateur** :
   ```
   http://localhost:5173
   ```

## 🎭 Scénario de Démonstration (15-20 minutes)

### 1. Introduction (2 minutes)
- **Page d'accueil** : Présenter la plateforme et ses fonctionnalités
- **Navigation** : Montrer les différentes sections disponibles
- **Design** : Mettre en avant l'interface moderne et intuitive

### 2. Authentification (2 minutes)
- **Page de connexion** : Expliquer les 3 types d'utilisateurs
- **Boutons de démonstration** : Utiliser les boutons de connexion rapide
- **Rôles** : Expliquer les différences entre Admin, Professeur, Étudiant

### 3. Tableau de Bord Admin (3 minutes)
- **Statistiques** : Montrer les métriques clés
- **Graphiques** : Expliquer les visualisations de données
- **Navigation** : Parcourir les différentes sections de gestion

### 4. Gestion des Cours (4 minutes)
- **Liste des cours** : Montrer les cours existants
- **Création** : Créer un nouveau cours (démonstration)
- **Modification** : Éditer un cours existant
- **Filtres** : Utiliser les filtres de recherche

### 5. Gestion des Utilisateurs (3 minutes)
- **Liste des utilisateurs** : Montrer les différents profils
- **Détails** : Examiner un profil utilisateur
- **Gestion des rôles** : Expliquer le système de permissions

### 6. Expérience Étudiant (4 minutes)
- **Connexion étudiant** : Se connecter en tant qu'étudiant
- **Catalogue** : Parcourir les cours disponibles
- **Inscription** : S'inscrire à un cours
- **Progression** : Montrer le suivi d'apprentissage

### 7. Boutique/Produits (2 minutes)
- **Catalogue produits** : Montrer les produits disponibles
- **Gestion** : Expliquer la gestion des produits (Admin)

## 🔑 Points Clés à Mettre en Avant

### ✅ Fonctionnalités Techniques
- **Interface responsive** et moderne
- **Système de rôles** complet
- **Gestion des cours** avancée
- **Suivi de progression** détaillé
- **Système de notifications**
- **Tableaux de bord** personnalisés

### ✅ Expérience Utilisateur
- **Navigation intuitive**
- **Design cohérent**
- **Feedback visuel** (toasts, animations)
- **Gestion d'erreurs** élégante
- **Chargement** avec indicateurs

### ✅ Architecture
- **Frontend React** moderne
- **TypeScript** pour la robustesse
- **Hooks personnalisés** pour la logique métier
- **Système de routing** avancé
- **Gestion d'état** avec Zustand

## 🎯 Messages Clés

1. **"Plateforme complète"** : Tous les aspects d'une plateforme d'apprentissage
2. **"Interface moderne"** : Design professionnel et intuitif
3. **"Fonctionnalités avancées"** : Gestion complète des utilisateurs et cours
4. **"Prête pour la production"** : Architecture solide et extensible

## 🚨 Points d'Attention

- **Toujours mentionner** que c'est une démonstration
- **Expliquer** que les données sont simulées
- **Montrer** la bannière de démonstration
- **Préparer** des réponses sur l'intégration backend

## 📱 Ordinateurs de Test

### Compte Admin
- **Email** : admin@mlda.com
- **Mot de passe** : password123
- **Accès** : Toutes les fonctionnalités

### Compte Professeur
- **Email** : prof1@mlda.com
- **Mot de passe** : password123
- **Accès** : Gestion des cours et étudiants

### Compte Étudiant
- **Email** : student1@mlda.com
- **Mot de passe** : password123
- **Accès** : Cours et progression

## 🎨 Personnalisation Rapide

Si vous voulez modifier quelque chose rapidement :

1. **Données** : `src/lib/mockData.ts`
2. **Identifiants** : `src/lib/testCredentials.ts`
3. **Interface** : `src/components/DemoBanner.tsx`
4. **Pages d'auth** : `src/pages/auth/`

## 🔄 Retour au Mode Production

```bash
node restore-production.js
```

---

**Bonne présentation ! 🎉**