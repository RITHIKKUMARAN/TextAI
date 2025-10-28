import { motion } from 'framer-motion';
import { ChevronDown, Zap, TrendingUp, Users } from 'lucide-react';
import { GradientText } from './GradientText';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { useState, useEffect } from 'react';

export const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Transform Text with AI-Powered Intelligence';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: Zap, label: 'Processing Speed', value: '10M+', suffix: 'words/sec' },
    { icon: TrendingUp, label: 'Accuracy Rate', value: '98.9', suffix: '%' },
    { icon: Users, label: 'Active Users', value: '50K+', suffix: '' },
  ];

  const scrollToApp = () => {
    document.getElementById('app')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.div variants={fadeInUp} className="mb-6">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 backdrop-blur-sm"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(168, 85, 247, 0.3)',
                  '0 0 40px rgba(168, 85, 247, 0.5)',
                  '0 0 20px rgba(168, 85, 247, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-300">
                Developed By Rithik Kumaran K
              </span>
            </motion.div>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <GradientText>{typedText}</GradientText>
            <motion.span
              className="inline-block w-1 h-16 md:h-20 bg-cyan-400 ml-2 align-middle"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl sm:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Experience cutting-edge AI summarization and paraphrasing with real-time processing.
            Extract key insights or rephrase content with unprecedented accuracy.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
          >
            <motion.button
              className="group px-10 py-5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-bold text-lg shadow-lg relative overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToApp}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-pink-600 to-purple-600"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Try Summarization
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>

            <motion.button
              className="px-10 py-5 rounded-xl bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white font-bold text-lg hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05, borderColor: 'rgba(124, 58, 237, 0.5)' }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToApp}
            >
              Paraphrase Text
            </motion.button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5, borderColor: 'rgba(124, 58, 237, 0.5)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <stat.icon className="w-8 h-8 text-purple-400 mb-3 mx-auto" />
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <button
            onClick={scrollToApp}
            className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Scroll down"
          >
            <span className="text-sm">Scroll to explore</span>
            <ChevronDown className="w-6 h-6" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};
