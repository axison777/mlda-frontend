import { Router } from 'express';
import { register, login } from '@/api/controllers/auth.controller';
import { validate } from '@/api/middlewares/validation.middleware';
import { registerSchema, loginSchema } from '@/api/validations/auth.validation';

const router = Router();

// Route pour l'inscription d'un nouvel utilisateur
// POST /api/auth/register
router.post('/register', validate(registerSchema), register);

// Route pour la connexion d'un utilisateur
// POST /api/auth/login
router.post('/login', validate(loginSchema), login);

export default router;