import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, HelpCircle, Users, Award } from 'lucide-react';

export default function AdminDashboardPage() {
  const { identity, login, loginStatus } = useInternetIdentity();

  if (!identity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-kdship-navy via-kdship-navy-light to-kdship-navy">
        <div className="container flex min-h-[80vh] items-center justify-center">
          <Card className="w-full max-w-md border-kdship-border bg-kdship-navy-light">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Admin Dashboard</CardTitle>
              <CardDescription className="text-kdship-text-muted">
                Please sign in to access admin features
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
          <h1 className="mb-2 text-4xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-kdship-text-muted">Manage courses, questions, and student performance</p>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid gap-6 md:grid-cols-4">
          <Card className="border-kdship-border bg-kdship-navy-light">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-kdship-text-muted">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">0</div>
            </CardContent>
          </Card>

          <Card className="border-kdship-border bg-kdship-navy-light">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-kdship-text-muted">Total Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-kdship-teal">0</div>
            </CardContent>
          </Card>

          <Card className="border-kdship-border bg-kdship-navy-light">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-kdship-text-muted">Pending Certificates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-kdship-amber">0</div>
            </CardContent>
          </Card>

          <Card className="border-kdship-border bg-kdship-navy-light">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-kdship-text-muted">Average Pass Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">0%</div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="bg-kdship-navy-light">
            <TabsTrigger value="courses" className="data-[state=active]:bg-kdship-teal data-[state=active]:text-kdship-navy">
              <BookOpen className="mr-2 h-4 w-4" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="questions" className="data-[state=active]:bg-kdship-teal data-[state=active]:text-kdship-navy">
              <HelpCircle className="mr-2 h-4 w-4" />
              Questions
            </TabsTrigger>
            <TabsTrigger value="students" className="data-[state=active]:bg-kdship-teal data-[state=active]:text-kdship-navy">
              <Users className="mr-2 h-4 w-4" />
              Students
            </TabsTrigger>
            <TabsTrigger value="certificates" className="data-[state=active]:bg-kdship-teal data-[state=active]:text-kdship-navy">
              <Award className="mr-2 h-4 w-4" />
              Certificates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            <Card className="border-kdship-border bg-kdship-navy-light">
              <CardHeader>
                <CardTitle className="text-white">Course Management</CardTitle>
                <CardDescription className="text-kdship-text-muted">
                  Backend integration in progress
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="questions">
            <Card className="border-kdship-border bg-kdship-navy-light">
              <CardHeader>
                <CardTitle className="text-white">Question Bank</CardTitle>
                <CardDescription className="text-kdship-text-muted">
                  Backend integration in progress
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <Card className="border-kdship-border bg-kdship-navy-light">
              <CardHeader>
                <CardTitle className="text-white">Student Performance</CardTitle>
                <CardDescription className="text-kdship-text-muted">
                  Backend integration in progress
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="certificates">
            <Card className="border-kdship-border bg-kdship-navy-light">
              <CardHeader>
                <CardTitle className="text-white">Certificate Management</CardTitle>
                <CardDescription className="text-kdship-text-muted">
                  Backend integration in progress
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
