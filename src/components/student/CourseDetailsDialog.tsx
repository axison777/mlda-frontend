import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Users, 
  Star, 
  Calendar,
  Play,
  Clock,
  Award,
  Target,
  CreditCard
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface CourseDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  course: any;
  isEnrolled?: boolean;
}

export const CourseDetailsDialog = ({ isOpen, onClose, course, isEnrolled = false }: CourseDetailsDialogProps) => {
  const navigate = useNavigate();

  if (!course) return null;

  const handleEnroll = () => {
    onClose();
    navigate('/student/payment', { state: { course } });
  };

  const handleContinueCourse = () => {
    onClose();
    navigate(`/student/course/${course.id}`);
  };

  const getLevelBadge = (level: string) => {
    const colors = {
      a1: 'bg-green-100 text-green-800',
      a2: 'bg-green-100 text-green-800',
      b1: 'bg-yellow-100 text-yellow-800',
      b2: 'bg-yellow-100 text-yellow-800',
      c1: 'bg-red-100 text-red-800',
      c2: 'bg-red-100 text-red-800',
    };
    return colors[level?.toLowerCase() as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const mockLessons = [
    { id: '1', title: 'Introduction à l\'allemand', duration: '15 min', type: 'video' },
    { id: '2', title: 'Les salutations', duration: '12 min', type: 'video' },
    { id: '3', title: 'Quiz: Vocabulaire de base', duration: '5 min', type: 'quiz' },
    { id: '4', title: 'Les nombres', duration: '10 min', type: 'text' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Détails du Cours</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Course Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={course.thumbnail || 'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg'}
                    alt={course.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="text-xl font-bold">{course.title}</h2>
                    <p className="text-gray-600">Par {course.teacher?.firstName} {course.teacher?.lastName}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getLevelBadge(course.level)}>
                        {course.level}
                      </Badge>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm">4.8 (89 avis)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-red-600">{course.price?.toLocaleString()} FCFA</p>
                  <p className="text-sm text-gray-600">{course._count?.enrollments || 0} étudiants</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="content">Contenu</TabsTrigger>
              <TabsTrigger value="instructor">Instructeur</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{course._count?.lessons || 24}</p>
                    <p className="text-sm text-gray-600">Leçons</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{Math.floor((course.duration || 480) / 60)}h</p>
                    <p className="text-sm text-gray-600">Durée totale</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">Oui</p>
                    <p className="text-sm text-gray-600">Certificat</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Description du Cours</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{course.description}</p>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Niveau:</span>
                      <span className="font-medium ml-2">{course.level}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Durée:</span>
                      <span className="font-medium ml-2">{Math.floor((course.duration || 480) / 60)}h</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Créé le:</span>
                      <span className="font-medium ml-2">{new Date(course.createdAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Dernière mise à jour:</span>
                      <span className="font-medium ml-2">{new Date(course.updatedAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Contenu du Cours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockLessons.map((lesson, index) => (
                      <div key={lesson.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{lesson.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {lesson.type === 'video' ? 'Vidéo' :
                                 lesson.type === 'text' ? 'Texte' : 'Quiz'}
                              </Badge>
                              <span className="text-sm text-gray-600">{lesson.duration}</span>
                            </div>
                          </div>
                        </div>
                        {lesson.type === 'quiz' && (
                          <Badge className="bg-purple-100 text-purple-800">Quiz</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="instructor">
              <Card>
                <CardHeader>
                  <CardTitle>À propos de l'instructeur</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {course.teacher?.firstName?.charAt(0)}{course.teacher?.lastName?.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{course.teacher?.firstName} {course.teacher?.lastName}</h3>
                      <p className="text-gray-600">Professeur d'allemand certifié</p>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm">4.9 (234 avis)</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Professeur d'allemand avec plus de 15 ans d'expérience. Spécialisé dans l'enseignement 
                    aux débutants et la préparation aux examens officiels.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex gap-4">
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
            {isEnrolled ? (
              <Button 
                onClick={handleContinueCourse}
                className="bg-red-600 hover:bg-red-700"
              >
                <Play className="w-4 h-4 mr-2" />
                Continuer le cours
              </Button>
            ) : (
              <Button 
                onClick={handleEnroll}
                className="bg-red-600 hover:bg-red-700"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                S'inscrire - {course.price?.toLocaleString()} FCFA
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};