import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  BookOpen, 
  Users, 
  Star, 
  Calendar,
  Edit,
  Trash2,
  Eye,
  Plus,
  MoreHorizontal,
  Play,
  FileText,
  HelpCircle,
  Upload
} from 'lucide-react';
import { toast } from 'sonner';

interface CourseDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  course: any;
}

const mockLessons = [
  {
    id: '1',
    title: 'Introduction à l\'allemand',
    type: 'video',
    duration: '15 min',
    status: 'published',
    views: 234,
  },
  {
    id: '2',
    title: 'Les salutations',
    type: 'video',
    duration: '12 min',
    status: 'published',
    views: 189,
  },
  {
    id: '3',
    title: 'Quiz: Vocabulaire de base',
    type: 'quiz',
    duration: '5 min',
    status: 'draft',
    views: 0,
  },
];

const mockQuizzes = [
  {
    id: '1',
    title: 'Quiz: Les articles définis',
    type: 'lesson',
    lessonTitle: 'Les articles en allemand',
    questions: 10,
    attempts: 45,
    averageScore: 78,
    status: 'published',
  },
  {
    id: '2',
    title: 'Quiz final du cours',
    type: 'course',
    lessonTitle: null,
    questions: 25,
    attempts: 23,
    averageScore: 82,
    status: 'published',
  },
];

export const CourseDetailsDialog = ({ isOpen, onClose, course }: CourseDetailsDialogProps) => {
  const [showCreateLessonDialog, setShowCreateLessonDialog] = useState(false);
  const [showCreateQuizDialog, setShowCreateQuizDialog] = useState(false);
  const [quizType, setQuizType] = useState<'lesson' | 'course'>('lesson');
  const [selectedLesson, setSelectedLesson] = useState('');
  
  const [newLesson, setNewLesson] = useState({
    title: '',
    type: 'video',
    content: '',
    duration: '',
    videoUrl: '',
    audioUrl: '',
  });

  const [newQuiz, setNewQuiz] = useState({
    title: '',
    type: 'lesson',
    lessonId: '',
    questions: [{ question: '', options: ['', '', '', ''], correct: 0 }],
  });

  if (!course) return null;

  const handleCreateLesson = () => {
    if (!newLesson.title) {
      toast.error('Veuillez remplir le titre de la leçon');
      return;
    }
    
    toast.success(`Leçon "${newLesson.title}" créée avec succès !`);
    setShowCreateLessonDialog(false);
    setNewLesson({
      title: '',
      type: 'video',
      content: '',
      duration: '',
      videoUrl: '',
      audioUrl: '',
    });
  };

  const handleCreateQuiz = () => {
    if (!newQuiz.title) {
      toast.error('Veuillez remplir le titre du quiz');
      return;
    }
    
    toast.success(`Quiz "${newQuiz.title}" créé avec succès !`);
    setShowCreateQuizDialog(false);
    setNewQuiz({
      title: '',
      type: 'lesson',
      lessonId: '',
      questions: [{ question: '', options: ['', '', '', ''], correct: 0 }],
    });
  };

  const handleViewLesson = (lesson: any) => {
    toast.info(`Ouverture de la leçon: ${lesson.title}`);
  };

  const handleEditLesson = (lesson: any) => {
    toast.info(`Modification de la leçon: ${lesson.title}`);
  };

  const handleDeleteLesson = (lesson: any) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette leçon ?')) {
      toast.success(`Leçon "${lesson.title}" supprimée`);
    }
  };

  const handleViewQuiz = (quiz: any) => {
    toast.info(`Ouverture du quiz: ${quiz.title}`);
  };

  const handleEditQuiz = (quiz: any) => {
    toast.info(`Modification du quiz: ${quiz.title}`);
  };

  const handleDeleteQuiz = (quiz: any) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce quiz ?')) {
      toast.success(`Quiz "${quiz.title}" supprimé`);
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      video: 'bg-red-100 text-red-800',
      text: 'bg-blue-100 text-blue-800',
      audio: 'bg-green-100 text-green-800',
      quiz: 'bg-purple-100 text-purple-800',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusBadge = (status: string) => {
    return status === 'published' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  const addQuizQuestion = () => {
    setNewQuiz(prev => ({
      ...prev,
      questions: [...prev.questions, { question: '', options: ['', '', '', ''], correct: 0 }]
    }));
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Détails du Cours - {course.title}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Course Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={course.image || 'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg'}
                      alt={course.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h2 className="text-xl font-bold">{course.title}</h2>
                      <p className="text-gray-600">{course.instructor}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-blue-100 text-blue-800">
                          {course.level}
                        </Badge>
                        <Badge className="bg-green-100 text-green-800">
                          {course.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-600">€{course.price}</p>
                    <p className="text-sm text-gray-600">{course.students} étudiants</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="lessons" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="lessons">Leçons</TabsTrigger>
                <TabsTrigger value="quizzes">Quiz</TabsTrigger>
              </TabsList>

              <TabsContent value="lessons">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Leçons du Cours</CardTitle>
                      <Button 
                        onClick={() => setShowCreateLessonDialog(true)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Créer une leçon
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockLessons.map((lesson) => (
                        <div key={lesson.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                              {lesson.type === 'video' && <Play className="w-6 h-6 text-red-600" />}
                              {lesson.type === 'text' && <FileText className="w-6 h-6 text-blue-600" />}
                              {lesson.type === 'quiz' && <HelpCircle className="w-6 h-6 text-purple-600" />}
                            </div>
                            <div>
                              <h3 className="font-medium">{lesson.title}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={getTypeBadge(lesson.type)}>
                                  {lesson.type === 'video' ? 'Vidéo' :
                                   lesson.type === 'text' ? 'Texte' : 'Quiz'}
                                </Badge>
                                <Badge className={getStatusBadge(lesson.status)}>
                                  {lesson.status === 'published' ? 'Publié' : 'Brouillon'}
                                </Badge>
                                <span className="text-sm text-gray-500">{lesson.duration}</span>
                                <span className="text-sm text-gray-500">{lesson.views} vues</span>
                              </div>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewLesson(lesson)}>
                                <Eye className="w-4 h-4 mr-2" />
                                Voir
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditLesson(lesson)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteLesson(lesson)}
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="quizzes">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Quiz du Cours</CardTitle>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => {
                            setQuizType('lesson');
                            setShowCreateQuizDialog(true);
                          }}
                          variant="outline"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Quiz de leçon
                        </Button>
                        <Button 
                          onClick={() => {
                            setQuizType('course');
                            setShowCreateQuizDialog(true);
                          }}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Quiz final
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockQuizzes.map((quiz) => (
                        <div key={quiz.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h3 className="font-medium">{quiz.title}</h3>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <Badge className={quiz.type === 'lesson' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
                                {quiz.type === 'lesson' ? 'Quiz de leçon' : 'Quiz final'}
                              </Badge>
                              {quiz.lessonTitle && (
                                <span>Leçon: {quiz.lessonTitle}</span>
                              )}
                              <span>{quiz.questions} questions</span>
                              <span>{quiz.attempts} tentatives</span>
                              <span>Score moyen: {quiz.averageScore}%</span>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewQuiz(quiz)}>
                                <Eye className="w-4 h-4 mr-2" />
                                Voir
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditQuiz(quiz)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteQuiz(quiz)}
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Lesson Dialog */}
      <Dialog open={showCreateLessonDialog} onOpenChange={setShowCreateLessonDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Créer une Nouvelle Leçon</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="lessonTitle">Titre de la leçon</Label>
              <Input
                id="lessonTitle"
                value={newLesson.title}
                onChange={(e) => setNewLesson(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Ex: Les salutations en allemand"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lessonType">Type de contenu</Label>
                <Select
                  value={newLesson.type}
                  onValueChange={(value) => setNewLesson(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Vidéo</SelectItem>
                    <SelectItem value="text">Texte</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="lessonDuration">Durée</Label>
                <Input
                  id="lessonDuration"
                  value={newLesson.duration}
                  onChange={(e) => setNewLesson(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="Ex: 15 minutes"
                />
              </div>
            </div>

            {newLesson.type === 'video' && (
              <div>
                <Label htmlFor="videoUrl">URL de la vidéo</Label>
                <div className="flex gap-2">
                  <Input
                    id="videoUrl"
                    value={newLesson.videoUrl}
                    onChange={(e) => setNewLesson(prev => ({ ...prev, videoUrl: e.target.value }))}
                    placeholder="URL de la vidéo"
                  />
                  <Button variant="outline">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {newLesson.type === 'audio' && (
              <div>
                <Label htmlFor="audioUrl">URL de l'audio</Label>
                <div className="flex gap-2">
                  <Input
                    id="audioUrl"
                    value={newLesson.audioUrl}
                    onChange={(e) => setNewLesson(prev => ({ ...prev, audioUrl: e.target.value }))}
                    placeholder="URL de l'audio"
                  />
                  <Button variant="outline">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="lessonContent">Contenu de la leçon</Label>
              <Textarea
                id="lessonContent"
                value={newLesson.content}
                onChange={(e) => setNewLesson(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Décrivez le contenu de cette leçon..."
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowCreateLessonDialog(false)}>
                Annuler
              </Button>
              <Button onClick={handleCreateLesson} className="bg-red-600 hover:bg-red-700">
                Créer la leçon
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Quiz Dialog */}
      <Dialog open={showCreateQuizDialog} onOpenChange={setShowCreateQuizDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Créer un {quizType === 'lesson' ? 'Quiz de Leçon' : 'Quiz Final'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="quizTitle">Titre du quiz</Label>
              <Input
                id="quizTitle"
                value={newQuiz.title}
                onChange={(e) => setNewQuiz(prev => ({ ...prev, title: e.target.value }))}
                placeholder={quizType === 'lesson' ? 'Ex: Quiz sur les articles' : 'Quiz final du cours'}
              />
            </div>

            {quizType === 'lesson' && (
              <div>
                <Label htmlFor="lessonSelect">Leçon associée</Label>
                <Select
                  value={selectedLesson}
                  onValueChange={setSelectedLesson}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une leçon" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockLessons.filter(l => l.type !== 'quiz').map((lesson) => (
                      <SelectItem key={lesson.id} value={lesson.id}>
                        {lesson.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Questions du Quiz</h3>
                <Button onClick={addQuizQuestion} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter une question
                </Button>
              </div>
              
              {newQuiz.questions.map((question, index) => (
                <Card key={index} className="border-l-4 border-l-purple-600">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Question {index + 1}</h4>
                      {newQuiz.questions.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newQuestions = newQuiz.questions.filter((_, i) => i !== index);
                            setNewQuiz(prev => ({ ...prev, questions: newQuestions }));
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    
                    <Textarea
                      value={question.question}
                      onChange={(e) => {
                        const newQuestions = [...newQuiz.questions];
                        newQuestions[index].question = e.target.value;
                        setNewQuiz(prev => ({ ...prev, questions: newQuestions }));
                      }}
                      placeholder="Tapez votre question ici..."
                      rows={2}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {question.options.map((option, optionIndex) => (
                        <Input
                          key={optionIndex}
                          value={option}
                          onChange={(e) => {
                            const newQuestions = [...newQuiz.questions];
                            newQuestions[index].options[optionIndex] = e.target.value;
                            setNewQuiz(prev => ({ ...prev, questions: newQuestions }));
                          }}
                          placeholder={`Option ${optionIndex + 1}`}
                        />
                      ))}
                    </div>

                    <div>
                      <Label>Réponse correcte</Label>
                      <Select
                        value={question.correct.toString()}
                        onValueChange={(value) => {
                          const newQuestions = [...newQuiz.questions];
                          newQuestions[index].correct = parseInt(value);
                          setNewQuiz(prev => ({ ...prev, questions: newQuestions }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Option 1</SelectItem>
                          <SelectItem value="1">Option 2</SelectItem>
                          <SelectItem value="2">Option 3</SelectItem>
                          <SelectItem value="3">Option 4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowCreateQuizDialog(false)}>
                Annuler
              </Button>
              <Button onClick={handleCreateQuiz} className="bg-purple-600 hover:bg-purple-700">
                Créer le quiz
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};