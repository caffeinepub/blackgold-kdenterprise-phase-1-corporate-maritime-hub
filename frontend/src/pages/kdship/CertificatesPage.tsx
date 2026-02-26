import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award } from 'lucide-react';

export default function CertificatesPage() {
  const { identity, login, loginStatus } = useInternetIdentity();

  if (!identity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-kdship-navy via-kdship-navy-light to-kdship-navy">
        <div className="container flex min-h-[80vh] items-center justify-center">
          <Card className="w-full max-w-md border-kdship-border bg-kdship-navy-light">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">My Certificates</CardTitle>
              <CardDescription className="text-kdship-text-muted">
                Please sign in to view your certificates
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
          <h1 className="mb-2 text-4xl font-bold text-white">My Certificates</h1>
          <p className="text-kdship-text-muted">View and download your earned certificates</p>
        </div>

        <Card className="border-kdship-border bg-kdship-navy-light">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-kdship-amber/10">
              <Award className="h-8 w-8 text-kdship-amber" />
            </div>
            <CardTitle className="text-2xl text-white">No Certificates Yet</CardTitle>
            <CardDescription className="text-kdship-text-muted">
              Complete courses and pass quizzes to earn certificates
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
