export interface HuggingFaceResponse {
  summary_text?: string;
  error?: string;
}

export interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export interface SummarizationOptions {
  text: string;
  length?: 'short' | 'medium' | 'long';
  model?: 'bart' | 'pegasus';
}

export interface ParaphraseOptions {
  text: string;
  numSequences?: number;
}