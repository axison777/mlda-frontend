import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Award, 
  Download, 
  Calendar, 
  Trophy,
  Medal,
  Star,
  CheckCircle
} from 'lucide-react';
import { AchievementSystem } from '@/components/gamification/AchievementSystem';
import { toast } from 'sonner';

export const AchievementsPage = () => {
  const certificates = [
    {
      id: 'CERT-001',
      title: 'Certificat Allemand Niveau A1',
      course: 'Allemand pour débutants',
      issuedDate: '2024-01-15',
      score: 85,
      status: 'issued',
    },
    {
      id: 'CERT-002',
      title: 'Certificat Grammaire Allemande',
      course: 'Grammaire allemande avancée',
      issuedDate: '2024-01-10',
      score: 92,
      status: 'issued',
    },
  const handleDownloadCertificate = (cert: any) => {
    toast.success(`Téléchargement du certificat: ${cert.title}`);
  };
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mes Achievements</h1>
        <p className="text-gray-600">Débloquez des récompenses en progressant dans vos cours</p>
      </div>
      
      {/* Certificates Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Mes Certificats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <Card key={cert.id} className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Medal className="w-6 h-6 text-yellow-600" />
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Délivré
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2">{cert.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{cert.course}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Score obtenu:</span>
                      <span className="font-medium text-green-600">{cert.score}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date de délivrance:</span>
                      <span className="font-medium">{new Date(cert.issuedDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-4 bg-yellow-600 hover:bg-yellow-700"
                    onClick={() => handleDownloadCertificate(cert)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger le certificat
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <AchievementSystem />
    </motion.div>
  );
};