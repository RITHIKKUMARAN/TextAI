import { useState } from 'react';
import { summarizeText, paraphraseText } from '../services/api';
import { GlassCard } from './GlassCard';
import { GradientText } from './GradientText';
import { AnimatedButton } from './AnimatedButton';
import { Loader2 } from 'lucide-react';

interface ProcessedResult {
  summary?: string;
  paraphrases?: string[];
  error?: string;
}

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
    {message}
  </div>
);

const LoadingMessage = () => (
  <div className="flex items-center justify-center gap-2 text-blue-400">
    <Loader2 className="animate-spin" />
    <span>Processing your request...</span>
  </div>
);

export default function TextProcessor() {
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ProcessedResult>({});
  const [mode, setMode] = useState<'summarize' | 'paraphrase'>('summarize');
  const [summaryLength, setSummaryLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [selectedModel, setSelectedModel] = useState<'bart' | 'pegasus'>('bart');

  const handleProcess = async () => {
    if (!inputText.trim()) {
      setResult({ error: 'Please enter some text to process.' });
      return;
    }

    setIsProcessing(true);
    setResult({});

    try {
      if (mode === 'summarize') {
        const summary = await summarizeText({ 
          text: inputText, 
          length: summaryLength,
          model: selectedModel 
        });
        setResult({ summary });
      } else {
        const paraphrases = await paraphraseText({ text: inputText });
        setResult({ paraphrases });
      }
    } catch (error) {
      if (error instanceof Error) {
        setResult({ error: error.message });
      } else {
        setResult({ error: String(error) });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <GlassCard className="p-6">
        <div className="space-y-6">
          <div className="text-center">
            <GradientText className="text-3xl font-bold mb-2">
              {mode === 'summarize' ? 'Text Summarization' : 'Text Paraphrasing'}
            </GradientText>
            <p className="text-gray-400">
              {mode === 'summarize' 
                ? 'Get a concise summary of your text using AI'
                : 'Generate different versions of your text while keeping the meaning'}
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <AnimatedButton
              onClick={() => setMode('summarize')}
              className={`px-4 py-2 ${mode === 'summarize' ? 'bg-blue-600' : 'bg-gray-700'}`}
            >
              Summarize
            </AnimatedButton>
            <AnimatedButton
              onClick={() => setMode('paraphrase')}
              className={`px-4 py-2 ${mode === 'paraphrase' ? 'bg-blue-600' : 'bg-gray-700'}`}
            >
              Paraphrase
            </AnimatedButton>
          </div>

          {mode === 'summarize' && (
            <div className="space-y-4">
              <div className="flex gap-4 justify-center">
                {(['short', 'medium', 'long'] as const).map((length) => (
                  <AnimatedButton
                    key={length}
                    onClick={() => setSummaryLength(length)}
                    className={`px-4 py-1 ${summaryLength === length ? 'bg-blue-600' : 'bg-gray-700'}`}
                  >
                    {length.charAt(0).toUpperCase() + length.slice(1)}
                  </AnimatedButton>
                ))}
              </div>
              <div className="flex gap-4 justify-center">
                {(['bart', 'pegasus'] as const).map((model) => (
                  <AnimatedButton
                    key={model}
                    onClick={() => setSelectedModel(model)}
                    className={`px-4 py-1 ${selectedModel === model ? 'bg-blue-600' : 'bg-gray-700'}`}
                  >
                    {model.toUpperCase()}
                  </AnimatedButton>
                ))}
              </div>
            </div>
          )}

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your text here..."
            className="w-full h-40 p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
          />

          <div className="flex justify-center">
            <AnimatedButton
              onClick={handleProcess}
              disabled={isProcessing || !inputText.trim()}
              className="px-8 py-3 bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" />
                  Processing...
                </div>
              ) : (
                mode === 'summarize' ? 'Summarize Text' : 'Paraphrase Text'
              )}
            </AnimatedButton>
          </div>

          {result.error && <ErrorMessage message={result.error} />}

          {isProcessing && (
            <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
              <LoadingMessage />
            </div>
          )}

          {!isProcessing && (result.summary || result.paraphrases) && (
            <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold text-gray-200">
                  {mode === 'summarize' ? 'Summary' : 'Paraphrased Versions'}
                </h3>
                {mode === 'summarize' && (
                  <span className="text-sm text-gray-400">
                    Using {selectedModel.toUpperCase()} model
                  </span>
                )}
              </div>
              {result.summary && (
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed">{result.summary}</p>
                </div>
              )}
              {result.paraphrases && (
                <ul className="space-y-3">
                  {result.paraphrases.map((text, index) => (
                    <li key={index} className="text-gray-300 leading-relaxed">
                      • {text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
}