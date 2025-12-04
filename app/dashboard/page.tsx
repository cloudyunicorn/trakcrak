import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getUser, signout } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Plus, 
  FileText, 
  LogOut, 
  Brain,
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Calendar,
  BarChart,
  ChevronRight,
  Sparkles,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  User
} from 'lucide-react'
import type { Exam } from '@/types/exam'

export default async function Dashboard() {
  const user = await getUser()
  
  if (!user) {
    redirect('/login')
  }

  const fullName = user?.user_metadata?.full_name || 'Student'
  const firstName = fullName.split(' ')[0]

  const supabase = await createClient()
  
  // Fetch user's exams
  const { data: exams } = await supabase
    .from('exams')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  // Calculate user stats (dummy data for now)
  const userStats = {
    totalExams: exams?.length || 0,
    totalMarks: exams?.reduce((sum, exam) => sum + (exam.total_marks || 0), 0) || 0,
    avgScore: 85, // Dummy average score
    timeSpent: '45h 30m' // Dummy time spent
  }

  // Recent activity (dummy data for now)
  const recentActivity = [
    { id: 1, action: 'Completed', item: 'Practice Test #3', score: '92/100', time: '2 hours ago' },
    { id: 2, action: 'Started', item: 'Chapter 5: Triangles', time: 'Yesterday' },
    { id: 3, action: 'Reviewed', item: 'Step-by-step solutions', time: '2 days ago' },
  ]

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="relative border-b border-border/50 bg-linear-to-r from-card to-card/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                  <Brain className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                    Trak Crak
                  </span>
                  <span className="text-xs text-muted-foreground -mt-1">Student Dashboard</span>
                </div>
              </Link>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-lg bg-secondary/50 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">{fullName}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
              </div>
              <form action={signout}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-border/60 hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                Welcome back, <span className="text-primary">{firstName}!</span> 👋
              </h1>
              <p className="text-muted-foreground mt-2">
                Continue your CBSE Mathematics learning journey
              </p>
            </div>
            <Link href="/dashboard/create">
              <Button className="bg-linear-to-r from-primary to-accent hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md shadow-primary/25">
                <Plus className="mr-2 h-4 w-4" />
                Start New Practice
              </Button>
            </Link>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              {
                title: "Total Practices",
                value: userStats.totalExams.toString(),
                icon: BookOpen,
                color: "from-primary/20 to-primary/5",
                change: "+2 this week"
              },
              {
                title: "Avg. Score",
                value: `${userStats.avgScore}%`,
                icon: TrendingUp,
                color: "from-accent/20 to-accent/5",
                change: "+5% from last week"
              },
              {
                title: "Total Marks",
                value: userStats.totalMarks.toString(),
                icon: Award,
                color: "from-chart-3/20 to-chart-3/5",
                change: "Personal best: 95/100"
              },
              {
                title: "Time Spent",
                value: userStats.timeSpent,
                icon: Clock,
                color: "from-chart-4/20 to-chart-4/5",
                change: "45m daily average"
              }
            ].map((stat, index) => (
              <Card key={index} className="border border-border/50 bg-linear-to-br from-card to-card/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl bg-linear-to-br ${stat.color}`}>
                      <stat.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <span className="text-xs text-muted-foreground">{stat.change}</span>
                  </div>
                  <div className="mt-4">
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.title}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Practice Sessions */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Your Practice Sessions</h2>
                <p className="text-muted-foreground">Track and manage all your CBSE Mathematics practices</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-border/60">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
                <Button variant="outline" size="sm" className="border-border/60">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>

            {!exams || exams.length === 0 ? (
              <Card className="text-center py-12 border-dashed border-2 border-border/50 bg-linear-to-br from-card/50 to-card/30 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 rounded-full bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No practice sessions yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                    Start your CBSE Mathematics journey with a practice session
                  </p>
                  <Link href="/dashboard/create">
                    <Button className="bg-linear-to-r from-primary to-accent hover:shadow-lg">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Start First Practice
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {exams.map((exam: Exam) => (
                  <Card 
                    key={exam.id} 
                    className="group border border-border/50 bg-linear-to-br from-card to-card/80 backdrop-blur-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-linear-to-br from-primary/10 to-accent/10">
                              <BookOpen className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                {exam.title || 'Untitled Practice'}
                              </h3>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                                  CBSE
                                </span>
                                <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">
                                  Class {exam.class_level || '10'}
                                </span>
                                <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-chart-3/10 text-chart-3">
                                  {exam.total_marks || '80'} marks
                                </span>
                                <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-chart-4/10 text-chart-4">
                                  <Clock className="h-3 w-3" />
                                  {exam.duration_minutes || '180'} mins
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                              <Calendar className="inline h-4 w-4 mr-1" />
                              Created {new Date(exam.created_at!).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex sm:flex-col gap-2 sm:gap-0 sm:text-right">
                          <Link href={`/dashboard/exam/${exam.id}`}>
                            <Button size="sm" className="w-full sm:w-auto">
                              Continue
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Quick Actions & Recent Activity */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border border-border/50 bg-linear-to-br from-card to-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: Plus, label: 'Create New Practice', href: '/dashboard/create' },
                  { icon: BookOpen, label: 'Study Materials', href: '/materials' },
                  { icon: BarChart, label: 'Progress Report', href: '/progress' },
                  { icon: Award, label: 'Achievements', href: '/achievements' },
                ].map((action, index) => (
                  <Link key={index} href={action.href}>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-border/40 hover:border-primary/40 hover:bg-primary/5 group"
                    >
                      <div className="p-1.5 rounded-md bg-linear-to-br from-primary/10 to-accent/10 mr-3">
                        <action.icon className="h-4 w-4 text-primary" />
                      </div>
                      {action.label}
                      <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border border-border/50 bg-linear-to-br from-card to-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/30 transition-colors">
                    <div className="p-2 rounded-lg bg-linear-to-br from-primary/10 to-accent/10 shrink-0">
                      {activity.action === 'Completed' ? (
                        <Award className="h-4 w-4 text-accent" />
                      ) : activity.action === 'Started' ? (
                        <Play className="h-4 w-4 text-chart-3" />
                      ) : (
                        <BookOpen className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground truncate">
                          {activity.action} <span className="text-primary">{activity.item}</span>
                        </p>
                        {activity.score && (
                          <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded-full">
                            {activity.score}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full text-sm">
                  View All Activity
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Study Goals */}
            <Card className="border border-border/50 bg-linear-to-br from-card to-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Today&apos;s Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">Practice Questions</span>
                      <span className="text-muted-foreground">2/3 completed</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full bg-linear-to-r from-primary to-accent" style={{ width: '66%' }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">Study Time</span>
                      <span className="text-muted-foreground">45/60 mins</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full bg-linear-to-r from-accent to-chart-3" style={{ width: '75%' }} />
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-2">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Goal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-md bg-linear-to-br from-primary to-accent" />
              <div>
                <span className="text-sm font-medium text-foreground">Trak Crak</span>
                <p className="text-xs text-muted-foreground">CBSE Class 10 Mathematics Dashboard</p>
              </div>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/help" className="hover:text-foreground transition-colors">
                Help Center
              </Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Contact Support
              </Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Add missing Play icon component
const Play = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
)

// Add missing Target icon component
const Target = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)