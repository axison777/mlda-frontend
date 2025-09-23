import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Upload, Target, Eye, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';

interface CreateCampaignDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCampaignCreated?: (campaign: any) => void;
}

export const CreateCampaignDialog = ({ isOpen, onClose, onCampaignCreated }: CreateCampaignDialogProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'banner',
    targetAudience: 'all',
    budget: '',
    dailyBudget: '',
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    keywords: '',
    ageRange: { min: '18', max: '65' },
    interests: '',
    locations: '',
    adContent: {
      headline: '',
      description: '',
      callToAction: '',
      imageUrl: '',
      videoUrl: '',
    },
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAdContentChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      adContent: { ...prev.adContent, [field]: value }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.budget || !formData.startDate || !formData.endDate) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const newCampaign = {
      id: `AD-${Date.now()}`,
      ...formData,
      budget: parseFloat(formData.budget),
      dailyBudget: parseFloat(formData.dailyBudget),
      status: 'draft',
      impressions: 0,
      clicks: 0,
      ctr: 0,
      spent: 0,
      createdAt: new Date().toISOString(),
    };

    toast.success(`Campagne "${formData.title}" créée avec succès !`);
    
    if (onCampaignCreated) {
      onCampaignCreated(newCampaign);
    }
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      type: 'banner',
      targetAudience: 'all',
      budget: '',
      dailyBudget: '',
      startDate: undefined,
      endDate: undefined,
      keywords: '',
      ageRange: { min: '18', max: '65' },
      interests: '',
      locations: '',
      adContent: {
        headline: '',
        description: '',
        callToAction: '',
        imageUrl: '',
        videoUrl: '',
      },
    });
    
    onClose();
  };

  const calculateDailyBudget = () => {
    if (!formData.budget || !formData.startDate || !formData.endDate) return 0;
    
    const totalBudget = parseFloat(formData.budget);
    const daysDiff = Math.ceil((formData.endDate.getTime() - formData.startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    return daysDiff > 0 ? (totalBudget / daysDiff).toFixed(2) : 0;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Créer une Nouvelle Campagne Publicitaire</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations de base */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Informations de base</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Nom de la campagne *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Ex: Promotion cours d'allemand"
                  required
                />
              </div>
              <div>
                <Label htmlFor="type">Type de publicité *</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="banner">Bannière</SelectItem>
                    <SelectItem value="video">Vidéo</SelectItem>
                    <SelectItem value="social">Réseaux sociaux</SelectItem>
                    <SelectItem value="search">Recherche</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description de la campagne</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Décrivez l'objectif de votre campagne..."
                rows={3}
              />
            </div>
          </div>

          {/* Budget et planning */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="font-medium text-lg">Budget et Planning</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budget">Budget total (€) *</Label>
                <Input
                  id="budget"
                  type="number"
                  step="0.01"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  placeholder="500"
                  required
                />
              </div>
              <div>
                <Label htmlFor="dailyBudget">Budget quotidien suggéré</Label>
                <Input
                  value={calculateDailyBudget()}
                  disabled
                  placeholder="Calculé automatiquement"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Date de début *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {formData.startDate ? 
                        format(formData.startDate, 'dd MMMM yyyy', { locale: fr }) : 
                        'Sélectionner une date'
                      }
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.startDate}
                      onSelect={(date) => handleInputChange('startDate', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Date de fin *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {formData.endDate ? 
                        format(formData.endDate, 'dd MMMM yyyy', { locale: fr }) : 
                        'Sélectionner une date'
                      }
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.endDate}
                      onSelect={(date) => handleInputChange('endDate', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Ciblage */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="font-medium text-lg">Ciblage de l'audience</h3>
            
            <div>
              <Label htmlFor="targetAudience">Audience cible</Label>
              <Select value={formData.targetAudience} onValueChange={(value) => handleInputChange('targetAudience', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les utilisateurs</SelectItem>
                  <SelectItem value="students">Étudiants potentiels</SelectItem>
                  <SelectItem value="professionals">Professionnels</SelectItem>
                  <SelectItem value="beginners">Débutants</SelectItem>
                  <SelectItem value="advanced">Niveau avancé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ageMin">Âge minimum</Label>
                <Input
                  type="number"
                  value={formData.ageRange.min}
                  onChange={(e) => handleInputChange('ageRange', { ...formData.ageRange, min: e.target.value })}
                  placeholder="18"
                />
              </div>
              <div>
                <Label htmlFor="ageMax">Âge maximum</Label>
                <Input
                  type="number"
                  value={formData.ageRange.max}
                  onChange={(e) => handleInputChange('ageRange', { ...formData.ageRange, max: e.target.value })}
                  placeholder="65"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="interests">Centres d'intérêt</Label>
                <Input
                  id="interests"
                  value={formData.interests}
                  onChange={(e) => handleInputChange('interests', e.target.value)}
                  placeholder="Ex: langues, éducation, voyages"
                />
              </div>
              <div>
                <Label htmlFor="locations">Localisation</Label>
                <Input
                  id="locations"
                  value={formData.locations}
                  onChange={(e) => handleInputChange('locations', e.target.value)}
                  placeholder="Ex: France, Allemagne"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="keywords">Mots-clés</Label>
              <Input
                id="keywords"
                value={formData.keywords}
                onChange={(e) => handleInputChange('keywords', e.target.value)}
                placeholder="Ex: cours allemand, apprendre allemand"
              />
            </div>
          </div>

          {/* Contenu publicitaire */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="font-medium text-lg">Contenu Publicitaire</h3>
            
            <div>
              <Label htmlFor="headline">Titre principal</Label>
              <Input
                id="headline"
                value={formData.adContent.headline}
                onChange={(e) => handleAdContentChange('headline', e.target.value)}
                placeholder="Ex: Apprenez l'allemand rapidement !"
              />
            </div>

            <div>
              <Label htmlFor="adDescription">Description</Label>
              <Textarea
                id="adDescription"
                value={formData.adContent.description}
                onChange={(e) => handleAdContentChange('description', e.target.value)}
                placeholder="Décrivez votre offre..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="callToAction">Appel à l'action</Label>
                <Input
                  id="callToAction"
                  value={formData.adContent.callToAction}
                  onChange={(e) => handleAdContentChange('callToAction', e.target.value)}
                  placeholder="Ex: Commencer maintenant"
                />
              </div>
              <div>
                <Label htmlFor="imageUrl">URL de l'image</Label>
                <div className="flex gap-2">
                  <Input
                    id="imageUrl"
                    value={formData.adContent.imageUrl}
                    onChange={(e) => handleAdContentChange('imageUrl', e.target.value)}
                    placeholder="URL de l'image"
                  />
                  <Button type="button" variant="outline">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {formData.type === 'video' && (
              <div>
                <Label htmlFor="videoUrl">URL de la vidéo</Label>
                <div className="flex gap-2">
                  <Input
                    id="videoUrl"
                    value={formData.adContent.videoUrl}
                    onChange={(e) => handleAdContentChange('videoUrl', e.target.value)}
                    placeholder="URL de la vidéo"
                  />
                  <Button type="button" variant="outline">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Aperçu */}
          {formData.adContent.headline && (
            <div className="space-y-4 border-t pt-4">
              <h3 className="font-medium text-lg">Aperçu de la Publicité</h3>
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg overflow-hidden">
                  {formData.adContent.imageUrl && (
                    <img 
                      src={formData.adContent.imageUrl} 
                      alt="Aperçu" 
                      className="w-full h-32 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h4 className="font-bold text-lg mb-2">{formData.adContent.headline}</h4>
                    {formData.adContent.description && (
                      <p className="text-gray-600 text-sm mb-3">{formData.adContent.description}</p>
                    )}
                    {formData.adContent.callToAction && (
                      <Button className="w-full bg-red-600 hover:bg-red-700">
                        {formData.adContent.callToAction}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="button" variant="outline">
              Sauvegarder en brouillon
            </Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              Créer la campagne
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};