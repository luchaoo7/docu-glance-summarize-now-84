
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';

interface DocumentQuestionsProps {
  onQuestionsChange: (questions: string[]) => void;
}

const DocumentQuestions = ({ onQuestionsChange }: DocumentQuestionsProps) => {
  const [questions, setQuestions] = useState<string[]>(['']);

  const addQuestion = () => {
    if (questions.length < 5) {
      const newQuestions = [...questions, ''];
      setQuestions(newQuestions);
      onQuestionsChange(newQuestions);
    }
  };

  const removeQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
    onQuestionsChange(newQuestions);
  };

  const updateQuestion = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
    onQuestionsChange(newQuestions);
  };

  return (
    <div className="space-y-4 mt-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Ask Specific Questions</h3>
        <span className="text-sm text-muted-foreground">{questions.length}/5 questions</span>
      </div>
      
      {questions.map((question, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            value={question}
            onChange={(e) => updateQuestion(index, e.target.value)}
            placeholder={`Question ${index + 1}`}
            className="flex-1"
          />
          {questions.length > 1 && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeQuestion(index)}
              aria-label="Remove question"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      
      {questions.length < 5 && (
        <Button
          type="button"
          variant="outline"
          onClick={addQuestion}
          className="w-full"
          disabled={questions.length >= 5}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Question
        </Button>
      )}
    </div>
  );
};

export default DocumentQuestions;
