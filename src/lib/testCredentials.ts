// Identifiants de test pour la démonstration
export const TEST_CREDENTIALS = {
  admin: {
    email: 'admin@mlda.com',
    password: 'password123',
    role: 'admin' as const,
    name: 'Aminata Traoré'
  },
  professor: {
    email: 'prof1@mlda.com',
    password: 'password123',
    role: 'professor' as const,
    name: 'Fatou Diop'
  },
  student: {
    email: 'student1@mlda.com',
    password: 'password123',
    role: 'student' as const,
    name: 'Aïcha Kouyaté'
  }
};

// Message d'aide pour la démonstration
export const DEMO_MESSAGE = `
🔧 MODE DÉMONSTRATION ACTIVÉ

Utilisez ces identifiants pour tester la plateforme :

👨‍💼 ADMINISTRATEUR
Email: admin@mlda.com
Mot de passe: password123

👨‍🏫 PROFESSEUR
Email: prof1@mlda.com
Mot de passe: password123

👨‍🎓 ÉTUDIANT
Email: student1@mlda.com
Mot de passe: password123

Toutes les données sont simulées pour la démonstration.
`;