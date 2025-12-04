export type QuestionType = 'MCQ' | 'Assertion-Reason' | 'VSA' | 'SA' | 'LA'

export type Section = 'A' | 'B' | 'C' | 'D' | 'E'

export interface Question {
  id?: string
  exam_id?: string
  section: Section
  question_number: number
  question_text: string
  question_type: QuestionType
  marks: number
  image_url?: string
}

export interface Exam {
  id?: string
  user_id?: string
  title: string
  subject: string
  class_level: string
  board: string
  total_marks: number
  duration_minutes: number
  created_at?: string
  updated_at?: string
}

export const CBSE_CLASS_10_PATTERN = {
  A: { type: 'MCQ & Assertion-Reason' as const, questions: 20, marksEach: 1 },
  B: { type: 'VSA' as const, questions: 5, marksEach: 2 },
  C: { type: 'SA' as const, questions: 6, marksEach: 3 },
  D: { type: 'SA' as const, questions: 3, marksEach: 4 },
  E: { type: 'LA' as const, questions: 4, marksEach: 5 },
}
