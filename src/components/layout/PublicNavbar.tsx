import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const PublicNavbar = () => {
  return (
    <header className="border-b border-gray-200 w-full bg-white sticky top-0 z-50 shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <img 
              src="/assets/images/logo.png" 
              alt="MLDA Logo" 
              className="h-12 w-auto"
            />
            <span className="ml-3 text-gray-600 text-sm">Cours d'allemand</span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Accueil
            </Link>
            <Link 
              to="/courses" 
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Cours
            </Link>
            <Link 
              to="/shop" 
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Boutique
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>
          <div className="flex space-x-4">
            <Link to="/login">
              <Button 
                variant="outline" 
                className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
              >
                Connexion
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                S'inscrire gratuitement
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
