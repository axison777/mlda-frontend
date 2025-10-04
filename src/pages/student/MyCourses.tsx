import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, Play, BookOpen, Clock, Star, Filter, CircleHelp as HelpCircle } from 'lucide-react';
import { useCourses, useUserEnrollments } from '@/hooks/useCourses';
import { toast } from 'sonner';
import { CourseDetailsDialog } from '@/components/student/CourseDetailsDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';


export const MyCourses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  
  const { data: enrollmentsData, isLoading: enrollmentsLoading } = useUserEnrollments();
  const { data: coursesData, isLoading: coursesLoading } = useCourses({
    search: searchTerm,
    level: filterLevel !== 'all' ? filterLevel : undefined,
  });

  const enrolledCourses = enrollmentsData?.enrollments || [];
  const availableCourses = coursesData?.courses || [];

  const handleContinueCourse = (course: any) => {
    navigate(`/student/course/${course.id}`);
  };

  const handleViewCourse = (course: any, isEnrolled: boolean = false) => {
    setSelectedCourse({ ...course, isEnrolled });
    setShowDetailsDialog(true);
  };

  const filteredEnrolledCourses = enrolledCourses.filter((course: any) => {
    const matchesSearch = course.course?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.course?.teacher?.firstName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || course.course?.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  const filteredAvailableCourses = availableCourses.filter((course: any) => {
    const matchesSearch = course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || course.level === filterLevel;
    const isNotEnrolled = !enrolledCourses.some((enrollment: any) => enrollment.course.id === course.id);
    return matchesSearch && matchesLevel && isNotEnrolled;
  });

  if (enrollmentsLoading || coursesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const getLevelBadge = (level: string) => {
    const colors = {
      a1: 'bg-green-100 text-green-800',
      a2: 'bg-green-100 text-green-800',
      b1: 'bg-yellow-100 text-yellow-800',
      b2: 'bg-yellow-100 text-yellow-800',
      c1: 'bg-red-100 text-red-800',
      c2: 'bg-red-100 text-red-800',
    };
    return colors[level.toLowerCase() as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mes Cours</h1>
        <p className="text-gray-600">Suivez vos cours et découvrez de nouveaux contenus</p>
      </div>

      {/* Filters */}
      <Card>
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
                <DropdownMenuItem onClick={() => setFilterLevel('a1')}>
                  A1 - Débutant
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterLevel('a2')}>
                  A2 - Élémentaire
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterLevel('b1')}>
                  B1 - Intermédiaire
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterLevel('b2')}>
                  B2 - Intermédiaire supérieur
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterLevel('c1')}>
                  C1 - Avancé
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterLevel('c2')}>
                  C2 - Maîtrise
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Course Tabs */}

      {/* Enrolled Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Mes Cours Inscrits ({enrolledCourses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredEnrolledCourses.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun cours inscrit</h3>
              <p className="text-gray-600">Explorez nos cours disponibles ci-dessous</p>
            </div>
          ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEnrolledCourses.map((enrollment: any, index: number) => {
            const course = enrollment.course;
            return (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className="aspect-video bg-gray-200 relative">
                  <img
                    src={course.thumbnail || 'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg'}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={getLevelBadge(course.level)}>
                      {course.level}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Par {course.teacher?.firstName} {course.teacher?.lastName}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Progression</span>
                      <span className="font-medium">{enrollment.progress || 0}%</span>
                    </div>
                    <Progress value={enrollment.progress || 0} className="h-2" />
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{enrollment.completedLessons || 0}/{course._count?.lessons || 0} leçons</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-400" />
                        4.8
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600 mb-3">
                        Continuer votre apprentissage
                      </p>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleViewCourse(course, true)}
                        >
                          Détails
                        </Button>
                        <Button 
                          className="flex-1 bg-red-600 hover:bg-red-700"
                          onClick={() => handleContinueCourse(course)}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Continuer
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )})}
        </div>
          )}
        </CardContent>
      </Card>

      {/* Available Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Cours Disponibles ({filteredAvailableCourses.length})</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAvailableCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className="aspect-video bg-gray-200 relative">
                  <img
                    src={course.thumbnail || 'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg'}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={getLevelBadge(course.level)}>
                      {course.level}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">Par {course.teacher?.firstName} {course.teacher?.lastName}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {Math.floor(course.duration / 60)}h
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-400" />
                      4.8
                    </div>
                    <span>{course._count?.enrollments || 0} étudiants</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-red-600">{course.price?.toLocaleString()} FCFA</span>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        onClick={() => handleViewCourse(course, false)}
                      >
                        Détails
                      </Button>
                      <Button 
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => handleViewCourse(course, false)}
                      >
                        S'inscrire
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        </CardContent>
      </Card>

      <CourseDetailsDialog
        isOpen={showDetailsDialog}
        onClose={() => setShowDetailsDialog(false)}
        course={selectedCourse}
        isEnrolled={selectedCourse?.isEnrolled}
      />
    </motion.div>
  );
};