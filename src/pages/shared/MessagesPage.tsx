import { motion } from 'framer-motion';
import { MessageCenter } from '@/components/messaging/MessageCenter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Users, Clock, TrendingUp } from 'lucide-react';

export const MessagesPage = () => {
  const messageStats = [
    { title: 'Messages non lus', value: '3', icon: MessageCircle, color: 'text-red-600' },
    { title: 'Conversations actives', value: '8', icon: Users, color: 'text-blue-600' },
    { title: 'Temps de réponse moyen', value: '2h', icon: Clock, color: 'text-green-600' },
    { title: 'Messages ce mois', value: '47', icon: TrendingUp, color: 'text-yellow-600' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600">Communiquez avec vos professeurs et étudiants</p>
      </div>
      
      {/* Message Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {messageStats.map((stat, index) => (
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
                  </div>
                  <stat.icon className={`w-12 h-12 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="h-[calc(100vh-300px)]">
        <MessageCenter />
      </div>
    </motion.div>
  );
};