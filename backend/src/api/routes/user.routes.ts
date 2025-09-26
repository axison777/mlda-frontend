import { Router } from 'express';
import * as userController from '@/api/controllers/user.controller';
import { authenticateToken, authorizeRoles } from '@/api/middlewares/auth.middleware';
import { validate } from '@/api/middlewares/validation.middleware';
import { updateUserSchema, userIdParamSchema } from '@/api/validations/user.validation';
import { UserRole } from '@prisma/client';

const router = Router();

// Appliquer l'authentification et l'autorisation d'administrateur à toutes les routes de ce fichier
router.use(authenticateToken);
router.use(authorizeRoles([UserRole.ADMIN]));

// GET /api/users - Récupérer tous les utilisateurs
router.get('/', userController.getAll);

// GET /api/users/:id - Récupérer un utilisateur par son ID
router.get('/:id', validate(userIdParamSchema), userController.getById);

// PUT /api/users/:id - Mettre à jour un utilisateur
router.put('/:id', validate(updateUserSchema), userController.update);

// DELETE /api/users/:id - Supprimer un utilisateur
router.delete('/:id', validate(userIdParamSchema), userController.remove);

export default router;