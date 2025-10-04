import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
import { Search, MoveHorizontal as MoreHorizontal, UserPlus, Filter, Eye, CreditCard as Edit, Ban, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

import { useUsers, useUpdateUser, useDeleteUser } from '@/hooks/useUsers';
import { CreateUserDialog } from '@/components/admin/CreateUserDialog';
import { UserDetailsDialog } from '@/components/admin/UserDetailsDialog';
import { EditUserDialog } from '@/components/admin/EditUserDialog';

export const UsersManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const { data: usersData, isLoading } = useUsers({
    search: searchTerm,
    role: filterRole !== 'all' ? filterRole : undefined,
  });
  
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const users = usersData?.users || [];

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: 'bg-red-100 text-red-800',
      teacher: 'bg-blue-100 text-blue-800',
      student: 'bg-green-100 text-green-800',
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusBadge = (status: string) => {
    return status 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setShowDetailsDialog(true);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setShowEditDialog(true);
  };

  const handleSendMessage = (user: any) => {
    toast.success(`Message envoyé à ${user.firstName} ${user.lastName}`);
  };

  const handleSuspendUser = async (user: any) => {
    if (confirm(`Êtes-vous sûr de vouloir ${user.isActive ? 'suspendre' : 'activer'} cet utilisateur ?`)) {
      await updateUserMutation.mutateAsync({ 
        id: user.id, 
        updates: { isActive: !user.isActive } 
      });
    }
  };
  const handleDeleteUser = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      await deleteUserMutation.mutateAsync(id);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 w-full"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
          <p className="text-gray-600">Gérez les étudiants et professeurs de la plateforme</p>
        </div>
        <Button 
          onClick={() => setShowCreateDialog(true)}
          className="bg-red-600 hover:bg-red-700"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Ajouter un utilisateur
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{users.length}</p>
              <p className="text-sm text-gray-600">Total Utilisateurs</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {users.filter((u: any) => u.role === 'STUDENT').length}
              </p>
              <p className="text-sm text-gray-600">Étudiants</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">
                {users.filter((u: any) => u.role === 'TEACHER').length}
              </p>
              <p className="text-sm text-gray-600">Professeurs</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">
                {users.filter((u: any) => u.isActive).length}
              </p>
              <p className="text-sm text-gray-600">Actifs ce mois</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Utilisateurs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Rechercher par nom ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrer par rôle
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterRole('all')}>
                  Tous les rôles
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterRole('student')}>
                  Étudiants
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterRole('teacher')}>
                  Professeurs
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date d'inscription</TableHead>
                  <TableHead>Cours/Inscriptions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user: any) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{user.firstName} {user.lastName}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleBadge(user.role.toLowerCase())}>
                        {user.role === 'STUDENT' ? 'Étudiant' : 
                         user.role === 'TEACHER' ? 'Professeur' : 'Admin'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(user.isActive)}>
                        {user.isActive ? 'Actif' : 'Inactif'}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell>
                      {user.role === 'TEACHER' ? (
                        <span className="text-sm text-gray-600">
                          {user._count?.courses || 0} cours
                        </span>
                      ) : (
                        <span className="text-sm text-gray-600">
                          {user._count?.enrollments || 0} inscriptions
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewUser(user)}>
                            <Eye className="w-4 h-4 mr-2" />
                            Voir le profil
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditUser(user)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSendMessage(user)}>
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Envoyer un message
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSuspendUser(user)}>
                            <Ban className="w-4 h-4 mr-2" />
                            {user.isActive ? 'Suspendre' : 'Activer'}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CreateUserDialog
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
      />
      
      <UserDetailsDialog
        isOpen={showDetailsDialog}
        onClose={() => setShowDetailsDialog(false)}
        user={selectedUser}
      />
      
      <EditUserDialog
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        user={selectedUser}
      />
    </motion.div>
  );
};