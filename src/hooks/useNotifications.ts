import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import type { Notification } from '@/components/NotificationCenter';

export const useNotifications = () => {
  const { user } = useAuthStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!user) return;

    // Simuler des notifications basées sur le rôle
    const mockNotifications: Notification[] = [];

    if (user.role === 'student') {
      mockNotifications.push(
        {
          id: '1',
          type: 'reminder',
          title: 'Cours en attente',
          message: 'Vous avez une leçon en attente dans "Allemand pour débutants"',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2h ago
          read: false,
          actionUrl: '/student/continue',
          actionText: 'Continuer le cours',
        },
        {
          id: '2',
          type: 'success',
          title: 'Quiz réussi !',
          message: 'Félicitations ! Vous avez obtenu 85% au quiz de grammaire',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          read: false,
        },
        {
          id: '3',
          type: 'info',
          title: 'Nouveau cours disponible',
          message: 'Le cours "Allemand des affaires" est maintenant disponible',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          read: true,
        }
      );
    } else if (user.role === 'professor') {
      mockNotifications.push(
        {
          id: '4',
          type: 'info',
          title: 'Nouvel étudiant inscrit',
          message: 'Marie Dubois s\'est inscrite à votre cours "Allemand pour débutants"',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1h ago
          read: false,
        },
        {
          id: '5',
          type: 'warning',
          title: 'Cours à réviser',
          message: 'Votre cours "Grammaire avancée" nécessite une mise à jour',
          timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12h ago
          read: false,
        }
      );
    } else if (user.role === 'admin') {
      mockNotifications.push(
        {
          id: '6',
          type: 'warning',
          title: 'Serveur surchargé',
          message: 'Le serveur principal atteint 85% de capacité',
          timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30min ago
          read: false,
        },
        {
          id: '7',
          type: 'success',
          title: 'Nouveau professeur approuvé',
          message: 'Dr. Klaus Weber a été approuvé comme professeur',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2h ago
          read: true,
        }
      );
    }

    setNotifications(mockNotifications);
  }, [user]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification,
  };
};