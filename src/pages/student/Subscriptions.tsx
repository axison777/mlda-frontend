import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  CreditCard, 
  Calendar, 
  CheckCircle, 
  X, 
  Crown,
  Zap,
  Star,
  Plus
} from 'lucide-react';
import { toast } from 'sonner';

const currentSubscription = {
  plan: 'Professionnel',
  price: 30000,
  period: 'mois',
  status: 'active',
  nextBilling: '2024-02-20',
  features: [
    'Accès à tous les cours',
    'Sessions 1-on-1 avec professeurs',
    'Certificats officiels',
    'Support prioritaire',
    'Contenu business exclusif',
  ],
};

const availablePlans = [
  {
    name: 'Étudiant',
    price: 15000,
    period: 'mois',
    description: 'Parfait pour commencer',
    features: [
      'Accès aux cours de base',
      'Support par email',
      'Certificat de fin de cours',
      'Communauté d\'étudiants',
    ],
    popular: false,
    current: false,
  },
  {
    name: 'Professionnel',
    price: 30000,
    period: 'mois',
    description: 'Le plus populaire',
    features: [
      'Tous les cours disponibles',
      'Sessions 1-on-1',
      'Certificats officiels',
      'Support prioritaire',
      'Contenu business',
    ],
    popular: true,
    current: true,
  },
  {
    name: 'Entreprise',
    price: 100000,
    period: 'mois',
    description: 'Pour les équipes',
    features: [
      'Tout du plan Pro',
      'Comptes illimités',
      'Rapports détaillés',
      'Manager dédié',
      'Formation sur mesure',
    ],
    popular: false,
    current: false,
  },
];

const billingHistory = [
  {
    id: 'INV-001',
    date: '2024-01-20',
    amount: 30000,
    plan: 'Professionnel',
    status: 'paid',
    method: 'Carte **** 4242',
  },
  {
    id: 'INV-002',
    date: '2023-12-20',
    amount: 30000,
    plan: 'Professionnel',
    status: 'paid',
    method: 'Carte **** 4242',
  },
  {
    id: 'INV-003',
    date: '2023-11-20',
    amount: 15000,
    plan: 'Étudiant',
    status: 'paid',
    method: 'PayPal',
  },
];

const purchaseHistory = [
  {
    id: 'COURSE-001',
    type: 'course',
    name: 'Allemand pour débutants',
    price: 25000,
    date: '2024-01-15',
    status: 'completed',
    progress: 75,
  },
  {
    id: 'COURSE-002',
    type: 'course',
    name: 'Grammaire allemande avancée',
    price: 35000,
    date: '2024-01-10',
    status: 'completed',
    progress: 45,
  },
  {
    id: 'SUB-001',
    type: 'subscription',
    name: 'Abonnement Professionnel',
    price: 30000,
    date: '2024-01-01',
    status: 'active',
    nextBilling: '2024-02-01',
  },
];

export const Subscriptions = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('Professionnel');
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('subscription');
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
  });

  const handleUpgrade = (planName: string) => {
    setSelectedPlan(planName);
    setShowPaymentDialog(true);
  };

  const handlePayment = () => {
    // Simulation du paiement
    toast.success(`Abonnement ${selectedPlan} activé avec succès !`);
    setShowPaymentDialog(false);
    setPaymentData({ cardNumber: '', expiryDate: '', cvv: '', name: '' });
  };

  const handleCancelSubscription = () => {
    if (confirm('Êtes-vous sûr de vouloir annuler votre abonnement ?')) {
      toast.success('Abonnement annulé. Il restera actif jusqu\'à la fin de la période.');
    }
  };

  const handleModifySubscription = () => {
    toast.info('Redirection vers la modification d\'abonnement...');
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast.success(`Téléchargement de la facture ${invoiceId}...`);
  };

  const handleAddPaymentMethod = () => {
    toast.info('Ajout d\'une nouvelle méthode de paiement...');
  };

  const getStatusBadge = (status: string) => {
    return status === 'paid' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mes Abonnements</h1>
        <p className="text-gray-600">Gérez vos abonnements et consultez vos achats</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <Button
          variant={activeTab === 'subscription' ? 'default' : 'outline'}
          onClick={() => setActiveTab('subscription')}
          className={activeTab === 'subscription' ? 'bg-red-600 hover:bg-red-700' : ''}
        >
          Abonnement Actuel
        </Button>
        <Button
          variant={activeTab === 'purchases' ? 'default' : 'outline'}
          onClick={() => setActiveTab('purchases')}
          className={activeTab === 'purchases' ? 'bg-red-600 hover:bg-red-700' : ''}
        >
          Mes Achats ({purchaseHistory.length})
        </Button>
        <Button
          variant={activeTab === 'plans' ? 'default' : 'outline'}
          onClick={() => setActiveTab('plans')}
          className={activeTab === 'plans' ? 'bg-red-600 hover:bg-red-700' : ''}
        >
          Changer d'Abonnement
        </Button>
      </div>

      {/* Current Subscription */}
      {activeTab === 'subscription' && (
        <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Crown className="w-5 h-5 mr-2 text-red-600" />
            Abonnement Actuel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{currentSubscription.plan}</h3>
              <p className="text-gray-600">{currentSubscription.price.toLocaleString()} FCFA/{currentSubscription.period}</p>
              <p className="text-sm text-gray-600 mt-2">
                Prochaine facturation: {new Date(currentSubscription.nextBilling).toLocaleDateString('fr-FR')}
              </p>
            </div>
            <div className="text-right">
              <Badge className="bg-green-100 text-green-800 mb-2">
                {currentSubscription.status === 'active' ? 'Actif' : 'Inactif'}
              </Badge>
              <div className="space-x-2">
                <Button variant="outline" size="sm">Modifier</Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-600"
                  onClick={handleCancelSubscription}
                >
                  Annuler
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-3">Fonctionnalités incluses:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {currentSubscription.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        </Card>
      )}

      {/* Purchase History */}
      {activeTab === 'purchases' && (
        <Card>
          <CardHeader>
            <CardTitle>Historique de mes achats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {purchaseHistory.map((purchase) => (
                <div key={purchase.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      purchase.type === 'course' ? 'bg-blue-100' : 'bg-purple-100'
                    }`}>
                      {purchase.type === 'course' ? (
                        <BookOpen className="w-6 h-6 text-blue-600" />
                      ) : (
                        <Crown className="w-6 h-6 text-purple-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{purchase.name}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(purchase.date).toLocaleDateString('fr-FR')}
                      </p>
                      {purchase.type === 'course' && purchase.progress !== undefined && (
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={purchase.progress} className="w-20 h-1" />
                          <span className="text-xs text-gray-500">{purchase.progress}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{purchase.price.toLocaleString()} FCFA</p>
                    <Badge className={
                      purchase.status === 'active' ? 'bg-green-100 text-green-800' :
                      purchase.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }>
                      {purchase.status === 'active' ? 'Actif' :
                       purchase.status === 'completed' ? 'Acheté' : 'Inactif'}
                    </Badge>
                    {purchase.type === 'course' && (
                      <div className="mt-2">
                        <Button 
                          size="sm" 
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => navigate(`/student/course/${purchase.id.replace('COURSE-', '')}`)}
                        >
                          Continuer
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      {/* Available Plans */}
      {activeTab === 'plans' && (
        <Card>
        <CardHeader>
          <CardTitle>Changer d'Abonnement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {availablePlans.map((plan) => (
              <Card 
                key={plan.name} 
                className={`relative cursor-pointer transition-all ${
                  plan.current ? 'border-red-600 bg-red-50' : 
                  selectedPlan === plan.name ? 'border-red-400' : 'hover:border-gray-300'
                }`}
                onClick={() => setSelectedPlan(plan.name)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-red-600 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Populaire
                    </Badge>
                  </div>
                )}
                {plan.current && (
                  <div className="absolute -top-3 right-4">
                    <Badge className="bg-green-600 text-white">Actuel</Badge>
                  </div>
                )}
                
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">{plan.price.toLocaleString()} FCFA</span>
                      <span className="text-gray-600">/{plan.period}</span>
                    </div>
                    
                    <ul className="space-y-3 mb-6 text-left">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    {plan.current ? (
                      <Button disabled className="w-full">
                        Plan Actuel
                      </Button>
                    ) : (
                      <Button 
                        className={`w-full ${
                          plan.popular 
                            ? 'bg-red-600 hover:bg-red-700' 
                            : 'bg-gray-900 hover:bg-gray-800'
                        }`}
                        onClick={() => handleUpgrade(plan.name)}
                      >
                        {plan.price > currentSubscription.price ? 'Mettre à niveau' : 'Rétrograder'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
        </Card>
      )}

      {/* Billing History */}
      {activeTab === 'subscription' && (
        <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Historique de Facturation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {billingHistory.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{invoice.plan}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(invoice.date).toLocaleDateString('fr-FR')} • {invoice.method}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{invoice.amount.toLocaleString()} FCFA</p>
                  <Badge className={getStatusBadge(invoice.status)}>
                    {invoice.status === 'paid' ? 'Payé' : 'Échoué'}
                  </Badge>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDownloadInvoice(invoice.id)}
                >
                  Télécharger
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
        </Card>
      )}

      {/* Payment Method */}
      {activeTab === 'subscription' && (
        <Card>
        <CardHeader>
          <CardTitle>Méthode de Paiement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Carte se terminant par 4242</p>
                <p className="text-sm text-gray-600">Expire en 12/2027</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleModifySubscription}
              >
                Modifier
              </Button>
              <Button variant="outline" size="sm" className="text-red-600">
                Supprimer
              </Button>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={handleAddPaymentMethod}
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une méthode de paiement
          </Button>
        </CardContent>
        </Card>
      )}

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Paiement - Plan {selectedPlan}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Numéro de carte</Label>
              <Input
                id="cardNumber"
                value={paymentData.cardNumber}
                onChange={(e) => setPaymentData(prev => ({ ...prev, cardNumber: e.target.value }))}
                placeholder="1234 5678 9012 3456"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Date d'expiration</Label>
                <Input
                  id="expiryDate"
                  value={paymentData.expiryDate}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, expiryDate: e.target.value }))}
                  placeholder="MM/AA"
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  value={paymentData.cvv}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, cvv: e.target.value }))}
                  placeholder="123"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="name">Nom sur la carte</Label>
              <Input
                id="name"
                value={paymentData.name}
                onChange={(e) => setPaymentData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Nom complet"
              />
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
                Annuler
              </Button>
              <Button onClick={handlePayment} className="bg-red-600 hover:bg-red-700">
                Confirmer le paiement
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};