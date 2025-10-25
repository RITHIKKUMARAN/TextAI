import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { GradientText } from './GradientText';
import { useScrollProgress } from '../hooks/useScrollProgress';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Features', 'How it Works', 'Examples', 'API'];

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section.toLowerCase().replace(/\s/g, '-'));
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 z-50 origin-left"
        style={{ scaleX: scrollProgress / 100 }}
      />
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'backdrop-blur-xl bg-slate-950/80 shadow-lg' : 'backdrop-blur-sm bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-8 h-8 text-purple-400" />
              </motion.div>
              <span className="text-2xl font-bold">
                <GradientText>TextAI</GradientText>
              </span>
            </motion.div>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item}
                  className="relative text-gray-300 hover:text-white transition-colors group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item)}
                >
                  {item}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
              <motion.button
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('app')}
              >
                Get Started
              </motion.button>
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <motion.div
        className="fixed inset-0 bg-slate-950/95 backdrop-blur-xl z-30 md:hidden"
        initial={{ opacity: 0, x: '100%' }}
        animate={{
          opacity: mobileMenuOpen ? 1 : 0,
          x: mobileMenuOpen ? 0 : '100%',
        }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: mobileMenuOpen ? 'auto' : 'none' }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, index) => (
            <motion.button
              key={item}
              className="text-2xl text-gray-300 hover:text-white transition-colors"
              initial={{ opacity: 0, x: 50 }}
              animate={{
                opacity: mobileMenuOpen ? 1 : 0,
                x: mobileMenuOpen ? 0 : 50,
              }}
              transition={{ delay: index * 0.1 }}
              onClick={() => scrollToSection(item)}
            >
              {item}
            </motion.button>
          ))}
          <motion.button
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold text-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: mobileMenuOpen ? 1 : 0,
              scale: mobileMenuOpen ? 1 : 0.8,
            }}
            transition={{ delay: 0.4 }}
            onClick={() => scrollToSection('app')}
          >
            Get Started
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};
