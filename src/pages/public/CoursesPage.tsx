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
import { useCourses } from '@/hooks/useCourses';

export const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const { data: coursesData, isLoading } = useCourses({
    search: searchTerm,
    level: filterLevel !== 'all' ? filterLevel : undefined,
  });

  const courses = coursesData?.courses || [];

  const getLevelBadge = (level: string) => {
    const colors = {
      'beginner': 'bg-green-100 text-green-800',
      'intermediate': 'bg-yellow-100 text-yellow-800',
      'advanced': 'bg-red-100 text-red-800',
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getLevelLabel = (level: string) => {
    const labels = {
      'beginner': 'Débutant',
      'intermediate': 'Intermédiaire',
      'advanced': 'Avancé',
    };
    return labels[level as keyof typeof labels] || level;
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      'Langue': 'bg-blue-100 text-blue-800',
      'Professionnel': 'bg-purple-100 text-purple-800',
      'Business': 'bg-orange-100 text-orange-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h${mins > 0 ? ` ${mins}min` : ''}`;
    }
    return `${mins}min`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-yellow-500 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cours de Français
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Apprenez le français avec nos professeurs experts
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Rechercher un cours ou un professeur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-3 text-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Niveau: {filterLevel === 'all' ? 'Tous' : getLevelLabel(filterLevel)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterLevel('all')}>
                Tous les niveaux
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterLevel('beginner')}>
                Débutant
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterLevel('intermediate')}>
                Intermédiaire
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterLevel('advanced')}>
                Avancé
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Catégorie: {filterCategory === 'all' ? 'Toutes' : filterCategory}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterCategory('all')}>
                Toutes les catégories
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterCategory('Langue')}>
                Langue
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterCategory('Professionnel')}>
                Professionnel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Courses Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course: any, index: number) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={course.thumbnailUrl || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop'}
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={getLevelBadge(course.level)}>
                        {getLevelLabel(course.level)}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className={getCategoryBadge(course.category)}>
                        {course.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <BookOpen className="w-4 h-4 mr-1" />
                      <span className="mr-4">{course.instructorName}</span>
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="mr-4">{formatDuration(course.duration)}</span>
                      <Users className="w-4 h-4 mr-1" />
                      <span>{course.enrollmentCount} étudiants</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="ml-1 font-semibold">{course.rating}</span>
                        <span className="text-gray-500 ml-1">({course.reviewCount})</span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-red-600">
                          {course.price.toLocaleString()} {course.currency}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button asChild className="flex-1 bg-red-600 hover:bg-red-700">
                        <Link to={`/courses/${course.id}`}>
                          Voir le cours
                        </Link>
                      </Button>
                      <Button variant="outline" className="px-4">
                        <Star className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {courses.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Aucun cours trouvé
            </h3>
            <p className="text-gray-500">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
      </div>
    </div>
  );
};