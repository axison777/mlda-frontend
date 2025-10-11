import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Eye, EyeOff, Info } from 'lucide-react';
import { TEST_CREDENTIALS } from '@/lib/testCredentials';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  const handleTestLogin = (credentials: typeof TEST_CREDENTIALS.admin) => {
    setEmail(credentials.email);
    setPassword(credentials.password);
    login({ email: credentials.email, password: credentials.password });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-red-50 to-yellow-50 flex items-center justify-center p-4 relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg)'
        }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <img 
              src="/assets/images/logo.png" 
              alt="MLDA Logo" 
              className="h-20 w-auto mx-auto"
            />
          </Link>
          <p className="text-gray-600 mt-2">Connectez-vous à votre compte</p>
        </div>

        {/* Alert pour les identifiants de test */}
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Mode Démonstration :</strong> Utilisez les boutons ci-dessous pour vous connecter avec des comptes de test.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Connexion</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Votre mot de passe"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-red-600 hover:text-red-700">
                  Mot de passe oublié ?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600"
                disabled={isLoading}
              >
                {isLoading ? 'Connexion...' : 'Se connecter'}
              </Button>
            </form>

            {/* Boutons de connexion rapide pour la démonstration */}
            <div className="mt-6 space-y-3">
              <div className="text-sm font-medium text-gray-700 text-center">Connexion rapide (Démo)</div>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleTestLogin(TEST_CREDENTIALS.admin)}
                  className="text-xs"
                >
                  👩‍💼 {TEST_CREDENTIALS.admin.name}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleTestLogin(TEST_CREDENTIALS.professor)}
                  className="text-xs"
                >
                  👩‍🏫 {TEST_CREDENTIALS.professor.name}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleTestLogin(TEST_CREDENTIALS.student)}
                  className="text-xs"
                >
                  👩‍🎓 {TEST_CREDENTIALS.student.name}
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Pas encore de compte ?{' '}
                <Link to="/signup" className="text-red-600 hover:text-red-700 font-medium">
                  S'inscrire
                </Link>
              </p>
            </div>

          </CardContent>
        </Card>

        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-700">
            ← Retour à l'accueil
          </Link>
        </div>
      </motion.div>
    </div>
  );
};