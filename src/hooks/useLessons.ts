import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { toast } from 'sonner';

export const useLessonsByCourse = (courseId: string) => {
  return useQuery({
    queryKey: ['lessons', 'course', courseId],
    queryFn: () => apiClient.getLessonsByCourse(courseId),
    enabled: !!courseId,
  });
};

export const useLesson = (id: string) => {
  return useQuery({
    queryKey: ['lesson', id],
    queryFn: () => apiClient.getLessonById(id),
    enabled: !!id,
  });
};

export const useCreateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lessonData: any) => apiClient.createLesson(lessonData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['lessons', 'course', variables.courseId] });
      toast.success('Leçon créée avec succès !');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erreur lors de la création de la leçon');
    },
  });
};

export const useUpdateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      apiClient.updateLesson(id, updates),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
      queryClient.invalidateQueries({ queryKey: ['lesson', data.id] });
      toast.success('Leçon mise à jour !');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erreur lors de la mise à jour');
    },
  });
};

export const useDeleteLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.deleteLesson(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
      toast.success('Leçon supprimée !');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erreur lors de la suppression');
    },
  });
};
