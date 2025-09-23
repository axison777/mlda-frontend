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
  CheckCircle,
  FileText,
  Eye
} from 'lucide-react';
import { AchievementSystem } from '@/components/gamification/AchievementSystem';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

export const AchievementsPage = () => {
  const { user } = useAuth();
  
  const certificates = [
    {
      id: 'CERT-001',
      title: 'Certificat Allemand Niveau A1',
      course: 'Allemand pour débutants',
      issuedDate: '2024-01-15',
      score: 85,
      status: 'issued',
      issuedBy: 'Dr. Hans Mueller',
      validUntil: '2026-01-15',
    },
    {
      id: 'CERT-002',
      title: 'Certificat Grammaire Allemande',
      course: 'Grammaire allemande avancée',
      issuedDate: '2024-01-10',
      score: 92,
      status: 'issued',
      issuedBy: 'Prof. Anna Schmidt',
      validUntil: '2026-01-10',
    },
  ];

  const attestations = [
    {
      id: 'ATT-001',
      title: 'Attestation de Participation',
      description: 'Participation active aux cours d\'allemand',
      issuedDate: '2024-01-20',
      issuedBy: 'Administration MLDA',
      type: 'participation',
    },
    {
      id: 'ATT-002',
      title: 'Attestation d\'Assiduité',
      description: 'Assiduité exemplaire - 95% de présence',
      issuedDate: '2024-01-18',
      issuedBy: 'Administration MLDA',
      type: 'attendance',
    },
  ];

  const learningStats = [
    { title: 'Achievements débloqués', value: '12', icon: Trophy, color: 'text-yellow-600' },
    { title: 'Points totaux', value: '850', icon: Star, color: 'text-blue-600' },
    { title: 'Certificats obtenus', value: certificates.length.toString(), icon: Medal, color: 'text-green-600' },
    { title: 'Attestations reçues', value: attestations.length.toString(), icon: FileText, color: 'text-purple-600' },
  ];

  const handleDownloadCertificate = (cert: any) => {
    toast.success(`Téléchargement du certificat: ${cert.title}`);
  };

  const handleViewAttestation = (attestation: any) => {
    toast.info(`Consultation de l'attestation: ${attestation.title}`);
  };

  const handleDownloadAttestation = (attestation: any) => {
    toast.success(`Téléchargement de l'attestation: ${attestation.title}`);
  };

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
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {learningStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-12 h-12 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
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
          {certificates.length === 0 ? (
            <div className="text-center py-8">
              <Medal className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun certificat</h3>
              <p className="text-gray-600">Terminez vos cours pour obtenir des certificats</p>
            </div>
          ) : (
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
                    <div className="flex justify-between">
                      <span className="text-gray-600">Délivré par:</span>
                      <span className="font-medium">{cert.issuedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Valide jusqu'au:</span>
                      <span className="font-medium">{new Date(cert.validUntil).toLocaleDateString('fr-FR')}</span>
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
          )}
        </CardContent>
      </Card>

      {/* Attestations Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Attestations Administratives
          </CardTitle>
        </CardHeader>
        <CardContent>
          {attestations.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune attestation</h3>
              <p className="text-gray-600">Les attestations seront délivrées par l'administration</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {attestations.map((attestation) => (
                <Card key={attestation.id} className="border-purple-200 bg-purple-50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <FileText className="w-6 h-6 text-purple-600" />
                      </div>
                      <Badge className={`${
                        attestation.type === 'participation' ? 'bg-blue-100 text-blue-800' :
                        attestation.type === 'attendance' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {attestation.type === 'participation' ? 'Participation' :
                         attestation.type === 'attendance' ? 'Assiduité' : 'Autre'}
                      </Badge>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2">{attestation.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{attestation.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date de délivrance:</span>
                        <span className="font-medium">{new Date(attestation.issuedDate).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Délivré par:</span>
                        <span className="font-medium">{attestation.issuedBy}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button 
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleViewAttestation(attestation)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Voir
                      </Button>
                      <Button 
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                        onClick={() => handleDownloadAttestation(attestation)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Télécharger
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AchievementSystem />
    </motion.div>
  );
};