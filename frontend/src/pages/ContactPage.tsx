import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useGetCompanyInfo, useSubmitContactForm } from '@/hooks/useQueries';
import { MapPin, Phone, Mail, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const { data: companyInfo, isLoading } = useGetCompanyInfo();
  const submitContactForm = useSubmitContactForm();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await submitContactForm.mutateAsync(formData);
      toast.success('Your message has been sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-maritime-gold" />
      </div>
    );
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      content: companyInfo?.address || '651 N Broad St #206, Middletown, DE 19709, USA',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: companyInfo?.phone || '+1 646 631-8561',
    },
    {
      icon: Mail,
      title: 'Email',
      content: companyInfo?.email || 'info@kdent.org',
    },
  ];

  const officialEmails = [
    { label: 'Admin', email: 'admin@kdpay.sbs' },
    { label: 'Info', email: 'info@kdpay.sbs' },
    { label: 'Support', email: 'support@kdpay.sbs' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-maritime-navy py-20">
        <div className="container text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">Contact Us</h1>
          <p className="mx-auto max-w-2xl text-xl text-maritime-blue-light">
            Get in touch with our team
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-6 md:grid-cols-3">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="border-maritime-border bg-maritime-card text-center transition-all hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-maritime-gold/10">
                        <info.icon className="h-8 w-8 text-maritime-gold" />
                      </div>
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-maritime-navy dark:text-maritime-gold">
                      {info.title}
                    </h3>
                    <p className="text-maritime-blue-light">{info.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Official Email Contacts Section */}
      <section className="bg-maritime-section py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <Card className="border-maritime-border bg-white shadow-lg dark:bg-maritime-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-2xl text-maritime-navy dark:text-maritime-gold">
                  <Mail className="h-6 w-6" />
                  📧 Official Email Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  {officialEmails.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-maritime-border bg-maritime-section p-4 text-center transition-all hover:shadow-md dark:bg-maritime-navy/50"
                    >
                      <div className="mb-2 text-sm font-semibold text-maritime-gold">
                        {item.label}
                      </div>
                      <a
                        href={`mailto:${item.email}`}
                        className="break-all text-sm text-maritime-blue-light transition-colors hover:text-maritime-gold"
                      >
                        {item.email}
                      </a>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border border-maritime-gold/30 bg-maritime-gold/5 p-4">
                  <p className="text-center text-sm text-maritime-blue-light">
                    <strong className="text-maritime-navy dark:text-maritime-gold">
                      Enterprise-Safe Disclaimer:
                    </strong>{' '}
                    Emails are used for official communication only. No sensitive financial
                    credentials should be shared via email.
                  </p>
                </div>
              </CardContent>
            </Card>
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
                  Send Us a Message
                </CardTitle>
                <p className="text-center text-maritime-blue-light">
                  We'll get back to you as soon as possible
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
                      placeholder="How can we help you?"
                      rows={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-maritime-gold text-maritime-navy hover:bg-maritime-gold/90"
                    disabled={submitContactForm.isPending}
                  >
                    {submitContactForm.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Office Hours & Additional Info */}
      <section className="bg-maritime-section py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-maritime-border bg-maritime-card">
                <CardHeader>
                  <CardTitle className="text-maritime-navy dark:text-maritime-gold">
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-maritime-blue-light">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-semibold">8:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-semibold">9:00 AM - 2:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                  <p className="mt-4 text-sm">
                    * Emergency support available 24/7 for vessel operations
                  </p>
                </CardContent>
              </Card>

              <Card className="border-maritime-border bg-maritime-card">
                <CardHeader>
                  <CardTitle className="text-maritime-navy dark:text-maritime-gold">
                    Global Operations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-maritime-blue-light">
                  <p>
                    While our headquarters is located in Delaware, USA, we maintain operational offices in key maritime hubs worldwide.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-maritime-gold" />
                      <span>Singapore - Asia Pacific Hub</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-maritime-gold" />
                      <span>Rotterdam - European Operations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-maritime-gold" />
                      <span>Dubai - Middle East Center</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <Card className="border-maritime-border bg-maritime-card overflow-hidden">
              <CardHeader>
                <CardTitle className="text-center text-maritime-navy dark:text-maritime-gold">
                  Our Location
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="aspect-video w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3067.8977!2d-75.7163!3d39.6495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c703e4b1c1c1c1%3A0x1234567890abcdef!2s651%20N%20Broad%20St%20%23206%2C%20Middletown%2C%20DE%2019709!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Blackgold Kdenterprise Location"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
