import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, Play, BookOpen, Clock, Star, Filter, HelpCircle } from 'lucide-react';
import { useCourses, useUserEnrollments } from '@/hooks/useCourses';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';


export const MyCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [activeTab, setActiveTab] = useState('enrolled');
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<any>(null);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  
  const { data: enrollmentsData, isLoading: enrollmentsLoading } = useUserEnrollments();
  const { data: coursesData, isLoading: coursesLoading } = useCourses({
    search: searchTerm,
    level: filterLevel !== 'all' ? filterLevel : undefined,
  });

  const enrolledCourses = enrollmentsData?.enrollments || [];
  const availableCourses = coursesData?.courses || [];

  const handleContinueCourse = (course: any) => {
    // Vérifier s'il y a un quiz en attente
    const hasQuiz = Math.random() > 0.5; // Simulation
    
    if (hasQuiz) {
      setCurrentQuiz({
        title: `Quiz - ${course.title}`,
        questions: [
          {
            question: 'Comment dit-on "Bonjour" en allemand ?',
            options: ['Guten Tag', 'Auf Wiedersehen', 'Danke', 'Bitte'],
            correct: 0,
          },
          {
            question: 'Quel est l\'article défini pour "Buch" (livre) ?',
            options: ['der', 'die', 'das', 'den'],
            correct: 2,
          },
        ]
      });
      setQuizAnswers([]);
      setShowQuiz(true);
    } else {
      toast.success(`Redirection vers la prochaine leçon de: ${course.title}`);
    }
  };

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);
  };

  const handleSubmitQuiz = () => {
    const score = currentQuiz.questions.reduce((correct: number, question: any, index: number) => {
      return correct + (quizAnswers[index] === question.correct ? 1 : 0);
    }, 0);
    
    const percentage = Math.round((score / currentQuiz.questions.length) * 100);
    toast.success(`Quiz terminé ! Score: ${percentage}%`);
    setShowQuiz(false);
  };

  const filteredEnrolledCourses = enrolledCourses.filter(course => {
    const matchesSearch = course.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.instructor?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || course.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  const filteredAvailableCourses = availableCourses.filter(course => {
    const matchesSearch = course.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.instructor?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || course.level === filterLevel;
    return matchesSearch && matchesLevel;
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
      <div className="flex gap-4 mb-6">
        <Button
          variant={activeTab === 'enrolled' ? 'default' : 'outline'}
          onClick={() => setActiveTab('enrolled')}
          className={activeTab === 'enrolled' ? 'bg-red-600 hover:bg-red-700' : ''}
        >
          Mes Cours Inscrits ({enrolledCourses.length})
        </Button>
        <Button
          variant={activeTab === 'available' ? 'default' : 'outline'}
          onClick={() => setActiveTab('available')}
          className={activeTab === 'available' ? 'bg-red-600 hover:bg-red-700' : ''}
        >
          Cours Disponibles ({availableCourses.length})
        </Button>
      </div>

      {/* Enrolled Courses */}
      {activeTab === 'enrolled' && (
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
                      <span className="font-medium">0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>0/{course._count?.lessons || 0} leçons</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-400" />
                        4.8
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600 mb-3">
                        Commencer le cours
                      </p>
                      <Button 
                        className="w-full bg-red-600 hover:bg-red-700"
                        onClick={() => handleContinueCourse(course)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Continuer le cours
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )})}
        </div>
      )}

      {/* Quiz Dialog */}
      <Dialog open={showQuiz} onOpenChange={setShowQuiz}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <HelpCircle className="w-5 h-5 mr-2 text-purple-600" />
              {currentQuiz?.title}
            </DialogTitle>
          </DialogHeader>
          
          {currentQuiz && (
            <div className="space-y-6">
              {currentQuiz.questions.map((question: any, questionIndex: number) => (
                <div key={questionIndex} className="space-y-3">
                  <h3 className="font-medium">
                    Question {questionIndex + 1}: {question.question}
                  </h3>
                  <div className="space-y-2">
                    {question.options.map((option: string, optionIndex: number) => (
                      <div 
                        key={optionIndex}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          quizAnswers[questionIndex] === optionIndex 
                            ? 'border-red-500 bg-red-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleQuizAnswer(questionIndex, optionIndex)}
                      >
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                            quizAnswers[questionIndex] === optionIndex 
                              ? 'border-red-500 bg-red-500' 
                              : 'border-gray-300'
                          }`}>
                            {quizAnswers[questionIndex] === optionIndex && (
                              <div className="w-2 h-2 rounded-full bg-white mx-auto mt-0.5" />
                            )}
                          </div>
                          {option}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowQuiz(false)}
                >
                  Fermer
                </Button>
                <Button 
                  onClick={handleSubmitQuiz}
                  className="bg-purple-600 hover:bg-purple-700"
                  disabled={quizAnswers.length !== currentQuiz.questions.length}
                >
                  Valider le quiz
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      {/* Available Courses */}
      {activeTab === 'available' && (
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
                    <span className="text-2xl font-bold text-red-600">€{course.price}</span>
                    <Button 
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => toast.success(`Inscription au cours: ${course.title}`)}
                    >
                      S'inscrire
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};