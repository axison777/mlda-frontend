import { Router } from 'express';
import * as lessonController from '@/api/controllers/lesson.controller';
import { authenticateToken, authorizeRoles } from '@/api/middlewares/auth.middleware';
import { validate } from '@/api/middlewares/validation.middleware';
import {
  createLessonSchema,
  updateLessonSchema,
  lessonIdParamSchema,
  courseIdParamSchema
} from '@/api/validations/lesson.validation';
import { UserRole } from '@prisma/client';

const router = Router();

// --- Routes Publiques ---

// GET /api/lessons/course/:courseId - Récupérer les leçons d'un cours
router.get('/course/:courseId', validate(courseIdParamSchema), lessonController.getByCourse);

// GET /api/lessons/:id - Récupérer une leçon par son ID
router.get('/:id', validate(lessonIdParamSchema), lessonController.getById);


// --- Routes Protégées (Authentification requise) ---

const authorizedRoles: UserRole[] = [UserRole.ADMIN, UserRole.TEACHER];

// POST /api/lessons - Créer une nouvelle leçon
router.post(
  '/',
  authenticateToken,
  authorizeRoles(authorizedRoles),
  validate(createLessonSchema),
  lessonController.create
);

// PUT /api/lessons/:id - Mettre à jour une leçon
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles(authorizedRoles),
  validate(updateLessonSchema),
  lessonController.update
);

// DELETE /api/lessons/:id - Supprimer une leçon
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles(authorizedRoles),
  validate(lessonIdParamSchema),
  lessonController.remove
);

export default router;