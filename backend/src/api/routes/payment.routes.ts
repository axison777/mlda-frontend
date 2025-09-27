import { Router } from 'express';
import * as paymentController from '@/api/controllers/payment.controller';
import { authenticateToken } from '@/api/middlewares/auth.middleware';
import { validate } from '@/api/middlewares/validation.middleware';
import { createPaymentSchema } from '@/api/validations/payment.validation';

const router = Router();

// Toutes les routes ici nécessitent une authentification
router.use(authenticateToken);

// --- Routes de Paiement ---

// POST /api/payments - Créer une nouvelle intention de paiement
router.post('/', validate(createPaymentSchema), paymentController.createPaymentIntent);

// GET /api/payments/my-history - Récupérer l'historique des paiements de l'utilisateur
router.get('/my-history', paymentController.getMyPayments);

export default router;