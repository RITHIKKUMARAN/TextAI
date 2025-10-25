import { motion } from 'framer-motion';
import { Brain, Layers, Zap, Shield, Globe, Sparkles } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { GradientText } from './GradientText';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { useRef } from 'react';
import { useInView } from '../hooks/useInView';

const features = [
  {
    icon: Brain,
    title: 'Abstractive Summarization',
    description: 'Advanced neural networks generate human-like summaries that capture the essence of your content with natural language understanding.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Layers,
    title: 'Extractive Summarization',
    description: 'Intelligently identify and extract the most important sentences from your text with precision-driven algorithms.',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Zap,
    title: 'AI Paraphrasing',
    description: 'Transform your content while preserving meaning. Generate multiple variations instantly with context-aware rewriting.',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your data is processed securely and never stored. Enterprise-grade encryption ensures complete confidentiality.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Globe,
    title: 'Multi-Language Support',
    description: 'Process content in 50+ languages with state-of-the-art multilingual models and cross-lingual understanding.',
    gradient: 'from-orange-500 to-yellow-500',
  },
  {
    icon: Sparkles,
    title: 'Real-Time Processing',
    description: 'Lightning-fast API responses with sub-second processing times. Scale effortlessly from prototype to production.',
    gradient: 'from-indigo-500 to-purple-500',
  },
];

export const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <section id="features" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp} className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-semibold">
              FEATURES
            </span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            Powerful AI <GradientText>Capabilities</GradientText>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            State-of-the-art natural language processing at your fingertips
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              custom={index}
            >
              <GlassCard hover3D className="p-8 h-full group cursor-pointer">
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 relative`}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                  <motion.div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} blur-xl opacity-0 group-hover:opacity-50 transition-opacity`}
                  />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                <motion.div
                  className="mt-6 flex items-center gap-2 text-sm font-semibold text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ x: 5 }}
                >
                  Learn more
                  <span>→</span>
                </motion.div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('app')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Using Now
          </motion.button>
        </motion.div>
      </div>

      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};
