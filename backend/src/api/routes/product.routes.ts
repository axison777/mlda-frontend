import { Router } from 'express';
import * as productController from '@/api/controllers/product.controller';
import { authenticateToken, authorizeRoles } from '@/api/middlewares/auth.middleware';
import { validate } from '@/api/middlewares/validation.middleware';
import {
  createProductSchema,
  updateProductSchema,
  productIdParamSchema
} from '@/api/validations/product.validation';
import { UserRole } from '@prisma/client';

const router = Router();


// --- Routes Publiques ---

// GET /api/products - Récupérer tous les produits
router.get('/', productController.getAll);

// GET /api/products/:id - Récupérer un produit par son ID
router.get('/:id', validate(productIdParamSchema), productController.getById);


// --- Routes de gestion (Admin seulement) ---

// POST /api/products - Créer un nouveau produit
router.post(
  '/',
  authenticateToken,
  authorizeRoles([UserRole.ADMIN]),
  validate(createProductSchema),
  productController.create
);

// PUT /api/products/:id - Mettre à jour un produit
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles([UserRole.ADMIN]),
  validate(updateProductSchema),
  productController.update
);

// DELETE /api/products/:id - Supprimer un produit
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles([UserRole.ADMIN]),
  validate(productIdParamSchema),
  productController.remove
);

export default router;