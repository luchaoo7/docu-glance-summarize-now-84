
// This is a mock implementation for demonstration.
// In a real app, you would connect to an API or use a library for summarization.

export interface SummaryResult {
  title: string;
  summary: string;
  keywords: string[];
  readingTime: number;
}

export const summarizeText = async (text: string): Promise<SummaryResult> => {
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
      
      resolve({
        title: "Document Summary",
        summary,
        keywords,
        readingTime
      });
    }, 1500);
  });
};

export const summarizeFile = async (file: File): Promise<SummaryResult> => {
  try {
    // For demonstration, we're only handling text files directly
    // In a real app, you'd use specialized libraries for different file types
    if (file.type === 'text/plain') {
      const text = await file.text();
      return summarizeText(text);
    }
    
    // Mock response for other file types
    return {
      title: file.name,
      summary: "This is a sample summary of the document. It contains the main points and key information extracted from the text. The summary highlights the most important concepts and conclusions, allowing you to quickly understand the document's content without reading it in full.",
      keywords: ["document", "summary", "analysis", "information", "content"],
      readingTime: 3
    };
  } catch (error) {
    console.error('Error summarizing file:', error);
    throw new Error('Failed to summarize document');
  }
};
