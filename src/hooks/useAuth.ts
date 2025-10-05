import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore, User, UserRole } from '@/store/authStore';
import { apiClient } from '@/lib/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const { user, login, logout } = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      apiClient.login(email, password),
    onSuccess: (data) => {
      const roleMap: { [key: string]: UserRole } = {
        'ADMIN': 'admin',
        'TEACHER': 'professor',
        'STUDENT': 'student',
      };

      const userData: User = {
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        role: roleMap[data.user.role] || 'student',
        bio: data.user.bio,
        avatarUrl: data.user.avatarUrl,
      };

      apiClient.setToken(data.token);
      login(userData, data.token);

      toast.success(data.message || 'Connexion réussie !');

      setTimeout(() => {
        switch (userData.role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'professor':
            navigate('/professor');
            break;
          default:
            navigate('/student');
        }
      }, 100);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erreur de connexion');
    },
  });

  const registerMutation = useMutation({
    mutationFn: (userData: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }) => apiClient.register(userData),
    onSuccess: (data) => {
      const roleMap: { [key: string]: UserRole } = {
        'ADMIN': 'admin',
        'TEACHER': 'professor',
        'STUDENT': 'student',
      };

      const userData: User = {
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        role: roleMap[data.user.role] || 'student',
        bio: data.user.bio,
        avatarUrl: data.user.avatarUrl,
      };

      apiClient.setToken(data.token);
      login(userData, data.token);

      toast.success(data.message || 'Inscription réussie !');

      setTimeout(() => {
        switch (userData.role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'professor':
            navigate('/professor');
            break;
          default:
            navigate('/student');
        }
      }, 100);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erreur d\'inscription');
    },
  });

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: () => apiClient.getProfile(),
    enabled: !!user,
    retry: false,
  });

  const updateProfileMutation = useMutation({
    mutationFn: (updates: any) => apiClient.updateProfile(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Profil mis à jour !');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erreur de mise à jour');
    },
  });

  const handleLogout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      logout();
      queryClient.clear();
      navigate('/login');
      toast.success('Déconnexion réussie');
    }
  };

  return {
    user,
    isAuthenticated: !!user,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: handleLogout,
    updateProfile: updateProfileMutation.mutate,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    profile: profileQuery.data || user,
  };
};