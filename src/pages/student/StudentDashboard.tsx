import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  BookOpen, 
  Clock,
  Award, 
  Play, 
  HelpCircle,
  GraduationCap,
  TrendingUp,
  Calendar,
  Target,
  MessageCircle,
  Star,
  Users,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const studentStats = [
  {
    title: 'Cours Suivis',
    value: '5',
    change: 'En cours',
    icon: BookOpen,
    color: 'text-blue-600',
  },
  {
    title: 'Heures Étudiées',
    value: '47h',
    change: 'Cette semaine: 8h',
    icon: Clock,
    color: 'text-green-600',
  },
  {
    title: 'Progression',
    value: '68%',
    change: 'Niveau intermédiaire',
    icon: Award,
    color: 'text-yellow-600',
  },
];

const currentCourses = [
  {
    id: '1',
    title: 'Allemand pour débutants',
    progress: 75,
    nextLesson: 'Leçon 8: Les verbes irréguliers',
    instructor: 'Dr. Mueller',
    hasQuiz: true,
  },
  {
    id: '2',
    title: 'Grammaire allemande avancée',
    progress: 45,
    nextLesson: 'Leçon 5: Le subjonctif',
    instructor: 'Prof. Schmidt',
    hasQuiz: true,
  },
  {
    id: '3',
    title: 'Conversation allemande',
    progress: 90,
    nextLesson: 'Quiz final du cours',
    instructor: 'Mme Weber',
    hasQuiz: false,
    isFinalQuiz: true,
  },
];

const recentActivity = [
  {
    id: '1',
    type: 'lesson_completed',
    title: 'Leçon complétée: Les verbes modaux',
    time: 'Il y a 2 heures',
    icon: BookOpen,
    color: 'text-green-600',
  },
  {
    id: '2',
    type: 'quiz_passed',
    title: 'Quiz réussi: Grammaire de base (85%)',
    time: 'Hier',
    icon: Award,
    color: 'text-blue-600',
  },
  {
    id: '3',
    type: 'course_enrolled',
    title: 'Inscription: Conversation avancée',
    time: 'Il y a 3 jours',
    icon: Users,
    color: 'text-purple-600',
  },
];

const upcomingDeadlines = [
  {
    id: '1',
    title: 'Quiz final - Allemand débutants',
    date: '2024-01-25',
    type: 'quiz',
  },
  {
    id: '2',
    title: 'Projet oral - Conversation',
    date: '2024-01-28',
    type: 'project',
  },
];

const weeklyGoals = [
  { title: 'Compléter 3 leçons', progress: 67, current: 2, target: 3 },
  { title: 'Réviser le vocabulaire', progress: 100, current: 1, target: 1 },
  { title: 'Quiz de grammaire', progress: 0, current: 0, target: 1 },
];

const levelTestQuestions = [
  {
    question: 'Comment dit-on "Bonjour" en allemand ?',
    options: ['Guten Tag', 'Auf Wiedersehen', 'Danke', 'Bitte'],
    correct: 0,
  },
  {
    question: 'Quel est l\'article défini pour "Buch" (livre) ?',
    options: ['der', 'die', 'das', 'den'],
    correct: 2,
  },
  {
    question: 'Comment conjugue-t-on "haben" (avoir) à la troisième personne du singulier ?',
    options: ['habe', 'hast', 'hat', 'haben'],
    correct: 2,
  },
];

export const StudentDashboard = () => {
  const [showLevelTest, setShowLevelTest] = useState(false);
  const [testAnswers, setTestAnswers] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);

  const handleStartLevelTest = () => {
    setShowLevelTest(true);
    setTestAnswers([]);
    setCurrentQuestion(0);
    setTestCompleted(false);
  };

  const handleTestAnswer = (answerIndex: number) => {
    const newAnswers = [...testAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setTestAnswers(newAnswers);

    if (currentQuestion < levelTestQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Test terminé
      const score = levelTestQuestions.reduce((correct, question, index) => {
        return correct + (newAnswers[index] === question.correct ? 1 : 0);
      }, 0);
      
      const percentage = Math.round((score / levelTestQuestions.length) * 100);
      let level = 'A1';
      
      if (percentage >= 90) level = 'C1';
      else if (percentage >= 80) level = 'B2';
      else if (percentage >= 70) level = 'B1';
      else if (percentage >= 60) level = 'A2';
      
      setTestCompleted(true);
      toast.success(`Test terminé ! Votre niveau estimé: ${level} (${percentage}%)`);
    }
  };

  const handleContinueCourse = (course: any) => {
    if (course.isFinalQuiz) {
      toast.info(`Démarrage du quiz final pour: ${course.title}`);
    } else {
      toast.success(`Redirection vers: ${course.nextLesson}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Étudiant</h1>
          <p className="text-gray-600">Continuez votre apprentissage de l'allemand</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleStartLevelTest}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <GraduationCap className="w-4 h-4 mr-2" />
            Test de Niveau
          </Button>
          <Link to="/student/courses">
            <Button className="bg-red-600 hover:bg-red-700">
              <BookOpen className="w-4 h-4 mr-2" />
              Voir tous les cours
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {studentStats.map((stat, index) => (
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
                    <p className="text-sm text-gray-500">{stat.change}</p>
                  </div>
                  <stat.icon className={`w-12 h-12 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Current Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Mes Cours en Cours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {currentCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{course.title}</h3>
                  <p className="text-sm text-gray-600">Par {course.instructor}</p>
                  <p className="text-sm text-gray-500 mt-1">{course.nextLesson}</p>
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Progression</span>
                      <span className="text-sm font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  {course.hasQuiz && (
                    <Badge className="bg-purple-100 text-purple-800 mt-2">
                      <HelpCircle className="w-3 h-3 mr-1" />
                      Quiz disponible
                    </Badge>
                  )}
                </div>
                <div className="ml-6">
                  <Button 
                    className={course.isFinalQuiz ? "bg-purple-600 hover:bg-purple-700" : "bg-red-600 hover:bg-red-700"}
                    onClick={() => handleContinueCourse(course)}
                  >
                    {course.isFinalQuiz ? (
                      <>
                        <HelpCircle className="w-4 h-4 mr-2" />
                        Quiz Final
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Continuer
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Extended Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Objectifs de la Semaine
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyGoals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{goal.title}</span>
                    <span className="text-sm text-gray-600">{goal.current}/{goal.target}</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Activité Récente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center`}>
                    <activity.icon className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-gray-600">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Échéances Importantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium">{deadline.title}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(deadline.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <Badge className={deadline.type === 'quiz' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}>
                    {deadline.type === 'quiz' ? 'Quiz' : 'Projet'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="w-5 h-5 mr-2" />
              Recommandé pour vous
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-medium text-gray-900">Cours de préparation TestDaF</h3>
                <p className="text-sm text-gray-600">Préparez-vous à l'examen officiel</p>
                <Button variant="outline" size="sm" className="mt-2">
                  En savoir plus
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-medium text-gray-900">Session de conversation</h3>
                <p className="text-sm text-gray-600">Pratiquez avec un professeur natif</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Réserver
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Level Test Dialog */}
      <Dialog open={showLevelTest} onOpenChange={setShowLevelTest}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-purple-600" />
              Test de Niveau Allemand
            </DialogTitle>
          </DialogHeader>
          
          {!testCompleted ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Question {currentQuestion + 1} sur {levelTestQuestions.length}
                </span>
                <Progress value={((currentQuestion + 1) / levelTestQuestions.length) * 100} className="w-32 h-2" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  {levelTestQuestions[currentQuestion].question}
                </h3>
                <div className="space-y-2">
                  {levelTestQuestions[currentQuestion].options.map((option, optionIndex) => (
                    <Button
                      key={optionIndex}
                      variant="outline"
                      className="w-full justify-start text-left h-auto p-4"
                      onClick={() => handleTestAnswer(optionIndex)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Test terminé !</h3>
              <p className="text-gray-600">
                Consultez vos résultats et les cours recommandés pour votre niveau.
              </p>
              <Button 
                onClick={() => setShowLevelTest(false)}
                className="bg-red-600 hover:bg-red-700"
              >
                Voir les recommandations
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};