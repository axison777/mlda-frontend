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
    firstName: 'Aminata',
    lastName: 'Traoré',
    role: 'admin',
    bio: 'Administratrice de la plateforme MLDA',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    email: 'prof1@mlda.com',
    firstName: 'Fatou',
    lastName: 'Diop',
    role: 'professor',
    bio: 'Professeure d\'allemand avec 10 ans d\'expérience',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    createdAt: '2024-01-02T00:00:00Z',
    lastLogin: '2024-01-15T09:15:00Z'
  },
  {
    id: '3',
    email: 'prof2@mlda.com',
    firstName: 'Moussa',
    lastName: 'Cissé',
    role: 'professor',
    bio: 'Spécialiste en grammaire allemande',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    createdAt: '2024-01-03T00:00:00Z',
    lastLogin: '2024-01-14T16:45:00Z'
  },
  {
    id: '4',
    email: 'student1@mlda.com',
    firstName: 'Aïcha',
    lastName: 'Kouyaté',
    role: 'student',
    bio: 'Étudiante passionnée par l\'apprentissage de l\'allemand',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    createdAt: '2024-01-05T00:00:00Z',
    lastLogin: '2024-01-15T14:20:00Z'
  },
  {
    id: '5',
    email: 'student2@mlda.com',
    firstName: 'Ibrahim',
    lastName: 'Sangaré',
    role: 'student',
    bio: 'Débutant en allemand, motivé pour progresser',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    createdAt: '2024-01-06T00:00:00Z',
    lastLogin: '2024-01-15T11:30:00Z'
  },
  {
    id: '6',
    email: 'student3@mlda.com',
    firstName: 'Kadiatou',
    lastName: 'Diallo',
    role: 'student',
    bio: 'Étudiante avancée cherchant à perfectionner son allemand',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    createdAt: '2024-01-07T00:00:00Z',
    lastLogin: '2024-01-15T08:45:00Z'
  }
];

export const mockCourses: MockCourse[] = [
  {
    id: '1',
    title: 'Allemand Débutant - Niveau A1',
    description: 'Apprenez les bases de l\'allemand avec ce cours complet pour débutants. Vocabulaire essentiel, grammaire de base et expressions courantes.',
    level: 'beginner',
    status: 'published',
    featured: true,
    price: 65000,
    currency: 'FCFA',
    duration: 1200,
    thumbnailUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
    instructorId: '2',
    instructorName: 'Fatou Diop',
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
    title: 'Grammaire Allemande Intermédiaire',
    description: 'Maîtrisez les subtilités de la grammaire allemande avec des exercices pratiques et des explications détaillées.',
    level: 'intermediate',
    status: 'published',
    featured: true,
    price: 98000,
    currency: 'FCFA',
    duration: 1800,
    thumbnailUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop',
    instructorId: '3',
    instructorName: 'Moussa Cissé',
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
    title: 'Expression Orale Allemande Avancée',
    description: 'Perfectionnez votre expression orale en allemand avec des techniques de conversation et de présentation professionnelle.',
    level: 'advanced',
    status: 'published',
    featured: false,
    price: 130000,
    currency: 'FCFA',
    duration: 2400,
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
    instructorId: '2',
    instructorName: 'Fatou Diop',
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
    title: 'Allemand des Affaires',
    description: 'Apprenez le vocabulaire professionnel allemand pour évoluer dans le monde du travail et les entreprises allemandes.',
    level: 'intermediate',
    status: 'published',
    featured: false,
    price: 85000,
    currency: 'FCFA',
    duration: 900,
    thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
    instructorId: '3',
    instructorName: 'Moussa Cissé',
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
  // Cours 1 - Allemand Débutant
  {
    id: '1',
    courseId: '1',
    title: 'Introduction et salutations',
    description: 'Apprenez les salutations de base en allemand',
    content: 'Hallo, Guten Tag, Guten Abend, Auf Wiedersehen...',
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
    description: 'Comptez en allemand de 1 à 20',
    content: 'Eins, zwei, drei, vier, fünf...',
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
    content: 'Question 1: Comment dit-on "bonjour" en allemand ?',
    type: 'quiz',
    duration: 10,
    order: 3,
    isPublished: true,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  },
  // Cours 2 - Grammaire Allemande Intermédiaire
  {
    id: '4',
    courseId: '2',
    title: 'Les temps du passé',
    description: 'Maîtrisez le Perfekt et le Präteritum',
    content: 'Le Perfekt se forme avec haben ou sein + participe passé...',
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
    content: 'Exercice 1: Conjuguez le verbe "essen" au Perfekt...',
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
    name: 'Livre de Grammaire Allemande',
    description: 'Manuel complet de grammaire allemande avec exercices',
    price: 20000,
    currency: 'FCFA',
    category: 'Livres',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop',
    active: true,
    stock: 50,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Cahier d\'Exercices Allemand A1',
    description: 'Cahier d\'exercices pour le niveau A1 en allemand',
    price: 13000,
    currency: 'FCFA',
    category: 'Livres',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=300&fit=crop',
    active: true,
    stock: 30,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    name: 'Dictionnaire Allemand-Français',
    description: 'Dictionnaire bilingue allemand-français complet',
    price: 26000,
    currency: 'FCFA',
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
  totalRevenue: 820000,
  monthlyRevenue: 295000,
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