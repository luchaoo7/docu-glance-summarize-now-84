
// This is a mock implementation for demonstration.
// In a real app, you would connect to an API or use a library for summarization.

import { CoverageAnswer } from "@/services/api";

export interface SummaryResult {
  title?: string;
  summary?: string;
  keywords?: string[];
  readingTime?: number;
  // questionAnswers: { question: string; answer: string, isCovered?: boolean}[];
  questionAnswers?: Record<string, string>;
}

export const summarizeText = async (text: string, questions: string[]): Promise<SummaryResult> => {
  // Simulate API call with a timeout
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock summary generation
      const words = text.split(/\s+/).filter(word => word.length > 0);
      const wordCount = words.length;
      
      // Generate mock summary (about 20% of original length)
      const summaryLength = Math.max(Math.floor(wordCount * 0.2), 50);
      const summary = words.slice(0, summaryLength).join(' ') + '...';
      
      // Extract "keywords" (just the most frequent words for demo)
      const wordFreq: Record<string, number> = {};
      words.forEach(word => {
        const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
        if (cleanWord.length > 4) {
          wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1;
        }
      });
      
      const keywords = Object.entries(wordFreq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([word]) => word);
      
      // Estimate reading time (average adult reads ~200-250 words per minute)
      const readingTime = Math.max(1, Math.ceil(wordCount / 200));
      
      // Generate mock answers to questions
      const questionAnswers = questions
        .filter(q => q.trim() !== '')
        .map(question => {
          // Mock answer generation logic - in a real app this would use NLP
          const isYesNoQuestion = /^(is|are|can|do|does|has|have|will|would|should|did|was|were)/i.test(question);
          const containsNumber = /\d+/.test(question);
          
          let answer;
          if (isYesNoQuestion) {
            answer = Math.random() > 0.5 ? 'Yes, based on the document content.' : 'No, according to the information provided.';
          } else if (containsNumber) {
            answer = `The document indicates a figure of approximately ${Math.floor(Math.random() * 1000) + 100}.`;
          } else {
            // Generate a more complex answer
            const randomKeywords = [...keywords].sort(() => 0.5 - Math.random()).slice(0, 2);
            answer = `The document discusses ${randomKeywords.join(' and ')} in relation to this topic. The main point suggests that this is a key consideration in the overall context.`;
          }

          const isCovered = false;
          return { question, answer, isCovered };
        });
      
      resolve({
        title: "Document Summary",
        summary,
        keywords,
        readingTime,
        // questionAnswers
      });
    }, 1500);
  });
};

export const summarizeFile = async (file: File, questions: string[], coverageAnswer: CoverageAnswer[]): Promise<SummaryResult> => {
  try {
    // For demonstration, we're only handling text files directly
    // In a real app, you'd use specialized libraries for different file types
    if (file.type === 'text/plain') {
      const text = await file.text();
      return summarizeText(text, questions);
    }
    
    // Mock response for other file types
    const mockAnswers = questions
      .filter(q => q.trim() !== '')
      .map((question, index) => {
        const isFinancialQuestion = /(profit|revenue|income|money|million|thousand|dollar|finance)/i.test(question);
        
        let answer;
        if (isFinancialQuestion) {
          answer = `Yes, the financial data indicates the company ${Math.random() > 0.5 ? 'exceeded' : 'did not reach'} the expected targets.`;
        } else {
          answer = `Based on the document analysis, the answer is ${Math.random() > 0.6 ? 'affirmative' : 'negative'} with approximately ${Math.floor(Math.random() * 80) + 20}% confidence.`;
        }
        
        answer = coverageAnswer[index].Yes ? coverageAnswer[index].Yes : coverageAnswer[index].No;
        const isCovered = coverageAnswer[index].Yes ? true : false;
        return { question, answer, isCovered};
      });
    
    return {
      title: file.name,
      summary: "This is a sample summary of the document. It contains the main points and key information extracted from the text. The summary highlights the most important concepts and conclusions, allowing you to quickly understand the document's content without reading it in full.",
      keywords: ["document", "summary", "analysis", "information", "content"],
      readingTime: 3,
      // questionAnswers: mockAnswers
    };
  } catch (error) {
    console.error('Error summarizing file:', error);
    throw new Error('Failed to summarize document');
  }
};
