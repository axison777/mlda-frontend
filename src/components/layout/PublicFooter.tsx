import { Link } from 'react-router-dom';

export const PublicFooter = () => {
  return (
    <footer className="bg-black text-white py-12 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/assets/images/logo.png" 
                alt="MLDA Logo" 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-400">
              La plateforme de référence pour apprendre l'allemand en ligne.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-yellow-500">Cours</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-yellow-500 hover:text-yellow-400">
                  Allemand débutant
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-yellow-500 hover:text-yellow-400">
                  Allemand business
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-yellow-500 hover:text-yellow-400">
                  Préparation examens
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-yellow-500">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-yellow-500 hover:text-yellow-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-yellow-500 hover:text-yellow-400">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-yellow-500 hover:text-yellow-400">
                  Aide
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-yellow-500">Légal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-yellow-500 hover:text-yellow-400">
                  Conditions d'utilisation
                </a>
              </li>
              <li>
                <a href="#" className="text-yellow-500 hover:text-yellow-400">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="text-yellow-500 hover:text-yellow-400">
                  Mentions légales
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 MLDA. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
