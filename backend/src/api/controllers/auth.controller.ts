import { Request, Response } from 'express';
import { registerUser, loginUser } from '@/api/services/auth.service';

// --- Contrôleur pour l'inscription ---
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Validation simple
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newUser = await registerUser(req.body);
    res.status(201).json({ user: newUser, message: 'User created successfully' });

  } catch (error: any) {
    // Gérer l'erreur "l'utilisateur existe déjà"
    if (error.message.includes('already exists')) {
      return res.status(409).json({ message: error.message });
    }
    // Gérer les autres erreurs
    res.status(500).json({ message: 'An error occurred during registration', error: error.message });
  }
};

// --- Contrôleur pour la connexion ---
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validation simple
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const { user, token } = await loginUser({ email, password });
    res.status(200).json({ user, token, message: 'Login successful' });

  } catch (error: any) {
    // Gérer l'erreur "identifiants invalides"
    if (error.message.includes('Invalid')) {
      return res.status(401).json({ message: error.message });
    }
    // Gérer les autres erreurs
    res.status(500).json({ message: 'An error occurred during login', error: error.message });
  }
};