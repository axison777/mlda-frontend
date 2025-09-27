import { Router } from 'express';
import * as announcementController from '@/api/controllers/announcement.controller';
import { authenticateToken, authorizeRoles } from '@/api/middlewares/auth.middleware';
import { validate } from '@/api/middlewares/validation.middleware';
import {
  createAnnouncementSchema,
  updateAnnouncementSchema,
  announcementIdParamSchema
} from '@/api/validations/announcement.validation';
import { UserRole } from '@prisma/client';

const router = Router();

// --- Routes Publiques ---

// GET /api/announcements - Récupérer toutes les annonces (peut être filtré par courseId)
router.get('/', announcementController.getAll);

// GET /api/announcements/:id - Récupérer une annonce par son ID
router.get('/:id', validate(announcementIdParamSchema), announcementController.getById);


// --- Routes de gestion (Admin ou Professeur) ---

const authorizedRoles: UserRole[] = [UserRole.ADMIN, UserRole.TEACHER];

// POST /api/announcements - Créer une nouvelle annonce
router.post(
  '/',
  authenticateToken,
  authorizeRoles(authorizedRoles),
  validate(createAnnouncementSchema),
  announcementController.create
);

// PUT /api/announcements/:id - Mettre à jour une annonce
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles(authorizedRoles),
  validate(updateAnnouncementSchema),
  announcementController.update
);

// DELETE /api/announcements/:id - Supprimer une annonce
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles(authorizedRoles),
  validate(announcementIdParamSchema),
  announcementController.remove
);

export default router;