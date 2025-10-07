export type QuestionType = 'single_selection' | 'multiple_selection';

export interface Option {
  text: string;
  isCorrect: boolean;
  order: number;
}

export interface Question {
  questionText: string;
  questionType: QuestionType;
  explanation: string;
  file: File | null;        
  options: Option[];
  order: number;
}

export interface QuizConfiguration {
  timeLimit: string;       
  shuffleQuestions: boolean;
}

export interface Quiz {
  name: string;
  description: string;
  configuration: QuizConfiguration;
  country: string
}

export interface QuizPayload {
  quiz: Quiz;
  questions: Question[];
}
