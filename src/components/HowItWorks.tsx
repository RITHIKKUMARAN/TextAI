import { motion } from 'framer-motion';
import { Upload, Brain, Download } from 'lucide-react';
import { GradientText } from './GradientText';
import { fadeInUp } from '../utils/animations';
import { useRef } from 'react';
import { useInView } from '../hooks/useInView';

const steps = [
  {
    icon: Upload,
    title: 'Input Your Text',
    description: 'Paste or type your content into the text area. Support for documents up to 10,000 words.',
    color: 'from-purple-500 to-pink-500',
    delay: 0.1,
  },
  {
    icon: Brain,
    title: 'AI Processing',
    description: 'Our neural networks analyze and process your text using advanced NLP algorithms.',
    color: 'from-cyan-500 to-blue-500',
    delay: 0.2,
  },
  {
    icon: Download,
    title: 'Get Results',
    description: 'Receive your summarized or paraphrased content instantly. Copy, download, or refine.',
    color: 'from-pink-500 to-rose-500',
    delay: 0.3,
  },
];

export const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <section id="how-it-works" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm font-semibold">
              HOW IT WORKS
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Simple <GradientText>Three-Step</GradientText> Process
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Transform your text in seconds with our streamlined workflow
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 -translate-y-1/2 opacity-30" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: step.delay, duration: 0.6 }}
                className="relative"
              >
                <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 group hover:border-purple-500/50 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10">
                    <motion.div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 mx-auto relative`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <step.icon className="w-10 h-10 text-white" />
                      <motion.div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} blur-xl`}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <div className="absolute -top-4 -right-4 w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center border-2 border-white/20 font-bold text-xl">
                        {index + 1}
                      </div>
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-4 text-center">
                      {step.title}
                    </h3>

                    <p className="text-gray-400 text-center leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-1/2 -right-6 w-12 h-12 -translate-y-1/2 z-20"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-8 border-l-cyan-500 border-t-4 border-t-transparent border-b-4 border-b-transparent" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('app')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Try It Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
