import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Users, 
  Award, 
  Star, 
  Play, 
  CheckCircle,
  Globe,
  Clock,
  Target,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: BookOpen,
    title: 'Cours Interactifs',
    description: 'Apprenez avec des vidéos, exercices et quiz interactifs',
  },
  {
    icon: Users,
    title: 'Professeurs Experts',
    description: 'Nos professeurs sont des natifs allemands certifiés',
  },
  {
    icon: Award,
    title: 'Certificats Reconnus',
    description: 'Obtenez des certificats officiels validés par nos partenaires',
  },
  {
    icon: Globe,
    title: 'Apprentissage Flexible',
    description: 'Étudiez à votre rythme, où que vous soyez',
  },
];

const testimonials = [
  {
    name: 'Marie Dubois',
    role: 'Étudiante en commerce',
    content: 'Grâce à MLDA, j\'ai pu décrocher mon stage à Berlin ! Les cours sont excellents.',
    rating: 5,
    avatar: 'MD',
  },
  {
    name: 'Pierre Martin',
    role: 'Ingénieur',
    content: 'La flexibilité des cours m\'a permis d\'apprendre l\'allemand tout en travaillant.',
    rating: 5,
    avatar: 'PM',
  },
  {
    name: 'Sophie Laurent',
    role: 'Professeure',
    content: 'Une plateforme moderne et efficace. Mes étudiants adorent !',
    rating: 5,
    avatar: 'SL',
  },
];

const stats = [
  { number: '10,000+', label: 'Étudiants actifs' },
  { number: '50+', label: 'Professeurs experts' },
  { number: '200+', label: 'Cours disponibles' },
  { number: '95%', label: 'Taux de satisfaction' },
];

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-black">
                <span className="text-red-600">M</span>
                <span className="text-yellow-500">L</span>
                <span className="text-red-600">D</span>
                <span className="text-yellow-500">A</span>
              </h1>
              <span className="ml-2 text-gray-600">Cours d'allemand</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-red-600 font-medium">Accueil</Link>
              <Link to="/courses" className="text-gray-600 hover:text-gray-900">Cours</Link>
              <Link to="/shop" className="text-gray-600 hover:text-gray-900">Boutique</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            </nav>
            <div className="flex space-x-4">
              <Link to="/login">
                <Button variant="outline">Connexion</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-red-600 hover:bg-red-700">S'inscrire</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-red-50 to-yellow-50">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Apprenez l'<span className="text-red-600">Allemand</span> avec les 
              <span className="text-yellow-500"> Meilleurs</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Maîtrisez l'allemand grâce à nos cours interactifs, nos professeurs natifs 
              et notre méthode d'apprentissage innovante.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8 py-3">
                  Commencer Gratuitement
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                  <Play className="w-5 h-5 mr-2" />
                  Voir les Cours
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl font-bold text-red-600 mb-2">{stat.number}</p>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20 bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Pourquoi Choisir MLDA ?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une approche moderne et efficace pour apprendre l'allemand
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center h-full">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ce que disent nos étudiants
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-medium mr-3">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20 bg-red-600">
        <div className="text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold mb-4">
              Prêt à Commencer Votre Aventure ?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Rejoignez des milliers d'étudiants qui apprennent l'allemand avec MLDA
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-3">
                Commencer Maintenant
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-gray-900 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-red-600">M</span>
              <span className="text-yellow-500">L</span>
              <span className="text-red-600">D</span>
              <span className="text-yellow-500">A</span>
            </h3>
            <p className="text-gray-400">
              La meilleure plateforme pour apprendre l'allemand en ligne.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Cours</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/courses" className="hover:text-white">Débutant</Link></li>
              <li><Link to="/courses" className="hover:text-white">Intermédiaire</Link></li>
              <li><Link to="/courses" className="hover:text-white">Avancé</Link></li>
              <li><Link to="/courses" className="hover:text-white">Business</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link to="/help" className="hover:text-white">Aide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Légal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/privacy" className="hover:text-white">Confidentialité</Link></li>
              <li><Link to="/terms" className="hover:text-white">Conditions</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 MLDA. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};