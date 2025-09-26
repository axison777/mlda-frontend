import { Router } from 'express';
import * as messageController from '@/api/controllers/message.controller';
import { authenticateToken } from '@/api/middlewares/auth.middleware';
import { validate } from '@/api/middlewares/validation.middleware';
import { sendMessageSchema, conversationParamsSchema } from '@/api/validations/message.validation';

const router = Router();

// Appliquer l'authentification à toutes les routes de ce fichier
router.use(authenticateToken);

// --- Routes de Messagerie ---

// POST /api/messages - Envoyer un message
router.post('/', validate(sendMessageSchema), messageController.postMessage);

// GET /api/messages/conversations - Récupérer les conversations de l'utilisateur
router.get('/conversations', messageController.fetchConversations);

// GET /api/messages/:otherUserId - Récupérer l'historique d'une conversation
router.get('/:otherUserId', validate(conversationParamsSchema), messageController.fetchConversationHistory);

// POST /api/messages/:otherUserId/read - Marquer les messages comme lus
router.post('/:otherUserId/read', validate(conversationParamsSchema), messageController.markAsRead);


export default router;