// Mock data pour la démonstration
export interface MockUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'professor' | 'student';
  bio?: string;
  avatarUrl?: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  lastLogin?: string;
}

export interface MockCourse {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  price: number;
  currency: string;
  duration: number; // en minutes
  thumbnailUrl?: string;
  instructorId: string;
  instructorName: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  enrollmentCount: number;
  rating: number;
  reviewCount: number;
}

export interface MockLesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  content: string;
  type: 'video' | 'text' | 'quiz' | 'assignment';
  duration: number; // en minutes
  order: number;
  isPublished: boolean;
  videoUrl?: string;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MockProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  imageUrl?: string;
  active: boolean;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface MockEnrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  progress: number; // 0-100
  completed: boolean;
  lastAccessedAt: string;
}

export interface MockProgress {
  id: string;
  userId: string;
  lessonId: string;
  courseId: string;
  completed: boolean;
  timeSpent: number; // en minutes
  completedAt?: string;
  createdAt: string;
}

export interface MockStats {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  totalRevenue: number;
  monthlyRevenue: number;
  activeUsers: number;
  courseCompletionRate: number;
  averageRating: number;
}

// Données de test
export const mockUsers: MockUser[] = [
  {
    id: '1',
    email: 'admin@mlda.com',
    firstName: 'Admin',
    lastName: 'MLDA',
    role: 'admin',
    bio: 'Administrateur de la plateforme MLDA',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    email: 'prof1@mlda.com',
    firstName: 'Marie',
    lastName: 'Dubois',
    role: 'professor',
    bio: 'Professeur de français avec 10 ans d\'expérience',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    createdAt: '2024-01-02T00:00:00Z',
    lastLogin: '2024-01-15T09:15:00Z'
  },
  {
    id: '3',
    email: 'prof2@mlda.com',
    firstName: 'Jean',
    lastName: 'Martin',
    role: 'professor',
    bio: 'Spécialiste en grammaire française',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    createdAt: '2024-01-03T00:00:00Z',
    lastLogin: '2024-01-14T16:45:00Z'
  },
  {
    id: '4',
    email: 'student1@mlda.com',
    firstName: 'Sophie',
    lastName: 'Leroy',
    role: 'student',
    bio: 'Étudiante passionnée par l\'apprentissage du français',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    createdAt: '2024-01-05T00:00:00Z',
    lastLogin: '2024-01-15T14:20:00Z'
  },
  {
    id: '5',
    email: 'student2@mlda.com',
    firstName: 'Pierre',
    lastName: 'Moreau',
    role: 'student',
    bio: 'Débutant en français, motivé pour progresser',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    createdAt: '2024-01-06T00:00:00Z',
    lastLogin: '2024-01-15T11:30:00Z'
  },
  {
    id: '6',
    email: 'student3@mlda.com',
    firstName: 'Emma',
    lastName: 'Petit',
    role: 'student',
    bio: 'Étudiante avancée cherchant à perfectionner son français',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    createdAt: '2024-01-07T00:00:00Z',
    lastLogin: '2024-01-15T08:45:00Z'
  }
];

export const mockCourses: MockCourse[] = [
  {
    id: '1',
    title: 'Français Débutant - Niveau A1',
    description: 'Apprenez les bases du français avec ce cours complet pour débutants. Vocabulaire essentiel, grammaire de base et expressions courantes.',
    level: 'beginner',
    status: 'published',
    featured: true,
    price: 99,
    currency: 'EUR',
    duration: 1200,
    thumbnailUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
    instructorId: '2',
    instructorName: 'Marie Dubois',
    category: 'Langue',
    tags: ['débutant', 'vocabulaire', 'grammaire'],
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z',
    enrollmentCount: 45,
    rating: 4.8,
    reviewCount: 32
  },
  {
    id: '2',
    title: 'Grammaire Française Intermédiaire',
    description: 'Maîtrisez les subtilités de la grammaire française avec des exercices pratiques et des explications détaillées.',
    level: 'intermediate',
    status: 'published',
    featured: true,
    price: 149,
    currency: 'EUR',
    duration: 1800,
    thumbnailUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop',
    instructorId: '3',
    instructorName: 'Jean Martin',
    category: 'Langue',
    tags: ['grammaire', 'intermédiaire', 'exercices'],
    createdAt: '2024-01-11T00:00:00Z',
    updatedAt: '2024-01-13T00:00:00Z',
    enrollmentCount: 28,
    rating: 4.6,
    reviewCount: 18
  },
  {
    id: '3',
    title: 'Expression Orale Avancée',
    description: 'Perfectionnez votre expression orale avec des techniques de conversation et de présentation professionnelle.',
    level: 'advanced',
    status: 'published',
    featured: false,
    price: 199,
    currency: 'EUR',
    duration: 2400,
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
    instructorId: '2',
    instructorName: 'Marie Dubois',
    category: 'Langue',
    tags: ['oral', 'avancé', 'conversation'],
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-14T00:00:00Z',
    enrollmentCount: 15,
    rating: 4.9,
    reviewCount: 12
  },
  {
    id: '4',
    title: 'Vocabulaire Business',
    description: 'Apprenez le vocabulaire professionnel français pour évoluer dans le monde du travail.',
    level: 'intermediate',
    status: 'published',
    featured: false,
    price: 129,
    currency: 'EUR',
    duration: 900,
    thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
    instructorId: '3',
    instructorName: 'Jean Martin',
    category: 'Professionnel',
    tags: ['business', 'professionnel', 'vocabulaire'],
    createdAt: '2024-01-13T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    enrollmentCount: 22,
    rating: 4.7,
    reviewCount: 15
  }
];

export const mockLessons: MockLesson[] = [
  // Cours 1 - Français Débutant
  {
    id: '1',
    courseId: '1',
    title: 'Introduction et salutations',
    description: 'Apprenez les salutations de base en français',
    content: 'Bonjour, bonsoir, au revoir, à bientôt...',
    type: 'video',
    duration: 15,
    order: 1,
    isPublished: true,
    videoUrl: 'https://example.com/video1.mp4',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  },
  {
    id: '2',
    courseId: '1',
    title: 'Les nombres de 1 à 20',
    description: 'Comptez en français de 1 à 20',
    content: 'Un, deux, trois, quatre, cinq...',
    type: 'video',
    duration: 20,
    order: 2,
    isPublished: true,
    videoUrl: 'https://example.com/video2.mp4',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  },
  {
    id: '3',
    courseId: '1',
    title: 'Quiz - Salutations et nombres',
    description: 'Testez vos connaissances sur les salutations et les nombres',
    content: 'Question 1: Comment dit-on "bonjour" en français ?',
    type: 'quiz',
    duration: 10,
    order: 3,
    isPublished: true,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  },
  // Cours 2 - Grammaire Intermédiaire
  {
    id: '4',
    courseId: '2',
    title: 'Les temps du passé',
    description: 'Maîtrisez le passé composé et l\'imparfait',
    content: 'Le passé composé se forme avec avoir ou être + participe passé...',
    type: 'video',
    duration: 30,
    order: 1,
    isPublished: true,
    videoUrl: 'https://example.com/video3.mp4',
    createdAt: '2024-01-11T00:00:00Z',
    updatedAt: '2024-01-11T00:00:00Z'
  },
  {
    id: '5',
    courseId: '2',
    title: 'Exercices - Temps du passé',
    description: 'Pratiquez avec des exercices sur les temps du passé',
    content: 'Exercice 1: Conjuguez le verbe "manger" au passé composé...',
    type: 'assignment',
    duration: 25,
    order: 2,
    isPublished: true,
    createdAt: '2024-01-11T00:00:00Z',
    updatedAt: '2024-01-11T00:00:00Z'
  }
];

export const mockProducts: MockProduct[] = [
  {
    id: '1',
    name: 'Livre de Grammaire Française',
    description: 'Manuel complet de grammaire française avec exercices',
    price: 29.99,
    currency: 'EUR',
    category: 'Livres',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop',
    active: true,
    stock: 50,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Cahier d\'Exercices A1',
    description: 'Cahier d\'exercices pour le niveau A1',
    price: 19.99,
    currency: 'EUR',
    category: 'Livres',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=300&fit=crop',
    active: true,
    stock: 30,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    name: 'Dictionnaire Français-Anglais',
    description: 'Dictionnaire bilingue complet',
    price: 39.99,
    currency: 'EUR',
    category: 'Livres',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    active: true,
    stock: 25,
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z'
  }
];

export const mockEnrollments: MockEnrollment[] = [
  {
    id: '1',
    userId: '4',
    courseId: '1',
    enrolledAt: '2024-01-08T00:00:00Z',
    progress: 65,
    completed: false,
    lastAccessedAt: '2024-01-15T14:20:00Z'
  },
  {
    id: '2',
    userId: '5',
    courseId: '1',
    enrolledAt: '2024-01-09T00:00:00Z',
    progress: 30,
    completed: false,
    lastAccessedAt: '2024-01-15T11:30:00Z'
  },
  {
    id: '3',
    userId: '6',
    courseId: '2',
    enrolledAt: '2024-01-10T00:00:00Z',
    progress: 80,
    completed: false,
    lastAccessedAt: '2024-01-15T08:45:00Z'
  },
  {
    id: '4',
    userId: '4',
    courseId: '2',
    enrolledAt: '2024-01-11T00:00:00Z',
    progress: 100,
    completed: true,
    lastAccessedAt: '2024-01-14T16:30:00Z'
  }
];

export const mockProgress: MockProgress[] = [
  {
    id: '1',
    userId: '4',
    lessonId: '1',
    courseId: '1',
    completed: true,
    timeSpent: 18,
    completedAt: '2024-01-09T10:30:00Z',
    createdAt: '2024-01-08T00:00:00Z'
  },
  {
    id: '2',
    userId: '4',
    lessonId: '2',
    courseId: '1',
    completed: true,
    timeSpent: 22,
    completedAt: '2024-01-10T14:15:00Z',
    createdAt: '2024-01-08T00:00:00Z'
  },
  {
    id: '3',
    userId: '4',
    lessonId: '3',
    courseId: '1',
    completed: false,
    timeSpent: 5,
    createdAt: '2024-01-08T00:00:00Z'
  }
];

export const mockStats: MockStats = {
  totalUsers: 6,
  totalCourses: 4,
  totalEnrollments: 4,
  totalRevenue: 1250,
  monthlyRevenue: 450,
  activeUsers: 5,
  courseCompletionRate: 75,
  averageRating: 4.7
};

// Fonctions utilitaires pour simuler les délais d'API
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fonction pour simuler une pagination
export const paginate = <T>(data: T[], page: number = 1, limit: number = 10) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    pagination: {
      page,
      limit,
      total: data.length,
      totalPages: Math.ceil(data.length / limit),
      hasNext: endIndex < data.length,
      hasPrev: page > 1
    }
  };
};

// Fonction pour simuler une recherche
export const search = <T>(data: T[], searchTerm: string, searchFields: (keyof T)[]) => {
  if (!searchTerm) return data;
  
  const term = searchTerm.toLowerCase();
  return data.filter(item => 
    searchFields.some(field => {
      const value = item[field];
      return typeof value === 'string' && value.toLowerCase().includes(term);
    })
  );
};