import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface UserDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

export const UserDetailsDialog = ({ isOpen, onClose, user }: UserDetailsDialogProps) => {
  if (!user) return null;

  const handleSendMessage = () => {
    toast.success(`Message envoyé à ${user.firstName} ${user.lastName}`);
  };

  const handleEditUser = () => {
    toast.info(`Ouverture de l'édition pour ${user.firstName} ${user.lastName}`);
  };

  const handleToggleStatus = () => {
    const action = user.isActive ? 'suspendu' : 'activé';
    toast.success(`Utilisateur ${action} avec succès`);
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      ADMIN: 'bg-red-100 text-red-800',
      TEACHER: 'bg-blue-100 text-blue-800',
      STUDENT: 'bg-green-100 text-green-800',
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const mockStats = {
    coursesCreated: user.role === 'TEACHER' ? 5 : 0,
    studentsEnrolled: user.role === 'TEACHER' ? 234 : 0,
    coursesEnrolled: user.role === 'STUDENT' ? 3 : 0,
    completionRate: user.role === 'STUDENT' ? 78 : 0,
    averageRating: user.role === 'TEACHER' ? 4.8 : 0,
    totalRevenue: user.role === 'TEACHER' ? 15000 : 0,
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Détails de l'Utilisateur</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* User Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{user.firstName} {user.lastName}</h2>
                    <p className="text-gray-600">{user.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getRoleBadge(user.role)}>
                        {user.role === 'STUDENT' ? 'Étudiant' : 
                         user.role === 'TEACHER' ? 'Professeur' : 'Admin'}
                      </Badge>
                      <Badge className={user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {user.isActive ? 'Actif' : 'Inactif'}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleSendMessage}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" onClick={handleEditUser}>
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleToggleStatus}
                    className={user.isActive ? 'text-red-600' : 'text-green-600'}
                  >
                    {user.isActive ? (
                      <>
                        <Ban className="w-4 h-4 mr-2" />
                        Suspendre
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Activer
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="info" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Informations</TabsTrigger>
              <TabsTrigger value="stats">Statistiques</TabsTrigger>
              <TabsTrigger value="activity">Activité</TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>Informations Personnelles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Nom complet</p>
                        <p className="font-medium">{user.firstName} {user.lastName}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Téléphone</p>
                        <p className="font-medium">{user.phone || 'Non renseigné'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Inscription</p>
                        <p className="font-medium">{new Date(user.createdAt).toLocaleDateString('fr-FR')}</p>
                      </div>
                    </div>
                  </div>
                  
                  {user.bio && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Biographie</p>
                      <p className="text-gray-800">{user.bio}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {user.role === 'TEACHER' && (
                  <>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{mockStats.coursesCreated}</p>
                        <p className="text-sm text-gray-600">Cours créés</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <User className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{mockStats.studentsEnrolled}</p>
                        <p className="text-sm text-gray-600">Étudiants</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{mockStats.averageRating}</p>
                        <p className="text-sm text-gray-600">Note moyenne</p>
                      </CardContent>
                    </Card>
                  </>
                )}
                
                {user.role === 'STUDENT' && (
                  <>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{mockStats.coursesEnrolled}</p>
                        <p className="text-sm text-gray-600">Cours suivis</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{mockStats.completionRate}%</p>
                        <p className="text-sm text-gray-600">Taux de réussite</p>
                      </CardContent>
                    </Card>
                  </>
                )}
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
                        <p className="text-sm font-medium">Connexion</p>
                        <p className="text-xs text-gray-600">Il y a 2 heures</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Cours complété</p>
                        <p className="text-xs text-gray-600">Hier</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Profil mis à jour</p>
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