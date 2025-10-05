import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Save, Upload, Star, Users, BookOpen, Award, Target, Calendar, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

export const StudentProfile = () => {
  const { user, profile, updateProfile } = useAuth();

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    avatarUrl: '',
  });

  useEffect(() => {
    if (profile) {
      setProfileData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        bio: profile.bio || '',
        avatarUrl: profile.avatarUrl || '',
      });
    } else if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        bio: user.bio || '',
        avatarUrl: user.avatarUrl || '',
      });
    }
  }, [profile, user]);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [preferences, setPreferences] = useState({
    language: 'fr',
    notifications: {
      email: true,
      push: true,
      reminders: true,
      achievements: true,
    },
    privacy: {
      showProgress: true,
      showAchievements: true,
      allowMessages: true,
    },
  });

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (category: string, field: string, value: boolean) => {
    setPreferences(prev => {
      const categoryObj = prev[category as keyof typeof prev];
      if (typeof categoryObj === 'object' && categoryObj !== null) {
        return {
          ...prev,
          [category]: {
            ...categoryObj,
            [field]: value,
          },
        };
      }
      return prev;
    });
  };

  const handleSaveProfile = () => {
    updateProfile({
      bio: profileData.bio,
      avatarUrl: profileData.avatarUrl,
    });
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }
    toast.success('Mot de passe modifié avec succès !');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const stats = [
    { title: 'Cours Suivis', value: '5', icon: BookOpen, color: 'text-blue-600' },
    { title: 'Cours Terminés', value: '2', icon: Award, color: 'text-green-600' },
    { title: 'Heures d\'Étude', value: '47h', icon: TrendingUp, color: 'text-yellow-600' },
    { title: 'Score Moyen', value: '85%', icon: Target, color: 'text-red-600' },
  ];

  const learningProgress = [
    { skill: 'Grammaire', level: 85, target: 90 },
    { skill: 'Vocabulaire', level: 92, target: 95 },
    { skill: 'Conversation', level: 78, target: 85 },
    { skill: 'Compréhension', level: 88, target: 90 },
  ];

  const recentAchievements = [
    { title: 'Série de 7 jours', description: 'Étudié 7 jours consécutifs', date: '2024-01-20', points: 50 },
    { title: 'Score parfait', description: 'Obtenu 100% à un quiz', date: '2024-01-18', points: 25 },
    { title: 'Premier cours terminé', description: 'Terminé votre premier cours', date: '2024-01-15', points: 100 },
  ];

  return (
    <div className="min-h-screen w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6 max-w-7xl mx-auto"
      >
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
        <p className="text-gray-600">Gérez vos informations personnelles et vos préférences d'apprentissage</p>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-gray-600">Étudiant en allemand</p>
              <div className="flex items-center gap-4 mt-2">
                <Badge className="bg-blue-100 text-blue-800">Niveau {profileData.currentLevel}</Badge>
                <Badge className="bg-green-100 text-green-800">Objectif: {profileData.targetLevel}</Badge>
                <Badge className="bg-yellow-100 text-yellow-800">Étudiant actif</Badge>
              </div>
            </div>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Changer la photo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                  </div>
                  <stat.icon className={`w-12 h-12 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="learning">Apprentissage</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="dateOfBirth">Date de naissance</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) => handleProfileChange('dateOfBirth', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="nationality">Nationalité</Label>
                  <Input
                    id="nationality"
                    value={profileData.nationality}
                    onChange={(e) => handleProfileChange('nationality', e.target.value)}
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

              <Button onClick={handleSaveProfile} className="bg-red-600 hover:bg-red-700">
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder les modifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learning">
          <div className="space-y-6">
            {/* Learning Goals */}
            <Card>
              <CardHeader>
                <CardTitle>Objectifs d'Apprentissage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Niveau actuel</Label>
                    <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">
                      {profileData.currentLevel}
                    </Badge>
                  </div>
                  <div>
                    <Label>Niveau cible</Label>
                    <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
                      {profileData.targetLevel}
                    </Badge>
                  </div>
                </div>

                <div>
                  <Label>Mes objectifs</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profileData.learningGoals.map((goal, index) => (
                      <Badge key={index} variant="outline">
                        {goal}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Centres d'intérêt</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profileData.interests.map((interest, index) => (
                      <Badge key={index} className="bg-yellow-100 text-yellow-800">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Learning Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Progression par Compétence</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {learningProgress.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.skill}</span>
                      <span className="text-sm text-gray-600">{skill.level}% / {skill.target}%</span>
                    </div>
                    <Progress value={skill.level} className="h-3" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Niveau actuel: {skill.level}%</span>
                      <span>Objectif: {skill.target}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Mes Achievements Récents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-500">{new Date(achievement.date).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-yellow-100 text-yellow-800">
                        +{achievement.points} pts
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-6">
            {/* Change Password */}
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

                <Button onClick={handleChangePassword} className="bg-red-600 hover:bg-red-700">
                  Changer le mot de passe
                </Button>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de Confidentialité</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Afficher ma progression</Label>
                    <p className="text-sm text-gray-600">Permettre aux autres de voir vos progrès</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.privacy.showProgress}
                    onChange={(e) => handlePreferenceChange('privacy', 'showProgress', e.target.checked)}
                    className="rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Afficher mes achievements</Label>
                    <p className="text-sm text-gray-600">Rendre vos achievements visibles</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.privacy.showAchievements}
                    onChange={(e) => handlePreferenceChange('privacy', 'showAchievements', e.target.checked)}
                    className="rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Autoriser les messages</Label>
                    <p className="text-sm text-gray-600">Permettre aux professeurs de vous contacter</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.privacy.allowMessages}
                    onChange={(e) => handlePreferenceChange('privacy', 'allowMessages', e.target.checked)}
                    className="rounded"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Préférences de Notification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notifications par email</Label>
                    <p className="text-sm text-gray-600">Recevoir des emails de notification</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.notifications.email}
                    onChange={(e) => handlePreferenceChange('notifications', 'email', e.target.checked)}
                    className="rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Rappels d'étude</Label>
                    <p className="text-sm text-gray-600">Recevoir des rappels pour étudier</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.notifications.reminders}
                    onChange={(e) => handlePreferenceChange('notifications', 'reminders', e.target.checked)}
                    className="rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notifications d'achievements</Label>
                    <p className="text-sm text-gray-600">Être notifié des nouveaux achievements</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.notifications.achievements}
                    onChange={(e) => handlePreferenceChange('notifications', 'achievements', e.target.checked)}
                    className="rounded"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      </motion.div>
    </div>
  );
};