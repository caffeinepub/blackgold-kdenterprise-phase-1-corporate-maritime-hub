import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Award } from 'lucide-react';

export default function CourseBrowserPage() {
  const courses = [
    {
      id: 'imu-cet',
      title: 'IMU-CET Preparation',
      description: 'Complete preparation for Indian Maritime University Common Entrance Test',
      subjects: 5,
      topics: 73,
      type: 'IMU',
      region: 'India',
    },
    {
      id: 'dns-deck',
      title: 'DNS - Deck Officer',
      description: 'Diploma in Nautical Science for aspiring Deck Officers',
      subjects: 9,
      topics: 45,
      type: 'DNS',
      region: 'Global',
    },
    {
      id: 'dns-engine',
      title: 'DNS - Engine Officer',
      description: 'Diploma in Nautical Science for aspiring Engine Officers',
      subjects: 8,
      topics: 40,
      type: 'DNS',
      region: 'Global',
    },
    {
      id: 'stcw',
      title: 'STCW Safety Training',
      description: 'Standards of Training, Certification and Watchkeeping mandatory modules',
      subjects: 5,
      topics: 25,
      type: 'STCW',
      region: 'Global',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-kdship-navy via-kdship-navy-light to-kdship-navy">
      <div className="container py-12">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-white">Course Catalog</h1>
          <p className="text-kdship-text-muted">
            Explore our comprehensive maritime education courses
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {courses.map((course) => (
            <Card key={course.id} className="border-kdship-border bg-kdship-navy-light">
              <CardHeader>
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-kdship-teal/10">
                    <BookOpen className="h-6 w-6 text-kdship-teal" />
                  </div>
                  <Badge variant="outline" className="border-kdship-border text-kdship-teal">
                    {course.type}
                  </Badge>
                </div>
                <CardTitle className="text-2xl text-white">{course.title}</CardTitle>
                <CardDescription className="text-kdship-text-muted">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center gap-6 text-sm text-kdship-text-muted">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.subjects} Subjects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{course.topics} Topics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    <span>{course.region}</span>
                  </div>
                </div>
                <Button className="w-full bg-kdship-teal text-kdship-navy hover:bg-kdship-teal/90">
                  View Course Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
