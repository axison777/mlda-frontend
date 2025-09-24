import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ShoppingCart, Filter, Star, Eye, CreditCard, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export const ShopPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
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
  
  const { data: productsData, isLoading } = useProducts({
    search: searchTerm,
    category: filterCategory !== 'all' ? filterCategory : undefined,
    active: true,
  });

  const products = productsData?.products || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  const calculateFinalPrice = (product: any) => {
    if (!product.discount || !product.discountType) return product.price;
    
    if (product.discountType === 'percentage') {
      return product.price * (1 - product.discount / 100);
    } else {
      return Math.max(0, product.price - product.discount);
    }
  };

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  const handleBuyProduct = (product: any) => {
    setSelectedProduct(product);
    setShowPayment(true);
  };

  const handlePayment = () => {
    if (!paymentData.email || !paymentData.name) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Simulation du paiement
    toast.success(`Commande confirmée pour ${selectedProduct?.name} !`);
    setShowPayment(false);
    setPaymentData({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      name: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
    });
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-black">
                <span className="text-red-600">M</span>
                <span className="text-yellow-500">L</span>
                <span className="text-red-600">D</span>
                <span className="text-yellow-500">A</span>
              </h1>
              <span className="ml-2 text-gray-600">Boutique</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-600 hover:text-gray-900">Accueil</Link>
              <Link to="/courses" className="text-gray-600 hover:text-gray-900">Cours</Link>
              <Link to="/shop" className="text-red-600 font-medium">Boutique</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            </nav>
            <div className="flex space-x-4">
              <Link to="/login">
                <Button variant="outline">Connexion</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-red-600 hover:bg-red-700">S'inscrire</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Boutique MLDA</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez nos produits pour enrichir votre apprentissage de l'allemand
          </p>
        </motion.div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Catégorie: {filterCategory === 'all' ? 'Toutes' : filterCategory}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterCategory('all')}>
                    Toutes les catégories
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterCategory('Livres')}>
                    Livres
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterCategory('Matériel')}>
                    Matériel pédagogique
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterCategory('Accessoires')}>
                    Accessoires
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product: any, index: number) => {
            const finalPrice = calculateFinalPrice(product);
            const hasDiscount = product.discount && product.discountType;
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="aspect-square bg-gray-200 relative overflow-hidden">
                    <img
                      src={product.images[0] || 'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {hasDiscount && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-red-600 text-white">
                          -{product.discountType === 'percentage' ? `${product.discount}%` : `€${product.discount}`}
                        </Badge>
                      </div>
                    )}
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge className="bg-gray-800 text-white">Rupture de stock</Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                    {product.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                    )}
                    
                    {product.category && (
                      <Badge variant="outline" className="mb-3">
                        {product.category}
                      </Badge>
                    )}

                    <div className="space-y-3">
                      <div className="text-center">
                        {hasDiscount ? (
                          <div className="space-y-2">
                            <p className="text-2xl font-bold text-red-600">{(finalPrice * 655).toLocaleString()} FCFA</p>
                            <p className="text-lg text-gray-500 line-through">{(product.price * 655).toLocaleString()} FCFA</p>
                          </div>
                        ) : (
                          <p className="text-2xl font-bold text-gray-900">{(product.price * 655).toLocaleString()} FCFA</p>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewProduct(product)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Détails
                        </Button>
                        <Button 
                          className="flex-1 bg-red-600 hover:bg-red-700 font-medium"
                          disabled={product.stock === 0}
                          onClick={() => handleBuyProduct(product)}
                        >
                          {product.stock === 0 ? (
                            'Rupture de stock'
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Acheter maintenant
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    {product.stock > 0 && product.stock <= 5 && (
                      <p className="text-sm text-orange-600 mt-2">
                        Plus que {product.stock} en stock !
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </div>

      {/* Product Details Dialog */}
      <Dialog open={showProductDetails} onOpenChange={setShowProductDetails}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Détails du Produit</DialogTitle>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <img
                  src={selectedProduct.images[0] || 'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg'}
                  alt={selectedProduct.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                {selectedProduct.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {selectedProduct.images.slice(1, 5).map((image: string, index: number) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${selectedProduct.name} ${index + 2}`}
                        className="w-full h-16 object-cover rounded cursor-pointer hover:opacity-80"
                      />
                    ))}
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h2>
                  {selectedProduct.category && (
                    <Badge variant="outline" className="mt-2">
                      {selectedProduct.category}
                    </Badge>
                  )}
                </div>
                
                <div className="text-center py-4 border border-gray-200 rounded-lg">
                  {calculateFinalPrice(selectedProduct) !== selectedProduct.price ? (
                    <div className="space-y-1">
                      <p className="text-3xl font-bold text-red-600">
                        {(calculateFinalPrice(selectedProduct) * 655).toLocaleString()} FCFA
                      </p>
                      <p className="text-lg text-gray-500 line-through">
                        {(selectedProduct.price * 655).toLocaleString()} FCFA
                      </p>
                    </div>
                  ) : (
                    <p className="text-3xl font-bold text-gray-900">
                      {(selectedProduct.price * 655).toLocaleString()} FCFA
                    </p>
                  )}
                </div>
                
                {selectedProduct.description && (
                  <div>
                    <h3 className="font-medium mb-2">Description</h3>
                    <p className="text-gray-600">{selectedProduct.description}</p>
                  </div>
                )}
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stock disponible:</span>
                    <span className="font-medium">{selectedProduct.stock} unités</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Livraison:</span>
                    <span className="font-medium">2-3 jours ouvrés</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={selectedProduct.stock === 0}
                  onClick={() => {
                    setShowProductDetails(false);
                    handleBuyProduct(selectedProduct);
                  }}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Acheter maintenant
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Finaliser votre commande</DialogTitle>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="space-y-6">
              {/* Order Summary */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedProduct.images[0] || 'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg'}
                      alt={selectedProduct.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{selectedProduct.name}</h3>
                      <p className="text-sm text-gray-600">Quantité: 1</p>
                    </div>
                    <div className="text-right">
                      {calculateFinalPrice(selectedProduct) !== selectedProduct.price ? (
                        <div>
                          <p className="text-2xl font-bold text-red-600">
                            {(calculateFinalPrice(selectedProduct) * 655).toLocaleString()} FCFA
                          </p>
                          <p className="text-lg text-gray-500 line-through">
                      <div className="space-y-1">
                        <p className="text-2xl font-bold text-red-600">{(finalPrice * 655).toLocaleString()} FCFA</p>
                        {hasDiscount && (
                          <p className="text-sm text-gray-500 line-through">{(product.price * 655).toLocaleString()} FCFA</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="font-medium">Informations de livraison</h3>
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
                    <RadioGroupItem value="transfer" id="transfer" />
                    <Label htmlFor="transfer" className="flex items-center cursor-pointer">
                      <Truck className="w-4 h-4 mr-2" />
                      Virement bancaire
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {paymentMethod === 'card' && (
                <>
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
                  <div>
                    <Label htmlFor="address">Adresse de livraison</Label>
                    <Input
                      id="address"
                      value={paymentData.address}
                      onChange={(e) => setPaymentData(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Votre adresse complète"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Ville</Label>
                      <Input
                        id="city"
                        value={paymentData.city}
                        onChange={(e) => setPaymentData(prev => ({ ...prev, city: e.target.value }))}
                        placeholder="Votre ville"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Code postal</Label>
                      <Input
                        id="postalCode"
                        value={paymentData.postalCode}
                        onChange={(e) => setPaymentData(prev => ({ ...prev, postalCode: e.target.value }))}
                        placeholder="Code postal"
                        />
                      </div>
                    </div>
                </>
              )}

              {/* Order Total */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Sous-total:</span>
                  <span>{(calculateFinalPrice(selectedProduct) * 655).toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison:</span>
                  <span>Gratuite</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-red-600">
                    {(calculateFinalPrice(selectedProduct) * 655).toLocaleString()} FCFA
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowPayment(false)}>
                  Annuler
                </Button>
                <Button 
                  onClick={handlePayment}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  Confirmer la commande
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};