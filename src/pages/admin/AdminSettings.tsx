import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Globe, Mail, Shield, Database, Plus, Edit, Trash2, Tag, BookOpen, BarChart3, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { toast } from 'sonner';

export const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'MLDA',
    siteDescription: 'Plateforme d\'apprentissage de l\'allemand',
    contactEmail: 'contact@mlda.de',
    supportEmail: 'support@mlda.de',
    enableRegistration: true,
    enableEmailNotifications: true,
    enableSMSNotifications: false,
    maintenanceMode: false,
    maxFileSize: '10',
    sessionTimeout: '30',
  });

  const [productCategories, setProductCategories] = useState([
    { id: '1', name: 'Livres', description: 'Manuels et livres d\'apprentissage', active: true },
    { id: '2', name: 'Matériel', description: 'Matériel pédagogique', active: true },
    { id: '3', name: 'Accessoires', description: 'Accessoires d\'apprentissage', active: true },
    { id: '4', name: 'Numérique', description: 'Produits numériques', active: true },
  ]);

  const [courseCategories, setCourseCategories] = useState([
    { id: '1', name: 'Général', description: 'Cours d\'allemand général', active: true },
    { id: '2', name: 'Business', description: 'Allemand des affaires', active: true },
    { id: '3', name: 'Grammaire', description: 'Cours de grammaire spécialisés', active: true },
    { id: '4', name: 'Conversation', description: 'Cours de conversation', active: true },
    { id: '5', name: 'Préparation examens', description: 'Préparation aux examens officiels', active: true },
  ]);

  const [levels, setLevels] = useState([
    { id: '1', code: 'A1', name: 'Débutant', description: 'Niveau débutant complet', active: true },
    { id: '2', code: 'A2', name: 'Élémentaire', description: 'Niveau élémentaire', active: true },
    { id: '3', code: 'B1', name: 'Intermédiaire', description: 'Niveau intermédiaire', active: true },
    { id: '4', code: 'B2', name: 'Intermédiaire supérieur', description: 'Niveau intermédiaire supérieur', active: true },
    { id: '5', code: 'C1', name: 'Avancé', description: 'Niveau avancé', active: true },
    { id: '6', code: 'C2', name: 'Maîtrise', description: 'Niveau de maîtrise', active: true },
  ]);

  const [adTypes, setAdTypes] = useState([
    { id: '1', name: 'Banner', description: 'Publicités bannière', active: true },
    { id: '2', name: 'Video', description: 'Publicités vidéo', active: true },
    { id: '3', name: 'Social', description: 'Réseaux sociaux', active: true },
    { id: '4', name: 'Search', description: 'Publicités de recherche', active: true },
    { id: '5', name: 'Email', description: 'Campagnes email', active: true },
  ]);

  const [emailTemplates, setEmailTemplates] = useState([
    { id: '1', name: 'Bienvenue', subject: 'Bienvenue sur MLDA !', content: 'Bonjour {nom}, bienvenue sur notre plateforme...', active: true },
    { id: '2', name: 'Rappel cours', subject: 'N\'oubliez pas votre cours !', content: 'Bonjour {nom}, vous avez un cours en attente...', active: true },
    { id: '3', name: 'Certificat', subject: 'Félicitations ! Votre certificat est prêt', content: 'Bonjour {nom}, félicitations pour avoir terminé...', active: true },
  ]);

  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [showLevelDialog, setShowLevelDialog] = useState(false);
  const [showAdTypeDialog, setShowAdTypeDialog] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [newCategory, setNewCategory] = useState({ name: '', description: '', active: true });
  const [newLevel, setNewLevel] = useState({ code: '', name: '', description: '', active: true });
  const [newAdType, setNewAdType] = useState({ name: '', description: '', active: true });
  const [newEmailTemplate, setNewEmailTemplate] = useState({ name: '', subject: '', content: '', active: true });
  const handleSettingChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Simulation de sauvegarde
    toast.success('Paramètres sauvegardés avec succès !');
  };

  const handleAddCategory = () => {
    if (!newCategory.name) return;
    const category = { id: Date.now().toString(), ...newCategory };
    setProductCategories(prev => [...prev, category]);
    setNewCategory({ name: '', description: '', active: true });
    setShowCategoryDialog(false);
  };

  const handleAddLevel = () => {
    if (!newLevel.code || !newLevel.name) return;
    const level = { id: Date.now().toString(), ...newLevel };
    setLevels(prev => [...prev, level]);
    setNewLevel({ code: '', name: '', description: '', active: true });
    setShowLevelDialog(false);
  };

  const handleAddAdType = () => {
    if (!newAdType.name) return;
    const adType = { id: Date.now().toString(), ...newAdType };
    setAdTypes(prev => [...prev, adType]);
    setNewAdType({ name: '', description: '', active: true });
    setShowAdTypeDialog(false);
  };

  const handleAddEmailTemplate = () => {
    if (!newEmailTemplate.name || !newEmailTemplate.subject) return;
    const template = { id: Date.now().toString(), ...newEmailTemplate };
    setEmailTemplates(prev => [...prev, template]);
    setNewEmailTemplate({ name: '', subject: '', content: '', active: true });
    setShowEmailDialog(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Paramètres Système</h1>
          <p className="text-gray-600">Configurez les paramètres globaux de la plateforme</p>
        </div>
        <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700">
          <Save className="w-4 h-4 mr-2" />
          Sauvegarder
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="system">Système</TabsTrigger>
          <TabsTrigger value="categories">Catégories</TabsTrigger>
          <TabsTrigger value="levels">Niveaux</TabsTrigger>
          <TabsTrigger value="emails">Emails</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Paramètres Généraux
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="siteName">Nom du site</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => handleSettingChange('siteName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Email de contact</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => handleSettingChange('contactEmail', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="siteDescription">Description du site</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableRegistration">Autoriser les inscriptions</Label>
                  <p className="text-sm text-gray-600">Permettre aux nouveaux utilisateurs de s'inscrire</p>
                </div>
                <Switch
                  id="enableRegistration"
                  checked={settings.enableRegistration}
                  onCheckedChange={(checked) => handleSettingChange('enableRegistration', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Paramètres de Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="supportEmail">Email de support</Label>
                <Input
                  id="supportEmail"
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => handleSettingChange('supportEmail', e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableEmailNotifications">Notifications par email</Label>
                    <p className="text-sm text-gray-600">Envoyer des notifications par email aux utilisateurs</p>
                  </div>
                  <Switch
                    id="enableEmailNotifications"
                    checked={settings.enableEmailNotifications}
                    onCheckedChange={(checked) => handleSettingChange('enableEmailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableSMSNotifications">Notifications par SMS</Label>
                    <p className="text-sm text-gray-600">Envoyer des notifications par SMS (fonctionnalité premium)</p>
                  </div>
                  <Switch
                    id="enableSMSNotifications"
                    checked={settings.enableSMSNotifications}
                    onCheckedChange={(checked) => handleSettingChange('enableSMSNotifications', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Paramètres de Sécurité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="sessionTimeout">Délai d'expiration de session (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
                />
                <p className="text-sm text-gray-600 mt-1">
                  Durée avant déconnexion automatique des utilisateurs inactifs
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenanceMode">Mode maintenance</Label>
                  <p className="text-sm text-gray-600">Activer le mode maintenance pour la plateforme</p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
                />
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-medium text-yellow-800 mb-2">Attention</h3>
                <p className="text-sm text-yellow-700">
                  Le mode maintenance rendra la plateforme inaccessible aux utilisateurs.
                  Seuls les administrateurs pourront se connecter.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Paramètres Système
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="maxFileSize">Taille maximale des fichiers (MB)</Label>
                <Input
                  id="maxFileSize"
                  type="number"
                  value={settings.maxFileSize}
                  onChange={(e) => handleSettingChange('maxFileSize', e.target.value)}
                />
                <p className="text-sm text-gray-600 mt-1">
                  Taille maximale autorisée pour les uploads de fichiers
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Statistiques Système</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Espace disque utilisé</span>
                      <span className="text-sm font-medium">2.4 GB / 10 GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Bande passante ce mois</span>
                      <span className="text-sm font-medium">156 GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Dernière sauvegarde</span>
                      <span className="text-sm font-medium">Il y a 2 heures</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Actions Système</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full">
                      Sauvegarder la base de données
                    </Button>
                    <Button variant="outline" className="w-full">
                      Vider le cache
                    </Button>
                    <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                      Redémarrer le système
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <div className="space-y-6">
            {/* Catégories de produits */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <Tag className="w-5 h-5 mr-2" />
                    Catégories de Produits
                  </CardTitle>
                  <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-red-600 hover:bg-red-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Ajouter une Catégorie de Produit</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="categoryName">Nom de la catégorie</Label>
                          <Input
                            id="categoryName"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Ex: Livres"
                          />
                        </div>
                        <div>
                          <Label htmlFor="categoryDescription">Description</Label>
                          <Textarea
                            id="categoryDescription"
                            value={newCategory.description}
                            onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Description de la catégorie..."
                            rows={3}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={() => setShowCategoryDialog(false)}>
                            Annuler
                          </Button>
                          <Button onClick={handleAddCategory} className="bg-red-600 hover:bg-red-700">
                            Ajouter
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {productCategories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium">{category.name}</p>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={category.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {category.active ? 'Actif' : 'Inactif'}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Catégories de cours */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Catégories de Cours
                  </CardTitle>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {courseCategories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium">{category.name}</p>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={category.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {category.active ? 'Actif' : 'Inactif'}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="levels">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Niveaux de Cours
                </CardTitle>
                <Dialog open={showLevelDialog} onOpenChange={setShowLevelDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-red-600 hover:bg-red-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Ajouter un Niveau</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="levelCode">Code du niveau</Label>
                          <Input
                            id="levelCode"
                            value={newLevel.code}
                            onChange={(e) => setNewLevel(prev => ({ ...prev, code: e.target.value }))}
                            placeholder="Ex: A1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="levelName">Nom du niveau</Label>
                          <Input
                            id="levelName"
                            value={newLevel.name}
                            onChange={(e) => setNewLevel(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Ex: Débutant"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="levelDescription">Description</Label>
                        <Textarea
                          id="levelDescription"
                          value={newLevel.description}
                          onChange={(e) => setNewLevel(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Description du niveau..."
                          rows={3}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setShowLevelDialog(false)}>
                          Annuler
                        </Button>
                        <Button onClick={handleAddLevel} className="bg-red-600 hover:bg-red-700">
                          Ajouter
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {levels.map((level) => (
                  <div key={level.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-100 text-blue-800">{level.code}</Badge>
                        <p className="font-medium">{level.name}</p>
                      </div>
                      <p className="text-sm text-gray-600">{level.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={level.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {level.active ? 'Actif' : 'Inactif'}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emails">
          <div className="space-y-6">
            {/* Types de publicité */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Types de Publicité
                  </CardTitle>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {adTypes.map((adType) => (
                    <div key={adType.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium">{adType.name}</p>
                        <p className="text-sm text-gray-600">{adType.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={adType.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {adType.active ? 'Actif' : 'Inactif'}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Templates d'email */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Templates d'Email
                  </CardTitle>
                  <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-red-600 hover:bg-red-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Nouveau template
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Créer un Template d'Email</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="templateName">Nom du template</Label>
                          <Input
                            id="templateName"
                            value={newEmailTemplate.name}
                            onChange={(e) => setNewEmailTemplate(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Ex: Bienvenue"
                          />
                        </div>
                        <div>
                          <Label htmlFor="templateSubject">Sujet de l'email</Label>
                          <Input
                            id="templateSubject"
                            value={newEmailTemplate.subject}
                            onChange={(e) => setNewEmailTemplate(prev => ({ ...prev, subject: e.target.value }))}
                            placeholder="Ex: Bienvenue sur MLDA !"
                          />
                        </div>
                        <div>
                          <Label htmlFor="templateContent">Contenu de l'email</Label>
                          <Textarea
                            id="templateContent"
                            value={newEmailTemplate.content}
                            onChange={(e) => setNewEmailTemplate(prev => ({ ...prev, content: e.target.value }))}
                            placeholder="Contenu de l'email... Utilisez {nom} pour le nom de l'utilisateur"
                            rows={6}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={() => setShowEmailDialog(false)}>
                            Annuler
                          </Button>
                          <Button onClick={handleAddEmailTemplate} className="bg-red-600 hover:bg-red-700">
                            Créer le template
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {emailTemplates.map((template) => (
                    <div key={template.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium">{template.name}</p>
                        <p className="text-sm text-gray-600">{template.subject}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={template.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {template.active ? 'Actif' : 'Inactif'}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};