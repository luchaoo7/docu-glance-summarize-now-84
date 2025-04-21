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
import { FileText } from 'lucide-react';
import { CookieConsent } from '@/components/CookieConsent';
import FAQ from '@/components/FAQ';

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState<SummaryResult | null>(null);
  const [showUploader, setShowUploader] = useState(false);
  const [questions, setQuestions] = useState<string[]>(['']);
  const [features, setFeatures] = useState([
    {
      step: '01',
      title: 'Upload Document',
      description: 'Upload your insurance policies and related documents through our secure interface.'
    },
    {
      step: '02',
      title: 'Ask Questions',
      description: 'Specify up to 5 questions about your coverage, terms, or any specific concerns.'
    },
    {
      step: '03',
      title: 'Get Insights',
      description: 'Receive clear answers and summaries about your insurance coverage and terms.'
    }
  ]);

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
      const response = await processDocument(file, questions)
      console.log(response.data)
      const result = await summarizeFile(file, questions, response.data);
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
      <CookieConsent />
      <div className="gradient-bg">
        <Hero onGetStarted={handleGetStarted} />
      </div>

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

      {summary && (
        <div className="container py-16 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Document Coverage</h2>
            <p className="text-muted-foreground mt-2">
              Here's what we found in your document 
            </p>
          </div>
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

      <FAQ />

      <div id="features" className="bg-accent/20 py-16">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Features</h2>
            <p className="text-muted-foreground mt-2">
              Get started with DocuGlance in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.step} className="bg-background p-8 rounded-lg shadow-sm">
                <div className="text-xl font-bold text-primary mb-4">{feature.step}</div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="how-it-works" className="py-16">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground mt-2">
              Start analyzing your insurance documents in minutes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Upload Document',
                description: 'Upload your insurance policies and related documents through our secure interface.'
              },
              {
                step: '02',
                title: 'Ask Questions',
                description: 'Specify up to 5 questions about your coverage, terms, or any specific concerns.'
              },
              {
                step: '03',
                title: 'Get Insights',
                description: 'Receive clear answers and summaries about your insurance coverage and terms.'
              }
            ].map((item) => (
              <div key={item.step} className="bg-background rounded-xl p-8 shadow-sm border">
                <div className="text-xl font-bold text-primary mb-4">{item.step}</div>
                <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="about" className="bg-accent/20 py-16">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">About DocuGlance</h2>
            <p className="text-muted-foreground mt-2">
              Making insurance documents more accessible and understandable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Your Insurance Document Assistant</h3>
              <p className="text-muted-foreground">
                DocuGlance helps you understand your insurance policies better by analyzing documents
                and answering your specific questions about coverage, terms, and conditions.
              </p>
              <p className="text-muted-foreground">
                Our advanced AI technology processes complex insurance documents to provide you with
                clear, concise answers about your coverage, helping you make informed decisions
                about your insurance needs.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                alt="Technology"
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1521322800607-8c38375eef04"
                alt="Insurance"
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
