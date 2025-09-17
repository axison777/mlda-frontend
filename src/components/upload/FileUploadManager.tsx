import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  File, 
  Image, 
  Video, 
  Music, 
  FileText, 
  X, 
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadProgress: number;
  status: 'uploading' | 'completed' | 'error';
}

interface FileUploadManagerProps {
  acceptedTypes?: string[];
  maxFileSize?: number; // in MB
  maxFiles?: number;
  onFilesUploaded?: (files: UploadedFile[]) => void;
}

export const FileUploadManager = ({
  acceptedTypes = ['image/*', 'video/*', 'audio/*', '.pdf', '.doc', '.docx'],
  maxFileSize = 50,
  maxFiles = 5,
  onFilesUploaded,
}: FileUploadManagerProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-6 h-6" />;
    if (type.startsWith('video/')) return <Video className="w-6 h-6" />;
    if (type.startsWith('audio/')) return <Music className="w-6 h-6" />;
    if (type.includes('pdf')) return <FileText className="w-6 h-6" />;
    return <File className="w-6 h-6" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    if (file.size > maxFileSize * 1024 * 1024) {
      return `Le fichier est trop volumineux (max: ${maxFileSize}MB)`;
    }
    
    const isValidType = acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase());
      }
      return file.type.match(type.replace('*', '.*'));
    });
    
    if (!isValidType) {
      return 'Type de fichier non supporté';
    }
    
    return null;
  };

  const simulateUpload = (file: UploadedFile): Promise<void> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          
          setUploadedFiles(prev =>
            prev.map(f =>
              f.id === file.id
                ? { ...f, uploadProgress: 100, status: 'completed' }
                : f
            )
          );
          
          resolve();
        } else {
          setUploadedFiles(prev =>
            prev.map(f =>
              f.id === file.id
                ? { ...f, uploadProgress: progress }
                : f
            )
          );
        }
      }, 200);
    });
  };

  const handleFileSelect = async (files: FileList) => {
    const fileArray = Array.from(files);
    
    if (uploadedFiles.length + fileArray.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} fichiers autorisés`);
      return;
    }

    const validFiles: UploadedFile[] = [];
    
    for (const file of fileArray) {
      const error = validateFile(file);
      if (error) {
        toast.error(`${file.name}: ${error}`);
        continue;
      }

      const uploadedFile: UploadedFile = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        uploadProgress: 0,
        status: 'uploading',
      };

      validFiles.push(uploadedFile);
    }

    if (validFiles.length === 0) return;

    setUploadedFiles(prev => [...prev, ...validFiles]);

    // Simuler l'upload pour chaque fichier
    for (const file of validFiles) {
      try {
        await simulateUpload(file);
        toast.success(`${file.name} uploadé avec succès !`);
      } catch (error) {
        setUploadedFiles(prev =>
          prev.map(f =>
            f.id === file.id
              ? { ...f, status: 'error' }
              : f
          )
        );
        toast.error(`Erreur lors de l'upload de ${file.name}`);
      }
    }

    if (onFilesUploaded) {
      onFilesUploaded(validFiles);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <Card>
        <CardContent className="p-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Glissez-déposez vos fichiers ici
            </h3>
            <p className="text-gray-600 mb-4">
              ou cliquez pour sélectionner des fichiers
            </p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-red-600 hover:bg-red-700"
            >
              Sélectionner des fichiers
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={acceptedTypes.join(',')}
              onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
              className="hidden"
            />
            <p className="text-xs text-gray-500 mt-4">
              Formats acceptés: {acceptedTypes.join(', ')} • Max: {maxFileSize}MB par fichier
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Fichiers Uploadés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploadedFiles.map((file) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex-shrink-0">
                    {getFileIcon(file.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    
                    {file.status === 'uploading' && (
                      <div className="mt-2">
                        <Progress value={file.uploadProgress} className="h-1" />
                        <p className="text-xs text-gray-500 mt-1">
                          {Math.round(file.uploadProgress)}% uploadé
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {file.status === 'completed' && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                    {file.status === 'error' && (
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};