import { Router } from 'express';
import * as campaignController from '@/api/controllers/campaign.controller';
import { authenticateToken, authorizeRoles } from '@/api/middlewares/auth.middleware';
import { validate } from '@/api/middlewares/validation.middleware';
import {
  createCampaignSchema,
  updateCampaignSchema,
  campaignIdParamSchema
} from '@/api/validations/campaign.validation';
import { UserRole } from '@prisma/client';

const router = Router();

// Appliquer l'authentification et l'autorisation d'administrateur à toutes les routes de ce fichier
router.use(authenticateToken);
router.use(authorizeRoles([UserRole.ADMIN]));

// --- Routes de gestion des campagnes (Admin seulement) ---

// GET /api/campaigns - Récupérer toutes les campagnes
router.get('/', campaignController.getAll);

// POST /api/campaigns - Créer une nouvelle campagne
router.post('/', validate(createCampaignSchema), campaignController.create);

// GET /api/campaigns/:id - Récupérer une campagne par son ID
router.get('/:id', validate(campaignIdParamSchema), campaignController.getById);

// PUT /api/campaigns/:id - Mettre à jour une campagne
router.put('/:id', validate(updateCampaignSchema), campaignController.update);

// DELETE /api/campaigns/:id - Supprimer une campagne
router.delete('/:id', validate(campaignIdParamSchema), campaignController.remove);

export default router;