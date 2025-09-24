import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, CreditCard, TrendingUp } from 'lucide-react';
import { useStats } from '@/hooks/useStats';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';


const revenueData = [
  { month: 'Jan', revenue: 3200000 },
  { month: 'Fév', revenue: 3800000 },
  { month: 'Mar', revenue: 4200000 },
  { month: 'Avr', revenue: 4523000 },
  { month: 'Mai', revenue: 4100000 },
  { month: 'Juin', revenue: 4800000 },
];

const coursesData = [
  { level: 'Débutant', count: 145 },
  { level: 'Intermédiaire', count: 123 },
  { level: 'Avancé', count: 74 },
];

export const AdminDashboard = () => {
  const { data: statsData, isLoading } = useStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Apprenants',
      value: statsData?.stats?.users?.total?.toString() || '0',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Professeurs Actifs',
      value: statsData?.stats?.users?.byRole?.teacher?.toString() || '0',
      change: '+5%',
      icon: BookOpen,
      color: 'text-green-600',
    },
    {
      title: 'Cours Publiés',
      value: statsData?.stats?.courses?.byStatus?.published?.toString() || '0',
      change: '+8%',
      icon: BookOpen,
      color: 'text-red-600',
    },
    {
      title: 'Revenus Mensuels',
      value: `${(statsData?.stats?.revenue?.total || 0).toLocaleString()} FCFA`,
      change: '+15%',
      icon: TrendingUp,
      color: 'text-yellow-600',
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
        <p className="text-gray-600">Vue d'ensemble de la plateforme MLDA</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenus Mensuels</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value.toLocaleString()} FCFA`, 'Revenus']} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#dc2626"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cours par Niveau</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={coursesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="level" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#eab308" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Activité Récente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'user', message: 'Nouvel utilisateur inscrit: Marie Dubois', time: 'Il y a 2h' },
                { type: 'course', message: 'Nouveau cours publié: Allemand Business', time: 'Il y a 4h' },
                { type: 'payment', message: 'Paiement reçu: 25,000 FCFA', time: 'Il y a 6h' },
                { type: 'teacher', message: 'Nouveau professeur approuvé: Dr. Weber', time: 'Hier' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-gray-600">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions Rapides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-red-600 hover:bg-red-700" asChild>
              <Link to="/admin/users">
                <Users className="w-4 h-4 mr-2" />
                Gérer les utilisateurs
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/admin/courses">
                <BookOpen className="w-4 h-4 mr-2" />
                Gérer les cours
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/admin/payments">
                <CreditCard className="w-4 h-4 mr-2" />
                Voir les paiements
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/admin/settings">
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};