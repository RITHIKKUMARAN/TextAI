import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { GradientText } from './GradientText';
import { GlassCard } from './GlassCard';

const examples = [
  {
    title: 'Academic Paper Summary',
    original: 'Climate change is one of the most pressing challenges of our time, affecting ecosystems, economies, and communities worldwide. Rising global temperatures have led to more frequent and severe weather events.',
    result: 'Climate change, driven by human activities, causes rising temperatures, extreme weather, and environmental damage globally.',
    category: 'Extractive',
  },
  {
    title: 'Business Report Paraphrase',
    original: 'Our quarterly revenue exceeded expectations by 15%, driven primarily by strong performance in the digital services sector.',
    result: 'This quarter, we surpassed our revenue targets with a 15% increase, mainly due to excellent results in our digital services division.',
    category: 'Paraphrase',
  },
  {
    title: 'Technical Documentation',
    original: 'The application utilizes a microservices architecture with containerized deployment using Docker and Kubernetes. Each service communicates via RESTful APIs.',
    result: 'This app uses microservices in Docker/Kubernetes containers, with REST APIs for communication.',
    category: 'Abstractive',
  },
];

export const Examples = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % examples.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + examples.length) % examples.length);

  const currentExample = examples[currentIndex];

  return (
    <section id="examples" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-sm font-semibold">
              EXAMPLES
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            See It <GradientText>In Action</GradientText>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Real examples of how our AI transforms different types of content
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard className="p-8 md:p-12">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {currentExample.title}
                  </h3>
                  <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-sm font-semibold">
                    {currentExample.category}
                  </span>
                </div>

                <div className="space-y-8">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Quote className="w-5 h-5 text-gray-400" />
                      <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                        Original Text
                      </span>
                    </div>
                    <div className="bg-black/30 border border-white/10 rounded-xl p-6">
                      <p className="text-gray-300 leading-relaxed">
                        {currentExample.original}
                      </p>
                    </div>
                  </div>

                  <motion.div
                    className="flex items-center justify-center"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-px h-12 bg-gradient-to-b from-transparent via-purple-500 to-transparent" />
                  </motion.div>

                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded" />
                      <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 uppercase tracking-wide">
                        AI Result
                      </span>
                    </div>
                    <motion.div
                      className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-500/10 border border-purple-500/30 rounded-xl p-6"
                      whileHover={{ borderColor: 'rgba(168, 85, 247, 0.6)' }}
                    >
                      <p className="text-white leading-relaxed font-medium">
                        {currentExample.result}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-6 mt-8">
            <motion.button
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 transition-all"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={prev}
              aria-label="Previous example"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>

            <div className="flex gap-2">
              {examples.map((_, index) => (
                <motion.button
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-gradient-to-r from-purple-500 to-cyan-500'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to example ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 transition-all"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={next}
              aria-label="Next example"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};
