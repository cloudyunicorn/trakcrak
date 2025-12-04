import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getUser } from '@/app/actions/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function ExamView({ params }: { params: { id: string } }) {
  const user = await getUser()
  
  if (!user) {
    redirect('/login')
  }

  const supabase = await createClient()
  
  const { data: exam } = await supabase
    .from('exams')
    .select('*')
    .eq('id', params.id)
    .single()

  const { data: questions } = await supabase
    .from('questions')
    .select('*')
    .eq('exam_id', params.id)
    .order('section')
    .order('question_number')

  if (!exam) {
    redirect('/dashboard')
  }

  const sections = ['A', 'B', 'C', 'D', 'E']

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-3xl">{exam.title}</CardTitle>
            <div className="text-sm text-gray-600 mt-2">
              {exam.board} Board - Class {exam.class_level} - {exam.subject}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Total Marks</p>
                <p className="text-2xl font-bold text-indigo-600">{exam.total_marks}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="text-2xl font-bold text-indigo-600">{exam.duration_minutes} min</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Questions</p>
                <p className="text-2xl font-bold text-indigo-600">{questions?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {sections.map((section) => {
          const sectionQuestions = questions?.filter(q => q.section === section) || []
          
          if (sectionQuestions.length === 0) return null

          return (
            <Card key={section} className="mb-6">
              <CardHeader>
                <CardTitle>Section {section}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sectionQuestions.map((q) => (
                    <div key={q.id} className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-semibold mb-2">
                        Question {q.question_number} ({q.marks} marks)
                      </p>
                      <p className="text-gray-700">{q.question_text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
