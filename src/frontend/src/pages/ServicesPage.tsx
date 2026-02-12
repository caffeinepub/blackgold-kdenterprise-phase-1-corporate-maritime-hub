import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useServices } from '@/hooks/useQueries';
import { Loader2, Ship, Users, Wrench, Anchor, Drill, HardHat, Settings, ShoppingCart, Waves } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';

const serviceIcons: Record<string, any> = {
  'ship-brokerage': Ship,
  'technical-management': Settings,
  'chartering-management': Anchor,
  'crew-management': Users,
  'underwater-mining': Drill,
  'offshore-crewing': HardHat,
  'ship-management': Ship,
  'ship-repairs': Wrench,
  'ship-buying-sailing': ShoppingCart,
};

export default function ServicesPage() {
  const { data: services, isLoading } = useServices();
  const [selectedService, setSelectedService] = useState<any>(null);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-maritime-gold" />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-maritime-navy py-20">
        <div className="container text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">Our Services</h1>
          <p className="mx-auto max-w-2xl text-xl text-maritime-blue-light">
            Comprehensive maritime solutions tailored to your needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services?.map((service) => {
              const IconComponent = serviceIcons[service.id] || Waves;
              return (
                <Card
                  key={service.id}
                  className="group border-maritime-border bg-maritime-card transition-all hover:shadow-xl"
                >
                  <CardHeader>
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-maritime-gold/10">
                      <IconComponent className="h-8 w-8 text-maritime-gold" />
                    </div>
                    <CardTitle className="text-maritime-navy dark:text-maritime-gold">
                      {service.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-maritime-blue-light">{service.description}</p>
                    <Button
                      onClick={() => setSelectedService(service)}
                      className="w-full bg-maritime-gold text-maritime-navy hover:bg-maritime-gold/90"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Special Sections */}
      <section className="bg-maritime-section py-16">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Oil & Gas Sector */}
            <Card className="border-maritime-border bg-maritime-card">
              <div className="relative h-64 overflow-hidden rounded-t-lg">
                <OptimizedImage
                  src="/assets/generated/oil-rig-platform.dim_800x600.jpg"
                  alt="Oil & Gas Operations"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-maritime-navy dark:text-maritime-gold">
                  Oil & Gas Sector
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-maritime-blue-light">
                  Specialized offshore crewing and rig management services with an unwavering focus on safety and operational excellence.
                </p>
                <ul className="space-y-2 text-maritime-blue-light">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-maritime-gold" />
                    <span>Offshore platform crew management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-maritime-gold" />
                    <span>Rig operations and maintenance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-maritime-gold" />
                    <span>Safety compliance and training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-maritime-gold" />
                    <span>24/7 operational support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Subsea Exploration */}
            <Card className="border-maritime-border bg-maritime-card">
              <div className="relative h-64 overflow-hidden rounded-t-lg">
                <OptimizedImage
                  src="/assets/generated/subsea-exploration.dim_800x600.jpg"
                  alt="Subsea Exploration"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-maritime-navy dark:text-maritime-gold">
                  Subsea Exploration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-maritime-blue-light">
                  Advanced subsea capabilities with cutting-edge technology and environmental commitment.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-maritime-gold/10 p-4 text-center">
                    <div className="text-3xl font-bold text-maritime-gold">3,000m</div>
                    <div className="text-sm text-maritime-blue-light">Depth Capability</div>
                  </div>
                  <div className="rounded-lg bg-maritime-gold/10 p-4 text-center">
                    <div className="text-3xl font-bold text-maritime-gold">98%</div>
                    <div className="text-sm text-maritime-blue-light">Recovery Rate</div>
                  </div>
                </div>
                <ul className="space-y-2 text-maritime-blue-light">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-maritime-gold" />
                    <span>ROV-based operations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-maritime-gold" />
                    <span>Environmental protection protocols</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-maritime-gold" />
                    <span>Sustainable extraction methods</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Details Dialog */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-maritime-navy dark:text-maritime-gold">
              {selectedService?.name}
            </DialogTitle>
            <DialogDescription className="text-maritime-blue-light">
              {selectedService?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="prose prose-sm max-w-none text-maritime-blue-light dark:prose-invert">
              <p>{selectedService?.details}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
