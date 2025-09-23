import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Upload, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

interface CreateCourseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCourseCreated?: (course: any) => void;
}

export const CreateCourseDialog = ({ isOpen, onClose, onCourseCreated }: CreateCourseDialogProps) => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    level: '',
    category: '',
    duration: '',
    language: 'fr',
    prerequisites: '',
    objectives: [''],
    image: '',
    price: '',
    status: 'draft',
  });

  const [lessons, setLessons] = useState([
    { id: '1', title: '', content: '', duration: '', type: 'video' }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setCourseData(prev => ({ ...prev, [field]: value }));
  };

  const handleObjectiveChange = (index: number, value: string) => {
    const newObjectives = [...courseData.objectives];
    newObjectives[index] = value;
    setCourseData(prev => ({ ...prev, objectives: newObjectives }));
  };

  const addObjective = () => {
    setCourseData(prev => ({
      ...prev,
      objectives: [...prev.objectives, '']
    }));
  };

  const removeObjective = (index: number) => {
    setCourseData(prev => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index)
    }));
  };

  const addLesson = () => {
    setLessons(prev => [
      ...prev,
      { id: Date.now().toString(), title: '', content: '', duration: '', type: 'video' }
    ]);
  };

  const removeLesson = (id: string) => {
    setLessons(prev => prev.filter(lesson => lesson.id !== id));
  };

  const handleLessonChange = (id: string, field: string, value: string) => {
    setLessons(prev => prev.map(lesson =>
      lesson.id === id ? { ...lesson, [field]: value } : lesson
    ));
  };

  const handleSave = (status: 'draft' | 'published') => {
    if (!courseData.title || !courseData.description) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const newCourse = {
      id: `COURSE-${Date.now()}`,
      ...courseData,
      price: parseFloat(courseData.price) || 0,
      status: status.toUpperCase(),
      lessons,
      createdAt: new Date().toISOString(),
    };

    toast.success(`Cours "${courseData.title}" ${status === 'draft' ? 'sauvegardé en brouillon' : 'publié'} !`);
    
    if (onCourseCreated) {
      onCourseCreated(newCourse);
    }
    
    // Reset form
    setCourseData({
      title: '',
      description: '',
      level: '',
      category: '',
      duration: '',
      language: 'fr',
      prerequisites: '',
      objectives: [''],
      image: '',
      price: '',
      status: 'draft',
    });
    setLessons([{ id: '1', title: '', content: '', duration: '', type: 'video' }]);
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Créer un Nouveau Cours</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">Informations Générales</TabsTrigger>
            <TabsTrigger value="content">Contenu du Cours</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Titre du cours *</Label>
                  <Input
                    id="title"
                    value={courseData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Ex: Allemand pour débutants"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="level">Niveau *</Label>
                  <Select value={courseData.level} onValueChange={(value) => handleInputChange('level', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A1">A1 - Débutant</SelectItem>
                      <SelectItem value="A2">A2 - Élémentaire</SelectItem>
                      <SelectItem value="B1">B1 - Intermédiaire</SelectItem>
                      <SelectItem value="B2">B2 - Intermédiaire supérieur</SelectItem>
                      <SelectItem value="C1">C1 - Avancé</SelectItem>
                      <SelectItem value="C2">C2 - Maîtrise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="category">Catégorie</Label>
                  <Select value={courseData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Général">Général</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Grammaire">Grammaire</SelectItem>
                      <SelectItem value="Conversation">Conversation</SelectItem>
                      <SelectItem value="Préparation examens">Préparation examens</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="duration">Durée estimée</Label>
                  <Input
                    id="duration"
                    value={courseData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    placeholder="Ex: 8 semaines"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description du cours *</Label>
                <Textarea
                  id="description"
                  value={courseData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Décrivez votre cours..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="prerequisites">Prérequis</Label>
                <Textarea
                  id="prerequisites"
                  value={courseData.prerequisites}
                  onChange={(e) => handleInputChange('prerequisites', e.target.value)}
                  placeholder="Décrivez les prérequis pour ce cours..."
                  rows={2}
                />
              </div>

              <div>
                <Label>Objectifs d'apprentissage</Label>
                <div className="space-y-3 mt-2">
                  {courseData.objectives.map((objective, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={objective}
                        onChange={(e) => handleObjectiveChange(index, e.target.value)}
                        placeholder={`Objectif ${index + 1}`}
                      />
                      {courseData.objectives.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeObjective(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" onClick={addObjective} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter un objectif
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="price">Prix (FCFA)</Label>
                <Input
                  id="price"
                  type="number"
                  value={courseData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="25000"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Leçons du Cours</h3>
                <Button onClick={addLesson} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter une leçon
                </Button>
              </div>
              
              {lessons.map((lesson, index) => (
                <Card key={lesson.id} className="border-l-4 border-l-red-600">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Leçon {index + 1}</CardTitle>
                      {lessons.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeLesson(lesson.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Titre de la leçon</Label>
                        <Input
                          value={lesson.title}
                          onChange={(e) => handleLessonChange(lesson.id, 'title', e.target.value)}
                          placeholder="Ex: Les salutations en allemand"
                        />
                      </div>
                      <div>
                        <Label>Durée</Label>
                        <Input
                          value={lesson.duration}
                          onChange={(e) => handleLessonChange(lesson.id, 'duration', e.target.value)}
                          placeholder="Ex: 15 minutes"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Type de contenu</Label>
                      <Select
                        value={lesson.type}
                        onValueChange={(value) => handleLessonChange(lesson.id, 'type', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">Vidéo</SelectItem>
                          <SelectItem value="text">Texte</SelectItem>
                          <SelectItem value="audio">Audio</SelectItem>
                          <SelectItem value="quiz">Quiz</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Contenu de la leçon</Label>
                      <Textarea
                        value={lesson.content}
                        onChange={(e) => handleLessonChange(lesson.id, 'content', e.target.value)}
                        placeholder="Décrivez le contenu de cette leçon..."
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <div>
                <Label htmlFor="image">Image de couverture</Label>
                <div className="mt-2 flex items-center gap-4">
                  <Input
                    id="image"
                    value={courseData.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    placeholder="URL de l'image ou uploadez un fichier"
                  />
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="language">Langue d'enseignement</Label>
                <Select value={courseData.language} onValueChange={(value) => handleInputChange('language', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">Anglais</SelectItem>
                    <SelectItem value="de">Allemand</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">Conseils pour créer un bon cours</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Utilisez un titre clair et descriptif</li>
                  <li>• Structurez vos leçons de manière progressive</li>
                  <li>• Incluez des exercices pratiques</li>
                  <li>• Ajoutez des quiz pour évaluer les progrès</li>
                  <li>• Utilisez des supports visuels et audio</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="outline" onClick={() => handleSave('draft')}>
            <Save className="w-4 h-4 mr-2" />
            Sauvegarder en brouillon
          </Button>
          <Button onClick={() => handleSave('published')} className="bg-red-600 hover:bg-red-700">
            Publier le cours
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};