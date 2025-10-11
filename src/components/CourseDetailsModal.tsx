import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Clock, Users, BookOpen, ShoppingCart } from 'lucide-react';

interface CourseDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: any;
  onBuy?: () => void;
}

export const CourseDetailsModal = ({ 
  isOpen, 
  onClose, 
  course,
  onBuy 
}: CourseDetailsModalProps) => {
  if (!course) return null;

  const getLevelBadge = (level: string) => {
    const colors = {
      'beginner': 'bg-green-100 text-green-800',
      'intermediate': 'bg-yellow-100 text-yellow-800',
      'advanced': 'bg-red-100 text-red-800',
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getLevelLabel = (level: string) => {
    const labels = {
      'beginner': 'Débutant',
      'intermediate': 'Intermédiaire',
      'advanced': 'Avancé',
    };
    return labels[level as keyof typeof labels] || level;
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h${mins > 0 ? ` ${mins}min` : ''}`;
    }
    return `${mins}min`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{course.title}</DialogTitle>
          <DialogDescription>
            Détails complets du cours
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Image */}
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={course.thumbnailUrl || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop'}
              alt={course.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge className={getLevelBadge(course.level)}>
                {getLevelLabel(course.level)}
              </Badge>
              <Badge className="bg-blue-100 text-blue-800">
                {course.category}
              </Badge>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="font-semibold">{course.rating}</p>
                <p className="text-xs text-gray-500">{course.reviewCount} avis</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-semibold">{formatDuration(course.duration)}</p>
                <p className="text-xs text-gray-500">Durée</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-semibold">{course.enrollmentCount}</p>
                <p className="text-xs text-gray-500">Étudiants</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-500" />
              <div>
                <p className="font-semibold">{course.instructorName}</p>
                <p className="text-xs text-gray-500">Professeur</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p className="text-gray-600">{course.description}</p>
          </div>

          {/* Ce que vous allez apprendre */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Ce que vous allez apprendre</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Maîtriser les bases de la grammaire allemande</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Développer votre vocabulaire quotidien</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Améliorer votre prononciation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Pratiquer avec des exercices interactifs</span>
              </li>
            </ul>
          </div>

          {/* Prérequis */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Prérequis</h3>
            <p className="text-gray-600">
              {course.level === 'beginner' 
                ? 'Aucun prérequis nécessaire. Ce cours est parfait pour les débutants.'
                : 'Avoir des connaissances de base en allemand.'}
            </p>
          </div>

          {/* Prix et action */}
          <div className="border-t pt-4 flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-red-600">
                {course.price.toLocaleString()} {course.currency}
              </p>
            </div>
            <Button 
              size="lg" 
              className="bg-yellow-500 hover:bg-yellow-600"
              onClick={() => {
                onBuy?.();
                onClose();
              }}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Acheter maintenant
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
