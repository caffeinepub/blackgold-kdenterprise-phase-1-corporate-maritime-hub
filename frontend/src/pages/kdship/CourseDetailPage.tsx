import { useParams } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, PlayCircle, FileText } from 'lucide-react';

export default function CourseDetailPage() {
  const { courseId } = useParams({ from: '/kd-ship/courses/$courseId' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-kdship-navy via-kdship-navy-light to-kdship-navy">
      <div className="container py-12">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-white">Course Details</h1>
          <p className="text-kdship-text-muted">Course ID: {courseId}</p>
        </div>

        <Card className="border-kdship-border bg-kdship-navy-light">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Course content coming soon</CardTitle>
            <CardDescription className="text-kdship-text-muted">
              Backend integration in progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-lg border border-kdship-border p-4">
                <BookOpen className="h-5 w-5 text-kdship-teal" />
                <span className="text-kdship-text-muted">Subjects and topics</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-kdship-border p-4">
                <PlayCircle className="h-5 w-5 text-kdship-amber" />
                <span className="text-kdship-text-muted">Video lessons</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-kdship-border p-4">
                <FileText className="h-5 w-5 text-kdship-teal" />
                <span className="text-kdship-text-muted">Study notes</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
