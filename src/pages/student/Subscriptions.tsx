import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  CreditCard, 
  Calendar, 
  CheckCircle, 
  Crown,
  Star,
  Zap,
  Users,
  BookOpen,
  Award,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';

const subscriptionPlans = [
  {
    id: 'basic',
    name: 'Plan Basique',
    price: 15000,
    period: 'mois',
    features: [
      'Accès à 5 cours',
      'Support par email',
      'Certificats de base',
      'Accès mobile',
    ],
    popular: false,
    current: false,
  },
  {
    id: 'premium',
    name: 'Plan Premium',
    price: 25000,
    period: 'mois',
    features: [
      'Accès illimité aux cours',
      'Support prioritaire',
      'Certificats officiels',
      'Sessions de conversation',
      'Accès hors ligne',
      'Suivi personnalisé',
    ],
    popular: true,
    current: true,
  },
  {
    id: 'pro',
    name: 'Plan Professionnel',
    price: 45000,
    period: 'mois',
    features: [
      'Tout du plan Premium',
      'Cours particuliers (2h/mois)',
      'Préparation aux examens',
      'Coaching personnalisé',
      'Accès aux webinaires',
      'Matériel pédagogique premium',
    ],
    popular: false,
    current: false,
  },
];

const currentSubscription = {
  plan: 'premium',
  startDate: '2024-01-01',
  nextBilling: '2024-02-01',
  status: 'active',
  autoRenew: true,
};

export const Subscriptions = () => {
  const [autoRenew, setAutoRenew] = useState(currentSubscription.autoRenew);

  const handleSubscribe = (planId: string) => {
    if (planId === currentSubscription.plan) {
      toast.info('Vous êtes déjà abonné à ce plan');
      return;
    }
    toast.success(`Changement vers le plan ${planId} confirmé !`);
  };

  const handleCancelSubscription = () => {
    if (confirm('Êtes-vous sûr de vouloir annuler votre abonnement ?')) {
      toast.success('Abonnement annulé. Il restera actif jusqu\'à la fin de la période de facturation.');
    }
  };

  const handleToggleAutoRenew = (enabled: boolean) => {
    setAutoRenew(enabled);
    toast.success(`Renouvellement automatique ${enabled ? 'activé' : 'désactivé'}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mes Abonnements</h1>
        <p className="text-gray-600">Gérez votre abonnement et découvrez nos offres</p>
      </div>

      {/* Current Subscription */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Crown className="w-5 h-5 mr-2 text-yellow-600" />
            Mon Abonnement Actuel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Plan Premium</h3>
              <p className="text-gray-600">25,000 FCFA / mois</p>
              <div className="flex items-center gap-4 mt-2">
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Actif
                </Badge>
                <span className="text-sm text-gray-600">
                  Prochaine facturation: {new Date(currentSubscription.nextBilling).toLocaleDateString('fr-FR')}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-between mb-4">
                <Label htmlFor="autoRenew">Renouvellement automatique</Label>
                <Switch
                  id="autoRenew"
                  checked={autoRenew}
                  onCheckedChange={handleToggleAutoRenew}
                />
              </div>
              <Button 
                variant="outline" 
                onClick={handleCancelSubscription}
                className="text-red-600"
              >
                Annuler l'abonnement
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscription Plans */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Changer de Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`relative ${plan.popular ? 'border-red-500 border-2' : ''} ${plan.current ? 'bg-red-50' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-red-600 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Populaire
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                    {plan.id === 'basic' && <BookOpen className="w-8 h-8 text-red-600" />}
                    {plan.id === 'premium' && <Crown className="w-8 h-8 text-red-600" />}
                    {plan.id === 'pro' && <Zap className="w-8 h-8 text-red-600" />}
                  </div>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-gray-900">
                    {plan.price.toLocaleString()} FCFA
                    <span className="text-lg font-normal text-gray-600">/{plan.period}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-3" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      plan.current 
                        ? 'bg-gray-600 hover:bg-gray-700' 
                        : plan.popular 
                          ? 'bg-red-600 hover:bg-red-700' 
                          : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={plan.current}
                  >
                    {plan.current ? 'Plan Actuel' : 'Choisir ce plan'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Historique de Facturation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: '2024-01-01', amount: 25000, status: 'paid', plan: 'Premium' },
              { date: '2023-12-01', amount: 25000, status: 'paid', plan: 'Premium' },
              { date: '2023-11-01', amount: 15000, status: 'paid', plan: 'Basique' },
            ].map((bill, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium">Plan {bill.plan}</p>
                  <p className="text-sm text-gray-600">{new Date(bill.date).toLocaleDateString('fr-FR')}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{bill.amount.toLocaleString()} FCFA</p>
                  <Badge className="bg-green-100 text-green-800">
                    {bill.status === 'paid' ? 'Payé' : 'En attente'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};