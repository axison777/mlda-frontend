import { Router } from 'express';
import * as enrollmentController from '@/api/controllers/enrollment.controller';
import { authenticateToken } from '@/api/middlewares/auth.middleware';
import { validate } from '@/api/middlewares/validation.middleware';
import { enrollSchema } from '@/api/validations/enrollment.validation';

const router = Router();

// Toutes les routes ici nécessitent une authentification
router.use(authenticateToken);

// POST /api/enrollments - Inscrire l'utilisateur connecté à un cours
router.post('/', validate(enrollSchema), enrollmentController.enroll);

// GET /api/enrollments/my-courses - Récupérer les inscriptions de l'utilisateur connecté
router.get('/my-courses', enrollmentController.getMyEnrollments);

export default router;