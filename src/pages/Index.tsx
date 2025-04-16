
import { useState, useRef } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import FileUploader from '@/components/FileUploader';
import DocumentSummary from '@/components/DocumentSummary';
import DocumentQuestions from '@/components/DocumentQuestions';
import QuestionAnswers from '@/components/QuestionAnswers';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { summarizeFile, SummaryResult } from '@/utils/summarize';
import { toast } from 'sonner';
import { processDocument } from '@/services/api';

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState<SummaryResult | null>(null);
  const [showUploader, setShowUploader] = useState(false);
  const [questions, setQuestions] = useState<string[]>(['']);
  
  const fileUploaderRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setSummary(null);
  };

  const handleQuestionsChange = (newQuestions: string[]) => {
    setQuestions(newQuestions);
  };

  const handleSummarize = async () => {
    if (!file) {
      toast.error('Please upload a document first');
      return;
    }

    setIsProcessing(true);
    try {
      await processDocument(file, questions)
      const result = await summarizeFile(file, questions);
      setSummary(result);
    } catch (error) {
      toast.error('Failed to summarize document. Please try again.');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGetStarted = () => {
    setShowUploader(true);
    setTimeout(() => {
      fileUploaderRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setFile(null);
    setSummary(null);
    setQuestions(['']);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="gradient-bg">
        <Hero onGetStarted={handleGetStarted} />
      </div>

      {/* File Uploader Section */}
      {showUploader && (
        <div 
          ref={fileUploaderRef} 
          className="container py-16 max-w-4xl"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Upload Your Document</h2>
            <p className="text-muted-foreground mt-2">
              We support PDF, Word documents and text files.
            </p>
          </div>

          <FileUploader onFileSelect={handleFileSelect} />

          {file && <DocumentQuestions onQuestionsChange={handleQuestionsChange} />}

          <div className="mt-6 text-center">
            <Button
              onClick={handleSummarize}
              disabled={!file || isProcessing}
              className="w-full max-w-xs"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Summarize Document'
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Summary Section */}
      {summary && (
        <div className="container py-16 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Document Summary</h2>
            <p className="text-muted-foreground mt-2">
              Here's what we found in your document
            </p>
          </div>

          <DocumentSummary
            summary={summary.summary}
            keywords={summary.keywords}
            title={summary.title}
            readingTime={summary.readingTime}
            fileName={file?.name || 'Document'}
          />

          {summary.questionAnswers.length > 0 && (
            <QuestionAnswers qaItems={summary.questionAnswers} />
          )}

          <div className="mt-10 text-center">
            <Button variant="outline" onClick={handleReset}>
              Summarize Another Document
            </Button>
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="bg-accent/20 py-16">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground mt-2">
              Get started with DocuGlance in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Upload Document',
                description: 'Upload your PDF, Word document, or text file through our simple interface.'
              },
              {
                step: '02',
                title: 'Ask Questions',
                description: 'Add up to 5 specific questions you want answered from your document content.'
              },
              {
                step: '03',
                title: 'Get Insights',
                description: 'Review your concise summary, key points, and answers to your specific questions.'
              }
            ].map((item) => (
              <div key={item.step} className="bg-background p-8 rounded-lg shadow-sm">
                <div className="text-xl font-bold text-primary mb-4">{item.step}</div>
                <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
