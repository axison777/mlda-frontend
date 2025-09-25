import { Router } from 'express';
import * as courseController from '@/api/controllers/course.controller';
import { authenticateToken, authorizeRoles } from '@/api/middlewares/auth.middleware';
import { UserRole } from '@prisma/client';

const router = Router();

// --- Routes Publiques ---

// GET /api/courses - Récupérer tous les cours
router.get('/', courseController.getAll);

// GET /api/courses/:id - Récupérer un cours par son ID
router.get('/:id', courseController.getById);


// --- Routes Protégées (Authentification requise) ---

const authorizedRoles: UserRole[] = [UserRole.ADMIN, UserRole.TEACHER];

// POST /api/courses - Créer un nouveau cours
router.post(
  '/',
  authenticateToken,
  authorizeRoles(authorizedRoles),
  courseController.create
);

// PUT /api/courses/:id - Mettre à jour un cours
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles(authorizedRoles),
  courseController.update
);

// DELETE /api/courses/:id - Supprimer un cours
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles(authorizedRoles),
  courseController.remove
);

export default router;