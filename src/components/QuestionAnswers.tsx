
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, HelpCircle } from 'lucide-react';

interface QuestionAnswersProps {
  qaItems: Record<string, string>
}

const QuestionAnswers = ({ qaItems }: QuestionAnswersProps) => {
  if (!Object.keys(qaItems).length) return null;

  return (
    <Card className="shadow-lg border-primary/10 mt-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          Questions & Answers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(qaItems).map(([question, answer], index) => (
            <div key={index}>
              {/* {index > 0 && <Separator className="my-4" />} */}
              <div className="space-y-2">
                <div className="font-medium">Q: {question}</div>
                <div className="flex items-start gap-2 text-sm pl-4">
                  {/* {item.isCovered ?  */}
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {/* :  */}
                  {/* <CheckCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" /> */}
                  {/* } */}
                  <div>{answer}</div>
                </div>
              </div>
            </div>
          ))}





        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionAnswers;
