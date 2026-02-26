import { useParams } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function QuizPage() {
  const { quizId } = useParams({ from: '/kd-ship/quiz/$quizId' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-kdship-navy via-kdship-navy-light to-kdship-navy">
      <div className="container py-12">
        <Card className="border-kdship-border bg-kdship-navy-light">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Quiz Interface</CardTitle>
            <CardDescription className="text-kdship-text-muted">
              Quiz ID: {quizId} - Backend integration in progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-kdship-text-muted">
              Quiz functionality will be available once backend is integrated
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
