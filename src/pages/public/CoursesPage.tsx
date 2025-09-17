import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Star, Clock, Users, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mockCourses = [
  {
    id: '1',
    title: 'Allemand pour débutants',
    description: 'Apprenez les bases de la langue allemande avec des méthodes interactives',
    level: 'A1',
    price: 25000,
    instructor: 'Dr. Hans Mueller',
    duration: '8 semaines',
    students: 245,
    rating: 4.8,
    reviews: 89,
    image: 'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg',
    category: 'Général',
    lessons: 24,
  },
  {
    id: '2',
    title: 'Allemand des affaires',
    description: 'Perfectionnez votre allemand professionnel pour le monde du travail',
    level: 'B2',
    price: 45000,
    instructor: 'Prof. Anna Schmidt',
    duration: '12 semaines',
    students: 156,
    rating: 4.9,
    reviews: 67,
    image: 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg',
    category: 'Business',
    lessons: 36,
  },
  {
    id: '3',
    title: 'Grammaire allemande avancée',
    description: 'Maîtrisez les subtilités de la grammaire allemande',
    level: 'C1',
    price: 35000,
    instructor: 'Dr. Klaus Weber',
    duration: '10 semaines',
    students: 98,
    rating: 4.7,
    reviews: 45,
    image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg',
    category: 'Grammaire',
    lessons: 30,
  },
  {
    id: '4',
    title: 'Conversation allemande',
    description: 'Améliorez votre expression orale avec des sessions pratiques',
    level: 'B1',
    price: 30000,
    instructor: 'Mme. Lisa Weber',
    duration: '6 semaines',
    students: 189,
    rating: 4.6,
    reviews: 78,
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    category: 'Conversation',
    lessons: 18,
  },
];

export const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || course.level === filterLevel;
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const getLevelBadge = (level: string) => {
    const colors = {
      'A1': 'bg-green-100 text-green-800',
      'A2': 'bg-green-100 text-green-800',
      'B1': 'bg-yellow-100 text-yellow-800',
      'B2': 'bg-yellow-100 text-yellow-800',
      'C1': 'bg-red-100 text-red-800',
      'C2': 'bg-red-100 text-red-800',
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-white w-full">
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
              <Link to="/" className="text-gray-600 hover:text-gray-900">Accueil</Link>
              <Link to="/courses" className="text-red-600 font-medium">Cours</Link>
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

      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nos Cours d'Allemand</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez notre catalogue complet de cours d'allemand, du niveau débutant au niveau avancé
          </p>
        </motion.div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Rechercher un cours..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Niveau: {filterLevel === 'all' ? 'Tous' : filterLevel}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterLevel('all')}>
                    Tous les niveaux
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterLevel('A1')}>A1 - Débutant</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterLevel('A2')}>A2 - Élémentaire</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterLevel('B1')}>B1 - Intermédiaire</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterLevel('B2')}>B2 - Intermédiaire supérieur</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterLevel('C1')}>C1 - Avancé</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterLevel('C2')}>C2 - Maîtrise</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Catégorie: {filterCategory === 'all' ? 'Toutes' : filterCategory}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterCategory('all')}>
                    Toutes les catégories
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterCategory('Général')}>Général</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterCategory('Business')}>Business</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterCategory('Grammaire')}>Grammaire</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterCategory('Conversation')}>Conversation</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={getLevelBadge(course.level)}>
                      {course.level}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-white/90">
                      {course.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
                  <p className="text-sm text-gray-600 mb-4">Par {course.instructor}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {course.lessons} leçons
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-400" />
                      <span className="text-sm font-medium">{course.rating}</span>
                      <span className="text-sm text-gray-600 ml-1">({course.reviews})</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      {course.students}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-red-600">{course.price.toLocaleString()} FCFA</span>
                    <Link to="/signup">
                      <Button className="bg-red-600 hover:bg-red-700">
                        S'inscrire
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun cours trouvé</h3>
            <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </div>
    </div>
  );
};