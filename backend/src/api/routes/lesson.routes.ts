import { Router } from 'express';
import * as lessonController from '@/api/controllers/lesson.controller';
import { authenticateToken, authorizeRoles } from '@/api/middlewares/auth.middleware';
import { UserRole } from '@prisma/client';

const router = Router();

// --- Routes Publiques ---

// GET /api/lessons/course/:courseId - Récupérer les leçons d'un cours
router.get('/course/:courseId', lessonController.getByCourse);

// GET /api/lessons/:id - Récupérer une leçon par son ID
router.get('/:id', lessonController.getById);


// --- Routes Protégées (Authentification requise) ---

const authorizedRoles: UserRole[] = [UserRole.ADMIN, UserRole.TEACHER];

// POST /api/lessons - Créer une nouvelle leçon
router.post(
  '/',
  authenticateToken,
  authorizeRoles(authorizedRoles),
  lessonController.create
);

// PUT /api/lessons/:id - Mettre à jour une leçon
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles(authorizedRoles),
  lessonController.update
);

// DELETE /api/lessons/:id - Supprimer une leçon
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles(authorizedRoles),
  lessonController.remove
);

export default router;