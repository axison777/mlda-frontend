import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Package, Check } from 'lucide-react';

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  onBuy?: () => void;
}

export const ProductDetailsModal = ({ 
  isOpen, 
  onClose, 
  product,
  onBuy 
}: ProductDetailsModalProps) => {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
          <DialogDescription>
            Détails complets du produit
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Image */}
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
            {product.bestseller && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-red-600 text-white">
                  Bestseller
                </Badge>
              </div>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge className="bg-red-600 text-white text-lg px-4 py-2">
                  Rupture de stock
                </Badge>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="font-semibold">{product.rating}</p>
                <p className="text-xs text-gray-500">{product.reviews} avis</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-semibold">{product.category}</p>
                <p className="text-xs text-gray-500">Catégorie</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-semibold">{product.inStock ? 'En stock' : 'Rupture'}</p>
                <p className="text-xs text-gray-500">Disponibilité</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Caractéristiques */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Caractéristiques</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Matériel pédagogique de qualité professionnelle</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Contenu adapté aux niveaux CECR</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Livraison rapide et sécurisée</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Garantie satisfait ou remboursé 30 jours</span>
              </li>
            </ul>
          </div>

          {/* Avis clients */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Avis clients</h3>
            <div className="space-y-3">
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-medium">Marie K.</span>
                </div>
                <p className="text-sm text-gray-600">
                  Excellent produit, très utile pour mon apprentissage de l'allemand!
                </p>
              </div>
            </div>
          </div>

          {/* Prix et action */}
          <div className="border-t pt-4 flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-red-600">
                {product.price.toLocaleString()} FCFA
              </p>
              {product.originalPrice && (
                <p className="text-gray-500 line-through">
                  {product.originalPrice.toLocaleString()} FCFA
                </p>
              )}
            </div>
            <Button 
              size="lg" 
              className="bg-yellow-500 hover:bg-yellow-600"
              onClick={() => {
                onBuy?.();
                onClose();
              }}
              disabled={!product.inStock}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {product.inStock ? 'Acheter maintenant' : 'Indisponible'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
