import axios from 'axios'
// Interface for the request payload
interface DocumentProcessRequest {
  document: File;
  questions: string[];
}

// Mock API endpoint URL
const API_URL = 'https://api.example.com/process-document';

export type CoverageAnswer = {
  Yes?: string;
  No?: string;
};

export const processDocument = async (document: File, questions: string[]) => {
  const formData = new FormData();
  formData.append('document', document);
  formData.append('questions', JSON.stringify(questions));

  try {
    // For now, we'll just simulate the API call with a delay
    // const response = await fetch("http://localhost:8000/api/data")
    const response = await axios.post<CoverageAnswer[]>("/api/data", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });


    console.log('Sending document and questions to backend:', {
      documentName: document.name,
      documentSize: document.size,
      questions: questions
    });

    return response;
    // Simulate API call delay
    // await new Promise(resolve => setTimeout(resolve, 2000));

    // For demonstration, we'll continue using the local summarizeText function
    // In a real implementation, this would be replaced with the actual API response
    // throw new Error('Backend API not implemented yet');
    
  } catch (error) {
    console.error('Error sending document to backend:', error);
    throw error;
  }
};
