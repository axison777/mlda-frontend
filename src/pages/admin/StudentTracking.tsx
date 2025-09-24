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
import { Search, MoreHorizontal, Users, BookOpen, TrendingUp, AlertTriangle, Eye, Edit, MessageCircle, FileText, Ban, Bell } from 'lucide-react';
import { StudentDetailsDialog } from '@/components/admin/StudentDetailsDialog';
import { toast } from 'sonner';

const mockStudents = [
  {
    id: '1',
    name: 'Marie Dubois',
    email: 'marie.dubois@email.com',
    enrolledCourses: 3,
    completedCourses: 1,
    totalProgress: 75,
    lastActive: '2024-01-20',
    status: 'active',
    regularity: 92,
    averageScore: 85,
    studyTime: 47,
    level: 'B1',
  },
  {
    id: '2',
    name: 'Pierre Martin',
    email: 'pierre.martin@email.com',
    enrolledCourses: 2,
    completedCourses: 0,
    totalProgress: 45,
    lastActive: '2024-01-18',
    status: 'active',
    regularity: 78,
    averageScore: 78,
    studyTime: 32,
    level: 'A2',
  },
  {
    id: '3',
    name: 'Sophie Laurent',
    email: 'sophie.laurent@email.com',
    enrolledCourses: 4,
    completedCourses: 2,
    totalProgress: 90,
    lastActive: '2024-01-19',
    status: 'active',
    regularity: 95,
    averageScore: 92,
    studyTime: 68,
    level: 'C1',
  },
  {
    id: '4',
    name: 'Thomas Durand',
    email: 'thomas.durand@email.com',
    enrolledCourses: 1,
    completedCourses: 0,
    totalProgress: 20,
    lastActive: '2024-01-10',
    status: 'warning',
    regularity: 45,
    averageScore: 65,
    studyTime: 12,
    level: 'A1',
  },
];

export const StudentTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const filteredStudents = mockStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
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
    if (regularity >= 80) return 'text-green-600';
    if (regularity >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

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

  const handleViewStudent = (student: any) => {
    setSelectedStudent(student);
    setShowDetailsDialog(true);
  };

  const handleEditStudent = (student: any) => {
    toast.info(`Modification de l'étudiant: ${student.name}`);
  };

  const handleSendMessage = (student: any) => {
    toast.success(`Message envoyé à ${student.name}`);
  };

  const handleGenerateReport = (student: any) => {
    toast.success(`Rapport généré pour ${student.name}`);
  };

  const handleSendReminder = (student: any) => {
    toast.success(`Rappel envoyé à ${student.name}`);
  };

  const handleSuspend = (student: any) => {
    const action = student.status === 'active' ? 'suspendu' : 'activé';
    toast.success(`Étudiant ${action} avec succès`);
  };
  const totalStudents = mockStudents.length;
  const activeStudents = mockStudents.filter(s => s.status === 'active').length;
  const warningStudents = mockStudents.filter(s => s.status === 'warning').length;
  const averageProgress = mockStudents.reduce((sum, s) => sum + s.totalProgress, 0) / totalStudents;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Suivi des Étudiants</h1>
        <p className="text-gray-600">Surveillez les progrès et la régularité de vos étudiants</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Étudiants</p>
                <p className="text-3xl font-bold text-gray-900">{totalStudents}</p>
              </div>
              <Users className="w-12 h-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Étudiants Actifs</p>
                <p className="text-3xl font-bold text-green-600">{activeStudents}</p>
              </div>
              <Users className="w-12 h-12 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Nécessitent Attention</p>
                <p className="text-3xl font-bold text-yellow-600">{warningStudents}</p>
              </div>
              <AlertTriangle className="w-12 h-12 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Progression Moyenne</p>
                <p className="text-3xl font-bold text-red-600">{averageProgress.toFixed(0)}%</p>
              </div>
              <TrendingUp className="w-12 h-12 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Étudiants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Rechercher un étudiant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Étudiant</TableHead>
                <TableHead>Niveau</TableHead>
                <TableHead>Cours</TableHead>
                <TableHead>Progression</TableHead>
                <TableHead>Régularité</TableHead>
                <TableHead>Score Moyen</TableHead>
                <TableHead>Temps d'Étude</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-gray-600">{student.email}</p>
                      <p className="text-xs text-gray-500">
                        Dernière activité: {new Date(student.lastActive).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getLevelBadge(student.level)}>
                      {student.level}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <p className="font-medium">{student.enrolledCourses}</p>
                      <p className="text-xs text-gray-600">{student.completedCourses} terminés</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{student.totalProgress}%</span>
                      </div>
                      <Progress value={student.totalProgress} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className={`text-sm font-medium ${getRegularityColor(student.regularity)}`}>
                          {student.regularity}%
                        </span>
                      </div>
                      <Progress value={student.regularity} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{student.averageScore}%</span>
                  </TableCell>
                  <TableCell>{student.studyTime}h</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(student.status)}>
                      {student.status === 'active' ? 'Actif' :
                       student.status === 'warning' ? 'Attention' : 'Inactif'}
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
                        <DropdownMenuItem onClick={() => handleViewStudent(student)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Voir le profil
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditStudent(student)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSendMessage(student)}>
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Envoyer un message
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleGenerateReport(student)}>
                          <FileText className="w-4 h-4 mr-2" />
                          Générer un rapport
                        </DropdownMenuItem>
                        {student.status === 'warning' && (
                          <DropdownMenuItem onClick={() => handleSendReminder(student)} className="text-yellow-600">
                            <Bell className="w-4 h-4 mr-2" />
                            Envoyer un rappel
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => handleSuspend(student)} className="text-red-600">
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

      <StudentDetailsDialog
        isOpen={showDetailsDialog}
        onClose={() => setShowDetailsDialog(false)}
        student={selectedStudent}
      />
    </motion.div>
  );
};