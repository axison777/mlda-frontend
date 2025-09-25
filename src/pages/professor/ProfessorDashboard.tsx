import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Star, TrendingUp, Calendar, MessageCircle, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const professorStats = [
  {
    title: 'Mes Cours',
    value: '12',
    change: '+2 ce mois',
    icon: BookOpen,
    color: 'text-blue-600',
  },
  {
    title: 'Étudiants Actifs',
    value: '847',
    change: '+45 ce mois',
    icon: Users,
    color: 'text-green-600',
  },
  {
    title: 'Note Moyenne',
    value: '4.8',
    change: '+0.2',
    icon: Star,
    color: 'text-yellow-600',
  },
  {
    title: 'Revenus',
    value: '€3,240',
    change: '+18%',
    icon: TrendingUp,
    color: 'text-red-600',
  },
];

const recentActivity = [
  {
    id: '1',
    type: 'student_enrolled',
    title: 'Nouvel étudiant inscrit',
    description: 'Marie Dubois s\'est inscrite à "Allemand pour débutants"',
    time: 'Il y a 2 heures',
    icon: Users,
    color: 'text-green-600',
  },
  {
    id: '2',
    type: 'quiz_completed',
    title: 'Quiz complété',
    description: 'Pierre Martin a terminé le quiz de grammaire (85%)',
    time: 'Il y a 4 heures',
    icon: Award,
    color: 'text-blue-600',
  },
  {
    id: '3',
    type: 'message_received',
    title: 'Nouveau message',
    description: 'Sophie Laurent a posé une question sur les verbes',
    time: 'Hier',
    icon: MessageCircle,
    color: 'text-purple-600',
  },
];

const upcomingTasks = [
  {
    id: '1',
    title: 'Corriger les devoirs',
    description: '12 devoirs en attente de correction',
    dueDate: '2024-01-25',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Préparer le quiz final',
    description: 'Quiz final pour "Allemand débutants"',
    dueDate: '2024-01-28',
    priority: 'medium',
  },
  {
    id: '3',
    title: 'Répondre aux messages',
    description: '5 messages d\'étudiants en attente',
    dueDate: '2024-01-23',
    priority: 'high',
  },
];

const enrollmentData = [
  { month: 'Jan', students: 120 },
  { month: 'Fév', students: 180 },
  { month: 'Mar', students: 240 },
  { month: 'Avr', students: 320 },
  { month: 'Mai', students: 420 },
  { month: 'Juin', students: 520 },
];

export const ProfessorDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Professeur</h1>
          <p className="text-gray-600">Gérez vos cours et suivez vos étudiants</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {professorStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change}</p>
                  </div>
                  <stat.icon className={`w-12 h-12 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inscriptions Chart */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Inscriptions d'Étudiants</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="students"
                    stroke="#dc2626"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Activité Récente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
                    <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center`}>
                      <activity.icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Aperçu des Performances</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Taux de satisfaction</span>
                  <span className="font-medium">4.8/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Taux de rétention</span>
                  <span className="font-medium">92%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Temps de réponse moyen</span>
                  <span className="font-medium">2h</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Tâches à Venir
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{task.title}</h4>
                      <Badge className={`${
                        task.priority === 'high' ? 'bg-red-100 text-red-800' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority === 'high' ? 'Urgent' :
                         task.priority === 'medium' ? 'Moyen' : 'Faible'}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{task.description}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Navigation Rapide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/professor/students">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Voir mes étudiants
                </Button>
              </Link>
              <Link to="/professor/courses">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Mes cours
                </Button>
              </Link>
              <Link to="/professor/messages">
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Messages
                </Button>
              </Link>
              <Link to="/professor/reports">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Rapports
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};