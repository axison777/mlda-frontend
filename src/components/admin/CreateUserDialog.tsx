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
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface CreateUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated?: (user: any) => void;
}

export const CreateUserDialog = ({ isOpen, onClose, onUserCreated }: CreateUserDialogProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'STUDENT',
    phone: '',
    bio: '',
    isActive: true,
    specialties: '',
    education: '',
    experience: '',
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Simulation de création d'utilisateur
    const newUser = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
    };

    toast.success(`Utilisateur ${formData.firstName} ${formData.lastName} créé avec succès !`);
    
    if (onUserCreated) {
      onUserCreated(newUser);
    }
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'STUDENT',
      phone: '',
      bio: '',
      isActive: true,
      specialties: '',
      education: '',
      experience: '',
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Créer un Nouvel Utilisateur</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations de base */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Informations de base</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Prénom *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Prénom"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Nom *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Nom"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="email@exemple.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+33 6 12 34 56 78"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="password">Mot de passe *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Mot de passe"
                  required
                />
              </div>
              <div>
                <Label htmlFor="role">Rôle *</Label>
                <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="STUDENT">Étudiant</SelectItem>
                    <SelectItem value="TEACHER">Professeur</SelectItem>
                    <SelectItem value="ADMIN">Administrateur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Biographie</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Décrivez l'utilisateur..."
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="isActive">Compte actif</Label>
                <p className="text-sm text-gray-600">L'utilisateur peut se connecter</p>
              </div>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => handleInputChange('isActive', checked)}
              />
            </div>
          </div>

          {/* Informations spécifiques aux professeurs */}
          {formData.role === 'TEACHER' && (
            <div className="space-y-4 border-t pt-4">
              <h3 className="font-medium text-lg">Informations Professeur</h3>
              
              <div>
                <Label htmlFor="education">Formation</Label>
                <Input
                  id="education"
                  value={formData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  placeholder="Ex: Doctorat en Linguistique Allemande"
                />
              </div>

              <div>
                <Label htmlFor="experience">Expérience</Label>
                <Input
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  placeholder="Ex: 10 ans d'enseignement"
                />
              </div>

              <div>
                <Label htmlFor="specialties">Spécialités</Label>
                <Input
                  id="specialties"
                  value={formData.specialties}
                  onChange={(e) => handleInputChange('specialties', e.target.value)}
                  placeholder="Ex: Grammaire, Conversation, Business"
                />
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              Créer l'utilisateur
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};