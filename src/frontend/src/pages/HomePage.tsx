import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCompanyInfo } from '@/hooks/useQueries';
import { Ship, Users, Globe, Calendar, ArrowRight } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';

export default function HomePage() {
  const navigate = useNavigate();
  const { data: companyInfo, isLoading } = useCompanyInfo();

  const metrics = [
    {
      icon: Ship,
      value: companyInfo?.metrics.vessels ? `${companyInfo.metrics.vessels}+` : '200+',
      label: 'Vessels',
    },
    {
      icon: Users,
      value: companyInfo?.metrics.crew ? `${companyInfo.metrics.crew.toLocaleString()}+` : '5,000+',
      label: 'Crew Members',
    },
    {
      icon: Globe,
      value: companyInfo?.metrics.countries ? `${companyInfo.metrics.countries}` : '45',
      label: 'Countries',
    },
    {
      icon: Calendar,
      value: companyInfo?.metrics.years ? `${companyInfo.metrics.years}` : '30',
      label: 'Years Experience',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden bg-maritime-navy">
        <div className="absolute inset-0">
          <OptimizedImage
            src="/assets/generated/hero-maritime.dim_1920x800.jpg"
            alt="Maritime operations"
            className="h-full w-full object-cover opacity-40"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-maritime-navy via-maritime-navy/80 to-transparent" />
        </div>

        <div className="container relative flex h-full flex-col justify-center">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              {companyInfo?.tagline || 'Navigating the Future of Maritime'}
            </h1>
            <p className="text-xl text-maritime-blue-light md:text-2xl">
              Leading maritime and offshore operations since 1995
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => navigate({ to: '/services' })}
                className="bg-maritime-gold text-maritime-navy hover:bg-maritime-gold/90"
              >
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate({ to: '/fleet' })}
                className="border-maritime-gold text-maritime-gold hover:bg-maritime-gold/10"
              >
                View Fleet
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="bg-maritime-section py-16">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, index) => (
              <Card
                key={index}
                className="border-maritime-border bg-maritime-card transition-all hover:scale-105 hover:shadow-lg"
              >
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <metric.icon className="mb-4 h-12 w-12 text-maritime-gold" />
                  <div className="text-4xl font-bold text-maritime-gold">{metric.value}</div>
                  <div className="mt-2 text-sm text-maritime-blue-light">{metric.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-maritime-navy dark:text-maritime-gold">
              Our Services
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-maritime-blue-light">
              Comprehensive maritime solutions for the global shipping industry
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Ship Management',
                description: 'Complete technical and operational management of vessels',
                image: '/assets/generated/cargo-vessel.dim_600x400.jpg',
              },
              {
                title: 'Crew Management',
                description: 'Professional crew recruitment, training, and welfare programs',
                image: '/assets/generated/crew-working.dim_800x600.jpg',
              },
              {
                title: 'Underwater Mining',
                description: 'Advanced subsea gold extraction with ROV technology',
                image: '/assets/generated/rov-mining-equipment.dim_800x600.jpg',
              },
              {
                title: 'Oil & Gas Operations',
                description: 'Offshore crewing and rig management with safety focus',
                image: '/assets/generated/oil-rig-platform.dim_800x600.jpg',
              },
              {
                title: 'Ship Repairs',
                description: 'Comprehensive repair and maintenance services',
                image: '/assets/generated/ship-repair-facility.dim_800x600.jpg',
              },
              {
                title: 'Subsea Exploration',
                description: '3,000m depth capability with 98% recovery rate',
                image: '/assets/generated/subsea-exploration.dim_800x600.jpg',
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="group overflow-hidden border-maritime-border bg-maritime-card transition-all hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <OptimizedImage
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maritime-navy/80 to-transparent" />
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-maritime-navy dark:text-maritime-gold">
                    {service.title}
                  </h3>
                  <p className="text-maritime-blue-light">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              onClick={() => navigate({ to: '/services' })}
              className="bg-maritime-gold text-maritime-navy hover:bg-maritime-gold/90"
            >
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-maritime-navy py-20">
        <div className="container text-center">
          <h2 className="mb-4 text-4xl font-bold text-white">Ready to Set Sail?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-maritime-blue-light">
            Join our team or partner with us for your maritime operations
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate({ to: '/careers' })}
              className="bg-maritime-gold text-maritime-navy hover:bg-maritime-gold/90"
            >
              Explore Careers
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate({ to: '/contact' })}
              className="border-maritime-gold text-maritime-gold hover:bg-maritime-gold/10"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
