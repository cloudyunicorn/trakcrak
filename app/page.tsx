import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Brain, 
  GraduationCap, 
  Calculator, 
  Target, 
  TrendingUp, 
  Clock, 
  Award,
  Lightbulb,
  BarChart,
  Sparkles,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Zap,
  Shield,
  Users,
  Star,
  Bookmark,
  ChevronRight,
  BadgeCheck,
  Trophy,
  LineChart
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Elegant gradient background with subtle pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-primary/3 via-transparent to-accent/3" />
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary/10" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-linear-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-linear-to-tr from-accent/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Modern Navigation */}
        <nav className="flex justify-between items-center mb-12 sm:mb-20 pt-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                <Brain className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent border-2 border-background" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                Trak Crak
              </span>
              <div className="flex items-center gap-1">
                <BadgeCheck className="h-3 w-3 text-accent" />
                <p className="text-xs text-muted-foreground">Trusted CBSE Learning Platform</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hover:bg-secondary/50 hover:text-foreground transition-all">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-linear-to-r from-primary to-accent hover:shadow-lg hover:scale-105 transition-all duration-200 shadow-md shadow-primary/25 text-primary-foreground">
                Start Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </nav>

        {/* Hero Section - Modern Design */}
        <div className="text-center max-w-5xl mx-auto mb-16 sm:mb-28">
          {/* Elegant Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-linear-to-r from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20 mb-8 animate-fade-in">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <Sparkles className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-sm font-medium text-primary">
              5,000+ Students Scoring 90%+
            </span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="block text-foreground font-normal">Master Mathematics</span>
            <span className="bg-linear-to-r from-primary via-primary/90 to-accent bg-clip-text text-transparent font-bold">
              Like a CBSE Topper
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            Step-by-step guidance, expert-verified solutions, and smart practice tools 
            designed to help you score maximum marks in CBSE Class 10 Board Exams.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/signup" className="w-full sm:w-auto group">
              <Button 
                size="lg" 
                className="w-full sm:w-auto h-14 px-8 text-lg bg-linear-to-r from-primary to-accent hover:shadow-xl hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-primary/25 group-hover:shadow-primary/40 text-primary-foreground"
              >
                <div className="flex items-center">
                  <div className="relative mr-3">
                    <GraduationCap className="h-5 w-5" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white animate-ping" />
                  </div>
                  Start Free Learning
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Button>
            </Link>
            <Link href="#methodology" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="outline"
                className="w-full sm:w-auto h-14 px-8 text-lg border border-border/60 hover:border-primary/40 hover:bg-secondary/30 hover:text-foreground transition-all backdrop-blur-sm"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                View Methodology
              </Button>
            </Link>
          </div>

          {/* Trust Indicators - Elegant Design */}
          <div className="flex flex-wrap justify-center gap-8 items-center mt-12">
            {[
              { icon: Shield, text: "100% Secure & Private", color: "text-primary" },
              { icon: Trophy, text: "Expert-Curated Content", color: "text-accent" },
              { icon: LineChart, text: "Proven Results", color: "text-chart-3" },
              { icon: Users, text: "Active Community", color: "text-chart-4" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-foreground group">
                <div className={`p-1.5 rounded-lg bg-linear-to-br ${item.color === 'text-primary' ? 'from-primary/10' : item.color === 'text-accent' ? 'from-accent/10' : 'from-chart-3/10'} to-transparent group-hover:scale-110 transition-transform`}>
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                </div>
                <span className="font-medium group-hover:text-primary transition-colors">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Section - Modern Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20 sm:mb-32">
          {[
            { value: "10K+", label: "Active Learners", icon: Users, gradient: "from-primary/20 to-primary/5" },
            { value: "98%", label: "Success Rate", icon: TrendingUp, gradient: "from-accent/20 to-accent/5" },
            { value: "500+", label: "Hours of Content", icon: Clock, gradient: "from-chart-3/20 to-chart-3/5" },
            { value: "4.9★", label: "Student Rating", icon: Star, gradient: "from-chart-5/20 to-chart-5/5" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-linear-to-br from-card to-card/80 p-6 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className={`w-12 h-12 rounded-lg bg-linear-to-br ${stat.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="h-6 w-6 text-foreground" />
                </div>
                <div className="text-2xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-foreground/80 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Methodology Section */}
        <div id="methodology" className="mb-20 sm:mb-32">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full">
                PROVEN METHODOLOGY
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
              The Trak Crak Learning Path
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Follow our structured approach to master Mathematics and ace your board exams
            </p>
          </div>

          {/* Timeline Steps */}
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary via-accent to-transparent hidden md:block" />
            
            {[
              {
                step: "01",
                title: "Concept Mastery",
                description: "Understand fundamental concepts with animated videos and interactive examples",
                icon: Lightbulb,
                features: ["Visual Learning", "Real-world Examples", "Quick Revision Notes"]
              },
              {
                step: "02",
                title: "Step-by-Step Solutions",
                description: "Learn exact answer writing format that CBSE examiners expect",
                icon: GraduationCap,
                features: ["Expert Verified", "Marking Scheme", "Common Mistakes"]
              },
              {
                step: "03",
                title: "Smart Practice",
                description: "Practice with AI-powered recommendations based on your weak areas",
                icon: Target,
                features: ["Personalized Questions", "Adaptive Difficulty", "Instant Feedback"]
              },
              {
                step: "04",
                title: "Exam Simulation",
                description: "Take full-length mock tests under real exam conditions",
                icon: Clock,
                features: ["Timed Tests", "Performance Analytics", "Improvement Tracking"]
              }
            ].map((item, index) => (
              <div key={index} className="relative mb-8 md:mb-12 last:mb-0">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Step Number */}
                  <div className="flex items-start md:w-24">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 z-10">
                      <span className="text-lg font-bold text-primary-foreground">{item.step}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-linear-to-br from-card to-card/80 rounded-2xl border border-border/50 p-6 md:p-8 hover:border-primary/30 transition-all group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-2.5 rounded-lg bg-linear-to-br from-primary/10 to-accent/10 group-hover:scale-110 transition-transform">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-foreground/70 mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.features.map((feature, idx) => (
                        <span key={idx} className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid - Modern Design */}
        <div className="mb-20 sm:mb-32">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-accent bg-accent/10 px-4 py-1.5 rounded-full">
                POWERFUL FEATURES
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
              Everything You Need to Succeed
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: "Interactive Lessons",
                description: "Engaging video lessons with real-time quizzes and concept checks",
                color: "primary",
                textColor: "text-primary"
              },
              {
                icon: CheckCircle,
                title: "Expert Solutions",
                description: "Step-by-step solutions verified by CBSE examiners and subject experts",
                color: "accent",
                textColor: "text-accent"
              },
              {
                icon: Calculator,
                title: "Practice Hub",
                description: "Thousands of practice questions with detailed solutions and explanations",
                color: "chart-3",
                textColor: "text-chart-3"
              },
              {
                icon: BarChart,
                title: "Progress Analytics",
                description: "Track your improvement with detailed performance reports and insights",
                color: "chart-2",
                textColor: "text-chart-2"
              },
              {
                icon: Target,
                title: "Weakness Detection",
                description: "AI identifies your weak areas and provides targeted practice",
                color: "chart-4",
                textColor: "text-chart-4"
              },
              {
                icon: Bookmark,
                title: "Personalized Learning",
                description: "Custom study plans based on your learning pace and goals",
                color: "chart-5",
                textColor: "text-chart-5"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-linear-to-br from-card to-card/80 p-6 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon */}
                <div className={`relative mb-4 p-3 rounded-xl bg-linear-to-br ${feature.color === 'primary' ? 'from-primary/10 to-primary/5' : feature.color === 'accent' ? 'from-accent/10 to-accent/5' : `from-${feature.color}/10 to-${feature.color}/5`} w-fit group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`h-6 w-6 ${feature.textColor}`} />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-foreground/70 group-hover:text-foreground/90 transition-colors">
                  {feature.description}
                </p>
                
                {/* Hover Indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="h-5 w-5 text-primary" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials - Elegant Design */}
        <div className="mb-20 sm:mb-32">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-chart-3 bg-chart-3/10 px-4 py-1.5 rounded-full">
                STUDENT SUCCESS STORIES
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
              Trusted by Thousands of Students
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Priya Sharma",
                score: "95%",
                improvement: "+22 marks",
                text: "Trak Crak's step-by-step solutions transformed how I write answers. The board exam strategies were invaluable!",
                avatar: "PS",
                bg: "from-primary/20 to-accent/20"
              },
              {
                name: "Rahul Verma",
                score: "92%",
                improvement: "Top 5%",
                text: "The concept explanations are crystal clear. I went from struggling to loving Mathematics!",
                avatar: "RV",
                bg: "from-accent/20 to-chart-3/20"
              },
              {
                name: "Anjali Patel",
                score: "98%",
                improvement: "School Topper",
                text: "The personalized practice and progress tracking helped me identify and improve my weak areas effectively.",
                avatar: "AP",
                bg: "from-chart-3/20 to-primary/20"
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="relative overflow-hidden rounded-2xl border border-border/50 bg-linear-to-br from-card to-card/80 p-6 group hover:shadow-xl transition-all duration-300"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-linear-to-br ${testimonial.bg} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg">
                      {testimonial.avatar}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-background border-2 border-accent flex items-center justify-center">
                      <Award className="h-2.5 w-2.5 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-primary">{testimonial.score}</span>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial Text */}
                <p className="text-foreground/80 italic mb-4 relative z-10 group-hover:text-foreground transition-colors">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                
                {/* Improvement Badge */}
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-foreground bg-accent px-3 py-1 rounded-full">
                  <TrendingUp className="h-3 w-3" />
                  {testimonial.improvement}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA - Elegant Design */}
        <div className="relative overflow-hidden rounded-3xl mb-12 bg-linear-to-br from-primary/5 via-primary/2 to-accent/5 border border-border/50">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
          
          {/* Content */}
          <div className="relative p-8 sm:p-12 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-primary/15 to-accent/15 backdrop-blur-sm border border-primary/20 mb-6">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Start Your Journey Today
              </span>
            </div>
            
            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-foreground">
              Join <span className="text-primary">10,000+ Students</span> Who Are<br />
              <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                Mastering CBSE Mathematics
              </span>
            </h2>
            
            {/* Subtitle */}
            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
              Get access to expert-curated content, personalized learning paths, 
              and proven strategies to score 90%+ in your board exams.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/signup">
                <Button 
                  size="lg" 
                  className="h-14 px-10 text-lg bg-linear-to-r from-primary to-accent hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-primary/30 text-primary-foreground"
                >
                  <div className="flex items-center">
                    <GraduationCap className="mr-3 h-5 w-5" />
                    Start Learning Free
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Button>
              </Link>
              <Link href="/login">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-14 px-10 text-lg border-2 hover:bg-secondary/30 hover:border-primary/40 hover:text-foreground transition-all backdrop-blur-sm"
                >
                  Already Registered? Sign In
                </Button>
              </Link>
            </div>
            
            {/* Features List */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-foreground/70">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span>7-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Footer */}
        <footer className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
            {/* Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-accent" />
              <div>
                <span className="text-lg font-bold text-foreground">Trak Crak</span>
                <p className="text-xs text-foreground/60">Elevating CBSE Mathematics Learning</p>
              </div>
            </div>
            
            {/* Links */}
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                Contact
              </Link>
              <Link href="/faq" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                FAQ
              </Link>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-center pt-6 border-t border-border/30">
            <p className="text-sm text-foreground/60">
              © {new Date().getFullYear()} Trak Crak. Empowering students to achieve academic excellence.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}