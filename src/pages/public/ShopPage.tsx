import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Star, ShoppingCart, Package, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { PurchaseModal } from '@/components/PurchaseModal';
import { ProductDetailsModal } from '@/components/ProductDetailsModal';

const mockProducts = [
  {
    id: '1',
    name: 'Manuel d\'allemand A1',
    description: 'Livre complet pour débuter l\'allemand avec CD audio inclus',
    price: 45000,
    originalPrice: 50000,
    category: 'Livres',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
    rating: 4.7,
    reviews: 23,
    inStock: true,
    bestseller: true,
  },
  {
    id: '2',
    name: 'Cahier d\'exercices B1',
    description: 'Exercices pratiques pour le niveau intermédiaire',
    price: 25000,
    category: 'Matériel',
    image: 'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg',
    rating: 4.5,
    reviews: 18,
    inStock: true,
  },
  {
    id: '3',
    name: 'Dictionnaire allemand-français',
    description: 'Dictionnaire complet avec 50,000 entrées',
    price: 35000,
    category: 'Référence',
    image: 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg',
    rating: 4.8,
    reviews: 41,
    inStock: false,
  },
  {
    id: '4',
    name: 'Cartes de vocabulaire',
    description: 'Set de 500 cartes pour mémoriser le vocabulaire',
    price: 15000,
    category: 'Accessoires',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    rating: 4.6,
    reviews: 12,
    inStock: true,
  },
];

export const ShopPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white w-full">
      <PublicNavbar />

      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Boutique MLDA</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de livres, matériel pédagogique et accessoires pour enrichir votre apprentissage
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
                  <DropdownMenuItem onClick={() => setFilterCategory('Livres')}>Livres</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterCategory('Matériel')}>Matériel</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterCategory('Référence')}>Référence</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterCategory('Accessoires')}>Accessoires</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="aspect-square bg-gray-200 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.bestseller && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-red-600 text-white">
                        Bestseller
                      </Badge>
                    </div>
                  )}
                  {product.originalPrice && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-600 text-white">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </Badge>
                    </div>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge className="bg-red-600 text-white">Rupture de stock</Badge>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{product.category}</Badge>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm">{product.rating}</span>
                        <span className="text-sm text-gray-600 ml-1">({product.reviews})</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-red-600">{product.price.toLocaleString()} FCFA</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              {product.originalPrice.toLocaleString()} FCFA
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowDetailsModal(true);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Voir
                        </Button>
                        <Button 
                          size="sm"
                          className="flex-1 bg-red-600 hover:bg-red-700"
                          disabled={!product.inStock}
                          onClick={() => {
                            if (product.inStock) {
                              setSelectedProduct(product);
                              setShowPurchaseModal(true);
                            }
                          }}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {product.inStock ? 'Acheter' : 'Indisponible'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </div>

      <PublicFooter />

      {/* Modals */}
      <ProductDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        product={selectedProduct}
        onBuy={() => setShowPurchaseModal(true)}
      />
      <PurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        item={selectedProduct}
        type="product"
      />
    </div>
  );
};