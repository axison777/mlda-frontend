import { Router } from 'express';
import { register, login } from '@/api/controllers/auth.controller';
import * as profileController from '@/api/controllers/profile.controller';
import { validate } from '@/api/middlewares/validation.middleware';
import { registerSchema, loginSchema } from '@/api/validations/auth.validation';
import { updateProfileSchema } from '@/api/validations/profile.validation';
import { authenticateToken } from '@/api/middlewares/auth.middleware';

const router = Router();

// --- Routes d'authentification de base ---
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

// --- Routes de profil utilisateur (sous /auth) ---
router.get('/profile', authenticateToken, profileController.getMyProfile);
router.put(
  '/profile',
  authenticateToken,
  validate(updateProfileSchema),
  profileController.updateMyProfile
);

export default router;