import { Router } from 'express';
import * as achievementController from '@/api/controllers/achievement.controller';
import { authenticateToken, authorizeRoles } from '@/api/middlewares/auth.middleware';
import { validate } from '@/api/middlewares/validation.middleware';
import {
  createAchievementSchema,
  updateAchievementSchema,
  achievementIdParamSchema
} from '@/api/validations/achievement.validation';
import { UserRole } from '@prisma/client';

const router = Router();

// --- Routes de gestion des succès (Admin seulement) ---

// Appliquer l'authentification et l'autorisation d'administrateur à la plupart des routes
router.use(authenticateToken);

// GET /api/achievements - Récupérer tous les succès (accessible à tous les utilisateurs connectés)
router.get('/', achievementController.getAll);

// GET /api/achievements/my-achievements - Récupérer les succès de l'utilisateur connecté
router.get('/my-achievements', achievementController.getMyAchievements);

// Le reste des routes est pour les Admins seulement
router.use(authorizeRoles([UserRole.ADMIN]));

// POST /api/achievements - Créer un nouveau succès
router.post('/', validate(createAchievementSchema), achievementController.create);

// GET /api/achievements/:id - Récupérer un succès par son ID
router.get('/:id', validate(achievementIdParamSchema), achievementController.getById);

// PUT /api/achievements/:id - Mettre à jour un succès
router.put('/:id', validate(updateAchievementSchema), achievementController.update);

// DELETE /api/achievements/:id - Supprimer un succès
router.delete('/:id', validate(achievementIdParamSchema), achievementController.remove);

export default router;