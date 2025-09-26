import { Router } from 'express';
import * as courseController from '@/api/controllers/course.controller';
import { authenticateToken, authorizeRoles } from '@/api/middlewares/auth.middleware';
import { validate } from '@/api/middlewares/validation.middleware';
import { createCourseSchema, updateCourseSchema, courseIdParamSchema } from '@/api/validations/course.validation';
import { UserRole } from '@prisma/client';

const router = Router();

// --- Routes Publiques ---

// GET /api/courses - Récupérer tous les cours (pas de validation nécessaire pour les query params optionnels)
router.get('/', courseController.getAll);

// GET /api/courses/:id - Récupérer un cours par son ID
router.get('/:id', validate(courseIdParamSchema), courseController.getById);


// --- Routes Protégées (Authentification requise) ---

const authorizedRoles: UserRole[] = [UserRole.ADMIN, UserRole.TEACHER];

// POST /api/courses - Créer un nouveau cours
router.post(
  '/',
  authenticateToken,
  authorizeRoles(authorizedRoles),
  validate(createCourseSchema),
  courseController.create
);

// PUT /api/courses/:id - Mettre à jour un cours
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles(authorizedRoles),
  validate(updateCourseSchema),
  courseController.update
);

// DELETE /api/courses/:id - Supprimer un cours
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles(authorizedRoles),
  validate(courseIdParamSchema),
  courseController.remove
);

export default router;