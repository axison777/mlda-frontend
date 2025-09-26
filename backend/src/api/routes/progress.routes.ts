import { Router } from 'express';
import * as progressController from '@/api/controllers/progress.controller';
import { authenticateToken } from '@/api/middlewares/auth.middleware';
import { validate } from '@/api/middlewares/validation.middleware';
import { updateLessonProgressSchema, getCourseProgressSchema } from '@/api/validations/progress.validation';

const router = Router();

// Toutes les routes ici nécessitent une authentification
router.use(authenticateToken);

// POST /api/progress/lesson/:lessonId - Mettre à jour la progression d'une leçon
router.post('/lesson/:lessonId', validate(updateLessonProgressSchema), progressController.updateLessonProgress);

// GET /api/progress/course/:courseId - Récupérer la progression d'un cours
router.get('/course/:courseId', validate(getCourseProgressSchema), progressController.getCourseProgress);

export default router;