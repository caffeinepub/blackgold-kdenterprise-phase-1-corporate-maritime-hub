import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, BookOpen, Award, TrendingUp, Ship, Anchor } from 'lucide-react';

export default function KDShipLandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-kdship-navy via-kdship-navy-light to-kdship-navy">
      {/* Hero Section */}
      <section className="container py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-kdship-teal/10 p-6">
              <Ship className="h-16 w-16 text-kdship-teal" />
            </div>
          </div>
          <h1 className="mb-6 text-5xl font-black text-white md:text-6xl">
            KD Ship Maritime Education
          </h1>
          <p className="mb-8 text-xl text-kdship-text-muted">
            Complete maritime learning platform for IMU-CET, DNS, and STCW certification. Launch your maritime career with confidence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate({ to: '/kd-ship/courses' })}
              className="bg-kdship-teal text-kdship-navy hover:bg-kdship-teal/90"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Browse Courses
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate({ to: '/kd-ship/dashboard' })}
              className="border-kdship-border text-kdship-text-muted hover:bg-kdship-teal/10"
            >
              <GraduationCap className="mr-2 h-5 w-5" />
              Student Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-kdship-border bg-kdship-navy-light">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-kdship-teal/10">
                <BookOpen className="h-6 w-6 text-kdship-teal" />
              </div>
              <CardTitle className="text-white">IMU-CET Preparation</CardTitle>
              <CardDescription className="text-kdship-text-muted">
                Complete coverage of Physics, Mathematics, Chemistry, English, and General Knowledge
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-kdship-border bg-kdship-navy-light">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-kdship-amber/10">
                <Anchor className="h-6 w-6 text-kdship-amber" />
              </div>
              <CardTitle className="text-white">DNS Courses</CardTitle>
              <CardDescription className="text-kdship-text-muted">
                Deck Officer and Engine Officer paths with comprehensive modules
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-kdship-border bg-kdship-navy-light">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-kdship-teal/10">
                <Award className="h-6 w-6 text-kdship-teal" />
              </div>
              <CardTitle className="text-white">STCW Certification</CardTitle>
              <CardDescription className="text-kdship-text-muted">
                Mandatory safety training modules with auto-generated certificates
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-kdship-border bg-kdship-navy-light">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-kdship-amber/10">
                <TrendingUp className="h-6 w-6 text-kdship-amber" />
              </div>
              <CardTitle className="text-white">Mock Tests</CardTitle>
              <CardDescription className="text-kdship-text-muted">
                Topic quizzes (25 questions) and full mock tests (100 questions) with timer
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-kdship-border bg-kdship-navy-light">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-kdship-teal/10">
                <GraduationCap className="h-6 w-6 text-kdship-teal" />
              </div>
              <CardTitle className="text-white">Progress Tracking</CardTitle>
              <CardDescription className="text-kdship-text-muted">
                Detailed analytics, performance metrics, and personalized recommendations
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-kdship-border bg-kdship-navy-light">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-kdship-amber/10">
                <Award className="h-6 w-6 text-kdship-amber" />
              </div>
              <CardTitle className="text-white">Digital Certificates</CardTitle>
              <CardDescription className="text-kdship-text-muted">
                Auto-generated certificates with unique IDs and KD Ship seal
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-white">
            Choose Your Plan
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-kdship-border bg-kdship-navy-light">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Free</CardTitle>
                <CardDescription className="text-kdship-text-muted">
                  Get started with basics
                </CardDescription>
                <div className="mt-4 text-4xl font-bold text-kdship-teal">₹0</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-kdship-text-muted">
                  <li>✓ Limited topic access</li>
                  <li>✓ 1 mock test</li>
                  <li>✗ No certificates</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-kdship-teal bg-kdship-navy-light ring-2 ring-kdship-teal">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Basic</CardTitle>
                <CardDescription className="text-kdship-text-muted">
                  Most popular choice
                </CardDescription>
                <div className="mt-4 text-4xl font-bold text-kdship-teal">₹99</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-kdship-text-muted">
                  <li>✓ Full subject access</li>
                  <li>✓ All topic quizzes</li>
                  <li>✓ 3 mock tests</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-kdship-border bg-kdship-navy-light">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Premium</CardTitle>
                <CardDescription className="text-kdship-text-muted">
                  Complete access
                </CardDescription>
                <div className="mt-4 text-4xl font-bold text-kdship-teal">₹199</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-kdship-text-muted">
                  <li>✓ Unlimited mock tests</li>
                  <li>✓ Detailed analytics</li>
                  <li>✓ Rank prediction</li>
                  <li>✓ Certificates</li>
                  <li>✓ DNS + STCW access</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <div className="mx-auto max-w-3xl rounded-2xl border border-kdship-border bg-kdship-navy-light p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Ready to Start Your Maritime Career?
          </h2>
          <p className="mb-8 text-lg text-kdship-text-muted">
            Join thousands of students preparing for IMU-CET, DNS, and STCW certifications
          </p>
          <Button
            size="lg"
            onClick={() => navigate({ to: '/kd-ship/courses' })}
            className="bg-kdship-teal text-kdship-navy hover:bg-kdship-teal/90"
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
}
