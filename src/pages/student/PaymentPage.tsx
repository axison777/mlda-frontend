import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  ArrowLeft, 
  Shield, 
  CheckCircle,
  Star,
  Clock,
  BookOpen
} from 'lucide-react';
import { toast } from 'sonner';

export const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
  });

  if (!course) {
    navigate('/student/courses');
    return null;
  }

  const handlePayment = () => {
    if (!paymentData.email || !paymentData.name) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Simulation du paiement
    toast.success(`Inscription confirmée pour ${course.title} !`);
    navigate('/student/courses');
  };

  const getLevelBadge = (level: string) => {
    const colors = {
      a1: 'bg-green-100 text-green-800',
      a2: 'bg-green-100 text-green-800',
      b1: 'bg-yellow-100 text-yellow-800',
      b2: 'bg-yellow-100 text-yellow-800',
      c1: 'bg-red-100 text-red-800',
      c2: 'bg-red-100 text-red-800',
    };
    return colors[level?.toLowerCase() as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/student/courses')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Finaliser l'inscription</h1>
          <p className="text-gray-600">Complétez votre inscription au cours</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Résumé de la commande</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={course.thumbnail || 'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg'}
                  alt={course.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-medium">{course.title}</h3>
                  <p className="text-sm text-gray-600">Par {course.teacher?.firstName} {course.teacher?.lastName}</p>
                  <Badge className={getLevelBadge(course.level)}>
                    {course.level}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{course._count?.lessons || 24} leçons</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{Math.floor((course.duration || 480) / 60)}h de contenu</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2 text-yellow-400" />
                  <span>4.8 (89 avis)</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Prix du cours:</span>
                  <span>{course.price?.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span>Frais de traitement:</span>
                  <span>Gratuit</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-red-600">{course.price?.toLocaleString()} FCFA</span>
                </div>
              </div>

              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center text-green-800">
                  <Shield className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Paiement sécurisé</span>
                </div>
                <p className="text-xs text-green-700 mt-1">
                  Vos données sont protégées par un cryptage SSL
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Informations de paiement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="font-medium">Informations personnelles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerName">Nom complet *</Label>
                    <Input
                      id="customerName"
                      value={paymentData.name}
                      onChange={(e) => setPaymentData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Votre nom complet"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerEmail">Email *</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      value={paymentData.email}
                      onChange={(e) => setPaymentData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Payment Method */}
              <div className="space-y-4">
                <h3 className="font-medium">Méthode de paiement</h3>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center cursor-pointer">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Carte bancaire
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex items-center cursor-pointer">
                      <CreditCard className="w-4 h-4 mr-2" />
                      PayPal
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="mobile" id="mobile" />
                    <Label htmlFor="mobile" className="flex items-center cursor-pointer">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Mobile Money
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <h3 className="font-medium">Informations de carte</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="cardNumber">Numéro de carte</Label>
                      <Input
                        id="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={(e) => setPaymentData(prev => ({ ...prev, cardNumber: e.target.value }))}
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
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
                </div>
              )}

              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/student/courses')}
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button 
                  onClick={handlePayment}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirmer l'inscription
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};