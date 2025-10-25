import { motion } from 'framer-motion';
import { useState } from 'react';
import { Copy, Download, CheckCircle, Sparkles, FileText, RefreshCw } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { GradientText } from './GradientText';
import { AnimatedButton } from './AnimatedButton';
import { useToast } from './Toast';
import { fadeInUp } from '../utils/animations';

type Method = 'extractive' | 'abstractive' | 'paraphrase';
type Length = 'short' | 'medium' | 'long';

export const AppSection = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [method, setMethod] = useState<Method>('abstractive');
  const [length, setLength] = useState<Length>('medium');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleProcess = async () => {
    if (!inputText.trim()) {
      showToast('Please enter some text to process', 'error');
      return;
    }

    setLoading(true);
    setOutputText('');

    try {
      if (method === 'paraphrase') {
        const { paraphraseText } = await import('../services/api');
        const results = await paraphraseText({ text: inputText });
        setOutputText(results.join('\n\n'));
      } else {
        const { summarizeText } = await import('../services/api');
        const summary = await summarizeText({ text: inputText, length, model: method === 'extractive' ? 'bart' : 'bart' });
        setOutputText(summary);
      }
      showToast('Processing completed successfully!', 'success');
    } catch (error: any) {
      setOutputText(error.message || 'An error occurred while processing your text.');
      showToast('Failed to process text', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    showToast('Copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${method}-output.txt`;
    a.click();
    showToast('Downloaded successfully!', 'success');
  };

  const charCount = inputText.length;
  const wordCount = inputText.trim().split(/\s+/).filter(Boolean).length;

  return (
    <section id="app" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Try It <GradientText>Yourself</GradientText>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience the power of AI-driven text transformation in real-time
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="p-6 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-purple-400" />
                  <h3 className="text-xl font-bold text-white">Input Text</h3>
                </div>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste your text here... Try entering a long article, document, or any text you'd like to summarize or paraphrase."
                  className="w-full h-64 bg-black/30 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  style={{ minHeight: '300px' }}
                />
                <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
                  <div className="flex gap-4">
                    <span>{charCount} characters</span>
                    <span>{wordCount} words</span>
                  </div>
                  <motion.button
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setInputText('')}
                  >
                    Clear
                  </motion.button>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-xl font-bold text-white">Output</h3>
                  </div>
                  {outputText && (
                    <div className="flex gap-2">
                      <motion.button
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCopy}
                        title="Copy to clipboard"
                      >
                        {copied ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-gray-400" />}
                      </motion.button>
                      <motion.button
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDownload}
                        title="Download"
                      >
                        <Download className="w-5 h-5 text-gray-400" />
                      </motion.button>
                    </div>
                  )}
                </div>
                <div className="w-full h-64 bg-black/30 border border-white/10 rounded-xl p-4 overflow-y-auto" style={{ minHeight: '300px' }}>
                  {loading ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <RefreshCw className="w-8 h-8 text-purple-400" />
                      </motion.div>
                      <p className="text-gray-400">Processing your text...</p>
                      <div className="flex gap-2">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-purple-400 rounded-full"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </div>
                    </div>
                  ) : outputText ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-white leading-relaxed whitespace-pre-wrap"
                    >
                      {outputText}
                    </motion.p>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 text-center">
                      Your processed text will appear here
                    </div>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard className="p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Method
                  </label>
                  <div className="flex gap-2">
                    {(['extractive', 'abstractive', 'paraphrase'] as Method[]).map((m) => (
                      <motion.button
                        key={m}
                        className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                          method === m
                            ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setMethod(m)}
                      >
                        {m.charAt(0).toUpperCase() + m.slice(1)}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {method !== 'paraphrase' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      Summary Length
                    </label>
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="2"
                        value={length === 'short' ? 0 : length === 'medium' ? 1 : 2}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setLength(val === 0 ? 'short' : val === 1 ? 'medium' : 'long');
                        }}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>Short</span>
                        <span>Medium</span>
                        <span>Long</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-end">
                  <AnimatedButton
                    onClick={handleProcess}
                    loading={loading}
                    disabled={!inputText.trim()}
                    className="w-full"
                  >
                    <Sparkles className="w-5 h-5" />
                    Process Text
                  </AnimatedButton>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
