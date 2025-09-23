import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  User, 
  Calendar, 
  DollarSign,
  FileText,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface PaymentDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  payment: any;
}

export const PaymentDetailsDialog = ({ isOpen, onClose, payment }: PaymentDetailsDialogProps) => {
  if (!payment) return null;

  const handleDownloadReceipt = () => {
    toast.success(`Téléchargement du reçu ${payment.id}...`);
  };

  const handleRefund = () => {
    if (confirm('Êtes-vous sûr de vouloir rembourser cette transaction ?')) {
      toast.success(`Remboursement initié pour ${payment.id}`);
    }
  };

  const handleResendReceipt = () => {
    toast.success(`Reçu renvoyé à ${payment.user}`);
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getMethodBadge = (method: string) => {
    const colors = {
      card: 'bg-blue-100 text-blue-800',
      paypal: 'bg-purple-100 text-purple-800',
      bank: 'bg-gray-100 text-gray-800',
    };
    return colors[method as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Détails de la Transaction</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Payment Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    <CreditCard className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{payment.id}</h2>
                    <p className="text-gray-600">{payment.amount.toLocaleString()} FCFA</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getStatusBadge(payment.status)}>
                        {payment.status === 'completed' ? 'Réussi' :
                         payment.status === 'pending' ? 'En attente' :
                         payment.status === 'failed' ? 'Échoué' : 'Remboursé'}
                      </Badge>
                      <Badge className={getMethodBadge(payment.method)}>
                        {payment.method === 'card' ? 'Carte' :
                         payment.method === 'paypal' ? 'PayPal' : 'Virement'}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleDownloadReceipt}>
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger reçu
                  </Button>
                  <Button variant="outline" onClick={handleResendReceipt}>
                    <FileText className="w-4 h-4 mr-2" />
                    Renvoyer reçu
                  </Button>
                  {payment.status === 'completed' && (
                    <Button 
                      variant="outline" 
                      onClick={handleRefund}
                      className="text-red-600"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Rembourser
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="details" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Détails</TabsTrigger>
              <TabsTrigger value="customer">Client</TabsTrigger>
              <TabsTrigger value="history">Historique</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations de Transaction</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ID Transaction:</span>
                      <span className="font-medium font-mono">{payment.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Montant:</span>
                      <span className="font-medium">{payment.amount.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{new Date(payment.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Méthode:</span>
                      <Badge className={getMethodBadge(payment.method)}>
                        {payment.method === 'card' ? 'Carte bancaire' :
                         payment.method === 'paypal' ? 'PayPal' : 'Virement bancaire'}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Statut:</span>
                      <Badge className={getStatusBadge(payment.status)}>
                        {payment.status === 'completed' ? 'Réussi' :
                         payment.status === 'pending' ? 'En attente' :
                         payment.status === 'failed' ? 'Échoué' : 'Remboursé'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Produit Acheté</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cours:</span>
                      <span className="font-medium">{payment.course}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">Cours en ligne</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Durée d'accès:</span>
                      <span className="font-medium">Illimitée</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="customer">
              <Card>
                <CardHeader>
                  <CardTitle>Informations Client</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nom:</span>
                    <span className="font-medium">{payment.user}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">marie.dubois@email.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Première commande:</span>
                    <span className="font-medium">Non</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total dépensé:</span>
                    <span className="font-medium">75,000 FCFA</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Historique de la Transaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Transaction initiée</p>
                        <p className="text-xs text-gray-600">{new Date(payment.date).toLocaleString('fr-FR')}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Paiement traité</p>
                        <p className="text-xs text-gray-600">{new Date(payment.date).toLocaleString('fr-FR')}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Accès au cours accordé</p>
                        <p className="text-xs text-gray-600">{new Date(payment.date).toLocaleString('fr-FR')}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};