
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock } from 'lucide-react';

interface DocumentSummaryProps {
  summary: string;
  keywords: string[];
  title?: string;
  readingTime?: number;
  fileName: string;
}

const DocumentSummary = ({ 
  summary, 
  keywords, 
  title, 
  readingTime = 2, 
  fileName 
}: DocumentSummaryProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <Card className="shadow-lg border-primary/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            {title || fileName}
          </CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-4 w-4" />
            <span>{readingTime} min read</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Summary</h3>
              <p className="text-sm leading-relaxed">{summary}</p>
            </div>

            <Separator />
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Key Points</h3>
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="bg-accent/30 hover:bg-accent/50 text-primary-foreground">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentSummary;
