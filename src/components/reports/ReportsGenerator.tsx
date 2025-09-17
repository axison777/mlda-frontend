import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  FileText, 
  Download, 
  Calendar as CalendarIcon, 
  BarChart3,
  Users,
  BookOpen,
  TrendingUp,
  Filter
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

interface ReportConfig {
  type: 'student-progress' | 'course-analytics' | 'revenue' | 'user-activity' | 'teacher-performance';
  title: string;
  dateRange: {
    from: Date;
    to: Date;
  };
  filters: {
    courseId?: string;
    userId?: string;
    level?: string;
    status?: string;
  };
  format: 'pdf' | 'excel' | 'csv';
}

const reportTypes = [
  {
    id: 'student-progress',
    title: 'Progression des Étudiants',
    description: 'Rapport détaillé sur les progrès des étudiants',
    icon: Users,
    availableFor: ['admin', 'professor'],
  },
  {
    id: 'course-analytics',
    title: 'Analytiques des Cours',
    description: 'Statistiques de performance des cours',
    icon: BookOpen,
    availableFor: ['admin', 'professor'],
  },
  {
    id: 'revenue',
    title: 'Rapport de Revenus',
    description: 'Analyse financière détaillée',
    icon: TrendingUp,
    availableFor: ['admin'],
  },
  {
    id: 'user-activity',
    title: 'Activité des Utilisateurs',
    description: 'Suivi de l\'engagement des utilisateurs',
    icon: BarChart3,
    availableFor: ['admin'],
  },
  {
    id: 'teacher-performance',
    title: 'Performance des Professeurs',
    description: 'Évaluation des performances d\'enseignement',
    icon: Users,
    availableFor: ['admin'],
  },
];

export const ReportsGenerator = () => {
  const { user } = useAuth();
  const [selectedReportType, setSelectedReportType] = useState('');
  const [reportConfig, setReportConfig] = useState<Partial<ReportConfig>>({
    dateRange: {
      from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      to: new Date(),
    },
    filters: {},
    format: 'pdf',
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const availableReports = reportTypes.filter(report => 
    report.availableFor.includes(user?.role || '')
  );

  const handleGenerateReport = async () => {
    if (!selectedReportType) {
      toast.error('Veuillez sélectionner un type de rapport');
      return;
    }

    setIsGenerating(true);
    
    // Simulation de génération de rapport
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const reportType = reportTypes.find(r => r.id === selectedReportType);
    toast.success(`Rapport "${reportType?.title}" généré avec succès !`);
    
    setIsGenerating(false);
  };

  const handleDateRangeChange = (field: 'from' | 'to', date: Date | undefined) => {
    if (!date) return;
    
    setReportConfig(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange!,
        [field]: date,
      },
    }));
  };

  const handleFilterChange = (key: string, value: string) => {
    setReportConfig(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        [key]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Générateur de Rapports</h2>
        <p className="text-gray-600">Créez des rapports détaillés pour analyser les performances</p>
      </div>

      {/* Report Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Type de Rapport</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableReports.map((report) => (
              <div
                key={report.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedReportType === report.id
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedReportType(report.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <report.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{report.title}</h3>
                    <p className="text-sm text-gray-600">{report.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Configuration */}
      {selectedReportType && (
        <Card>
          <CardHeader>
            <CardTitle>Configuration du Rapport</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Date Range */}
            <div>
              <Label>Période</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <Label className="text-sm text-gray-600">Date de début</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {reportConfig.dateRange?.from ? 
                          format(reportConfig.dateRange.from, 'dd MMMM yyyy', { locale: fr }) : 
                          'Sélectionner une date'
                        }
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={reportConfig.dateRange?.from}
                        onSelect={(date) => handleDateRangeChange('from', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Date de fin</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {reportConfig.dateRange?.to ? 
                          format(reportConfig.dateRange.to, 'dd MMMM yyyy', { locale: fr }) : 
                          'Sélectionner une date'
                        }
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={reportConfig.dateRange?.to}
                        onSelect={(date) => handleDateRangeChange('to', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div>
              <Label>Filtres</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {selectedReportType === 'student-progress' && (
                  <>
                    <div>
                      <Label className="text-sm text-gray-600">Cours</Label>
                      <Select onValueChange={(value) => handleFilterChange('courseId', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Tous les cours" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous les cours</SelectItem>
                          <SelectItem value="1">Allemand pour débutants</SelectItem>
                          <SelectItem value="2">Allemand des affaires</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Niveau</Label>
                      <Select onValueChange={(value) => handleFilterChange('level', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Tous les niveaux" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous les niveaux</SelectItem>
                          <SelectItem value="A1">A1</SelectItem>
                          <SelectItem value="A2">A2</SelectItem>
                          <SelectItem value="B1">B1</SelectItem>
                          <SelectItem value="B2">B2</SelectItem>
                          <SelectItem value="C1">C1</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Output Format */}
            <div>
              <Label>Format de sortie</Label>
              <Select 
                value={reportConfig.format} 
                onValueChange={(value: 'pdf' | 'excel' | 'csv') => 
                  setReportConfig(prev => ({ ...prev, format: value }))
                }
              >
                <SelectTrigger className="w-full mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Générer le Rapport
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};