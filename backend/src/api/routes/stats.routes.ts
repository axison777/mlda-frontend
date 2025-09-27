import { Router } from 'express';
import * as statsController from '@/api/controllers/stats.controller';
import { authenticateToken, authorizeRoles } from '@/api/middlewares/auth.middleware';
import { UserRole } from '@prisma/client';

const router = Router();

// Toutes les routes ici nécessitent une authentification
router.use(authenticateToken);

// --- Route pour les statistiques de l'Admin ---
// GET /api/stats/admin
router.get(
  '/admin',
  authorizeRoles([UserRole.ADMIN]),
  statsController.getAdminDashboardStats
);

// --- Route pour les statistiques du Professeur ---
// GET /api/stats/teacher
router.get(
  '/teacher',
  authorizeRoles([UserRole.TEACHER]),
  statsController.getTeacherDashboardStats
);

// --- Route pour les statistiques de l'Étudiant ---
// GET /api/stats/student
router.get(
  '/student',
  authorizeRoles([UserRole.STUDENT]),
  statsController.getStudentDashboardStats
);

export default router;