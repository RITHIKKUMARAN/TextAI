import { AnimatedBackground } from './components/AnimatedBackground';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { AppSection } from './components/AppSection';
import { Examples } from './components/Examples';
import { Footer } from './components/Footer';
import { ToastProvider } from './components/Toast';
import TextProcessor from './components/TextProcessor';

function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
        <AnimatedBackground />
        <Navigation />
        <main>
          <Hero />
          <Features />
          <HowItWorks />
          <AppSection />
          <TextProcessor />
          <Examples />
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
}

export default App;
