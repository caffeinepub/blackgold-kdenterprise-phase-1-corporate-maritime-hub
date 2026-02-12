import { useState, useEffect } from 'react';
import { useTokenomics, useSubmitInvestorInquiry } from '@/hooks/useQueries';
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
  const { data: tokenomics, isLoading } = useTokenomics();
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
                          {tokenomics?.totalSupply
                            ? Number(tokenomics.totalSupply).toLocaleString()
                            : '100,000,000'}
                        </div>
                        <div className="mt-2 text-sm text-maritime-blue-light">BGKD Tokens</div>
                      </div>
                    </div>
                    <div className="group relative overflow-hidden rounded-xl border-2 border-maritime-gold/30 bg-gradient-to-br from-maritime-gold/10 to-black/60 p-8 transition-all hover:border-maritime-gold hover:shadow-2xl hover:shadow-maritime-gold/30">
                      <div className="absolute inset-0 bg-gradient-to-br from-maritime-gold/0 via-maritime-gold/10 to-maritime-gold/0 opacity-0 transition-opacity group-hover:opacity-100" />
                      <div className="relative">
                        <div className="text-sm font-medium text-maritime-blue-light">Token Symbol</div>
                        <div className="mt-3 text-4xl font-bold text-maritime-gold">
                          {tokenomics?.symbol || 'BGKD'}
                        </div>
                        <div className="mt-2 text-sm text-maritime-blue-light">Blackgold Kdenterprise</div>
                      </div>
                    </div>
                    <div className="group relative overflow-hidden rounded-xl border-2 border-maritime-gold/30 bg-gradient-to-br from-maritime-gold/10 to-black/60 p-8 transition-all hover:border-maritime-gold hover:shadow-2xl hover:shadow-maritime-gold/30">
                      <div className="absolute inset-0 bg-gradient-to-br from-maritime-gold/0 via-maritime-gold/10 to-maritime-gold/0 opacity-0 transition-opacity group-hover:opacity-100" />
                      <div className="relative">
                        <div className="text-sm font-medium text-maritime-blue-light">Contract</div>
                        <div className="mt-3 text-lg font-bold text-maritime-gold">
                          View on Explorer
                        </div>
                        <Button
                          variant="link"
                          size="sm"
                          className="mt-2 h-auto p-0 text-maritime-blue-light hover:text-maritime-gold"
                          onClick={() => window.open(tokenomics?.contractLink || '#', '_blank')}
                        >
                          <ExternalLink className="mr-1 h-4 w-4" />
                          Open Contract
                        </Button>
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
                  Timeline of project milestones and future expansion
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-24 bg-maritime-blue/20" />
                    <Skeleton className="h-24 bg-maritime-blue/20" />
                    <Skeleton className="h-24 bg-maritime-blue/20" />
                    <Skeleton className="h-24 bg-maritime-blue/20" />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="group relative overflow-hidden rounded-xl border-2 border-maritime-gold/30 bg-black/40 p-6 transition-all hover:border-maritime-gold/60 hover:shadow-lg hover:shadow-maritime-gold/20">
                      <div className="flex items-start gap-4">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-maritime-gold bg-maritime-gold/10 text-2xl font-bold text-maritime-gold">
                          2025
                        </div>
                        <div className="flex-1">
                          <h4 className="mb-2 text-xl font-semibold text-maritime-gold">Launch</h4>
                          <p className="leading-relaxed text-maritime-blue-light">
                            Token development, smart contract deployment, security audits, and initial private sale. 
                            Launch of staking platform and governance framework.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="group relative overflow-hidden rounded-xl border-2 border-maritime-gold/30 bg-black/40 p-6 transition-all hover:border-maritime-gold/60 hover:shadow-lg hover:shadow-maritime-gold/20">
                      <div className="flex items-start gap-4">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-maritime-gold bg-maritime-gold/10 text-2xl font-bold text-maritime-gold">
                          2026
                        </div>
                        <div className="flex-1">
                          <h4 className="mb-2 text-xl font-semibold text-maritime-gold">Exchange Listings</h4>
                          <p className="leading-relaxed text-maritime-blue-light">
                            Public token sale, listings on major cryptocurrency exchanges, expansion of liquidity pools, 
                            and integration with DeFi platforms.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="group relative overflow-hidden rounded-xl border-2 border-maritime-gold/30 bg-black/40 p-6 transition-all hover:border-maritime-gold/60 hover:shadow-lg hover:shadow-maritime-gold/20">
                      <div className="flex items-start gap-4">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-maritime-gold bg-maritime-gold/10 text-2xl font-bold text-maritime-gold">
                          2027
                        </div>
                        <div className="flex-1">
                          <h4 className="mb-2 text-xl font-semibold text-maritime-gold">Maritime Integrations</h4>
                          <p className="leading-relaxed text-maritime-blue-light">
                            Full integration across all maritime services, vessel management systems, crew payment platforms, 
                            and offshore operations. Launch of maritime NFT marketplace.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="group relative overflow-hidden rounded-xl border-2 border-maritime-gold/30 bg-black/40 p-6 transition-all hover:border-maritime-gold/60 hover:shadow-lg hover:shadow-maritime-gold/20">
                      <div className="flex items-start gap-4">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-maritime-gold bg-maritime-gold/10 text-2xl font-bold text-maritime-gold">
                          2028
                        </div>
                        <div className="flex-1">
                          <h4 className="mb-2 text-xl font-semibold text-maritime-gold">Global Expansion</h4>
                          <p className="leading-relaxed text-maritime-blue-light">
                            Expansion to new maritime markets, strategic partnerships with international shipping companies, 
                            and establishment of regional token hubs across 45+ countries.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Investor & Whitepaper Section */}
            <Card className="border-2 border-maritime-gold/30 bg-gradient-to-br from-black/80 to-maritime-navy/80 backdrop-blur-lg shadow-xl shadow-maritime-gold/10">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-maritime-gold/20 p-3">
                    <FileText className="h-8 w-8 text-maritime-gold" />
                  </div>
                  <CardTitle className="text-3xl text-maritime-gold">Investor & Whitepaper</CardTitle>
                </div>
                <CardDescription className="text-lg text-maritime-blue-light">
                  Explore investment opportunities and our comprehensive whitepaper
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-6 text-maritime-blue-light">
                  <p className="text-lg leading-relaxed">
                    The <span className="font-semibold text-maritime-gold">Bgkd Crypto Token</span> represents a unique investment opportunity 
                    at the intersection of traditional maritime operations and cutting-edge blockchain technology. Our token is backed by 
                    real-world assets and decades of industry expertise.
                  </p>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-lg border border-maritime-gold/30 bg-black/40 p-6">
                      <h4 className="mb-3 text-xl font-semibold text-maritime-gold">Long-Term Vision</h4>
                      <p className="leading-relaxed">
                        We envision a future where maritime operations are fully integrated with blockchain technology, 
                        creating unprecedented transparency, efficiency, and profitability. Our token holders will be at 
                        the forefront of this transformation, benefiting from early adoption and strategic positioning.
                      </p>
                    </div>
                    <div className="rounded-lg border border-maritime-gold/30 bg-black/40 p-6">
                      <h4 className="mb-3 text-xl font-semibold text-maritime-gold">Investment Opportunity</h4>
                      <p className="leading-relaxed">
                        With 30 years of maritime excellence, a fleet of 200+ vessels, and operations across 45 countries, 
                        Blackgold Kdenterprise offers investors exposure to a proven business model enhanced by blockchain 
                        innovation. Our token provides utility, governance rights, and potential appreciation.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 pt-4">
                    <Button
                      size="lg"
                      className="bg-maritime-gold text-black hover:bg-maritime-gold/90 hover:shadow-lg hover:shadow-maritime-gold/50 transition-all"
                      onClick={() => window.open(tokenomics?.whitepaperLink || '#', '_blank')}
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download Whitepaper
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

                {/* Investor Inquiry Form */}
                <div className="rounded-xl border-2 border-maritime-gold/40 bg-gradient-to-br from-maritime-gold/5 to-black/60 p-6 md:p-8">
                  <h3 className="mb-6 text-2xl font-semibold text-maritime-gold">Investor Inquiry</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-maritime-blue-light">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="border-maritime-gold/30 bg-black/40 text-white placeholder:text-maritime-blue-light/50 focus:border-maritime-gold"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-maritime-blue-light">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="border-maritime-gold/30 bg-black/40 text-white placeholder:text-maritime-blue-light/50 focus:border-maritime-gold"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-maritime-blue-light">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your investment interests and any questions you have..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="min-h-32 border-maritime-gold/30 bg-black/40 text-white placeholder:text-maritime-blue-light/50 focus:border-maritime-gold"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-maritime-gold text-black hover:bg-maritime-gold/90 hover:shadow-lg hover:shadow-maritime-gold/50 transition-all"
                      disabled={submitInvestorInquiry.isPending}
                    >
                      {submitInvestorInquiry.isPending ? (
                        <>
                          <span className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Submit Inquiry
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Notice */}
            <Alert className="border-2 border-maritime-gold/50 bg-gradient-to-br from-black/80 to-maritime-navy/80 backdrop-blur-lg shadow-xl shadow-maritime-gold/10">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-maritime-gold/20 p-3">
                  <Shield className="h-6 w-6 text-maritime-gold" />
                </div>
                <AlertDescription className="flex-1 text-maritime-blue-light">
                  <h4 className="mb-3 text-2xl font-semibold text-maritime-gold">Compliance Notice</h4>
                  <div className="space-y-3 leading-relaxed">
                    <p>
                      The <span className="font-semibold text-maritime-gold">Bgkd Crypto Token</span> follows transparent operations 
                      in accordance with crypto regulations. We are committed to maintaining the highest standards of compliance 
                      across all jurisdictions where our token is offered.
                    </p>
                    <p>
                      Our operations adhere to KYC (Know Your Customer) and AML (Anti-Money Laundering) procedures, ensuring 
                      secure and legitimate transactions. All token holders undergo verification processes in compliance with 
                      international financial regulations.
                    </p>
                    <p>
                      This token is designed as a utility token for maritime operations and is not intended as a security or 
                      investment contract. Token holders should conduct their own research and consult with financial advisors 
                      before participating. Cryptocurrency investments carry inherent risks.
                    </p>
                    <p className="text-sm italic">
                      By participating in the Bgkd token ecosystem, you acknowledge that you have read and understood all 
                      associated risks and comply with your local regulations regarding cryptocurrency ownership and trading.
                    </p>
                  </div>
                </AlertDescription>
              </div>
            </Alert>

            {/* Official Email Contacts Section */}
            <Card className="border-2 border-maritime-gold/30 bg-white shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-maritime-navy p-3">
                    <Mail className="h-8 w-8 text-maritime-gold" />
                  </div>
                  <CardTitle className="text-3xl text-maritime-navy">📧 Official Email Contacts</CardTitle>
                </div>
                <CardDescription className="text-lg text-maritime-navy/70">
                  Reach out to our team for official communications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="rounded-lg border-2 border-maritime-navy/20 bg-maritime-navy/5 p-6 transition-all hover:border-maritime-gold hover:shadow-lg">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="rounded-full bg-maritime-gold/20 p-2">
                        <i className="fas fa-user-shield text-2xl text-maritime-navy"></i>
                      </div>
                      <h4 className="text-xl font-semibold text-maritime-navy">Administration</h4>
                    </div>
                    <a
                      href="mailto:admin@kdpay.sbs"
                      className="block text-lg font-medium text-maritime-gold transition-colors hover:text-maritime-navy"
                    >
                      admin@kdpay.sbs
                    </a>
                  </div>
                  <div className="rounded-lg border-2 border-maritime-navy/20 bg-maritime-navy/5 p-6 transition-all hover:border-maritime-gold hover:shadow-lg">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="rounded-full bg-maritime-gold/20 p-2">
                        <i className="fas fa-info-circle text-2xl text-maritime-navy"></i>
                      </div>
                      <h4 className="text-xl font-semibold text-maritime-navy">Information</h4>
                    </div>
                    <a
                      href="mailto:info@kdpay.sbs"
                      className="block text-lg font-medium text-maritime-gold transition-colors hover:text-maritime-navy"
                    >
                      info@kdpay.sbs
                    </a>
                  </div>
                  <div className="rounded-lg border-2 border-maritime-navy/20 bg-maritime-navy/5 p-6 transition-all hover:border-maritime-gold hover:shadow-lg">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="rounded-full bg-maritime-gold/20 p-2">
                        <i className="fas fa-headset text-2xl text-maritime-navy"></i>
                      </div>
                      <h4 className="text-xl font-semibold text-maritime-navy">Support</h4>
                    </div>
                    <a
                      href="mailto:support@kdpay.sbs"
                      className="block text-lg font-medium text-maritime-gold transition-colors hover:text-maritime-navy"
                    >
                      support@kdpay.sbs
                    </a>
                  </div>
                </div>
                <div className="mt-6 rounded-lg border border-maritime-gold/30 bg-maritime-gold/5 p-4">
                  <p className="text-center text-sm text-maritime-navy/80">
                    <strong className="text-maritime-navy">Enterprise-Safe Disclaimer:</strong> Emails are used for official communication only. 
                    No sensitive financial credentials should be shared via email.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative overflow-hidden border-t border-maritime-gold/20 bg-gradient-to-b from-black to-maritime-navy py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/3 top-1/2 h-96 w-96 animate-pulse rounded-full bg-maritime-gold/10 blur-3xl" />
          <div className="absolute right-1/3 bottom-1/2 h-96 w-96 animate-pulse rounded-full bg-maritime-gold/10 blur-3xl animation-delay-1000" />
        </div>
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-4xl font-bold text-maritime-gold md:text-5xl">
              Ready to Get Started?
            </h2>
            <p className="mb-10 text-xl text-maritime-blue-light">
              Join the future of maritime finance with Bgkd Crypto Tokens
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-maritime-gold text-black hover:bg-maritime-gold/90 hover:shadow-2xl hover:shadow-maritime-gold/50 transition-all"
                onClick={() => window.open(tokenomics?.whitepaperLink || '#', '_blank')}
              >
                <FileText className="mr-2 h-5 w-5" />
                Download Whitepaper
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-maritime-gold text-maritime-gold hover:bg-maritime-gold/10 hover:shadow-2xl hover:shadow-maritime-gold/30 transition-all"
                onClick={() => window.open(tokenomics?.contractLink || '#', '_blank')}
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                View Contract
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
