'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signup } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Brain,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Shield,
  CheckCircle,
} from 'lucide-react';

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState<string | null>(
    null
  );

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    setPasswordMatchError(null);

    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm_password') as string;

    // Client-side password confirmation
    if (password !== confirmPassword) {
      setPasswordMatchError('Passwords do not match');
      setLoading(false);
      return;
    }

    const result = await signup(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Animated gradient background matching landing page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-primary/5 via-transparent to-accent/5" />
        <svg
          className="absolute inset-0 w-full h-full opacity-5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-primary/10"
              />
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
                <p className="text-xs text-foreground/60">
                  CBSE Class 10 Mathematics
                </p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Start Your Learning Journey
              </span>
            </div>
          </div>

          {/* Signup Card */}
          <Card className="border border-border/50 bg-linear-to-br from-card to-card/80 backdrop-blur-sm shadow-xl">
            <CardHeader className="space-y-1 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-linear-to-br from-primary/10 to-accent/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Create Account
                </CardTitle>
              </div>
              <CardDescription className="text-foreground/70">
                Join thousands of students mastering CBSE Mathematics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={handleSubmit} className="space-y-5">
                {/* Full Name Field */}
                <div className="space-y-3">
                  <Label
                    htmlFor="full_name"
                    className="text-sm font-medium text-foreground flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    Full Name
                  </Label>
                  <div className="relative">
                    <Input
                      id="full_name"
                      name="full_name"
                      type="text"
                      placeholder="Enter your full name"
                      required
                      className="pl-10 bg-background/50 border-border/60 focus:border-primary/50 focus:ring-primary/20"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40" />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-3">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground flex items-center gap-2"
                  >
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
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-foreground flex items-center gap-2"
                  >
                    <Lock className="h-4 w-4" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
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
                  <div className="text-xs text-foreground/60">
                    Must be at least 8 characters with numbers and letters
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-3">
                  <Label
                    htmlFor="confirm_password"
                    className="text-sm font-medium text-foreground flex items-center gap-2"
                  >
                    <Lock className="h-4 w-4" />
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirm_password"
                      name="confirm_password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      required
                      className="pl-10 pr-10 bg-background/50 border-border/60 focus:border-primary/50 focus:ring-primary/20"
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40" />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/40 hover:text-foreground/60 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {passwordMatchError && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <div className="flex items-center gap-2 text-sm text-destructive">
                      <Shield className="h-4 w-4" />
                      {passwordMatchError}
                    </div>
                  </div>
                )}

                {/* Benefits List */}
                <div className="space-y-2 p-4 rounded-lg bg-linear-to-br from-primary/5 to-accent/5 border border-primary/10">
                  <p className="text-sm font-medium text-foreground mb-2">
                    Get instant access to:
                  </p>
                  <div className="space-y-2">
                    {[
                      '500+ practice questions & solutions',
                      'Step-by-step answer writing guides',
                      'Personalized progress tracking',
                      'CBSE exam pattern simulations',
                    ].map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-xs text-foreground/70"
                      >
                        <CheckCircle className="h-3 w-3 text-accent shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
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

                {/* Terms & Conditions */}
                <div className="flex items-start gap-2 text-xs text-foreground/60">
                  <Input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    required
                    className="w-4 h-4 mt-0.5"
                  />
                  <Label htmlFor="terms" className="leading-tight">
                    I agree to the{' '}
                    <Link
                      href="/terms"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link
                      href="/privacy"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-linear-to-r from-primary to-accent hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-md shadow-primary/25 text-primary-foreground group"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Create Free Account
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
                  <span className="bg-card px-2 text-foreground/40">
                    Already have an account?
                  </span>
                </div>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-sm text-foreground/60">
                  Already registered?{' '}
                  <Link
                    href="/login"
                    className="font-semibold text-primary hover:text-primary/80 transition-colors group inline-flex items-center gap-1"
                  >
                    Sign in here
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-6 text-xs text-foreground/40">
              <Link
                href="/privacy"
                className="hover:text-foreground/60 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-foreground/60 transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/contact"
                className="hover:text-foreground/60 transition-colors"
              >
                Support
              </Link>
            </div>
            <p className="text-xs text-foreground/40 mt-4">
              © {new Date().getFullYear()} Trak Crak. Start learning today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
