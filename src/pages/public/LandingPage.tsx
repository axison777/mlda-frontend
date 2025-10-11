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
  ArrowRight,
  CheckCircle,
  Globe,
  Clock,
  Target,
  Heart,
  Shield,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { HeroCarousel } from '@/components/HeroCarousel';

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
    description: 'Obtenez des certificats officiels validés',
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
    role: 'Étudiante',
    content: 'Grâce à MLDA, j\'ai pu apprendre l\'allemand rapidement et efficacement. Les cours sont excellents !',
    rating: 5,
    avatar: 'MD',
  },
  {
    name: 'Pierre Martin',
    role: 'Professionnel',
    content: 'Les cours de business allemand m\'ont permis de décrocher un poste en Allemagne. Merci MLDA !',
    rating: 5,
    avatar: 'PM',
  },
  {
    name: 'Sophie Laurent',
    role: 'Étudiante',
    content: 'Interface intuitive, professeurs compétents, je recommande vivement cette plateforme.',
    rating: 5,
    avatar: 'SL',
  },
];

const stats = [
  { number: '10,000+', label: 'Étudiants actifs' },
  { number: '50+', label: 'Professeurs experts' },
  { number: '100+', label: 'Cours disponibles' },
  { number: '95%', label: 'Taux de satisfaction' },
];

const aboutPoints = [
  {
    icon: Target,
    title: 'Notre Mission',
    description: 'Rendre l\'apprentissage de l\'allemand accessible à tous avec des méthodes modernes et efficaces.',
  },
  {
    icon: Heart,
    title: 'Notre Passion',
    description: 'Nous sommes passionnés par l\'enseignement et la transmission de la culture allemande.',
  },
  {
    icon: Shield,
    title: 'Notre Engagement',
    description: 'Nous garantissons un apprentissage de qualité avec un suivi personnalisé pour chaque étudiant.',
  },
  {
    icon: Zap,
    title: 'Notre Innovation',
    description: 'Nous utilisons les dernières technologies pour créer une expérience d\'apprentissage unique.',
  },
];

const whyChooseUs = [
  'Méthode d\'apprentissage éprouvée et moderne',
  'Professeurs natifs allemands certifiés',
  'Suivi personnalisé de votre progression',
  'Certificats reconnus internationalement',
  'Plateforme accessible 24h/24, 7j/7',
  'Communauté d\'apprenants active',
  'Support technique réactif',
  'Prix compétitifs et transparents',
];

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      {/* Hero Section with Carousel */}
      <HeroCarousel />

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
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
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi Choisir MLDA ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez ce qui fait de MLDA la meilleure plateforme pour apprendre l'allemand
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                À Propos de MLDA
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                MLDA (Méthode Linguistique Digitale Allemande) est une plateforme innovante 
                dédiée à l'apprentissage de l'allemand. Fondée par des experts en linguistique 
                et en pédagogie, nous révolutionnons l'enseignement des langues grâce à 
                la technologie.
              </p>
              
              <div className="space-y-6">
                {aboutPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <point.icon className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{point.title}</h3>
                      <p className="text-gray-600">{point.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                alt="Équipe MLDA"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi Nous Choisir ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez les avantages qui font de MLDA votre meilleur choix pour apprendre l'allemand
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Nos Avantages</h3>
                  <div className="space-y-4">
                    {whyChooseUs.map((reason, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{reason}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Qui Sommes-Nous ?</h3>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      <strong>MLDA</strong> est née de la passion de linguistes et pédagogues 
                      allemands qui souhaitaient créer une méthode d'apprentissage révolutionnaire.
                    </p>
                    <p className="text-gray-600">
                      Notre équipe internationale combine expertise académique et innovation 
                      technologique pour offrir une expérience d'apprentissage unique.
                    </p>
                    <p className="text-gray-600">
                      Basés entre Paris et Berlin, nous comprenons les défis de l'apprentissage 
                      de l'allemand et avons développé des solutions adaptées à tous les profils.
                    </p>
                    <div className="pt-4">
                      <Link to="/contact">
                        <Button className="bg-red-600 hover:bg-red-700">
                          En savoir plus sur nous
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos étudiants
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez les témoignages de ceux qui ont réussi avec MLDA
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
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
                    <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Prêt à Commencer Votre Aventure ?
            </h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers d'étudiants qui ont déjà transformé leur vie 
              grâce à l'apprentissage de l'allemand avec MLDA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                  Commencer Maintenant
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                  <Play className="w-5 h-5 mr-2" />
                  Découvrir les Cours
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};