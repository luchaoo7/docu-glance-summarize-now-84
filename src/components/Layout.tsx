
import { ReactNode } from 'react';
import { FileText } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4">
        <div className="container flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <FileText className="h-6 w-6" />
            <span>DocuGlance</span>
          </a>
          <nav>
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
