import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSubmitCareerInquiry } from '@/hooks/useQueries';
import { toast } from 'sonner';
import { Users, GraduationCap, Heart, Globe, Loader2 } from 'lucide-react';

export default function CareersPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const submitInquiry = useSubmitCareerInquiry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await submitInquiry.mutateAsync(formData);
      toast.success('Your inquiry has been submitted successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Failed to submit inquiry. Please try again.');
    }
  };

  const benefits = [
    {
      icon: Users,
      title: 'Global Network',
      description: 'Join a diverse team operating across 45 countries',
    },
    {
      icon: GraduationCap,
      title: 'Training Programs',
      description: 'Continuous professional development and certification support',
    },
    {
      icon: Heart,
      title: 'Welfare Support',
      description: 'Comprehensive health, safety, and wellbeing programs',
    },
    {
      icon: Globe,
      title: 'Career Growth',
      description: 'Clear pathways for advancement in a growing organization',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-maritime-navy py-20">
        <div className="container text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">Join Our Crew</h1>
          <p className="mx-auto max-w-2xl text-xl text-maritime-blue-light">
            Build your maritime career with a global leader
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="mb-12 text-center text-4xl font-bold text-maritime-navy dark:text-maritime-gold">
            Why Join Us
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="border-maritime-border bg-maritime-card text-center transition-all hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-maritime-gold/10">
                      <benefit.icon className="h-8 w-8 text-maritime-gold" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-maritime-navy dark:text-maritime-gold">
                    {benefit.title}
                  </h3>
                  <p className="text-maritime-blue-light">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="bg-maritime-section py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-4xl font-bold text-maritime-navy dark:text-maritime-gold">
              Our Programs
            </h2>
            <div className="space-y-6">
              <Card className="border-maritime-border bg-maritime-card">
                <CardHeader>
                  <CardTitle className="text-maritime-navy dark:text-maritime-gold">
                    Recruitment Network
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-maritime-blue-light">
                    Our global recruitment network identifies and attracts top maritime talent from around the world. We maintain partnerships with leading maritime academies and training institutions to ensure a steady pipeline of qualified professionals.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-maritime-border bg-maritime-card">
                <CardHeader>
                  <CardTitle className="text-maritime-navy dark:text-maritime-gold">
                    Training & Development
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-maritime-blue-light">
                    We invest heavily in our crew's professional development through comprehensive training programs, certification support, and continuous skill enhancement opportunities. From basic safety training to advanced technical certifications, we support your growth every step of the way.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-maritime-border bg-maritime-card">
                <CardHeader>
                  <CardTitle className="text-maritime-navy dark:text-maritime-gold">
                    Welfare Programs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-maritime-blue-light">
                    Your wellbeing is our priority. Our welfare programs include comprehensive health insurance, mental health support, family assistance, and recreational facilities. We understand the challenges of maritime life and provide the support you need to thrive both at sea and at home.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <Card className="border-maritime-border bg-maritime-card">
              <CardHeader>
                <CardTitle className="text-center text-3xl text-maritime-navy dark:text-maritime-gold">
                  Career Inquiry
                </CardTitle>
                <p className="text-center text-maritime-blue-light">
                  Interested in joining our team? Send us your inquiry
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your experience and interests..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-maritime-gold text-maritime-navy hover:bg-maritime-gold/90"
                    disabled={submitInquiry.isPending}
                  >
                    {submitInquiry.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Inquiry'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
