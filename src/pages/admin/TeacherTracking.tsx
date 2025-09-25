import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, MoveHorizontal as MoreHorizontal, Users, BookOpen, Star, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Eye, CreditCard as Edit, MessageCircle, FileText, Ban } from 'lucide-react';
import { toast } from 'sonner';
import { TeacherDetailsDialog } from '@/components/admin/TeacherDetailsDialog';

const mockTeachers = [
  {
    id: '1',
    name: 'Dr. Hans Mueller',
    email: 'h.mueller@mlda.de',
    courses: 5,
    students: 245,
    rating: 4.8,
    reviews: 89,
    lastActive: '2024-01-20',
    status: 'active',
    regularity: 95,
    totalLessons: 120,
    completedLessons: 114,
    revenue: 125000,
  },
  {
    id: '2',
    name: 'Prof. Anna Schmidt',
    email: 'a.schmidt@mlda.de',
    courses: 3,
    students: 156,
    rating: 4.9,
    reviews: 67,
    lastActive: '2024-01-19',
    status: 'active',
    regularity: 88,
    totalLessons: 72,
    completedLessons: 63,
    revenue: 89000,
  },
  {
    id: '3',
    name: 'Dr. Klaus Weber',
    email: 'k.weber@mlda.de',
    courses: 2,
    students: 98,
    rating: 4.7,
    reviews: 45,
    lastActive: '2024-01-15',
    status: 'warning',
    regularity: 65,
    totalLessons: 48,
    completedLessons: 31,
    revenue: 45000,
  },
];

export const TeacherTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);

  const filteredTeachers = mockTeachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      inactive: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getRegularityColor = (regularity: number) => {
    if (regularity >= 90) return 'text-green-600';
    if (regularity >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleViewTeacher = (teacher: any) => {
    setSelectedTeacher(teacher);
    setShowDetailsDialog(true);
  };

  const handleEditTeacher = (teacher: any) => {
    toast.info(`Modification du professeur: ${teacher.name}`);
  };

  const handleSendMessage = (teacher: any) => {
    toast.success(`Message envoyé à ${teacher.name}`);
  };

  const handleGenerateReport = (teacher: any) => {
    toast.success(`Rapport généré pour ${teacher.name}`);
  };

  const handleSendWarning = (teacher: any) => {
    toast.success(`Avertissement envoyé à ${teacher.name}`);
  };

  const handleSuspend = (teacher: any) => {
    const action = teacher.status === 'active' ? 'suspendu' : 'activé';
    toast.success(`Professeur ${action} avec succès`);
  };
  const totalTeachers = mockTeachers.length;
  const activeTeachers = mockTeachers.filter(t => t.status === 'active').length;
  const totalRevenue = mockTeachers.reduce((sum, t) => sum + t.revenue, 0);
  const averageRating = mockTeachers.reduce((sum, t) => sum + t.rating, 0) / totalTeachers;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Suivi des Professeurs</h1>
        <p className="text-gray-600">Surveillez les performances et la régularité de vos professeurs</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Professeurs</p>
                <p className="text-3xl font-bold text-gray-900">{totalTeachers}</p>
              </div>
              <Users className="w-12 h-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Professeurs Actifs</p>
                <p className="text-3xl font-bold text-green-600">{activeTeachers}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenus Générés</p>
                <p className="text-3xl font-bold text-yellow-600">{totalRevenue.toLocaleString()} FCFA</p>
              </div>
              <Star className="w-12 h-12 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Note Moyenne</p>
                <p className="text-3xl font-bold text-red-600">{averageRating.toFixed(1)}</p>
              </div>
              <Star className="w-12 h-12 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teachers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Professeurs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Rechercher un professeur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Professeur</TableHead>
                <TableHead>Cours</TableHead>
                <TableHead>Étudiants</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Régularité</TableHead>
                <TableHead>Revenus</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{teacher.name}</p>
                      <p className="text-sm text-gray-600">{teacher.email}</p>
                      <p className="text-xs text-gray-500">
                        Dernière activité: {new Date(teacher.lastActive).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <p className="font-medium">{teacher.courses}</p>
                      <p className="text-xs text-gray-600">{teacher.completedLessons}/{teacher.totalLessons} leçons</p>
                    </div>
                  </TableCell>
                  <TableCell>{teacher.students}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-400" />
                      <span className="font-medium">{teacher.rating}</span>
                      <span className="text-sm text-gray-600 ml-1">({teacher.reviews})</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className={`text-sm font-medium ${getRegularityColor(teacher.regularity)}`}>
                          {teacher.regularity}%
                        </span>
                      </div>
                      <Progress value={teacher.regularity} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>{teacher.revenue.toLocaleString()} FCFA</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(teacher.status)}>
                      {teacher.status === 'active' ? 'Actif' :
                       teacher.status === 'warning' ? 'Attention' : 'Inactif'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewTeacher(teacher)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Voir le profil
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditTeacher(teacher)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSendMessage(teacher)}>
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Envoyer un message
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleGenerateReport(teacher)}>
                          <FileText className="w-4 h-4 mr-2" />
                          Générer un rapport
                        </DropdownMenuItem>
                        {teacher.status === 'warning' && (
                          <DropdownMenuItem onClick={() => handleSendWarning(teacher)} className="text-yellow-600">
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Envoyer un avertissement
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => handleSuspend(teacher)} className="text-red-600">
                          <Ban className="w-4 h-4 mr-2" />
                          Suspendre
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <TeacherDetailsDialog
        isOpen={showDetailsDialog}
        onClose={() => setShowDetailsDialog(false)}
        teacher={selectedTeacher}
      />
    </motion.div>
  );
};