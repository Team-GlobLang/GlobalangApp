
export interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
  order: number
}

export interface QuizQuestion {
  id: string
  quizId: string
  questionText: string
  questionType: string
  explanation?: string
  fileUrl?: string
  options: QuizOption[]
  order: number
  createdAt: string
  updatedAt: string
}
