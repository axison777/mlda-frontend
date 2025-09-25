import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Clock, Award, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const levelTestQuestions = [
  {
    question: 'Comment dit-on "Bonjour" en allemand ?',
    options: ['Guten Tag', 'Auf Wiedersehen', 'Danke', 'Bitte'],
    correct: 0,
    level: 'A1',
  },
  {
    question: 'Quel est l\'article défini pour "Haus" (maison) ?',
    options: ['der', 'die', 'das', 'den'],
    correct: 2,
    level: 'A1',
  },
  {
    question: 'Comment conjugue-t-on "sein" (être) à la première personne du singulier ?',
    options: ['bin', 'bist', 'ist', 'sind'],
    correct: 0,
    level: 'A2',
  },
  {
    question: 'Quelle est la forme correcte du passé composé de "gehen" ?',
    options: ['Ich bin gegangen', 'Ich habe gegangen', 'Ich bin gehen', 'Ich habe gehen'],
    correct: 0,
    level: 'B1',
  },
  {
    question: 'Quel est le subjonctif II de "haben" à la troisième personne du singulier ?',
    options: ['hat', 'hätte', 'habe', 'hatte'],
    correct: 1,
    level: 'B2',
  },
  {
    question: 'Quelle phrase utilise correctement le passif avec "werden" ?',
    options: [
      'Das Buch wird gelesen',
      'Das Buch ist gelesen',
      'Das Buch hat gelesen',
      'Das Buch war gelesen'
    ],
    correct: 0,
    level: 'C1',
  },
];

export const LevelTest = () => {
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [testCompleted, setTestCompleted] = useState(false);
  const [finalLevel, setFinalLevel] = useState('');
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes

  const handleStartTest = () => {
    setTestStarted(true);
    setCurrentQuestion(0);
    setAnswers([]);
    setTestCompleted(false);
    
    // Démarrer le timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleCompleteTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    if (currentQuestion < levelTestQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleCompleteTest();
    }
  };

  const handleCompleteTest = () => {
    // Calculer le niveau basé sur les réponses
    let score = 0;
    let maxLevel = 'A1';
    
    levelTestQuestions.forEach((question, index) => {
      if (answers[index] === question.correct) {
        score++;
        if (question.level > maxLevel) {
          maxLevel = question.level;
        }
      }
    });

    const percentage = Math.round((score / levelTestQuestions.length) * 100);
    
    let determinedLevel = 'A1';
    if (percentage >= 90) determinedLevel = 'C1';
    else if (percentage >= 80) determinedLevel = 'B2';
    else if (percentage >= 70) determinedLevel = 'B1';
    else if (percentage >= 60) determinedLevel = 'A2';
    
    setFinalLevel(determinedLevel);
    setTestCompleted(true);
    toast.success(`Test terminé ! Votre niveau: ${determinedLevel}`);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getLevelBadge = (level: string) => {
    const colors = {
      'A1': 'bg-green-100 text-green-800',
      'A2': 'bg-green-100 text-green-800',
      'B1': 'bg-yellow-100 text-yellow-800',
      'B2': 'bg-yellow-100 text-yellow-800',
      'C1': 'bg-red-100 text-red-800',
      'C2': 'bg-red-100 text-red-800',
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (!testStarted) {
    return (
      <div className="min-h-screen w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6 max-w-4xl mx-auto"
        >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Test de Niveau Allemand</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Évaluez votre niveau d'allemand avec notre test complet. 
            Ce test vous aidera à choisir les cours les plus adaptés à votre niveau.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-purple-600" />
            </div>
            <CardTitle>Informations sur le Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="font-medium">30 minutes</p>
                <p className="text-sm text-gray-600">Durée du test</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <GraduationCap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="font-medium">{levelTestQuestions.length} questions</p>
                <p className="text-sm text-gray-600">Questions variées</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="font-medium">A1 à C1</p>
                <p className="text-sm text-gray-600">Niveaux évalués</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Instructions :</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Répondez à toutes les questions du mieux que vous pouvez</li>
                <li>• Vous avez 30 minutes pour compléter le test</li>
                <li>• Une seule réponse par question</li>
                <li>• Vous ne pouvez pas revenir en arrière</li>
                <li>• Votre niveau sera déterminé à la fin du test</li>
              </ul>
            </div>

            <Button 
              onClick={handleStartTest}
              className="w-full bg-purple-600 hover:bg-purple-700"
              size="lg"
            >
              Commencer le Test
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
        </motion.div>
      </div>
    );
  }

  if (testCompleted) {
    return (
      <div className="min-h-screen w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6 max-w-4xl mx-auto"
        >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Résultats du Test</h1>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-12 h-12 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Félicitations !</h2>
            <p className="text-gray-600 mb-6">Vous avez terminé le test de niveau</p>
            
            <div className="mb-8">
              <p className="text-lg text-gray-600 mb-2">Votre niveau d'allemand est :</p>
              <Badge className={`${getLevelBadge(finalLevel)} text-2xl px-6 py-2`}>
                {finalLevel}
              </Badge>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="font-medium">Cours recommandés pour votre niveau :</h3>
              <div className="space-y-2">
                {finalLevel === 'A1' && (
                  <p className="text-sm text-gray-600">• Allemand pour débutants complets</p>
                )}
                {(finalLevel === 'A2' || finalLevel === 'B1') && (
                  <p className="text-sm text-gray-600">• Allemand intermédiaire</p>
                )}
                {(finalLevel === 'B2' || finalLevel === 'C1') && (
                  <p className="text-sm text-gray-600">• Allemand avancé et des affaires</p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                variant="outline"
                onClick={() => {
                  setTestStarted(false);
                  setTestCompleted(false);
                  setCurrentQuestion(0);
                  setAnswers([]);
                  setTimeLeft(1800);
                }}
              >
                Refaire le test
              </Button>
              <Button className="bg-red-600 hover:bg-red-700">
                Voir les cours recommandés
              </Button>
            </div>
          </CardContent>
        </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6 max-w-4xl mx-auto"
      >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Test de Niveau</h1>
          <p className="text-gray-600">Question {currentQuestion + 1} sur {levelTestQuestions.length}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-gray-600" />
            <span className="font-medium">{formatTime(timeLeft)}</span>
          </div>
          <Progress value={((currentQuestion + 1) / levelTestQuestions.length) * 100} className="w-32 h-2" />
        </div>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Badge className={getLevelBadge(levelTestQuestions[currentQuestion].level)}>
                Niveau {levelTestQuestions[currentQuestion].level}
              </Badge>
            </div>

            <h2 className="text-xl font-medium text-center mb-8">
              {levelTestQuestions[currentQuestion].question}
            </h2>

            <div className="space-y-3">
              {levelTestQuestions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto p-6 text-lg"
                  onClick={() => handleAnswer(index)}
                >
                  <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4 text-sm font-medium">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      </motion.div>
    </div>
  );
};