import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Award, 
  Star, 
  Target, 
  Calendar, 
  BookOpen, 
  TrendingUp,
  Zap,
  Crown,
  Trophy,
  Medal,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: 'learning' | 'consistency' | 'performance' | 'social';
  points: number;
  unlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const achievementTemplates: Omit<Achievement, 'id' | 'unlocked' | 'unlockedAt' | 'progress'>[] = [
  {
    title: 'Premier Pas',
    description: 'Terminez votre première leçon',
    icon: BookOpen,
    category: 'learning',
    points: 10,
    maxProgress: 1,
    rarity: 'common',
  },
  {
    title: 'Série de 7',
    description: 'Étudiez 7 jours consécutifs',
    icon: Calendar,
    category: 'consistency',
    points: 50,
    maxProgress: 7,
    rarity: 'rare',
  },
  {
    title: 'Score Parfait',
    description: 'Obtenez 100% à un quiz',
    icon: Target,
    category: 'performance',
    points: 25,
    maxProgress: 1,
    rarity: 'rare',
  },
  {
    title: 'Maître des Mots',
    description: 'Apprenez 500 nouveaux mots',
    icon: Star,
    category: 'learning',
    points: 100,
    maxProgress: 500,
    rarity: 'epic',
  },
  {
    title: 'Marathonien',
    description: 'Étudiez pendant 30 jours consécutifs',
    icon: Trophy,
    category: 'consistency',
    points: 200,
    maxProgress: 30,
    rarity: 'legendary',
  },
  {
    title: 'Perfectionniste',
    description: 'Maintenez une moyenne de 95% sur 10 quiz',
    icon: Crown,
    category: 'performance',
    points: 150,
    maxProgress: 10,
    rarity: 'epic',
  },
];

interface AchievementSystemProps {
  showToasts?: boolean;
}

export const AchievementSystem = ({ showToasts = true }: AchievementSystemProps) => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [newlyUnlocked, setNewlyUnlocked] = useState<Achievement[]>([]);

  useEffect(() => {
    // Initialiser les achievements avec des progrès simulés
    const initialAchievements: Achievement[] = achievementTemplates.map((template, index) => ({
      ...template,
      id: `achievement-${index}`,
      unlocked: Math.random() > 0.7, // 30% chance d'être débloqué
      progress: Math.floor(Math.random() * template.maxProgress),
      unlockedAt: Math.random() > 0.7 ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) : undefined,
    }));

    setAchievements(initialAchievements);
  }, [user]);

  const updateProgress = (achievementId: string, newProgress: number) => {
    setAchievements(prev => 
      prev.map(achievement => {
        if (achievement.id === achievementId && !achievement.unlocked) {
          const updatedAchievement = { ...achievement, progress: newProgress };
          
          if (newProgress >= achievement.maxProgress) {
            updatedAchievement.unlocked = true;
            updatedAchievement.unlockedAt = new Date();
            
            if (showToasts) {
              setNewlyUnlocked(prev => [...prev, updatedAchievement]);
              toast.success(`🏆 Achievement débloqué: ${achievement.title}!`);
            }
          }
          
          return updatedAchievement;
        }
        return achievement;
      })
    );
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-300 bg-gray-50';
      case 'rare':
        return 'border-blue-300 bg-blue-50';
      case 'epic':
        return 'border-purple-300 bg-purple-50';
      case 'legendary':
        return 'border-yellow-300 bg-yellow-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-100 text-gray-800';
      case 'rare':
        return 'bg-blue-100 text-blue-800';
      case 'epic':
        return 'bg-purple-100 text-purple-800';
      case 'legendary':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPoints = achievements
    .filter(a => a.unlocked)
    .reduce((sum, a) => sum + a.points, 0);

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Trophy className="w-12 h-12 text-yellow-600 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-900">{totalPoints}</p>
            <p className="text-sm text-gray-600">Points totaux</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Medal className="w-12 h-12 text-blue-600 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-900">{unlockedCount}</p>
            <p className="text-sm text-gray-600">Achievements débloqués</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="w-12 h-12 text-red-600 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-900">
              {Math.round((unlockedCount / achievements.length) * 100)}%
            </p>
            <p className="text-sm text-gray-600">Progression</p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`${getRarityColor(achievement.rarity)} ${
              achievement.unlocked ? 'border-2' : 'opacity-75'
            }`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    achievement.unlocked ? 'bg-yellow-100' : 'bg-gray-100'
                  }`}>
                    <achievement.icon className={`w-6 h-6 ${
                      achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <Badge className={getRarityBadge(achievement.rarity)}>
                    {achievement.rarity === 'common' ? 'Commun' :
                     achievement.rarity === 'rare' ? 'Rare' :
                     achievement.rarity === 'epic' ? 'Épique' : 'Légendaire'}
                  </Badge>
                </div>

                <h3 className={`font-semibold mb-2 ${
                  achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {achievement.title}
                </h3>
                <p className={`text-sm mb-4 ${
                  achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {achievement.description}
                </p>

                {!achievement.unlocked && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progression</span>
                      <span className="font-medium">
                        {achievement.progress}/{achievement.maxProgress}
                      </span>
                    </div>
                    <Progress 
                      value={(achievement.progress / achievement.maxProgress) * 100} 
                      className="h-2" 
                    />
                  </div>
                )}

                {achievement.unlocked && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Débloqué</span>
                    </div>
                    <div className="flex items-center text-yellow-600">
                      <Star className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">+{achievement.points} pts</span>
                    </div>
                  </div>
                )}

                {achievement.unlockedAt && (
                  <p className="text-xs text-gray-500 mt-2">
                    Débloqué le {achievement.unlockedAt.toLocaleDateString('fr-FR')}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Achievement Unlock Animations */}
      <AnimatePresence>
        {newlyUnlocked.map((achievement) => (
          <motion.div
            key={`unlock-${achievement.id}`}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            className="fixed bottom-4 right-4 z-50"
            onAnimationComplete={() => {
              setTimeout(() => {
                setNewlyUnlocked(prev => prev.filter(a => a.id !== achievement.id));
              }, 3000);
            }}
          >
            <Card className="border-yellow-300 bg-yellow-50 shadow-xl">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <achievement.icon className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Achievement débloqué !</p>
                    <p className="text-sm text-gray-600">{achievement.title}</p>
                    <p className="text-xs text-yellow-600">+{achievement.points} points</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};