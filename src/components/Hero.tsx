
import { Button } from "@/components/ui/button";

interface HeroProps {
  onGetStarted: () => void;
}

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=520&q=80",
    alt: "Turned on gray laptop computer",
  },
  {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=520&q=80",
    alt: "People sitting down near table with laptops",
  },
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=520&q=80",
    alt: "Woman using a laptop computer",
  },
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=520&q=80",
    alt: "MacBook with code on the screen on a desk",
  },
];

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <div className="relative overflow-hidden">
      <div className="hero-pattern absolute inset-0 z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-28">
        {/* Images at the top */}
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          {heroImages.map((img, i) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              className="rounded-xl shadow-md object-cover w-32 h-24 sm:w-44 sm:h-28 md:w-56 md:h-36 transition-transform duration-200 hover:scale-105"
              style={{ zIndex: 2, marginTop: i % 2 === 0 ? 0 : '16px' }}
              loading="lazy"
            />
          ))}
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Insurance Document Assistant
          </h1>
          
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your insurance policies and related documents to get clear summaries and ask specific questions about your coverage and terms. Simplify complex insurance information.
          </p>

          <div className="mt-10">
            <Button 
              onClick={onGetStarted}
              size="lg" 
              className="animate-pulse"
            >
              Get Started
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
                <div className="text-primary mb-4">
                  <feature.icon className="h-8 w-8 mx-auto" />
                </div>
                <h3 className="text-lg font-medium">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    title: 'Upload Insurance Documents',
    description: 'Easily upload PDFs, Word documents, and text files containing your insurance policies and claims.',
    icon: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
    ),
  },
  {
    title: 'Ask Your Insurance Questions',
    description: 'Get precise answers to up to 5 specific questions about your policy, coverage limits, exclusions, and claims.',
    icon: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Expert Analysis',
    description: 'Advanced algorithms analyze your insurance documents to highlight key terms and provide reliable answers.',
    icon: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
];

export default Hero;
