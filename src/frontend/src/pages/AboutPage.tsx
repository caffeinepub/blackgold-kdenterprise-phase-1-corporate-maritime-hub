import { Card, CardContent } from '@/components/ui/card';
import { useGetCompanyInfo } from '@/hooks/useQueries';
import { Award, Shield, Globe, TrendingUp, Loader2 } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';

export default function AboutPage() {
  const { data: companyInfo, isLoading } = useGetCompanyInfo();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-maritime-gold" />
      </div>
    );
  }

  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to the highest standards in maritime operations',
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Unwavering focus on crew safety and environmental protection',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Operating across 45 countries with local expertise',
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'Embracing technology to lead the maritime industry forward',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-maritime-navy py-20">
        <div className="container text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">About Us</h1>
          <p className="mx-auto max-w-2xl text-xl text-maritime-blue-light">
            Three decades of maritime excellence
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <Card className="border-maritime-border bg-maritime-card">
              <CardContent className="p-8">
                <h2 className="mb-6 text-3xl font-bold text-maritime-navy dark:text-maritime-gold">
                  Our Heritage
                </h2>
                <div className="space-y-4 text-lg text-maritime-blue-light">
                  <p>
                    Since our establishment in 1995, Blackgold Kdenterprise has been at the forefront of maritime and offshore operations. What began as a vision to revolutionize ship management has grown into a comprehensive maritime services provider operating across the globe.
                  </p>
                  <p>
                    With over 30 years of experience, we manage a fleet of 200+ vessels and employ more than 5,000 dedicated crew members. Our operations span 45 countries, bringing world-class maritime expertise to every corner of the globe.
                  </p>
                  <p>
                    From traditional ship management to cutting-edge subsea exploration and underwater mining, we continue to push the boundaries of what's possible in maritime operations while maintaining our commitment to safety, sustainability, and excellence.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-maritime-section py-16">
        <div className="container">
          <h2 className="mb-12 text-center text-4xl font-bold text-maritime-navy dark:text-maritime-gold">
            Our Values
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-maritime-border bg-maritime-card text-center transition-all hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-maritime-gold/10">
                      <value.icon className="h-8 w-8 text-maritime-gold" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-maritime-navy dark:text-maritime-gold">
                    {value.title}
                  </h3>
                  <p className="text-maritime-blue-light">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Quote */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <Card className="border-maritime-border bg-gradient-to-br from-maritime-navy to-maritime-blue">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col items-center gap-6 md:flex-row">
                  <div className="flex-shrink-0">
                    <OptimizedImage
                      src="/assets/generated/captain-portrait.dim_400x400.jpg"
                      alt="Capt. James Sterling"
                      className="h-32 w-32 rounded-full border-4 border-maritime-gold object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <blockquote className="mb-4 text-xl italic text-white md:text-2xl">
                      "{companyInfo?.leadershipQuote || 'The sea has always been our greatest teacher. It demands respect, rewards preparation, and never stops challenging us to be better. At Blackgold Kdenterprise, we embrace these lessons every day.'}"
                    </blockquote>
                    <div className="text-maritime-gold">
                      <div className="font-bold">Capt. James Sterling</div>
                      <div className="text-sm text-maritime-blue-light">Chief Executive Officer</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-maritime-section py-16">
        <div className="container">
          <h2 className="mb-12 text-center text-4xl font-bold text-maritime-navy dark:text-maritime-gold">
            Our Journey
          </h2>
          <div className="mx-auto max-w-3xl space-y-8">
            {[
              { year: '1995', title: 'Foundation', description: 'Blackgold Kdenterprise established with a vision for maritime excellence' },
              { year: '2005', title: 'Global Expansion', description: 'Extended operations to 25 countries across three continents' },
              { year: '2015', title: 'Technology Integration', description: 'Pioneered ROV technology for subsea operations' },
              { year: '2025', title: 'Industry Leader', description: 'Managing 200+ vessels with 5,000+ crew members worldwide' },
            ].map((milestone, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-maritime-gold text-maritime-navy font-bold">
                    {milestone.year.slice(-2)}
                  </div>
                  {index < 3 && <div className="w-0.5 flex-1 bg-maritime-gold/30" />}
                </div>
                <Card className="flex-1 border-maritime-border bg-maritime-card">
                  <CardContent className="p-6">
                    <div className="mb-1 text-sm font-semibold text-maritime-gold">{milestone.year}</div>
                    <h3 className="mb-2 text-xl font-bold text-maritime-navy dark:text-maritime-gold">
                      {milestone.title}
                    </h3>
                    <p className="text-maritime-blue-light">{milestone.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
