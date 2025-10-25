export interface ModelConfig {
  name: string;
  max_length: number;
  default_max_summary: number;
  default_min_summary: number;
}

export interface SummarizationConfig {
  bart: ModelConfig;
  pegasus: ModelConfig;
}

export const summarizationConfig: SummarizationConfig = {
  bart: {
    name: 'facebook/bart-large-cnn',
    max_length: 1024,
    default_max_summary: 150,
    default_min_summary: 30
  },
  pegasus: {
    name: 'google/pegasus-xsum',
    max_length: 1024,
    default_max_summary: 120,
    default_min_summary: 20
  }
};