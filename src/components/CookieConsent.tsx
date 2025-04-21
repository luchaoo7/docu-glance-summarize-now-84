
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookieConsent');
    if (hasConsent === null) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowConsent(false);
  };

  return (
    <Dialog open={showConsent} onOpenChange={setShowConsent}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cookie Preferences</DialogTitle>
          <DialogDescription>
            We use cookies to enhance your experience on our website. These cookies help us:
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 text-sm">
          <ul className="list-disc pl-4 space-y-2">
            <li>Remember your language preferences</li>
            <li>Analyze how you use our website to improve our services</li>
            <li>Save your document processing preferences</li>
            <li>Ensure our website is working properly</li>
          </ul>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleDecline}>Decline</Button>
          <Button onClick={handleAccept}>Accept All</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
