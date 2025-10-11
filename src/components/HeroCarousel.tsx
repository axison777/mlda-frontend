import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg',
    title: "Apprenez l'Allemand",
    subtitle: 'avec les Meilleurs Professeurs',
    description: 'Maîtrisez l\'allemand grâce à nos cours interactifs, nos professeurs natifs et notre méthode d\'apprentissage innovante.',
  },
  {
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    title: 'Des Cours Adaptés',
    subtitle: 'à Votre Niveau',
    description: 'De A1 à C2, nous vous accompagnons dans votre parcours d\'apprentissage avec des cours personnalisés.',
  },
  {
    image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg',
    title: 'Certificats Reconnus',
    subtitle: 'Internationalement',
    description: 'Obtenez des certificats officiels validés par les institutions européennes et valorisez votre CV.',
  },
];

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          />
          
          {/* Overlay with gradient matching header style */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/80 via-yellow-500/80 to-red-600/80" />
          
          {/* Content */}
          <div className="relative w-full h-full flex items-center">
            <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="max-w-3xl"
              >
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                  {slides[currentSlide].title}
                  <br />
                  <span className="text-yellow-300">
                    {slides[currentSlide].subtitle}
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8">
                  {slides[currentSlide].description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/courses">
                    <Button 
                      size="lg" 
                      className="bg-white text-red-600 hover:bg-gray-100"
                    >
                      <BookOpen className="w-5 h-5 mr-2" />
                      Voir les Cours
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button 
                      size="lg" 
                      className="bg-yellow-500 hover:bg-yellow-600 text-white"
                    >
                      Commencer Gratuitement
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-yellow-500 w-8' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
