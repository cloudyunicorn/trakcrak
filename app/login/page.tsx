'use client'

import { useState } from 'react'
import Link from 'next/link'
import { login } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Brain, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff,
  ArrowRight,
  Sparkles,
  BookOpen,
  Shield
} from 'lucide-react'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    const result = await login(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Animated gradient background matching landing page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-primary/5 via-transparent to-accent/5" />
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
        {/* Back to home link */}
        <Link 
          href="/" 
          className="absolute top-6 left-6 flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          Back to Home
        </Link>

        <div className="w-full max-w-md mx-auto">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="text-left">
                <span className="text-2xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                  Trak Crak
                </span>
                <p className="text-xs text-foreground/60">CBSE Class 10 Mathematics</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Secure Student Portal
              </span>
            </div>
          </div>

          {/* Login Card */}
          <Card className="border border-border/50 bg-linear-to-br from-card to-card/80 backdrop-blur-sm shadow-xl">
            <CardHeader className="space-y-1 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-linear-to-br from-primary/10 to-accent/10">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Welcome Back
                </CardTitle>
              </div>
              <CardDescription className="text-foreground/70">
                Sign in to continue your CBSE Mathematics journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="student@example.com"
                      required
                      className="pl-10 bg-background/50 border-border/60 focus:border-primary/50 focus:ring-primary/20"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40" />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Password
                    </Label>
                    <Link 
                      href="/forgot-password" 
                      className="text-xs text-primary hover:text-primary/80 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      className="pl-10 pr-10 bg-background/50 border-border/60 focus:border-primary/50 focus:ring-primary/20"
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/40 hover:text-foreground/60 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <div className="flex items-center gap-2 text-sm text-destructive">
                      <Shield className="h-4 w-4" />
                      {error}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-linear-to-r from-primary to-accent hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-md shadow-primary/25 text-primary-foreground group"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Sign In
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-foreground/40">Or continue with</span>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center space-y-4">
                <p className="text-sm text-foreground/60">
                  Don&apos;t have an account?{' '}
                  <Link 
                    href="/signup" 
                    className="font-semibold text-primary hover:text-primary/80 transition-colors group inline-flex items-center gap-1"
                  >
                    Sign up now
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </p>
                
                {/* Additional Info */}
                <div className="p-4 rounded-lg bg-linear-to-br from-primary/5 to-accent/5 border border-primary/10">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-primary shrink-0" />
                    <p className="text-xs text-foreground/70">
                      Join <span className="font-semibold text-primary">10,000+ students</span> mastering CBSE Mathematics
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-6 text-xs text-foreground/40">
              <Link href="/privacy" className="hover:text-foreground/60 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-foreground/60 transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-foreground/60 transition-colors">
                Support
              </Link>
            </div>
            <p className="text-xs text-foreground/40 mt-4">
              © {new Date().getFullYear()} Trak Crak. Secure learning environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}