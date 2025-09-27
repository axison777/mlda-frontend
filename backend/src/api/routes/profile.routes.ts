import { Router } from 'express';
import * as profileController from '@/api/controllers/profile.controller';
import { authenticateToken } from '@/api/middlewares/auth.middleware';
import { validate } from '@/api/middlewares/validation.middleware';
import { updateProfileSchema, publicProfileParamsSchema } from '@/api/validations/profile.validation';

const router = Router();

// --- Routes pour le profil de l'utilisateur connecté ---
// Ces routes nécessitent une authentification
router.get('/me', authenticateToken, profileController.getMyProfile);
router.put('/me', authenticateToken, validate(updateProfileSchema), profileController.updateMyProfile);

// --- Route pour les profils publics ---
// GET /api/profiles/:id - Récupérer le profil public d'un utilisateur
router.get('/:id', validate(publicProfileParamsSchema), profileController.getPublicProfileById);

export default router;