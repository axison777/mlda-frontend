import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Save, Upload, Award, Target, Calendar, TrendingUp, BookOpen, Clock, Star, Trophy, Zap } from 'lucide-react';
import { toast } from 'sonner';

export const StudentProfile = () => {
  const [profileData, setProfileData] = useState({
    firstName: 'Marie',
    lastName: 'Dubois',
    email: 'marie.dubois@email.com',
    phone: '+33 6 12 34 56 78',
    bio: 'Étudiante en commerce international, j\'apprends l\'allemand pour mon futur stage à Berlin.',
    goals: 'Atteindre le niveau B2 d\'ici 6 mois',
    interests: ['Business', 'Culture allemande', 'Voyages'],
    nativeLanguage: 'Français',
    currentLevel: 'A2',
    targetLevel: 'B2',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    toast.success('Profil sauvegardé avec succès !');
  };

  const handleSaveGoals = () => {
    toast.success('Objectifs sauvegardés avec succès !');
  };

  const addInterest = () => {
    const newInterest = prompt('Ajouter un centre d\'intérêt:');
    if (newInterest) {
      setProfileData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest]
      }));
    }
  };

  const removeInterest = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index)
    }));
  };

  const achievements = [
    { title: 'Premier cours terminé', date: '2024-01-10', icon: Award, points: 10, rarity: 'common' },
    { title: '7 jours consécutifs', date: '2024-01-15', icon: Calendar, points: 50, rarity: 'rare' },
    { title: 'Score parfait au quiz', date: '2024-01-18', icon: Target, points: 25, rarity: 'rare' },
    { title: '50 leçons complétées', date: '2024-01-20', icon: TrendingUp, points: 100, rarity: 'epic' },
    { title: 'Maître des mots', date: '2024-01-22', icon: Star, points: 75, rarity: 'epic' },
    { title: 'Série de feu', date: '2024-01-23', icon: Zap, points: 150, rarity: 'legendary' },
  ];

  const learningStats = [
    { label: 'Niveau actuel', value: 'A2', progress: 40, icon: BookOpen },
    { label: 'Objectif', value: 'B2', progress: 100, icon: Target },
    { label: 'Temps d\'étude total', value: '47h', progress: 60, icon: Clock },
    { label: 'Série actuelle', value: '12 jours', progress: 80, icon: Calendar },
  ];

  const studyStreak = [
    { day: 'Lun', completed: true },
    { day: 'Mar', completed: true },
    { day: 'Mer', completed: true },
    { day: 'Jeu', completed: true },
    { day: 'Ven', completed: false },
    { day: 'Sam', completed: false },
    { day: 'Dim', completed: false },
  ];

  const skillProgress = [
    { skill: 'Grammaire', level: 85, color: 'bg-blue-500' },
    { skill: 'Vocabulaire', level: 92, color: 'bg-green-500' },
    { skill: 'Conversation', level: 78, color: 'bg-yellow-500' },
    { skill: 'Compréhension', level: 88, color: 'bg-purple-500' },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800';
      case 'rare': return 'bg-blue-100 text-blue-800';
      case 'epic': return 'bg-purple-100 text-purple-800';
      case 'legendary': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
        <p className="text-gray-600">Gérez vos informations et suivez vos progrès</p>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-gray-600">Étudiant MLDA</p>
              <div className="flex items-center gap-4 mt-2">
                <Badge className="bg-blue-100 text-blue-800">Niveau {profileData.currentLevel}</Badge>
                <Badge className="bg-green-100 text-green-800">Membre depuis Jan 2024</Badge>
              </div>
            </div>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Changer la photo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Learning Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Progression d'Apprentissage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {learningStats.map((stat, index) => (
              <div key={stat.label} className="text-center space-y-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <stat.icon className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <Progress value={stat.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Study Streak */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Série d'Étude - 12 jours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-2">
            {studyStreak.map((day, index) => (
              <div key={index} className="text-center">
                <p className="text-xs text-gray-600 mb-2">{day.day}</p>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  day.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  {day.completed ? '✓' : '○'}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Progression par Compétence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skillProgress.map((skill, index) => (
              <div key={skill.skill} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{skill.skill}</span>
                  <span className="text-sm text-gray-600">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${skill.color}`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="learning">Apprentissage</TabsTrigger>
          <TabsTrigger value="achievements">Réussites</TabsTrigger>
          <TabsTrigger value="statistics">Statistiques</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Informations Personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    value={profileData.firstName}
                    onChange={(e) => handleProfileChange('firstName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    value={profileData.lastName}
                    onChange={(e) => handleProfileChange('lastName', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">À propos de moi</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => handleProfileChange('bio', e.target.value)}
                  rows={4}
                />
              </div>

              <Button className="bg-red-600 hover:bg-red-700">
                <Save className="w-4 h-4 mr-2" onClick={handleSaveProfile} />
                Sauvegarder les modifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learning">
          <Card>
            <CardHeader>
              <CardTitle>Objectifs d'Apprentissage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="goals">Mes objectifs</Label>
                <Textarea
                  id="goals"
                  value={profileData.goals}
                  onChange={(e) => handleProfileChange('goals', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="currentLevel">Niveau actuel</Label>
                  <Input
                    id="currentLevel"
                    value={profileData.currentLevel}
                    onChange={(e) => handleProfileChange('currentLevel', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="targetLevel">Niveau cible</Label>
                  <Input
                    id="targetLevel"
                    value={profileData.targetLevel}
                    onChange={(e) => handleProfileChange('targetLevel', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>Centres d'intérêt</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profileData.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary">
                      {interest}
                      <button
                        className="w-3 h-3 ml-1 cursor-pointer" 
                        onClick={() => removeInterest(index)}
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={addInterest}
                >
                  Ajouter un centre d'intérêt
                </Button>
              </div>

              <Button 
                className="bg-red-600 hover:bg-red-700"
                onClick={handleSaveGoals}
              >
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder les objectifs
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Mes Réussites</span>
                <Badge className="bg-yellow-100 text-yellow-800">
                  <Trophy className="w-3 h-3 mr-1" />
                  {achievements.reduce((sum, a) => sum + a.points, 0)} points
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <achievement.icon className="w-5 h-5 text-yellow-600" />
                      </div>
                      <Badge className={getRarityColor(achievement.rarity)}>
                        {achievement.rarity === 'common' ? 'Commun' :
                         achievement.rarity === 'rare' ? 'Rare' :
                         achievement.rarity === 'epic' ? 'Épique' : 'Légendaire'}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{achievement.title}</h3>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                        Obtenu le {new Date(achievement.date).toLocaleDateString('fr-FR')}
                        </span>
                        <span className="text-yellow-600 font-medium">+{achievement.points} pts</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Statistiques d'Étude</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total heures d'étude:</span>
                  <span className="font-medium">47h 23min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Moyenne quotidienne:</span>
                  <span className="font-medium">1h 15min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Leçons complétées:</span>
                  <span className="font-medium">67</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quiz réussis:</span>
                  <span className="font-medium">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Série la plus longue:</span>
                  <span className="font-medium">15 jours</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performances</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Score moyen quiz:</span>
                  <span className="font-medium text-green-600">85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taux de réussite:</span>
                  <span className="font-medium text-green-600">92%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Temps par leçon:</span>
                  <span className="font-medium">12 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Niveau de motivation:</span>
                  <span className="font-medium text-blue-600">Élevé</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Changer le Mot de Passe</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                />
              </div>

              <Button className="bg-red-600 hover:bg-red-700">
                Changer le mot de passe
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};