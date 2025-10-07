import { PaginationDto } from "src/feautures/shared/Interfaces/interfaces";

export type QuestionType = "single_selection" | "multiple_selection";

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
  country: string;
}

export interface QuizPayload {
  quiz: Quiz;
  questions: Question[];
}

export interface QuizData extends Quiz {
    id: string;
  numberOfQuestions: number;
  creator: string;
}

export interface QuizzesFilters extends PaginationDto {
  country?: string;
  isApproved: boolean | null;
}
