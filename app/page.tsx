import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileText, CheckCircle, BookOpen } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            CBSE Math Exam Formatter
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create professional CBSE Class 10 Mathematics board exams in minutes
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                Get Started Free
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">CBSE Pattern Compliant</h3>
            <p className="text-gray-600">
              Follows official CBSE Class 10 exam pattern with 5 sections and 38 questions totaling 80 marks
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FileText className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
            <p className="text-gray-600">
              Intuitive interface to create and manage exam papers efficiently with real-time preview
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <BookOpen className="h-12 w-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
            <p className="text-gray-600">
              Your exams are securely stored with Supabase and accessible anytime, anywhere
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
