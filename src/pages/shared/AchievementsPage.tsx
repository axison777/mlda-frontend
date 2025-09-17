import { motion } from 'framer-motion';
import { AchievementSystem } from '@/components/gamification/AchievementSystem';

export const AchievementsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mes Achievements</h1>
        <p className="text-gray-600">Débloquez des récompenses en progressant dans vos cours</p>
      </div>
      
      <AchievementSystem />
    </motion.div>
  );
};