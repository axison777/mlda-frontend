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
  Edit,
  Trash2,
  Eye,
  Copy,
  Play,
  Pause
} from 'lucide-react';
import { toast } from 'sonner';

interface CourseDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  course: any;
}

export const CourseDetailsDialog = ({ isOpen, onClose, course }: CourseDetailsDialogProps) => {
  if (!course) return null;

  const handleEditCourse = () => {
    toast.info(`Ouverture de l'édition pour ${course.title}`);
  };

  const handleDuplicateCourse = () => {
    toast.success(`Cours "${course.title}" dupliqué avec succès !`);
  };

  const handleToggleStatus = () => {
    const newStatus = course.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    toast.success(`Cours ${newStatus === 'PUBLISHED' ? 'publié' : 'mis en brouillon'}`);
  };

  const handleDeleteCourse = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      toast.success('Cours supprimé avec succès');
      onClose();
    }
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
    return colors[level.toLowerCase() as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
    };
    return colors[status.toLowerCase() as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

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
                      <Badge className={getStatusBadge(course.status)}>
                        {course.status === 'PUBLISHED' ? 'Publié' :
                         course.status === 'DRAFT' ? 'Brouillon' : 'En attente'}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleEditCourse}>
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                  <Button variant="outline" onClick={handleDuplicateCourse}>
                    <Copy className="w-4 h-4 mr-2" />
                    Dupliquer
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleToggleStatus}
                    className={course.status === 'PUBLISHED' ? 'text-yellow-600' : 'text-green-600'}
                  >
                    {course.status === 'PUBLISHED' ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Dépublier
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Publier
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleDeleteCourse}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Supprimer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="content">Contenu</TabsTrigger>
              <TabsTrigger value="students">Étudiants</TabsTrigger>
              <TabsTrigger value="analytics">Analytiques</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{course._count?.enrollments || 0}</p>
                    <p className="text-sm text-gray-600">Étudiants inscrits</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{course._count?.lessons || 0}</p>
                    <p className="text-sm text-gray-600">Leçons</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">4.8</p>
                    <p className="text-sm text-gray-600">Note moyenne</p>
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
                      <span className="text-gray-600">Prix:</span>
                      <span className="font-medium ml-2">{course.price.toLocaleString()} FCFA</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Durée:</span>
                      <span className="font-medium ml-2">{Math.floor(course.duration / 60)}h</span>
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
                    {/* Mock lessons data */}
                    {[
                      { title: 'Introduction à l\'allemand', type: 'video', duration: '15 min' },
                      { title: 'Les salutations', type: 'video', duration: '12 min' },
                      { title: 'Quiz: Vocabulaire de base', type: 'quiz', duration: '5 min' },
                      { title: 'Les nombres', type: 'text', duration: '10 min' },
                    ].map((lesson, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium">{lesson.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{lesson.type}</Badge>
                            <span className="text-sm text-gray-600">{lesson.duration}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students">
              <Card>
                <CardHeader>
                  <CardTitle>Étudiants Inscrits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Mock students data */}
                    {[
                      { name: 'Marie Dubois', progress: 75, lastActive: '2024-01-20' },
                      { name: 'Pierre Martin', progress: 45, lastActive: '2024-01-18' },
                      { name: 'Sophie Laurent', progress: 90, lastActive: '2024-01-19' },
                    ].map((student, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-gray-600">
                            Dernière activité: {new Date(student.lastActive).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{student.progress}%</p>
                          <Progress value={student.progress} className="w-20 h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Statistiques d'Engagement</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taux de complétion:</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Temps moyen par leçon:</span>
                      <span className="font-medium">12 min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Note moyenne:</span>
                      <span className="font-medium">4.8/5</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenus</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-600">
                        {((course._count?.enrollments || 0) * course.price).toLocaleString()} FCFA
                      </p>
                      <p className="text-sm text-gray-600">Revenus totaux</p>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ce mois:</span>
                      <span className="font-medium">125,000 FCFA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Évolution:</span>
                      <span className="font-medium text-green-600">+22%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};