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
  Clock,
  Target
} from 'lucide-react';
import { toast } from 'sonner';

interface StudentDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  student: any;
}

export const StudentDetailsDialog = ({ isOpen, onClose, student }: StudentDetailsDialogProps) => {
  if (!student) return null;

  const handleSendMessage = () => {
    toast.success(`Message envoyé à ${student.name}`);
  };

  const handleSendReminder = () => {
    toast.success(`Rappel envoyé à ${student.name}`);
  };

  const handleSuspend = () => {
    toast.success(`Étudiant ${student.status === 'active' ? 'suspendu' : 'activé'}`);
  };

  const handleGenerateReport = () => {
    toast.success(`Rapport généré pour ${student.name}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Détails de l'Étudiant</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Student Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {student.name?.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{student.name}</h2>
                    <p className="text-gray-600">{student.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-green-100 text-green-800">Étudiant</Badge>
                      <Badge className={student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {student.status === 'active' ? 'Actif' : 'Inactif'}
                      </Badge>
                      <Badge className={`bg-blue-100 text-blue-800`}>
                        Niveau {student.level}
                      </Badge>
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
                  {student.status === 'warning' && (
                    <Button variant="outline" onClick={handleSendReminder} className="text-yellow-600">
                      Rappel
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    onClick={handleSuspend}
                    className={student.status === 'active' ? 'text-red-600' : 'text-green-600'}
                  >
                    {student.status === 'active' ? 'Suspendre' : 'Activer'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="courses">Cours</TabsTrigger>
              <TabsTrigger value="progress">Progression</TabsTrigger>
              <TabsTrigger value="activity">Activité</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{student.enrolledCourses}</p>
                    <p className="text-sm text-gray-600">Cours inscrits</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{student.completedCourses}</p>
                    <p className="text-sm text-gray-600">Cours terminés</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Target className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{student.averageScore}%</p>
                    <p className="text-sm text-gray-600">Score moyen</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Clock className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{student.studyTime}h</p>
                    <p className="text-sm text-gray-600">Temps d'étude</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Progression Globale</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Progression totale</span>
                      <span className="font-medium">{student.totalProgress}%</span>
                    </div>
                    <Progress value={student.totalProgress} className="h-3" />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Régularité:</span>
                        <span className="font-medium ml-2">{student.regularity}%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Dernière activité:</span>
                        <span className="font-medium ml-2">{new Date(student.lastActive).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses">
              <Card>
                <CardHeader>
                  <CardTitle>Cours de l'Étudiant</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Mock courses data */}
                    {[
                      { title: 'Allemand pour débutants', progress: 75, status: 'En cours' },
                      { title: 'Grammaire de base', progress: 100, status: 'Terminé' },
                      { title: 'Conversation pratique', progress: 45, status: 'En cours' },
                    ].map((course, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium">{course.title}</p>
                          <p className="text-sm text-gray-600">{course.status}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{course.progress}%</p>
                          <Progress value={course.progress} className="w-20 h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progress">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performances par Matière</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Grammaire</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span>Vocabulaire</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span>Conversation</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Objectifs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Niveau cible:</span>
                      <Badge className="bg-blue-100 text-blue-800">B2</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Échéance:</span>
                      <span className="font-medium">Juin 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Progression vers l'objectif:</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Activité Récente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Leçon complétée: Les verbes modaux</p>
                        <p className="text-xs text-gray-600">Il y a 2 heures</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Quiz réussi: Grammaire de base (85%)</p>
                        <p className="text-xs text-gray-600">Hier</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Inscription au cours: Conversation avancée</p>
                        <p className="text-xs text-gray-600">Il y a 3 jours</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};