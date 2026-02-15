import { useState, useEffect } from 'react';
import { useGetTokenomics, useSubmitInvestorInquiry } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Coins, TrendingUp, Shield, Calendar, ExternalLink, FileText, Zap, Globe, Clock, Download, Send, Mail } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { OptimizedImage } from '@/components/OptimizedImage';

export default function CryptoTokensPage() {
  const { data: tokenomics, isLoading } = useGetTokenomics();
  const submitInvestorInquiry = useSubmitInvestorInquiry();

  // Countdown Timer State (June 1, 2025)
  const targetDate = new Date('2025-06-01T00:00:00Z').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Investor Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await submitInvestorInquiry.mutateAsync(formData);
      toast.success('Thank you! Your inquiry has been submitted successfully.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Failed to submit inquiry. Please try again.');
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-maritime-navy to-maritime-blue">
      {/* Launch Countdown Timer */}
      <section className="relative overflow-hidden border-b border-maritime-gold/30 bg-gradient-to-r from-black via-maritime-navy to-black py-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-1/2 h-64 w-64 animate-pulse rounded-full bg-maritime-gold/10 blur-3xl animation-delay-500" />
          <div className="absolute right-1/4 top-1/2 h-64 w-64 animate-pulse rounded-full bg-maritime-gold/10 blur-3xl animation-delay-1500" />
        </div>
        <div className="container relative z-10">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Clock className="h-6 w-6 animate-pulse text-maritime-gold" />
              <h3 className="text-xl font-semibold text-maritime-gold md:text-2xl">
                Launch Countdown - Exchange Listings Phase
              </h3>
            </div>
            <div className="grid grid-cols-4 gap-4 md:gap-8">
              <div className="group relative overflow-hidden rounded-xl border-2 border-maritime-gold/40 bg-gradient-to-br from-maritime-gold/20 to-black/60 p-4 backdrop-blur transition-all hover:border-maritime-gold hover:shadow-2xl hover:shadow-maritime-gold/50 md:p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-maritime-gold/0 via-maritime-gold/20 to-maritime-gold/0 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="text-4xl font-bold text-maritime-gold md:text-5xl lg:text-6xl">
                    {timeLeft.days}
                  </div>
                  <div className="mt-2 text-sm font-medium text-maritime-blue-light md:text-base">
                    Days
                  </div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-xl border-2 border-maritime-gold/40 bg-gradient-to-br from-maritime-gold/20 to-black/60 p-4 backdrop-blur transition-all hover:border-maritime-gold hover:shadow-2xl hover:shadow-maritime-gold/50 md:p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-maritime-gold/0 via-maritime-gold/20 to-maritime-gold/0 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="text-4xl font-bold text-maritime-gold md:text-5xl lg:text-6xl">
                    {timeLeft.hours}
                  </div>
                  <div className="mt-2 text-sm font-medium text-maritime-blue-light md:text-base">
                    Hours
                  </div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-xl border-2 border-maritime-gold/40 bg-gradient-to-br from-maritime-gold/20 to-black/60 p-4 backdrop-blur transition-all hover:border-maritime-gold hover:shadow-2xl hover:shadow-maritime-gold/50 md:p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-maritime-gold/0 via-maritime-gold/20 to-maritime-gold/0 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="text-4xl font-bold text-maritime-gold md:text-5xl lg:text-6xl">
                    {timeLeft.minutes}
                  </div>
                  <div className="mt-2 text-sm font-medium text-maritime-blue-light md:text-base">
                    Minutes
                  </div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-xl border-2 border-maritime-gold/40 bg-gradient-to-br from-maritime-gold/20 to-black/60 p-4 backdrop-blur transition-all hover:border-maritime-gold hover:shadow-2xl hover:shadow-maritime-gold/50 md:p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-maritime-gold/0 via-maritime-gold/20 to-maritime-gold/0 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="text-4xl font-bold text-maritime-gold md:text-5xl lg:text-6xl">
                    {timeLeft.seconds}
                  </div>
                  <div className="mt-2 text-sm font-medium text-maritime-blue-light md:text-base">
                    Seconds
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Banner with Glowing Animation */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-[url('/assets/generated/bgkd-hero-banner-animated.dim_1200x600.jpg')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-maritime-navy/40 to-transparent" />
        
        {/* Gold Circuit Energy Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-1/4 h-64 w-64 animate-pulse rounded-full bg-maritime-gold/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-maritime-gold/10 blur-3xl animation-delay-1000" />
          <div className="absolute left-1/2 top-1/2 h-80 w-80 animate-pulse rounded-full bg-maritime-gold/5 blur-3xl animation-delay-2000" />
        </div>

        <div className="container relative z-10">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-full bg-maritime-gold/30 blur-2xl" />
                <img
                  src="/assets/generated/bgkd-token-logo.dim_400x400.png"
                  alt="Bgkd Crypto Token"
                  className="relative h-40 w-40 rounded-full border-4 border-maritime-gold shadow-2xl shadow-maritime-gold/50 md:h-48 md:w-48"
                  loading="eager"
                />
              </div>
            </div>
            <h1 className="mb-6 text-5xl font-bold text-maritime-gold drop-shadow-lg md:text-6xl lg:text-7xl">
              Bgkd Crypto Token
            </h1>
            <p className="mb-4 text-2xl font-semibold text-white md:text-3xl">
              Powering the maritime and energy frontier
            </p>
            <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-maritime-blue-light md:text-xl">
              A digital asset backed by innovation in offshore operations, vessel management, and gold exploration.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-maritime-gold text-black hover:bg-maritime-gold/90 hover:shadow-lg hover:shadow-maritime-gold/50 transition-all"
                onClick={() => window.open(tokenomics?.whitepaperLink || '#', '_blank')}
              >
                <FileText className="mr-2 h-5 w-5" />
                View Whitepaper
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-maritime-gold text-maritime-gold hover:bg-maritime-gold/10 hover:shadow-lg hover:shadow-maritime-gold/30 transition-all"
                onClick={() => window.open(tokenomics?.contractLink || '#', '_blank')}
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                View Contract
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Coin Image Gallery with Enhanced Hover Glow */}
      <section className="py-12 border-y border-maritime-gold/20">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="group relative overflow-hidden rounded-xl border-2 border-maritime-gold/30 bg-black/40 p-4 backdrop-blur transition-all hover:border-maritime-gold hover:shadow-2xl hover:shadow-maritime-gold/50">
                <div className="absolute inset-0 bg-gradient-to-br from-maritime-gold/0 via-maritime-gold/10 to-maritime-gold/0 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute inset-0 animate-pulse rounded-xl bg-maritime-gold/5 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
                <OptimizedImage
                  src="/assets/IMG-20251129-WA0004.jpg"
                  alt="Bgkd Token Front"
                  className="relative w-full rounded-lg transition-transform group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="group relative overflow-hidden rounded-xl border-2 border-maritime-gold/30 bg-black/40 p-4 backdrop-blur transition-all hover:border-maritime-gold hover:shadow-2xl hover:shadow-maritime-gold/50">
                <div className="absolute inset-0 bg-gradient-to-br from-maritime-gold/0 via-maritime-gold/10 to-maritime-gold/0 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute inset-0 animate-pulse rounded-xl bg-maritime-gold/5 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
                <OptimizedImage
                  src="/assets/IMG-20251129-WA0004-1.jpg"
                  alt="Bgkd Token Detail"
                  className="relative w-full rounded-lg transition-transform group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose & Utility Section */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-5xl space-y-12">
            <Card className="border-2 border-maritime-gold/30 bg-gradient-to-br from-black/80 to-maritime-navy/80 backdrop-blur-lg shadow-xl shadow-maritime-gold/10">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-maritime-gold/20 p-3">
                    <Zap className="h-8 w-8 text-maritime-gold" />
                  </div>
                  <CardTitle className="text-3xl text-maritime-gold">Purpose & Utility</CardTitle>
                </div>
                <CardDescription className="text-lg text-maritime-blue-light">
                  Token usage in maritime tech, logistics, and investment transparency
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-maritime-blue-light">
                <p className="text-lg leading-relaxed">
                  The <span className="font-semibold text-maritime-gold">Bgkd Crypto Token</span> serves as the cornerstone of our digital maritime ecosystem, 
                  enabling seamless transactions across our global operations. Built on blockchain technology, it ensures transparency, 
                  security, and efficiency in all maritime and offshore activities.
                </p>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-lg border border-maritime-gold/30 bg-black/40 p-6 transition-all hover:border-maritime-gold/60 hover:shadow-lg hover:shadow-maritime-gold/20">
                    <h4 className="mb-3 flex items-center gap-2 text-xl font-semibold text-maritime-gold">
                      <TrendingUp className="h-5 w-5" />
                      Maritime Technology
                    </h4>
                    <p className="leading-relaxed">
                      Streamline vessel management, crew operations, and technical services with instant, secure token-based payments 
                      across our 200+ vessel fleet.
                    </p>
                  </div>
                  <div className="rounded-lg border border-maritime-gold/30 bg-black/40 p-6 transition-all hover:border-maritime-gold/60 hover:shadow-lg hover:shadow-maritime-gold/20">
                    <h4 className="mb-3 flex items-center gap-2 text-xl font-semibold text-maritime-gold">
                      <Globe className="h-5 w-5" />
                      Global Logistics
                    </h4>
                    <p className="leading-relaxed">
                      Facilitate cross-border transactions and partnerships across 45 countries with reduced fees and instant settlement 
                      through blockchain technology.
                    </p>
                  </div>
                  <div className="rounded-lg border border-maritime-gold/30 bg-black/40 p-6 transition-all hover:border-maritime-gold/60 hover:shadow-lg hover:shadow-maritime-gold/20">
                    <h4 className="mb-3 flex items-center gap-2 text-xl font-semibold text-maritime-gold">
                      <Shield className="h-5 w-5" />
                      Investment Transparency
                    </h4>
                    <p className="leading-relaxed">
                      Track all transactions on the blockchain, ensuring complete transparency in maritime investments, 
                      subsea gold exploration, and offshore operations.
                    </p>
                  </div>
                  <div className="rounded-lg border border-maritime-gold/30 bg-black/40 p-6 transition-all hover:border-maritime-gold/60 hover:shadow-lg hover:shadow-maritime-gold/20">
                    <h4 className="mb-3 flex items-center gap-2 text-xl font-semibold text-maritime-gold">
                      <Coins className="h-5 w-5" />
                      Loyalty Rewards
                    </h4>
                    <p className="leading-relaxed">
                      Earn tokens through long-term partnerships, service utilization, and ecosystem participation, 
                      unlocking exclusive benefits and preferential rates.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tokenomics Summary */}
            <Card className="border-2 border-maritime-gold/30 bg-gradient-to-br from-black/80 to-maritime-navy/80 backdrop-blur-lg shadow-xl shadow-maritime-gold/10">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-maritime-gold/20 p-3">
                    <Coins className="h-8 w-8 text-maritime-gold" />
                  </div>
                  <CardTitle className="text-3xl text-maritime-gold">Tokenomics Summary</CardTitle>
                </div>
                <CardDescription className="text-lg text-maritime-blue-light">
                  Token supply, distribution, and contract information
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="grid gap-6 md:grid-cols-3">
                    <Skeleton className="h-32 bg-maritime-blue/20" />
                    <Skeleton className="h-32 bg-maritime-blue/20" />
                    <Skeleton className="h-32 bg-maritime-blue/20" />
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="group relative overflow-hidden rounded-xl border-2 border-maritime-gold/30 bg-gradient-to-br from-maritime-gold/10 to-black/60 p-8 transition-all hover:border-maritime-gold hover:shadow-2xl hover:shadow-maritime-gold/30">
                      <div className="absolute inset-0 bg-gradient-to-br from-maritime-gold/0 via-maritime-gold/10 to-maritime-gold/0 opacity-0 transition-opacity group-hover:opacity-100" />
                      <div className="relative">
                        <div className="text-sm font-medium text-maritime-blue-light">Total Supply</div>
                        <div className="mt-3 text-4xl font-bold text-maritime-gold">
                          {tokenomics?.totalSupply ? Number(tokenomics.totalSupply).toLocaleString() : '1,000,000,000'}
                        </div>
                        <div className="mt-2 text-xs text-maritime-blue-light">{tokenomics?.symbol || 'BGKD'}</div>
                      </div>
                    </div>
                    <div className="group relative overflow-hidden rounded-xl border-2 border-maritime-gold/30 bg-gradient-to-br from-maritime-gold/10 to-black/60 p-8 transition-all hover:border-maritime-gold hover:shadow-2xl hover:shadow-maritime-gold/30">
                      <div className="absolute inset-0 bg-gradient-to-br from-maritime-gold/0 via-maritime-gold/10 to-maritime-gold/0 opacity-0 transition-opacity group-hover:opacity-100" />
                      <div className="relative">
                        <div className="text-sm font-medium text-maritime-blue-light">Governance</div>
                        <div className="mt-3 text-lg font-semibold text-maritime-gold">
                          {tokenomics?.governance || 'DAO-Based'}
                        </div>
                        <div className="mt-2 text-xs text-maritime-blue-light">Community-driven decisions</div>
                      </div>
                    </div>
                    <div className="group relative overflow-hidden rounded-xl border-2 border-maritime-gold/30 bg-gradient-to-br from-maritime-gold/10 to-black/60 p-8 transition-all hover:border-maritime-gold hover:shadow-2xl hover:shadow-maritime-gold/30">
                      <div className="absolute inset-0 bg-gradient-to-br from-maritime-gold/0 via-maritime-gold/10 to-maritime-gold/0 opacity-0 transition-opacity group-hover:opacity-100" />
                      <div className="relative">
                        <div className="text-sm font-medium text-maritime-blue-light">Utility</div>
                        <div className="mt-3 text-lg font-semibold text-maritime-gold">
                          {tokenomics?.utility || 'Multi-Purpose'}
                        </div>
                        <div className="mt-2 text-xs text-maritime-blue-light">Payments, staking, rewards</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Roadmap */}
            <Card className="border-2 border-maritime-gold/30 bg-gradient-to-br from-black/80 to-maritime-navy/80 backdrop-blur-lg shadow-xl shadow-maritime-gold/10">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-maritime-gold/20 p-3">
                    <Calendar className="h-8 w-8 text-maritime-gold" />
                  </div>
                  <CardTitle className="text-3xl text-maritime-gold">Roadmap</CardTitle>
                </div>
                <CardDescription className="text-lg text-maritime-blue-light">
                  Key milestones and future development
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-maritime-blue-light">
                <p className="text-lg leading-relaxed">
                  {tokenomics?.roadmap || 'Our roadmap focuses on expanding token utility, enhancing blockchain infrastructure, and building strategic partnerships across the maritime industry.'}
                </p>
              </CardContent>
            </Card>

            {/* Compliance Notice */}
            <Alert className="border-2 border-maritime-gold/30 bg-gradient-to-br from-black/80 to-maritime-navy/80 backdrop-blur-lg">
              <Shield className="h-5 w-5 text-maritime-gold" />
              <AlertDescription className="text-maritime-blue-light">
                <strong className="text-maritime-gold">Compliance Notice:</strong>{' '}
                {tokenomics?.complianceNotice || 'This token is subject to applicable securities laws and regulations. Please consult with legal and financial advisors before participating.'}
              </AlertDescription>
            </Alert>

            {/* Official Email Contacts */}
            <Card className="border-2 border-maritime-gold/30 bg-gradient-to-br from-black/80 to-maritime-navy/80 backdrop-blur-lg shadow-xl shadow-maritime-gold/10">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-maritime-gold/20 p-3">
                    <Mail className="h-8 w-8 text-maritime-gold" />
                  </div>
                  <CardTitle className="text-3xl text-maritime-gold">📧 Official Email Contacts</CardTitle>
                </div>
                <CardDescription className="text-lg text-maritime-blue-light">
                  Reach out to our team for inquiries and support
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { label: 'Admin', email: 'admin@kdpay.sbs' },
                    { label: 'Info', email: 'info@kdpay.sbs' },
                    { label: 'Support', email: 'support@kdpay.sbs' },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-maritime-gold/30 bg-black/40 p-4 text-center transition-all hover:border-maritime-gold/60 hover:shadow-lg hover:shadow-maritime-gold/20"
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
                    <strong className="text-maritime-gold">Enterprise-Safe Disclaimer:</strong>{' '}
                    Emails are used for official communication only. No sensitive financial credentials should be shared via email.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Investor Inquiry Form */}
            <Card className="border-2 border-maritime-gold/30 bg-gradient-to-br from-black/80 to-maritime-navy/80 backdrop-blur-lg shadow-xl shadow-maritime-gold/10">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-maritime-gold/20 p-3">
                    <Send className="h-8 w-8 text-maritime-gold" />
                  </div>
                  <CardTitle className="text-3xl text-maritime-gold">Investor Inquiry</CardTitle>
                </div>
                <CardDescription className="text-lg text-maritime-blue-light">
                  Interested in learning more? Get in touch with our team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-maritime-gold">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      required
                      className="border-maritime-gold/30 bg-black/40 text-white placeholder:text-maritime-blue-light"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-maritime-gold">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      required
                      className="border-maritime-gold/30 bg-black/40 text-white placeholder:text-maritime-blue-light"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-maritime-gold">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your interest in Bgkd Token..."
                      rows={6}
                      required
                      className="border-maritime-gold/30 bg-black/40 text-white placeholder:text-maritime-blue-light"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-maritime-gold text-black hover:bg-maritime-gold/90 hover:shadow-lg hover:shadow-maritime-gold/50 transition-all"
                    disabled={submitInvestorInquiry.isPending}
                  >
                    {submitInvestorInquiry.isPending ? 'Sending...' : 'Submit Inquiry'}
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
