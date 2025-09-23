import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  BookOpen, 
  Award,
  TrendingUp,
  MessageCircle,
  Edit,
  Ban,
  CheckCircle,
  Star,
  Users,
  DollarSign
} from 'lucide-react';
import { toast } from 'sonner';

interface TeacherDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: any;
}

export const TeacherDetailsDialog = ({ isOpen, onClose, teacher }: TeacherDetailsDialogProps) => {
  if (!teacher) return null;

  const handleSendMessage = () => {
    toast.success(`Message envoyé à ${teacher.name}`);
  };

  const handleSendWarning = () => {
    toast.success(`Avertissement envoyé à ${teacher.name}`);
  };

  const handleSuspend = () => {
    toast.success(`Professeur ${teacher.status === 'active' ? 'suspendu' : 'activé'}`);
  };

  const handleGenerateReport = () => {
    toast.success(`Rapport généré pour ${teacher.name}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Détails du Professeur</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Teacher Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {teacher.name?.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{teacher.name}</h2>
                    <p className="text-gray-600">{teacher.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-blue-100 text-blue-800">Professeur</Badge>
                      <Badge className={teacher.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {teacher.status === 'active' ? 'Actif' : 'Inactif'}
                      </Badge>
                      {teacher.regularity >= 90 && (
                        <Badge className="bg-yellow-100 text-yellow-800">⭐ Excellent</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleSendMessage}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" onClick={handleGenerateReport}>
                    Rapport
                  </Button>
                  {teacher.status === 'warning' && (
                    <Button variant="outline" onClick={handleSendWarning} className="text-yellow-600">
                      Avertissement
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    onClick={handleSuspend}
                    className={teacher.status === 'active' ? 'text-red-600' : 'text-green-600'}
                  >
                    {teacher.status === 'active' ? 'Suspendre' : 'Activer'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="courses">Cours</TabsTrigger>
              <TabsTrigger value="students">Étudiants</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{teacher.courses}</p>
                    <p className="text-sm text-gray-600">Cours créés</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{teacher.students}</p>
                    <p className="text-sm text-gray-600">Étudiants</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{teacher.rating}</p>
                    <p className="text-sm text-gray-600">Note moyenne</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Régularité d'enseignement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Régularité</span>
                      <span className="font-medium">{teacher.regularity}%</span>
                    </div>
                    <Progress value={teacher.regularity} className="h-3" />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Leçons complétées:</span>
                        <span className="font-medium ml-2">{teacher.completedLessons}/{teacher.totalLessons}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Revenus générés:</span>
                        <span className="font-medium ml-2">{teacher.revenue?.toLocaleString()} FCFA</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses">
              <Card>
                <CardHeader>
                  <CardTitle>Cours du Professeur</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Mock courses data */}
                    {[
                      { title: 'Allemand pour débutants', students: 145, rating: 4.8 },
                      { title: 'Grammaire avancée', students: 89, rating: 4.9 },
                      { title: 'Conversation pratique', students: 67, rating: 4.7 },
                    ].map((course, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium">{course.title}</p>
                          <p className="text-sm text-gray-600">{course.students} étudiants inscrits</p>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="font-medium">{course.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students">
              <Card>
                <CardHeader>
                  <CardTitle>Étudiants du Professeur</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Mock students data */}
                    {[
                      { name: 'Marie Dubois', course: 'Allemand débutants', progress: 75 },
                      { name: 'Pierre Martin', course: 'Grammaire avancée', progress: 60 },
                      { name: 'Sophie Laurent', course: 'Conversation', progress: 90 },
                    ].map((student, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-gray-600">{student.course}</p>
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

            <TabsContent value="performance">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Métriques de Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taux de satisfaction:</span>
                      <span className="font-medium">{teacher.rating}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taux de rétention:</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Temps de réponse moyen:</span>
                      <span className="font-medium">2h</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenus</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-600">{teacher.revenue?.toLocaleString()} FCFA</p>
                      <p className="text-sm text-gray-600">Revenus totaux</p>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ce mois:</span>
                      <span className="font-medium">25,000 FCFA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Évolution:</span>
                      <span className="font-medium text-green-600">+15%</span>
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