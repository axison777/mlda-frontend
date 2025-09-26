import { Router } from 'express';
import * as quizController from '@/api/controllers/quiz.controller';
import { authenticateToken, authorizeRoles } from '@/api/middlewares/auth.middleware';
import { validate } from '@/api/middlewares/validation.middleware';
import { createQuizSchema, submitAttemptSchema, quizIdParamSchema } from '@/api/validations/quiz.validation';
import { UserRole } from '@prisma/client';

const router = Router();

// Toutes les routes ici nécessitent une authentification
router.use(authenticateToken);

// --- Route pour la création de Quiz (Professeurs/Admins) ---
// POST /api/quiz
router.post(
  '/',
  authorizeRoles([UserRole.ADMIN, UserRole.TEACHER]),
  validate(createQuizSchema),
  quizController.create
);

// --- Route pour la soumission d'une tentative (Étudiants) ---
// POST /api/quiz/:quizId/attempt
router.post(
  '/:quizId/attempt',
  authorizeRoles([UserRole.STUDENT]),
  validate(submitAttemptSchema),
  quizController.submitAttempt
);

// --- Route pour récupérer un Quiz (Tous les utilisateurs authentifiés) ---
// GET /api/quiz/:id
// Note: Le contrôleur gère déjà la logique de ce qu'il faut montrer en fonction du rôle.
router.get('/:id', validate(quizIdParamSchema), quizController.getById);


export default router;