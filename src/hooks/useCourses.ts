import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { toast } from 'sonner';

export const useCourses = (params?: {
  page?: number;
  limit?: number;
  level?: string;
  status?: string;
  featured?: boolean;
  search?: string;
}) => {
  return useQuery({
    queryKey: ['courses', params],
    queryFn: () => apiClient.getCourses(params),
    keepPreviousData: true,
  });
};

export const useCourse = (id: string) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => apiClient.getCourseById(id),
    enabled: !!id,
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseData: any) => apiClient.createCourse(courseData),
    onSuccess: () => {
      queryClient.invalidateQueries(['courses']);
      toast.success('Cours créé avec succès !');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erreur lors de la création du cours');
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      apiClient.updateCourse(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries(['courses']);
      toast.success('Cours mis à jour !');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erreur lors de la mise à jour');
    },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.deleteCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['courses']);
      toast.success('Cours supprimé !');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erreur lors de la suppression');
    },
  });
};

export const useEnrollInCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseId: string) => apiClient.enrollInCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries(['enrollments']);
      queryClient.invalidateQueries(['courses']);
      toast.success('Inscription réussie !');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erreur lors de l\'inscription');
    },
  });
};

export const useUserEnrollments = () => {
  return useQuery({
    queryKey: ['enrollments'],
    queryFn: async () => {
      try {
        return await apiClient.getUserEnrollments();
      } catch (error) {
        // Retourner des données mock en cas d'erreur
        return {
          enrollments: [
            {
              id: '1',
              progress: 75,
              completedLessons: 18,
              course: {
                id: '1',
                title: 'Allemand pour débutants',
                level: 'A1',
                price: 25000,
                thumbnail: 'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg',
                teacher: { firstName: 'Dr. Hans', lastName: 'Mueller' },
                _count: { lessons: 24 }
              }
            },
            {
              id: '2',
              progress: 45,
              completedLessons: 8,
              course: {
                id: '2',
                title: 'Grammaire allemande avancée',
                level: 'B2',
                price: 35000,
                thumbnail: 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg',
                teacher: { firstName: 'Prof. Anna', lastName: 'Schmidt' },
                _count: { lessons: 18 }
              }
            }
          ]
        };
      }
    },
  });
};