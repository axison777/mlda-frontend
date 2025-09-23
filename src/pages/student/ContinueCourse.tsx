import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  BookOpen, 
  CheckCircle, 
  Clock,
  Volume2,
  Subtitles,
  HelpCircle,
  ArrowLeft,
  List
} from 'lucide-react';

const currentLesson = {
  id: '19',
  title: 'Les verbes de modalité en allemand',
  course: 'Allemand pour débutants',
  type: 'video',
  duration: '18:30',
  content: `
    Dans cette leçon, nous allons apprendre les verbes de modalité en allemand.
    Les verbes de modalité sont des verbes auxiliaires qui expriment une modalité,
    c'est-à-dire une attitude du locuteur par rapport à l'énoncé.
    
    Les principaux verbes de modalité en allemand sont :
    - können (pouvoir, savoir)
    - müssen (devoir, falloir)
    - wollen (vouloir)
    - sollen (devoir)
    - dürfen (avoir le droit de)
    - mögen (aimer)
  `,
  videoUrl: 'https://example.com/video.mp4',
  transcript: `
    Guten Tag! Heute lernen wir die Modalverben.
    Modalverben sind sehr wichtig in der deutschen Sprache...
  `,
};

const courseProgress = {
  currentLesson: 19,
  totalLessons: 24,
  completedLessons: 18,
  progress: 75,
  nextLessons: [
    { id: '20', title: 'Exercices sur les verbes de modalité', type: 'quiz' },
    { id: '21', title: 'Le passé composé', type: 'video' },
    { id: '22', title: 'Vocabulaire: La famille', type: 'text' },
  ],
};

export const ContinueCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('05:23');
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [volume, setVolume] = useState(80);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showLessonsList, setShowLessonsList] = useState(false);

  const allLessons = [
    { id: '1', title: 'Introduction à l\'allemand', type: 'video', completed: true },
    { id: '2', title: 'Les salutations', type: 'video', completed: true },
    { id: '3', title: 'Quiz: Salutations', type: 'quiz', completed: true },
    { id: '4', title: 'Les nombres', type: 'text', completed: true },
    { id: '5', title: 'Quiz: Nombres', type: 'quiz', completed: true },
    // ... autres leçons
    { id: '19', title: 'Les verbes de modalité', type: 'video', completed: false, current: true },
    { id: '20', title: 'Quiz: Verbes de modalité', type: 'quiz', completed: false },
    { id: '21', title: 'Le passé composé', type: 'video', completed: false },
    { id: '22', title: 'Quiz: Passé composé', type: 'quiz', completed: false },
    { id: '23', title: 'Vocabulaire: La famille', type: 'text', completed: false },
    { id: '24', title: 'Examen final', type: 'exam', completed: false },
  ];
  const lessonQuiz = {
    title: 'Quiz - Les verbes de modalité',
    questions: [
      {
        question: 'Quel verbe modal exprime la capacité ou la possibilité ?',
        options: ['können', 'müssen', 'wollen', 'sollen'],
        correct: 0,
      },
      {
        question: 'Comment dit-on "Je dois étudier" en allemand ?',
        options: ['Ich kann studieren', 'Ich muss studieren', 'Ich will studieren', 'Ich soll studieren'],
        correct: 1,
      },
    ]
  };

  const handleMarkComplete = () => {
    setLessonCompleted(true);
    // Vérifier si la leçon suivante est un quiz
    const currentIndex = allLessons.findIndex(l => l.current);
    const nextLesson = allLessons[currentIndex + 1];
    
    if (nextLesson?.type === 'quiz') {
      setShowQuiz(true);
    } else {
      toast.success('Leçon terminée ! Passez à la suivante.');
    }
  };

  const handleNextLesson = () => {
    const currentIndex = allLessons.findIndex(l => l.current);
    const nextLesson = allLessons[currentIndex + 1];
    
    if (nextLesson) {
      if (nextLesson.type === 'exam') {
        toast.info('Vous êtes prêt pour l\'examen final !');
      } else {
        toast.success(`Passage à: ${nextLesson.title}`);
      }
    } else {
      toast.success('Félicitations ! Vous avez terminé le cours !');
    }
  };

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);
  };

  const handleSubmitQuiz = () => {
    const score = lessonQuiz.questions.reduce((correct, question, index) => {
      return correct + (quizAnswers[index] === question.correct ? 1 : 0);
    }, 0);
    
    const percentage = Math.round((score / lessonQuiz.questions.length) * 100);
    toast.success(`Quiz terminé ! Score: ${percentage}%`);
    setShowQuiz(false);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/student/courses')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux cours
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Continuer le Cours</h1>
            <p className="text-gray-600">{currentLesson.course}</p>
          </div>
        </div>
        <Button 
          variant="outline"
          onClick={() => setShowLessonsList(true)}
        >
          <List className="w-4 h-4 mr-2" />
          Toutes les leçons
        </Button>
      </div>
        <h1 className="text-3xl font-bold text-gray-900">Continuer le Cours</h1>
        <p className="text-gray-600">{currentLesson.course}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Video Player */}
          <Card>
            <CardContent className="p-0">
              <div className="aspect-video bg-black relative rounded-t-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <p className="text-lg">Lecteur vidéo simulé</p>
                    <p className="text-sm opacity-80">{currentLesson.title}</p>
                  </div>
                </div>
                
                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-white hover:bg-white/20"
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                        <SkipBack className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                        <SkipForward className="w-4 h-4" />
                      </Button>
                      <span className="text-sm">{currentTime} / {currentLesson.duration}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowSubtitles(!showSubtitles)}
                        className={`text-white hover:bg-white/20 ${showSubtitles ? 'bg-white/20' : ''}`}
                      >
                        <Subtitles className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <Progress value={30} className="h-1 bg-white/20" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lesson Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                {currentLesson.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div className="whitespace-pre-line text-gray-700">
                  {currentLesson.content}
                </div>
              </div>
              
              {showSubtitles && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">Transcription</h3>
                  <div className="text-sm text-gray-700 whitespace-pre-line">
                    {currentLesson.transcript}
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-6">
                <Button 
                  onClick={handleMarkComplete} 
                  className="bg-green-600 hover:bg-green-700"
                  disabled={lessonCompleted}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {lessonCompleted ? 'Leçon terminée' : 'Marquer comme terminé'}
                </Button>
                <Button 
                  onClick={handleNextLesson} 
                  className="bg-red-600 hover:bg-red-700"
                  disabled={!lessonCompleted}
                >
                  Leçon suivante
                  <SkipForward className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Dialog */}
          <Dialog open={showQuiz} onOpenChange={setShowQuiz}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2 text-purple-600" />
                  {lessonQuiz.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {lessonQuiz.questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="space-y-3">
                    <h3 className="font-medium">
                      Question {questionIndex + 1}: {question.question}
                    </h3>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <div 
                          key={optionIndex}
                          className={`p-3 border rounded-lg cursor-pointer transition-all ${
                            quizAnswers[questionIndex] === optionIndex 
                              ? 'border-red-500 bg-red-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleQuizAnswer(questionIndex, optionIndex)}
                        >
                          <div className="flex items-center">
                            <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                              quizAnswers[questionIndex] === optionIndex 
                                ? 'border-red-500 bg-red-500' 
                                : 'border-gray-300'
                            }`}>
                              {quizAnswers[questionIndex] === optionIndex && (
                                <div className="w-2 h-2 rounded-full bg-white mx-auto mt-0.5" />
                              )}
                            </div>
                            {option}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowQuiz(false)}
                  >
                    Fermer
                  </Button>
                  <Button 
                    onClick={handleSubmitQuiz}
                    className="bg-purple-600 hover:bg-purple-700"
                    disabled={quizAnswers.length !== lessonQuiz.questions.length}
                  >
                    Valider le quiz
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Lessons List Dialog */}
          <Dialog open={showLessonsList} onOpenChange={setShowLessonsList}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Toutes les leçons du cours</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-3">
                {allLessons.map((lesson, index) => (
                  <div 
                    key={lesson.id}
                    className={`flex items-center justify-between p-4 border rounded-lg ${
                      lesson.current ? 'border-red-500 bg-red-50' : 
                      lesson.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        lesson.completed ? 'bg-green-600 text-white' :
                        lesson.current ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {lesson.completed ? <CheckCircle className="w-4 h-4" /> : index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{lesson.title}</p>
                        <Badge variant="outline" className="text-xs">
                          {lesson.type === 'video' ? 'Vidéo' :
                           lesson.type === 'text' ? 'Texte' :
                           lesson.type === 'quiz' ? 'Quiz' : 'Examen'}
                        </Badge>
                      </div>
                    </div>
                    {lesson.current && (
                      <Badge className="bg-red-100 text-red-800">En cours</Badge>
                    )}
                    {lesson.completed && (
                      <Badge className="bg-green-100 text-green-800">Terminé</Badge>
                    )}
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Progression du Cours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-1">
                    {courseProgress.progress}%
                  </div>
                  <p className="text-sm text-gray-600">
                    {courseProgress.completedLessons}/{courseProgress.totalLessons} leçons
                  </p>
                </div>
                <Progress value={courseProgress.progress} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Next Lessons */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Prochaines Leçons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {courseProgress.nextLessons.map((lesson, index) => (
                  <div key={lesson.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
                        {parseInt(lesson.id)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{lesson.title}</p>
                        <Badge variant="outline" className="text-xs">
                          {lesson.type === 'video' ? 'Vidéo' :
                           lesson.type === 'quiz' ? 'Quiz' : 'Texte'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Study Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistiques d'Étude</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Temps d'étude aujourd'hui</span>
                  <span className="font-medium">2h 15min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Série actuelle</span>
                  <span className="font-medium">7 jours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Score moyen</span>
                  <span className="font-medium text-green-600">85%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};