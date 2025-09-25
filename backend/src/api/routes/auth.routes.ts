import { Router } from 'express';
import { register, login } from '@/api/controllers/auth.controller';

const router = Router();

// Route pour l'inscription d'un nouvel utilisateur
// POST /api/auth/register
router.post('/register', register);

// Route pour la connexion d'un utilisateur
// POST /api/auth/login
router.post('/login', login);

export default router;