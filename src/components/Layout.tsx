
import { ReactNode, useState } from 'react';
import { FileText, Menu, Globe } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [language, setLanguage] = useState('English');

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    // Here you would implement actual language change logic
    console.log(`Language changed to: ${lang}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4">
        <div className="container flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <FileText className="h-6 w-6" />
            <span>DocuGlance</span>
          </a>
          <div className="flex items-center gap-4">
            <nav className="hidden md:block">
              <ul className="flex items-center gap-6">
                <li>
                  <a href="#" className="text-sm hover:text-primary">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-primary">
                    How it Works
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-primary">
                    About
                  </a>
                </li>
              </ul>
            </nav>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-accent text-sm font-medium">
                <Globe className="h-4 w-4" />
                <span>{language}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleLanguageChange('English')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('Español')}>
                  Español
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('Français')}>
                  Français
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Sheet>
              <SheetTrigger className="md:hidden p-2 rounded-md hover:bg-accent">
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="mt-6">
                  <ul className="space-y-4">
                    <li>
                      <a href="#" className="block py-2 hover:text-primary">
                        Features
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block py-2 hover:text-primary">
                        How it Works
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block py-2 hover:text-primary">
                        About
                      </a>
                    </li>
                    <li className="pt-4 border-t">
                      <div className="font-medium mb-2">Language</div>
                      <div className="space-y-2">
                        <button
                          onClick={() => handleLanguageChange('English')}
                          className={`block w-full text-left py-1 px-2 rounded ${
                            language === 'English' ? 'bg-accent text-accent-foreground' : ''
                          }`}
                        >
                          English
                        </button>
                        <button
                          onClick={() => handleLanguageChange('Español')}
                          className={`block w-full text-left py-1 px-2 rounded ${
                            language === 'Español' ? 'bg-accent text-accent-foreground' : ''
                          }`}
                        >
                          Español
                        </button>
                        <button
                          onClick={() => handleLanguageChange('Français')}
                          className={`block w-full text-left py-1 px-2 rounded ${
                            language === 'Français' ? 'bg-accent text-accent-foreground' : ''
                          }`}
                        >
                          Français
                        </button>
                      </div>
                    </li>
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-semibold">DocuGlance</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} DocuGlance. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
