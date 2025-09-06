import axios from 'axios'
import { supabase } from '../lib/supabase/client'
// Interface for the request payload

interface UploadResponse {
  file_id: string,
  message: string,
  version: string,
}

interface AskResponse {
  answer: Record<string, string>,
  questions: string[],
  version: string,
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

    return response;
    
  } catch (error) {
    console.error('Error sending document to backend:', error);
    throw error;
  }
};


export async function uploadDocument(document: File, used: string | null = null): Promise<UploadResponse> {
  const session = await supabase.auth.getSession()
  const token = session.data.session?.access_token

  const formData = new FormData()
  formData.append('document', document);
  formData.append('used', used);

  // const res = await axios.post('http://localhost:8000/upload', formData, {
  const res = await axios.post<UploadResponse>('/api/upload/v3/?q=upload', formData, {
    headers: {
      // Authorization: `Bearer ${token}`,
      Authorization:  token === undefined ? undefined : `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })

  return res.data
}

export async function uploadDocumentFromUrl(url: string, used: string | null = null): Promise<UploadResponse> {
  const session = await supabase.auth.getSession()
  const token = session.data.session?.access_token

  const formData = new FormData()
  formData.append('document_url', url);
  formData.append('used', used);

  const res = await axios.post<UploadResponse>('/api/upload/v3/url/?q=upload', formData, {
    headers: {
      Authorization: token === undefined ? undefined : `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  return res.data
}


type QA = { question: string; answer: string };

export function mapQuestionsAndAnswers(payload: {
  questions: string[];
  answer: string;
  version: string;
}): QA[] {
  // Split answers on numbering like "1.", "2.", "3."
  const answers = payload.answer
    .split(/\n?\d+\.\s+/) // split by "1. ", "2. ", etc.
    .filter(Boolean);     // remove empty entries

  return payload.questions.map((q, i) => ({
    question: q,
    answer: answers[i] ?? "", // fallback if fewer answers
  }));
}

export async function askQuestion(fileId: string, questions: string[], used: string | null): Promise<AskResponse> {
  const session = await supabase.auth.getSession()
  const token = session.data.session?.access_token

  // const res = await axios.get('http://localhost:8000/ask', {
  const res = await axios.post<AskResponse>(
    '/api/ask/v3a/?q=ask', 
    questions, 
    {
      params: { file_id: fileId, used: used},
      headers: {
        // Authorization: `Bearer ${token}`,
        Authorization:  token === undefined ? undefined : `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )

  return res.data
}

