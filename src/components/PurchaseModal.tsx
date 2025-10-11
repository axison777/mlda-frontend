import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Smartphone, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
  type: 'course' | 'product';
}

export const PurchaseModal = ({ 
  isOpen, 
  onClose, 
  item,
  type 
}: PurchaseModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!item) return null;

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('Paiement effectué avec succès ! Vous recevrez un email de confirmation.');
      onClose();
    }, 2000);
  };

  const itemName = type === 'course' ? item.title : item.name;
  const itemPrice = item.price;
  const itemCurrency = item.currency || 'FCFA';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            Finaliser votre achat
          </DialogTitle>
          <DialogDescription>
            Complétez les informations de paiement pour acheter
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handlePurchase} className="space-y-6">
          {/* Résumé de la commande */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Résumé de la commande</h3>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{itemName}</p>
                <p className="text-sm text-gray-600">
                  {type === 'course' ? 'Cours en ligne' : 'Produit'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-red-600">
                  {itemPrice.toLocaleString()} {itemCurrency}
                </p>
              </div>
            </div>
          </div>

          {/* Méthode de paiement */}
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Méthode de paiement
            </Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                  <CreditCard className="w-5 h-5" />
                  <span>Carte bancaire</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="mobile" id="mobile" />
                <Label htmlFor="mobile" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Smartphone className="w-5 h-5" />
                  <span>Mobile Money (Orange Money, Wave, etc.)</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Formulaire de paiement */}
          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardName">Nom sur la carte</Label>
                <Input 
                  id="cardName" 
                  placeholder="Jean Dupont" 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="cardNumber">Numéro de carte</Label>
                <Input 
                  id="cardNumber" 
                  placeholder="1234 5678 9012 3456" 
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Date d'expiration</Label>
                  <Input 
                    id="expiry" 
                    placeholder="MM/AA" 
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input 
                    id="cvv" 
                    placeholder="123" 
                    type="password"
                    maxLength={3}
                    required 
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'mobile' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="phoneNumber">Numéro de téléphone</Label>
                <Input 
                  id="phoneNumber" 
                  placeholder="+226 XX XX XX XX" 
                  required 
                />
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-900">
                  Vous recevrez une notification sur votre téléphone pour confirmer le paiement.
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
              disabled={isProcessing}
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-yellow-500 hover:bg-yellow-600"
              disabled={isProcessing}
            >
              {isProcessing ? 'Traitement...' : `Payer ${itemPrice.toLocaleString()} ${itemCurrency}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
