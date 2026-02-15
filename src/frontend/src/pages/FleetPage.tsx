import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGetVessels } from '@/hooks/useQueries';
import { Loader2, Ship } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';

export default function FleetPage() {
  const { data: vessels, isLoading } = useGetVessels();
  const [selectedType, setSelectedType] = useState<string>('all');

  const vesselTypes = ['all', 'cargo', 'tanker', 'supply'];

  const filteredVessels = selectedType === 'all'
    ? vessels
    : vessels?.filter((v) => v.vesselType.toLowerCase() === selectedType);

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
          <h1 className="mb-4 text-5xl font-bold text-white">Our Fleet</h1>
          <p className="mx-auto max-w-2xl text-xl text-maritime-blue-light">
            A diverse fleet of vessels managed with excellence
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="border-b border-maritime-border bg-maritime-section py-6">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-2">
            {vesselTypes.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? 'default' : 'outline'}
                onClick={() => setSelectedType(type)}
                className={
                  selectedType === type
                    ? 'bg-maritime-gold text-maritime-navy hover:bg-maritime-gold/90'
                    : 'border-maritime-border text-maritime-blue-light hover:bg-maritime-gold/10'
                }
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="py-16">
        <div className="container">
          {filteredVessels && filteredVessels.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredVessels.map((vessel) => (
                <Card
                  key={vessel.id}
                  className="group overflow-hidden border-maritime-border bg-maritime-card transition-all hover:shadow-xl"
                >
                  <div className="relative h-48 overflow-hidden bg-maritime-navy">
                    {vessel.image ? (
                      <OptimizedImage
                        src={vessel.image.getDirectURL()}
                        alt={vessel.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Ship className="h-16 w-16 text-maritime-gold/30" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-xl font-bold text-maritime-navy dark:text-maritime-gold">
                        {vessel.name}
                      </h3>
                      <span className="rounded-full bg-maritime-gold/10 px-3 py-1 text-xs font-semibold text-maritime-gold">
                        {vessel.vesselType}
                      </span>
                    </div>
                    <p className="mb-4 text-maritime-blue-light">{vessel.description}</p>
                    <div className="flex items-center justify-between border-t border-maritime-border pt-4">
                      <span className="text-sm text-maritime-blue-light">Capacity</span>
                      <span className="font-semibold text-maritime-navy dark:text-maritime-gold">
                        {vessel.capacity.toLocaleString()} tons
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <Ship className="mx-auto mb-4 h-16 w-16 text-maritime-gold/30" />
              <p className="text-lg text-maritime-blue-light">
                No vessels found in this category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Fleet Stats */}
      <section className="bg-maritime-navy py-16">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-maritime-border bg-maritime-card/10 text-center backdrop-blur">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-maritime-gold">
                  {vessels?.length || 0}
                </div>
                <div className="mt-2 text-maritime-blue-light">Total Vessels</div>
              </CardContent>
            </Card>
            <Card className="border-maritime-border bg-maritime-card/10 text-center backdrop-blur">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-maritime-gold">
                  {vessels?.reduce((sum, v) => sum + Number(v.capacity), 0).toLocaleString() || 0}
                </div>
                <div className="mt-2 text-maritime-blue-light">Total Capacity (tons)</div>
              </CardContent>
            </Card>
            <Card className="border-maritime-border bg-maritime-card/10 text-center backdrop-blur">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-maritime-gold">
                  {new Set(vessels?.map((v) => v.vesselType)).size || 0}
                </div>
                <div className="mt-2 text-maritime-blue-light">Vessel Types</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
