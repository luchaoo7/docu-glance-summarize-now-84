
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQ = () => {
  return (
    <div className="py-16 bg-accent/20" id="faq">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mt-2">
            Common questions about our document analysis service
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How secure is my document data?</AccordionTrigger>
            <AccordionContent>
              We take security seriously. Your documents are encrypted during transmission and processing.
              We don't store your documents after analysis is complete, and all processing is done on
              secure servers.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>What types of documents can I analyze?</AccordionTrigger>
            <AccordionContent>
              Our system can process various types documents including insurance policies, contracts,
              or manuals. We support PDF, Word, and text file formats.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>How accurate are the answers to my questions?</AccordionTrigger>
            <AccordionContent>
              Our AI is trained on thousands of documents to provide highly accurate information.
              However, for important decisions, we recommend verifying with the original source or a qualified professional.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Can I save my analysis results?</AccordionTrigger>
            <AccordionContent>
              Yes, you can download a PDF report of your document analysis, including all questions
              and answers. However, for privacy reasons, we don't store your documents or results on
              our servers.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
