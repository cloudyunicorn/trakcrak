'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CBSE_CLASS_10_PATTERN, type Question, type Section, type QuestionType } from '@/types/exam'
import { ArrowLeft, Trash2 } from 'lucide-react'

export default function CreateExam() {
  const router = useRouter()
  const supabase = createClient()
  const [examTitle, setExamTitle] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentSection, setCurrentSection] = useState<Section>('A')
  const [currentQuestion, setCurrentQuestion] = useState({ question_text: '' })
  const [loading, setLoading] = useState(false)

  const handleCreateExam = async () => {
    if (!examTitle.trim()) {
      alert('Please enter exam title')
      return
    }

    if (questions.length === 0) {
      alert('Please add at least one question')
      return
    }

    setLoading(true)

    try {
      const { data: userData } = await supabase.auth.getUser()
      
      if (!userData.user) {
        alert('Please login first')
        return
      }

      const { data: exam, error: examError } = await supabase
        .from('exams')
        .insert([{
          user_id: userData.user.id,
          title: examTitle,
          subject: 'Mathematics',
          class_level: '10',
          board: 'CBSE',
          total_marks: 80,
          duration_minutes: 180,
        }])
        .select()
        .single()

      if (examError) throw examError

      const questionsToInsert = questions.map(q => ({
        ...q,
        exam_id: exam.id,
      }))

      const { error: questionsError } = await supabase
        .from('questions')
        .insert(questionsToInsert)

      if (questionsError) throw questionsError

      router.push(`/dashboard/exam/${exam.id}`)
    } catch (error) {
      console.error('Failed to create exam:', error)
      alert('Failed to create exam. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const addQuestion = () => {
    if (!currentQuestion.question_text.trim()) {
      alert('Please enter question text')
      return
    }

    const sectionQuestions = questions.filter(q => q.section === currentSection)
    const questionNumber = sectionQuestions.length + 1

    const newQuestion: Question = {
      section: currentSection,
      question_number: questionNumber,
      question_text: currentQuestion.question_text,
      question_type: getQuestionType(currentSection),
      marks: getDefaultMarks(currentSection),
    }

    setQuestions([...questions, newQuestion])
    setCurrentQuestion({ question_text: '' })
  }

  const removeQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index)
    setQuestions(newQuestions)
  }

  // Fixed function with proper typing
  const getQuestionType = (section: Section): QuestionType => {
    const types: Record<Section, QuestionType> = { 
      A: 'MCQ', 
      B: 'VSA', 
      C: 'SA', 
      D: 'SA', 
      E: 'LA' 
    }
    return types[section]
  }

  const getDefaultMarks = (section: Section): number => {
    return CBSE_CLASS_10_PATTERN[section].marksEach
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Create CBSE Class 10 Mathematics Exam</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="title">Exam Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Mid-Term Exam 2025"
                  value={examTitle}
                  onChange={(e) => setExamTitle(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-semibold">Total Marks</p>
                  <p className="text-2xl font-bold text-indigo-600">80</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Duration</p>
                  <p className="text-2xl font-bold text-indigo-600">180 min</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Questions Added</p>
                  <p className="text-2xl font-bold text-indigo-600">{questions.length}/38</p>
                </div>
              </div>
            </div>

            <Tabs value={currentSection} onValueChange={(v) => setCurrentSection(v as Section)}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="A">Section A</TabsTrigger>
                <TabsTrigger value="B">Section B</TabsTrigger>
                <TabsTrigger value="C">Section C</TabsTrigger>
                <TabsTrigger value="D">Section D</TabsTrigger>
                <TabsTrigger value="E">Section E</TabsTrigger>
              </TabsList>

              {(['A', 'B', 'C', 'D', 'E'] as Section[]).map((section) => (
                <TabsContent key={section} value={section} className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm">
                      <strong>Pattern:</strong> {CBSE_CLASS_10_PATTERN[section].questions} questions × {CBSE_CLASS_10_PATTERN[section].marksEach} marks
                      <br />
                      <strong>Type:</strong> {CBSE_CLASS_10_PATTERN[section].type}
                      <br />
                      <strong>Added:</strong> {questions.filter(q => q.section === section).length}/{CBSE_CLASS_10_PATTERN[section].questions}
                    </p>
                  </div>

                  <div>
                    <Label>Question Text</Label>
                    <Textarea
                      placeholder="Enter your question here..."
                      value={currentQuestion.question_text}
                      onChange={(e) => setCurrentQuestion({ question_text: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <Button onClick={addQuestion}>
                    Add Question to Section {section}
                  </Button>

                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Questions in Section {section}:</h4>
                    <div className="space-y-2">
                      {questions.filter(q => q.section === section).map((q, idx) => {
                        const globalIndex = questions.findIndex(question => question === q)
                        return (
                          <div key={idx} className="p-3 bg-white border rounded flex justify-between items-start">
                            <div className="flex-1">
                              <p className="text-sm">
                                <strong>Q{q.question_number}.</strong> {q.question_text}
                                <span className="ml-2 text-gray-500">({q.marks}m)</span>
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeQuestion(globalIndex)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <div className="mt-6 pt-6 border-t">
              <Button 
                onClick={handleCreateExam} 
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                disabled={questions.length === 0 || loading}
              >
                {loading ? 'Creating...' : `Create Exam (${questions.length} questions)`}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
