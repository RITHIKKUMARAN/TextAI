import { summarizationConfig } from '../config/models';

const HF_API_KEY = import.meta.env.VITE_HF_API_KEY;
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

// Validate API keys
if (!HF_API_KEY) {
  console.error('Missing Hugging Face API key');
}
if (!GROQ_API_KEY) {
  console.error('Missing Groq API key');
}

import type { 
  SummarizationOptions, 
  ParaphraseOptions,
  HuggingFaceResponse,
  GroqResponse 
} from '../types/api';

export const summarizeText = async ({ text, length = 'medium', model = 'bart' }: SummarizationOptions) => {
  if (!HF_API_KEY) {
    throw new Error('Hugging Face API key is not configured');
  }

  const modelConfig = summarizationConfig[model];
  
  if (!modelConfig) {
    throw new Error(`Model ${model} not found in configuration`);
  }

  const lengthMap = {
    short: { max_length: 60, min_length: 30 },
    medium: { 
      max_length: modelConfig.default_max_summary, 
      min_length: modelConfig.default_min_summary 
    },
    long: { max_length: 200, min_length: 130 }
  };

  // Ensure we have valid input
  if (!text.trim()) {
    throw new Error('Please provide text to summarize');
  }

  const params = lengthMap[length];

  try {
    try {
      console.log('Making request to Hugging Face API:', {
        model: modelConfig.name,
        params,
        textLength: text.length
      });

      const response = await fetch(
        `https://api-inference.huggingface.co/models/${modelConfig.name}`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${HF_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: text,
            parameters: {
              ...params,
              do_sample: true,
              temperature: 0.7,
              top_p: 0.9
            }
          }),
        }
      );

      if (response.status === 503) {
        throw new Error('Model is loading. Please try again in a few moments.');
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('HF API Response:', result);
      
      if (Array.isArray(result) && result.length > 0 && typeof result[0] === 'object') {
        if ('summary_text' in result[0]) {
          return result[0].summary_text;
        } else if ('generated_text' in result[0]) {
          return result[0].generated_text;
        }
      }
      
      console.error('Unexpected API response format:', result);
      throw new Error('Unexpected API response format. Please try again.');
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred during summarization');
    }
  } catch (error) {
    console.error('Summarization error:', error);
    throw error;
  }
};

export const paraphraseText = async ({ text, numSequences = 3 }: ParaphraseOptions) => {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are a helpful AI that paraphrases text clearly and naturally."
          },
          {
            role: "user",
            content: `Paraphrase the following text into ${numSequences} distinct, natural, and fluent English variations. Return only the paraphrased sentences, without numbering, quotes, or any labels:\n\n${text}`
          }
        ],
        temperature: 0.9,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      console.error('Unexpected API response:', data);
      throw new Error('Unexpected API response format');
    }
    
    const text_response = data.choices[0].message.content;
    
    // Split into distinct paraphrases, clean and filter them
    const lines = text_response
      .split("\n")
      .map(line => line.trim())
      .filter(line => line && !line.match(/^[0-9]+[\.)]/)) // Remove numbered lines
      .map(line => line.replace(/^[•*\-]\s*/, '').replace(/"/g, '')) // Clean bullets and quotes
      .filter(line => line && line.split(' ').length > 2); // Ensure meaningful content

    if (lines.length === 0) {
      throw new Error('No valid paraphrases generated');
    }

    // Remove duplicates and limit to requested number
    return [...new Set(lines)].slice(0, numSequences);
  } catch (error) {
    console.error('Paraphrasing error:', error);
    throw error;
  }
};