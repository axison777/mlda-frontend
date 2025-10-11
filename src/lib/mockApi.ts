import { 
  mockUsers, 
  mockCourses, 
  mockLessons, 
  mockProducts, 
  mockEnrollments, 
  mockProgress, 
  mockStats,
  delay,
  paginate,
  search,
  MockUser,
  MockCourse,
  MockLesson,
  MockProduct,
  MockEnrollment,
  MockProgress,
  MockStats
} from './mockData';

// Simulation d'un token d'authentification
let mockToken: string | null = null;
let currentUser: MockUser | null = null;

class MockApiClient {
  private async simulateRequest<T>(data: T, errorRate: number = 0): Promise<T> {
    await delay(Math.random() * 500 + 200); // Délai de 200-700ms
    
    if (Math.random() < errorRate) {
      throw new Error('Erreur simulée de l\'API');
    }
    
    return data;
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const user = mockUsers.find(u => u.email === email);
    
    if (!user || password !== 'password123') {
      throw new Error('Email ou mot de passe incorrect');
    }

    mockToken = 'mock-token-' + Date.now();
    currentUser = user;

    return this.simulateRequest({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role.toUpperCase(),
        bio: user.bio,
        avatarUrl: user.avatarUrl
      },
      token: mockToken,
      message: 'Connexion réussie !'
    });
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    const existingUser = mockUsers.find(u => u.email === userData.email);
    
    if (existingUser) {
      throw new Error('Un utilisateur avec cet email existe déjà');
    }

    const newUser: MockUser = {
      id: (mockUsers.length + 1).toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: 'student',
      status: 'active',
      createdAt: new Date().toISOString()
    };

    mockUsers.push(newUser);
    mockToken = 'mock-token-' + Date.now();
    currentUser = newUser;

    return this.simulateRequest({
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: 'STUDENT',
        bio: newUser.bio,
        avatarUrl: newUser.avatarUrl
      },
      token: mockToken,
      message: 'Inscription réussie !'
    });
  }

  async logout() {
    mockToken = null;
    currentUser = null;
    return this.simulateRequest({ message: 'Déconnexion réussie' });
  }

  async getProfile() {
    if (!currentUser) {
      throw new Error('Non authentifié');
    }
    return this.simulateRequest(currentUser);
  }

  async updateProfile(updates: { bio?: string; avatarUrl?: string }) {
    if (!currentUser) {
      throw new Error('Non authentifié');
    }

    currentUser = { ...currentUser, ...updates };
    const userIndex = mockUsers.findIndex(u => u.id === currentUser!.id);
    if (userIndex !== -1) {
      mockUsers[userIndex] = currentUser;
    }

    return this.simulateRequest(currentUser);
  }

  async getUserProfile(id: string) {
    const user = mockUsers.find(u => u.id === id);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }
    return this.simulateRequest(user);
  }

  // Course endpoints
  async getCourses(params?: {
    page?: number;
    limit?: number;
    level?: string;
    status?: string;
    featured?: boolean;
    search?: string;
  }) {
    let filteredCourses = [...mockCourses];

    // Filtres
    if (params?.level) {
      filteredCourses = filteredCourses.filter(c => c.level === params.level);
    }
    if (params?.status) {
      filteredCourses = filteredCourses.filter(c => c.status === params.status);
    }
    if (params?.featured !== undefined) {
      filteredCourses = filteredCourses.filter(c => c.featured === params.featured);
    }
    if (params?.search) {
      filteredCourses = search(filteredCourses, params.search, ['title', 'description']);
    }

    const result = paginate(filteredCourses, params?.page || 1, params?.limit || 10);
    
    return this.simulateRequest({
      courses: result.data,
      pagination: result.pagination
    });
  }

  async getCourseById(id: string) {
    const course = mockCourses.find(c => c.id === id);
    if (!course) {
      throw new Error('Cours non trouvé');
    }
    return this.simulateRequest(course);
  }

  async createCourse(courseData: any) {
    const newCourse: MockCourse = {
      id: (mockCourses.length + 1).toString(),
      ...courseData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      enrollmentCount: 0,
      rating: 0,
      reviewCount: 0
    };

    mockCourses.push(newCourse);
    return this.simulateRequest(newCourse);
  }

  async updateCourse(id: string, updates: any) {
    const courseIndex = mockCourses.findIndex(c => c.id === id);
    if (courseIndex === -1) {
      throw new Error('Cours non trouvé');
    }

    mockCourses[courseIndex] = {
      ...mockCourses[courseIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    return this.simulateRequest(mockCourses[courseIndex]);
  }

  async deleteCourse(id: string) {
    const courseIndex = mockCourses.findIndex(c => c.id === id);
    if (courseIndex === -1) {
      throw new Error('Cours non trouvé');
    }

    mockCourses.splice(courseIndex, 1);
    return this.simulateRequest({ message: 'Cours supprimé avec succès' });
  }

  // Lesson endpoints
  async getLessonsByCourse(courseId: string) {
    const lessons = mockLessons.filter(l => l.courseId === courseId);
    return this.simulateRequest(lessons);
  }

  async getLessonById(id: string) {
    const lesson = mockLessons.find(l => l.id === id);
    if (!lesson) {
      throw new Error('Leçon non trouvée');
    }
    return this.simulateRequest(lesson);
  }

  async createLesson(lessonData: any) {
    const newLesson: MockLesson = {
      id: (mockLessons.length + 1).toString(),
      ...lessonData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockLessons.push(newLesson);
    return this.simulateRequest(newLesson);
  }

  async updateLesson(id: string, updates: any) {
    const lessonIndex = mockLessons.findIndex(l => l.id === id);
    if (lessonIndex === -1) {
      throw new Error('Leçon non trouvée');
    }

    mockLessons[lessonIndex] = {
      ...mockLessons[lessonIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    return this.simulateRequest(mockLessons[lessonIndex]);
  }

  async deleteLesson(id: string) {
    const lessonIndex = mockLessons.findIndex(l => l.id === id);
    if (lessonIndex === -1) {
      throw new Error('Leçon non trouvée');
    }

    mockLessons.splice(lessonIndex, 1);
    return this.simulateRequest({ message: 'Leçon supprimée avec succès' });
  }

  // Enrollment endpoints
  async enrollInCourse(courseId: string) {
    if (!currentUser) {
      throw new Error('Non authentifié');
    }

    const existingEnrollment = mockEnrollments.find(
      e => e.userId === currentUser!.id && e.courseId === courseId
    );

    if (existingEnrollment) {
      throw new Error('Déjà inscrit à ce cours');
    }

    const newEnrollment: MockEnrollment = {
      id: (mockEnrollments.length + 1).toString(),
      userId: currentUser.id,
      courseId,
      enrolledAt: new Date().toISOString(),
      progress: 0,
      completed: false,
      lastAccessedAt: new Date().toISOString()
    };

    mockEnrollments.push(newEnrollment);
    return this.simulateRequest(newEnrollment);
  }

  async getUserEnrollments() {
    if (!currentUser) {
      throw new Error('Non authentifié');
    }

    const userEnrollments = mockEnrollments.filter(e => e.userId === currentUser!.id);
    const enrollmentsWithCourses = userEnrollments.map(enrollment => {
      const course = mockCourses.find(c => c.id === enrollment.courseId);
      return {
        ...enrollment,
        course
      };
    });

    return this.simulateRequest(enrollmentsWithCourses);
  }

  // Progress endpoints
  async updateLessonProgress(lessonId: string, data: { completed: boolean; timeSpent?: number }) {
    if (!currentUser) {
      throw new Error('Non authentifié');
    }

    const existingProgress = mockProgress.find(
      p => p.userId === currentUser!.id && p.lessonId === lessonId
    );

    const lesson = mockLessons.find(l => l.id === lessonId);
    if (!lesson) {
      throw new Error('Leçon non trouvée');
    }

    if (existingProgress) {
      existingProgress.completed = data.completed;
      existingProgress.timeSpent += data.timeSpent || 0;
      if (data.completed) {
        existingProgress.completedAt = new Date().toISOString();
      }
      return this.simulateRequest({ progress: existingProgress, message: 'Progrès mis à jour' });
    } else {
      const newProgress: MockProgress = {
        id: (mockProgress.length + 1).toString(),
        userId: currentUser.id,
        lessonId,
        courseId: lesson.courseId,
        completed: data.completed,
        timeSpent: data.timeSpent || 0,
        completedAt: data.completed ? new Date().toISOString() : undefined,
        createdAt: new Date().toISOString()
      };

      mockProgress.push(newProgress);
      return this.simulateRequest({ progress: newProgress, message: 'Progrès enregistré' });
    }
  }

  async getCourseProgress(courseId: string) {
    if (!currentUser) {
      throw new Error('Non authentifié');
    }

    const courseProgress = mockProgress.filter(
      p => p.userId === currentUser!.id && p.courseId === courseId
    );

    return this.simulateRequest({ progress: courseProgress });
  }

  // Quiz endpoints
  async getQuizById(id: string) {
    // Simulation d'un quiz
    const quiz = {
      id,
      title: 'Quiz de test',
      questions: [
        {
          id: '1',
          question: 'Comment dit-on "bonjour" en français ?',
          options: ['Hello', 'Bonjour', 'Hola', 'Ciao'],
          correctAnswer: 1
        }
      ]
    };
    return this.simulateRequest({ quiz });
  }

  async submitQuizAttempt(quizId: string, data: { answers: string[]; timeSpent: number }) {
    // Simulation d'un résultat de quiz
    const result = {
      score: Math.floor(Math.random() * 40) + 60, // Score entre 60-100
      totalQuestions: 1,
      correctAnswers: Math.floor(Math.random() * 1) + 1,
      timeSpent: data.timeSpent
    };

    return this.simulateRequest({ result, message: 'Quiz soumis avec succès' });
  }

  // Stats endpoints
  async getAdminStats() {
    return this.simulateRequest({ stats: mockStats });
  }

  async getTeacherStats() {
    const teacherStats = {
      totalCourses: mockCourses.filter(c => c.instructorId === currentUser?.id).length,
      totalStudents: mockEnrollments.length,
      averageRating: 4.7,
      totalRevenue: 1250
    };
    return this.simulateRequest({ stats: teacherStats });
  }

  async getStudentStats() {
    if (!currentUser) {
      throw new Error('Non authentifié');
    }

    const userEnrollments = mockEnrollments.filter(e => e.userId === currentUser!.id);
    const completedCourses = userEnrollments.filter(e => e.completed).length;
    const totalTimeSpent = mockProgress
      .filter(p => p.userId === currentUser!.id)
      .reduce((total, p) => total + p.timeSpent, 0);

    const studentStats = {
      enrolledCourses: userEnrollments.length,
      completedCourses,
      totalTimeSpent,
      averageProgress: userEnrollments.reduce((sum, e) => sum + e.progress, 0) / userEnrollments.length || 0
    };

    return this.simulateRequest({ stats: studentStats });
  }

  // User management (Admin)
  async getUsers(params?: {
    page?: number;
    limit?: number;
    role?: string;
    status?: string;
    search?: string;
  }) {
    let filteredUsers = [...mockUsers];

    if (params?.role) {
      filteredUsers = filteredUsers.filter(u => u.role === params.role);
    }
    if (params?.status) {
      filteredUsers = filteredUsers.filter(u => u.status === params.status);
    }
    if (params?.search) {
      filteredUsers = search(filteredUsers, params.search, ['firstName', 'lastName', 'email']);
    }

    const result = paginate(filteredUsers, params?.page || 1, params?.limit || 10);
    
    return this.simulateRequest({
      users: result.data,
      pagination: result.pagination
    });
  }

  async getUserById(id: string) {
    const user = mockUsers.find(u => u.id === id);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }
    return this.simulateRequest({ user });
  }

  async updateUser(id: string, updates: any) {
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error('Utilisateur non trouvé');
    }

    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };
    return this.simulateRequest({ user: mockUsers[userIndex], message: 'Utilisateur mis à jour' });
  }

  async deleteUser(id: string) {
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error('Utilisateur non trouvé');
    }

    mockUsers.splice(userIndex, 1);
    return this.simulateRequest({ message: 'Utilisateur supprimé avec succès' });
  }

  // Product endpoints
  async getProducts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    active?: boolean;
  }) {
    let filteredProducts = [...mockProducts];

    if (params?.category) {
      filteredProducts = filteredProducts.filter(p => p.category === params.category);
    }
    if (params?.active !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.active === params.active);
    }
    if (params?.search) {
      filteredProducts = search(filteredProducts, params.search, ['name', 'description']);
    }

    const result = paginate(filteredProducts, params?.page || 1, params?.limit || 10);
    
    return this.simulateRequest({
      products: result.data,
      pagination: result.pagination
    });
  }

  async getProductById(id: string) {
    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      throw new Error('Produit non trouvé');
    }
    return this.simulateRequest({ product });
  }

  async createProduct(productData: any) {
    const newProduct: MockProduct = {
      id: (mockProducts.length + 1).toString(),
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockProducts.push(newProduct);
    return this.simulateRequest({ product: newProduct, message: 'Produit créé avec succès' });
  }

  async updateProduct(id: string, updates: any) {
    const productIndex = mockProducts.findIndex(p => p.id === id);
    if (productIndex === -1) {
      throw new Error('Produit non trouvé');
    }

    mockProducts[productIndex] = {
      ...mockProducts[productIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    return this.simulateRequest({ product: mockProducts[productIndex], message: 'Produit mis à jour' });
  }

  async deleteProduct(id: string) {
    const productIndex = mockProducts.findIndex(p => p.id === id);
    if (productIndex === -1) {
      throw new Error('Produit non trouvé');
    }

    mockProducts.splice(productIndex, 1);
    return this.simulateRequest({ message: 'Produit supprimé avec succès' });
  }

  // Announcements endpoints
  async getAnnouncements() {
    const announcements = [
      {
        id: '1',
        title: 'Nouveau cours disponible !',
        content: 'Découvrez notre nouveau cours de français avancé.',
        type: 'info',
        createdAt: '2024-01-15T00:00:00Z'
      },
      {
        id: '2',
        title: 'Maintenance programmée',
        content: 'La plateforme sera en maintenance le dimanche de 2h à 4h.',
        type: 'warning',
        createdAt: '2024-01-14T00:00:00Z'
      }
    ];
    return this.simulateRequest({ announcements });
  }

  async createAnnouncement(data: any) {
    const announcement = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString()
    };
    return this.simulateRequest({ announcement, message: 'Annonce créée avec succès' });
  }

  async updateAnnouncement(id: string, updates: any) {
    return this.simulateRequest({ announcement: { id, ...updates }, message: 'Annonce mise à jour' });
  }

  async deleteAnnouncement(id: string) {
    return this.simulateRequest({ message: 'Annonce supprimée avec succès' });
  }

  setToken(token: string) {
    mockToken = token;
  }
}

export const mockApiClient = new MockApiClient();