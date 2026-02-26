import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from '@tanstack/react-router';
import { BookOpen, Award, TrendingUp, Clock } from 'lucide-react';

export default function StudentDashboardPage() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const navigate = useNavigate();

  if (!identity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-kdship-navy via-kdship-navy-light to-kdship-navy">
        <div className="container flex min-h-[80vh] items-center justify-center">
          <Card className="w-full max-w-md border-kdship-border bg-kdship-navy-light">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Student Dashboard</CardTitle>
              <CardDescription className="text-kdship-text-muted">
                Please sign in to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button
                size="lg"
                onClick={login}
                disabled={loginStatus === 'logging-in'}
                className="bg-kdship-teal text-kdship-navy hover:bg-kdship-teal/90"
              >
                {loginStatus === 'logging-in' ? 'Signing in...' : 'Sign in with Internet Identity'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-kdship-navy via-kdship-navy-light to-kdship-navy">
      <div className="container py-12">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-white">Welcome Back!</h1>
          <p className="text-kdship-text-muted">Continue your maritime education journey</p>
        </div>

        {/* Overview Cards */}
        <div className="mb-12 grid gap-6 md:grid-cols-4">
          <Card className="border-kdship-border bg-kdship-navy-light">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-kdship-text-muted">Enrolled Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">0</div>
            </CardContent>
          </Card>

          <Card className="border-kdship-border bg-kdship-navy-light">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-kdship-text-muted">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-kdship-teal">0%</div>
            </CardContent>
          </Card>

          <Card className="border-kdship-border bg-kdship-navy-light">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-kdship-text-muted">Quiz Average</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-kdship-amber">0%</div>
            </CardContent>
          </Card>

          <Card className="border-kdship-border bg-kdship-navy-light">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-kdship-text-muted">Certificates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">0</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card
            className="cursor-pointer border-kdship-border bg-kdship-navy-light transition-all hover:border-kdship-teal"
            onClick={() => navigate({ to: '/kd-ship/courses' })}
          >
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-kdship-teal/10">
                <BookOpen className="h-6 w-6 text-kdship-teal" />
              </div>
              <CardTitle className="text-white">Browse Courses</CardTitle>
              <CardDescription className="text-kdship-text-muted">
                Explore IMU-CET, DNS, and STCW courses
              </CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="cursor-pointer border-kdship-border bg-kdship-navy-light transition-all hover:border-kdship-amber"
            onClick={() => navigate({ to: '/kd-ship/certificates' })}
          >
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-kdship-amber/10">
                <Award className="h-6 w-6 text-kdship-amber" />
              </div>
              <CardTitle className="text-white">My Certificates</CardTitle>
              <CardDescription className="text-kdship-text-muted">
                View and download earned certificates
              </CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="cursor-pointer border-kdship-border bg-kdship-navy-light transition-all hover:border-kdship-teal"
            onClick={() => navigate({ to: '/kd-ship/subscription' })}
          >
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-kdship-teal/10">
                <TrendingUp className="h-6 w-6 text-kdship-teal" />
              </div>
              <CardTitle className="text-white">Subscription</CardTitle>
              <CardDescription className="text-kdship-text-muted">
                Manage your plan and features
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-kdship-border bg-kdship-navy-light opacity-50">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-kdship-amber/10">
                <Clock className="h-6 w-6 text-kdship-amber" />
              </div>
              <CardTitle className="text-white">Mock Tests</CardTitle>
              <CardDescription className="text-kdship-text-muted">
                No mock tests available yet
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Empty State */}
        <Card className="border-kdship-border bg-kdship-navy-light">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Start Your Learning Journey</CardTitle>
            <CardDescription className="text-kdship-text-muted">
              You haven't enrolled in any courses yet. Browse our course catalog to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button
              size="lg"
              onClick={() => navigate({ to: '/kd-ship/courses' })}
              className="bg-kdship-teal text-kdship-navy hover:bg-kdship-teal/90"
            >
              Browse Courses
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
