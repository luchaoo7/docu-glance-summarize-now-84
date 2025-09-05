import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { askQuestion, mapQuestionsAndAnswers, processDocument, uploadDocument, uploadDocumentFromUrl } from '@/services/api';
import { FileText } from 'lucide-react';
import { CookieConsent } from '@/components/CookieConsent';
import FAQ from '@/components/FAQ';
import { supabase } from '@/lib/supabase/client';
import SEO from '@/components/SEO';

const Index = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
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
  const answersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get current session on load
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    // Subscribe to future changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setDocumentUrl(null);
    setFileId(null)
    setSummary(null);
  };

  const handleUrlSelect = (url: string) => {
    setDocumentUrl(url);
    setFile(null);
    setFileId(null);
    setSummary(null);
  };

  const handleQuestionsChange = (newQuestions: string[]) => {
    setQuestions(newQuestions);
  };

  const handleSummarize = async () => {
    if (!file && !documentUrl) {
      toast.error('Please upload a document or enter a document URL first');
      return;
    }

    var aboutToUseTrial = false
    // Check if user is logged in
    if (!session) {
      // Check if unregistered user has already used the app once
      const hasUsedTrial = localStorage.getItem('hasUsedTrial');
      
      if (hasUsedTrial) {
        toast.error('Trial expired. Please sign up to continue using the document analyzer.');
        navigate('/auth');
        return;
      }
      
      // Mark that they've used their one free trial
      // localStorage.setItem('hasUsedTrial', 'true');
    }

    setIsProcessing(true);
    try {

      var firstTime = false;

      let currentFileId = fileId;
      if (!currentFileId && (file || documentUrl)) {
        
        const hasUsedTrial = localStorage.getItem('hasUsedTrial');

        // Upload either file or URL
        const uploadResponse = file 
          ? await uploadDocument(file, hasUsedTrial)
          : await uploadDocumentFromUrl(documentUrl!, hasUsedTrial);
        
        currentFileId = uploadResponse.file_id; 
        const questionResponse = await askQuestion(uploadResponse.file_id, questions, hasUsedTrial)
        setSummary({questionAnswers: questionResponse.answer});

        setFileId(currentFileId);

        firstTime = true;
      }

      if( currentFileId && !firstTime) {
        const hasUsedTrial = localStorage.getItem('hasUsedTrial');
        const questionResponse = await askQuestion(currentFileId, questions, hasUsedTrial)
        setSummary({questionAnswers: questionResponse.answer});
      }

      localStorage.setItem('hasUsedTrial', 'true');
      
      // Scroll to answers section after processing
      setTimeout(() => {
        answersRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      toast.error('Failed to summarize document. Please try again.');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGetStarted = () => {
    if (!session) {
      // Check if unregistered user has already used their trial
      const hasUsedTrial = localStorage.getItem('hasUsedTrial');
      if (hasUsedTrial) {
        navigate('/auth');
        return;
      }
    }
    setShowUploader(true);
    setTimeout(() => {
      fileUploaderRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setFile(null);
    setDocumentUrl(null);
    setFileId(null);
    setSummary(null);
    setQuestions(['']);
  };

  return (
    <>
      <SEO 
        title="QueryTheDoc - AI Document Analyzer"
        description="Upload your documents and get instant AI-powered answers about your content, terms, and key information. Free trial available."
        keywords="querythedoc, document analysis, AI assistant, text analysis, document questions"
        type="website"
      />
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
                We support PDF(.pdf), Word documents (.docx) and text files (.txt).
              </p>
            </div>

            <FileUploader onFileSelect={handleFileSelect} onUrlSelect={handleUrlSelect} />

            {(file || documentUrl) && <DocumentQuestions onQuestionsChange={handleQuestionsChange} />}

            <div className="mt-6 text-center">
              <Button
                onClick={handleSummarize}
                disabled={(!file && !documentUrl) || isProcessing}
                className="w-full max-w-xs"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Get Answer'
                )}
              </Button>
            </div>
          </div>
        )}

        {summary && (
          <div ref={answersRef} className="container py-6 max-w-4xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold">Document Coverage</h2>
              <p className="text-muted-foreground mt-2">
                Here's what we found in your document
              </p>
            </div>
            {Object.keys(summary.questionAnswers).length > 0 && (
              <QuestionAnswers qaItems={summary.questionAnswers} />
            )}


            <div className="mt-10 text-center">
              <Button variant="outline" onClick={handleReset}>
                Query Another Document
              </Button>
            </div>
          </div>
        )}

        <FAQ />

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
              <h2 className="text-3xl font-bold">About QueryTheDoc</h2>
              <p className="text-muted-foreground mt-2">
                Making documents more accessible and understandable
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Your Document Analysis Assistant</h3>
                <p className="text-muted-foreground">
                  QueryTheDoc helps you understand your documents better by analyzing content
                  and answering your specific questions about key information, terms, and conditions.
                </p>
                <p className="text-muted-foreground">
                  Our advanced AI technology processes complex insurance documents to provide you with
                  clear, concise answers about your coverage, helping you make informed decisions
                  about your insurance needs.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
                  alt="Insurance Documents"
                  className="rounded-lg shadow-md w-full h-48 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1517842645767-c639042777db"
                  alt="Document Analysis"
                  className="rounded-lg shadow-md w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Index;
