
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, FileText, X, Link } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  onUrlSelect?: (url: string) => void;
}

const FileUploader = ({ onFileSelect, onUrlSelect }: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inputMethod, setInputMethod] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState('');
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const processFile = (file: File) => {
    const allowedTypes = [
      'application/pdf',
      'text/plain',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error('Unsupported file type. Please upload PDF, TXT, or DOC files.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error('File size exceeds 10MB limit.');
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
    toast.success('File uploaded successfully!');
  };

  const processUrl = () => {
    if (!urlInput.trim()) {
      toast.error('Please enter a valid URL.');
      return;
    }

    const url = urlInput.trim();
    const validExtensions = ['.pdf', '.txt', '.doc', '.docx'];
    const hasValidExtension = validExtensions.some(ext => 
      url.toLowerCase().includes(ext)
    );

    if (!hasValidExtension) {
      toast.error('URL must point to a PDF, TXT, or DOC file.');
      return;
    }

    try {
      new URL(url); // Validate URL format
    } catch {
      toast.error('Please enter a valid URL.');
      return;
    }

    setSelectedUrl(url);
    if (onUrlSelect) {
      onUrlSelect(url);
    }
    toast.success('Document URL added successfully!');
  };

  const removeFile = () => {
    setSelectedFile(null);
    setSelectedUrl(null);
    setUrlInput('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        className="hidden"
        accept=".pdf,.txt,.doc,.docx"
      />
      
      {/* Method Toggle */}
      <div className="flex items-center justify-center mb-6">
        <div className="bg-muted p-1 rounded-lg">
          <Button
            variant={inputMethod === 'upload' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setInputMethod('upload')}
            className="mr-1"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload File
          </Button>
          <Button
            variant={inputMethod === 'url' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setInputMethod('url')}
          >
            <Link className="h-4 w-4 mr-2" />
            From URL
          </Button>
        </div>
      </div>

      {!selectedFile && !selectedUrl ? (
        <>
          {inputMethod === 'upload' ? (
            <div
              className={`file-drop-area rounded-lg p-10 text-center cursor-pointer ${
                isDragging ? 'active' : ''
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileInput}
            >
              <Upload className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-medium mb-2">Upload your document</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop your file here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supports PDF, TXT, DOC files (max 10MB)
              </p>
            </div>
          ) : (
            <div className="bg-muted/30 rounded-lg p-10 text-center">
              <Link className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-medium mb-4">Enter document URL</h3>
              <div className="flex gap-2 max-w-md mx-auto">
                <Input
                  type="url"
                  placeholder="https://example.com/document.pdf"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={processUrl}>
                  Add URL
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Supports PDF, TXT, DOC files from public URLs
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="bg-accent/30 rounded-lg p-6 relative">
          <button
            onClick={removeFile}
            className="absolute top-2 right-2 p-1 rounded-full bg-background/80 hover:bg-background"
            aria-label="Remove file"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-center">
            {selectedFile ? (
              <FileText className="h-10 w-10 text-primary mr-4" />
            ) : (
              <Link className="h-10 w-10 text-primary mr-4" />
            )}
            <div className="flex-1 truncate">
              <p className="font-medium truncate">
                {selectedFile ? selectedFile.name : selectedUrl}
              </p>
              <p className="text-sm text-muted-foreground">
                {selectedFile 
                  ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
                  : 'Document URL'
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
