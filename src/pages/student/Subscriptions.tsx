import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen,
  Calendar, 
  CheckCircle, 
  Star,
  Clock,
  Award,
  Download,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';

// Simuler les achats/inscriptions de l'utilisateur
const userPurchases = [
  {
    id: '1',
    type: 'course',
    title: 'Allemand pour débutants',
    price: 25000,
    purchaseDate: '2024-01-01',
    status: 'active',
    progress: 75,
    instructor: 'Dr. Hans Mueller',
    level: 'A1',
    completedLessons: 18,
    totalLessons: 24,
    certificateEarned: false,
  },
  {
    id: '2',
    type: 'course',
    title: 'Grammaire allemande avancée',
    price: 35000,
    purchaseDate: '2024-01-10',
    status: 'completed',
    progress: 100,
    instructor: 'Prof. Anna Schmidt',
    level: 'B2',
    completedLessons: 18,
    totalLessons: 18,
    certificateEarned: true,
  },
  {
    id: '3',
    type: 'product',
    title: 'Manuel d\'allemand A1',
    price: 45000,
    purchaseDate: '2024-01-05',
    status: 'delivered',
    category: 'Livre',
    deliveryDate: '2024-01-08',
  },
];

export const Subscriptions = () => {
  const [filter, setFilter] = useState('all');

  const filteredPurchases = userPurchases.filter(purchase => {
    if (filter === 'all') return true;
    return purchase.type === filter;
  });

  const handleViewCourse = (purchase: any) => {
    toast.info(`Ouverture du cours: ${purchase.title}`);
  };

  const handleDownloadCertificate = (purchase: any) => {
    toast.success(`Téléchargement du certificat pour: ${purchase.title}`);
  };

  const handleViewProduct = (purchase: any) => {
    toast.info(`Consultation du produit: ${purchase.title}`);
  };

  const getStatusBadge = (status: string, type: string) => {
    if (type === 'course') {
      return status === 'completed' 
        ? 'bg-green-100 text-green-800' 
        : 'bg-blue-100 text-blue-800';
    } else {
      return status === 'delivered' 
        ? 'bg-green-100 text-green-800' 
        : 'bg-yellow-100 text-yellow-800';
    }
  };

  const getLevelBadge = (level: string) => {
    const colors = {
      'A1': 'bg-green-100 text-green-800',
      'A2': 'bg-green-100 text-green-800',
      'B1': 'bg-yellow-100 text-yellow-800',
      'B2': 'bg-yellow-100 text-yellow-800',
      'C1': 'bg-red-100 text-red-800',
      'C2': 'bg-red-100 text-red-800',
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const totalSpent = userPurchases.reduce((sum, purchase) => sum + purchase.price, 0);
  const coursesOwned = userPurchases.filter(p => p.type === 'course').length;
  const productsOwned = userPurchases.filter(p => p.type === 'product').length;
  const certificatesEarned = userPurchases.filter(p => p.type === 'course' && p.certificateEarned).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mes Achats</h1>
        <p className="text-gray-600">Consultez vos cours et produits achetés</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Dépensé</p>
                <p className="text-3xl font-bold text-gray-900">{totalSpent.toLocaleString()} FCFA</p>
              </div>
              <Calendar className="w-12 h-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cours Achetés</p>
                <p className="text-3xl font-bold text-green-600">{coursesOwned}</p>
              </div>
              <BookOpen className="w-12 h-12 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Produits Achetés</p>
                <p className="text-3xl font-bold text-yellow-600">{productsOwned}</p>
              </div>
              <Star className="w-12 h-12 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Certificats</p>
                <p className="text-3xl font-bold text-red-600">{certificatesEarned}</p>
              </div>
              <Award className="w-12 h-12 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Mes Achats</CardTitle>
            <div className="flex gap-2">
              <Button 
                variant={filter === 'all' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('all')}
              >
                Tout
              </Button>
              <Button 
                variant={filter === 'course' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('course')}
              >
                Cours
              </Button>
              <Button 
                variant={filter === 'product' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('product')}
              >
                Produits
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPurchases.map((purchase, index) => (
              <motion.div
                key={purchase.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    purchase.type === 'course' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    {purchase.type === 'course' ? (
                      <BookOpen className={`w-6 h-6 ${purchase.type === 'course' ? 'text-blue-600' : 'text-green-600'}`} />
                    ) : (
                      <Star className="w-6 h-6 text-green-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{purchase.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusBadge(purchase.status, purchase.type)}>
                        {purchase.type === 'course' ? (
                          purchase.status === 'completed' ? 'Terminé' : 'En cours'
                        ) : (
                          purchase.status === 'delivered' ? 'Livré' : 'En cours'
                        )}
                      </Badge>
                      {purchase.level && (
                        <Badge className={getLevelBadge(purchase.level)}>
                          {purchase.level}
                        </Badge>
                      )}
                      {purchase.certificateEarned && (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Award className="w-3 h-3 mr-1" />
                          Certificat obtenu
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      Acheté le {new Date(purchase.purchaseDate).toLocaleDateString('fr-FR')}
                    </p>
                    {purchase.type === 'course' && (
                      <div className="mt-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-600">Progression</span>
                          <span className="text-xs font-medium">{purchase.progress}%</span>
                        </div>
                        <Progress value={purchase.progress} className="h-1" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{purchase.price.toLocaleString()} FCFA</p>
                    {purchase.instructor && (
                      <p className="text-sm text-gray-600">Par {purchase.instructor}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {purchase.type === 'course' ? (
                      <>
                        <Button variant="outline" size="sm" onClick={() => handleViewCourse(purchase)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        {purchase.certificateEarned && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownloadCertificate(purchase)}
                            className="text-yellow-600"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                      </>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => handleViewProduct(purchase)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Purchase Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Résumé des Achats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{coursesOwned}</p>
              <p className="text-sm text-gray-600">Cours achetés</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{productsOwned}</p>
              <p className="text-sm text-gray-600">Produits achetés</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{certificatesEarned}</p>
              <p className="text-sm text-gray-600">Certificats obtenus</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};