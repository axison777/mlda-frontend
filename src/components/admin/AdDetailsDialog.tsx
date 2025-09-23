import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  Eye, 
  Target, 
  DollarSign,
  Calendar,
  Edit,
  Copy,
  Play,
  Pause,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';

interface AdDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  ad: any;
}

export const AdDetailsDialog = ({ isOpen, onClose, ad }: AdDetailsDialogProps) => {
  if (!ad) return null;

  const handleEditAd = () => {
    toast.info(`Ouverture de l'édition pour ${ad.title}`);
  };

  const handleDuplicateAd = () => {
    toast.success(`Campagne "${ad.title}" dupliquée avec succès !`);
  };

  const handleToggleStatus = () => {
    const newStatus = ad.status === 'active' ? 'paused' : 'active';
    toast.success(`Campagne ${newStatus === 'active' ? 'activée' : 'mise en pause'}`);
  };

  const handleDeleteAd = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette campagne ?')) {
      toast.success('Campagne supprimée avec succès');
      onClose();
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      paused: 'bg-yellow-100 text-yellow-800',
      ended: 'bg-gray-100 text-gray-800',
      draft: 'bg-blue-100 text-blue-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      banner: 'bg-purple-100 text-purple-800',
      video: 'bg-red-100 text-red-800',
      social: 'bg-blue-100 text-blue-800',
      search: 'bg-green-100 text-green-800',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Détails de la Campagne</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Ad Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">{ad.title}</h2>
                  <p className="text-gray-600">{ad.id}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={getTypeBadge(ad.type)}>
                      {ad.type === 'banner' ? 'Bannière' :
                       ad.type === 'video' ? 'Vidéo' :
                       ad.type === 'social' ? 'Social' : 'Recherche'}
                    </Badge>
                    <Badge className={getStatusBadge(ad.status)}>
                      {ad.status === 'active' ? 'Active' :
                       ad.status === 'paused' ? 'En pause' :
                       ad.status === 'ended' ? 'Terminée' : 'Brouillon'}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleEditAd}>
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                  <Button variant="outline" onClick={handleDuplicateAd}>
                    <Copy className="w-4 h-4 mr-2" />
                    Dupliquer
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleToggleStatus}
                    className={ad.status === 'active' ? 'text-yellow-600' : 'text-green-600'}
                  >
                    {ad.status === 'active' ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Activer
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleDeleteAd}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Supprimer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="performance" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="targeting">Ciblage</TabsTrigger>
              <TabsTrigger value="creative">Créatif</TabsTrigger>
              <TabsTrigger value="budget">Budget</TabsTrigger>
            </TabsList>

            <TabsContent value="performance">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Eye className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{ad.impressions.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Impressions</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{ad.clicks}</p>
                    <p className="text-sm text-gray-600">Clics</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <BarChart3 className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{ad.ctr}%</p>
                    <p className="text-sm text-gray-600">CTR</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <DollarSign className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">€{ad.spent}</p>
                    <p className="text-sm text-gray-600">Dépensé</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Performance dans le Temps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Coût par clic (CPC):</span>
                      <span className="font-medium">€{(ad.spent / ad.clicks).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Coût pour mille impressions (CPM):</span>
                      <span className="font-medium">€{((ad.spent / ad.impressions) * 1000).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Budget restant:</span>
                      <span className="font-medium">€{ad.budget - ad.spent}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="targeting">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres de Ciblage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Audience</h4>
                      <p className="text-sm text-gray-600">Étudiants potentiels</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Âge</h4>
                      <p className="text-sm text-gray-600">18-65 ans</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Localisation</h4>
                      <p className="text-sm text-gray-600">France, Allemagne</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Centres d'intérêt</h4>
                      <p className="text-sm text-gray-600">Langues, Éducation, Voyages</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="creative">
              <Card>
                <CardHeader>
                  <CardTitle>Contenu Publicitaire</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                      <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <div className="p-4">
                          <h4 className="font-bold text-lg mb-2">{ad.title}</h4>
                          <p className="text-gray-600 text-sm mb-3">
                            Apprenez l'allemand rapidement avec nos cours interactifs !
                          </p>
                          <Button className="w-full bg-red-600 hover:bg-red-700">
                            Commencer maintenant
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="budget">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Budget et Dépenses</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Budget total:</span>
                      <span className="font-medium">€{ad.budget}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dépensé:</span>
                      <span className="font-medium">€{ad.spent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Restant:</span>
                      <span className="font-medium">€{ad.budget - ad.spent}</span>
                    </div>
                    <Progress value={(ad.spent / ad.budget) * 100} className="h-3" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Période de Diffusion</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date de début:</span>
                      <span className="font-medium">{new Date(ad.startDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date de fin:</span>
                      <span className="font-medium">{new Date(ad.endDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Jours restants:</span>
                      <span className="font-medium">
                        {Math.max(0, Math.ceil((new Date(ad.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} jours
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};