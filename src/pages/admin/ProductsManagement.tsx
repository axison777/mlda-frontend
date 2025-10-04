import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Package,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  AlertTriangle
} from 'lucide-react';

export const ProductsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: [] as string[],
    active: true,
    discount: '',
    discountType: 'percentage' as 'percentage' | 'fixed',
  });

  // Mock data
  const products = [
    {
      id: '1',
      name: 'Manuel d\'allemand A1',
      description: 'Livre complet pour débuter l\'allemand',
      price: 25.99,
      category: 'Livres',
      stock: 15,
      images: ['https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg'],
      active: true,
      sales: 45,
      discount: 10,
      discountType: 'percentage' as const,
    },
    {
      id: '2',
      name: 'Cahier d\'exercices B1',
      description: 'Exercices pratiques niveau intermédiaire',
      price: 18.50,
      category: 'Matériel',
      stock: 8,
      images: ['https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg'],
      active: true,
      sales: 32,
    },
  ];

  const stats = {
    totalProducts: 24,
    activeProducts: 22,
    totalSales: 1250,
    revenue: 15680,
  };

  const handleCreateProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    toast.success('Produit créé avec succès !');
    setShowCreateDialog(false);
    setNewProduct({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      images: [],
      active: true,
      discount: '',
      discountType: 'percentage',
    });
  };

  const handleEditProduct = () => {
    toast.success('Produit modifié avec succès !');
    setShowEditDialog(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      toast.success('Produit supprimé avec succès !');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 w-full"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Produits</h1>
          <p className="text-gray-600">Gérez votre catalogue de produits</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Produit
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Produits</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Produits Actifs</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeProducts}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ventes Totales</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalSales}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenus</p>
                <p className="text-2xl font-bold text-red-600">{stats.revenue.toLocaleString()} FCFA</p>
              </div>
              <DollarSign className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
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
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                <SelectItem value="Livres">Livres</SelectItem>
                <SelectItem value="Matériel">Matériel</SelectItem>
                <SelectItem value="Accessoires">Accessoires</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-square bg-gray-200 relative">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discount && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-600 text-white">
                    -{product.discountType === 'percentage' ? `${product.discount}%` : `${product.discount} FCFA`}
                  </Badge>
                </div>
              )}
              {!product.active && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge className="bg-gray-800 text-white">Inactif</Badge>
                </div>
              )}
              {product.stock <= 5 && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-orange-600 text-white">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Stock faible
                  </Badge>
                </div>
              )}
            </div>
            
            <CardContent className="p-6">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{product.category}</Badge>
                  <span className="text-sm text-gray-500">{product.sales} ventes</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-bold text-gray-900">
                      {(product.price * 655).toLocaleString()} FCFA
                    </p>
                    <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowEditDialog(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Product Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Créer un Nouveau Produit</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="productName">Nom du produit *</Label>
                <Input
                  id="productName"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Nom du produit"
                />
              </div>
              <div>
                <Label htmlFor="productPrice">Prix (€) *</Label>
                <Input
                  id="productPrice"
                  type="number"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="productDescription">Description</Label>
              <Textarea
                id="productDescription"
                value={newProduct.description}
                onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Description du produit"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="productCategory">Catégorie</Label>
                <Select value={newProduct.category} onValueChange={(value) => setNewProduct(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Livres">Livres</SelectItem>
                    <SelectItem value="Matériel">Matériel</SelectItem>
                    <SelectItem value="Accessoires">Accessoires</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="productStock">Stock</Label>
                <Input
                  id="productStock"
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, stock: e.target.value }))}
                  placeholder="Quantité en stock"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="productDiscount">Remise</Label>
                <Input
                  id="productDiscount"
                  type="number"
                  value={newProduct.discount}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, discount: e.target.value }))}
                  placeholder="Montant de la remise"
                />
              </div>
              <div>
                <Label htmlFor="discountType">Type de remise</Label>
                <Select value={newProduct.discountType} onValueChange={(value: 'percentage' | 'fixed') => setNewProduct(prev => ({ ...prev, discountType: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Pourcentage (%)</SelectItem>
                    <SelectItem value="fixed">Montant fixe (€)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="productActive"
                checked={newProduct.active}
                onCheckedChange={(checked) => setNewProduct(prev => ({ ...prev, active: checked }))}
              />
              <Label htmlFor="productActive">Produit actif</Label>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Annuler
              </Button>
              <Button onClick={handleCreateProduct}>
                Créer le Produit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier le Produit</DialogTitle>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editProductName">Nom du produit</Label>
                  <Input
                    id="editProductName"
                    defaultValue={selectedProduct.name}
                    placeholder="Nom du produit"
                  />
                </div>
                <div>
                  <Label htmlFor="editProductPrice">Prix (€)</Label>
                  <Input
                    id="editProductPrice"
                    type="number"
                    step="0.01"
                    defaultValue={selectedProduct.price}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="editProductDescription">Description</Label>
                <Textarea
                  id="editProductDescription"
                  defaultValue={selectedProduct.description}
                  placeholder="Description du produit"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editProductCategory">Catégorie</Label>
                  <Select defaultValue={selectedProduct.category}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Livres">Livres</SelectItem>
                      <SelectItem value="Matériel">Matériel</SelectItem>
                      <SelectItem value="Accessoires">Accessoires</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="editProductStock">Stock</Label>
                  <Input
                    id="editProductStock"
                    type="number"
                    defaultValue={selectedProduct.stock}
                    placeholder="Quantité en stock"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="editProductActive"
                  defaultChecked={selectedProduct.active}
                />
                <Label htmlFor="editProductActive">Produit actif</Label>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                  Annuler
                </Button>
                <Button onClick={handleEditProduct}>
                  Sauvegarder
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};