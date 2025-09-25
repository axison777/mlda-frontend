import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Activer CORS pour toutes les routes
app.use(express.json()); // Pour parser les corps de requête en JSON

// Importer les routes
import authRoutes from './api/routes/auth.routes';
import courseRoutes from './api/routes/course.routes';

// Route de test
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is running and healthy!' });
});

// Utiliser les routes de l'API
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});

export default app;