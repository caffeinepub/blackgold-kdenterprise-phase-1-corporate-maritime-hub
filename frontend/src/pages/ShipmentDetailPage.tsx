import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetShipmentById } from '@/hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2, ArrowLeft, Ship, Package, FileText, MapPin, Calendar } from 'lucide-react';
import { ShipmentStatus } from '@/backend';

export default function ShipmentDetailPage() {
  const { shipmentId } = useParams({ strict: false }) as { shipmentId: string };
  const navigate = useNavigate();
  const { data: shipment, isLoading, error } = useGetShipmentById(shipmentId);

  const getStatusBadgeVariant = (status: ShipmentStatus): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
      case 'pending':
        return 'secondary';
      case 'inTransit':
        return 'default';
      case 'delivered':
        return 'outline';
      case 'cancelled':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: ShipmentStatus): string => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'inTransit':
        return 'In Transit';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const formatDate = (timestamp: bigint): string => {
    return new Date(Number(timestamp) / 1000000).toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-maritime-gold" />
      </div>
    );
  }

  if (error || !shipment) {
    return (
      <div className="container py-12">
        <Card className="border-destructive">
          <CardContent className="p-6">
            <p className="text-destructive">Shipment not found or error loading details.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => navigate({ to: '/shipping-dashboard' })}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-maritime-navy py-8">
        <div className="container">
          <Button
            variant="ghost"
            className="mb-4 text-maritime-blue-light hover:text-white"
            onClick={() => navigate({ to: '/shipping-dashboard' })}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-white">Shipment Details</h1>
              <p className="font-mono text-sm text-maritime-blue-light">{shipment.id}</p>
            </div>
            <Badge variant={getStatusBadgeVariant(shipment.currentStatus)} className="text-lg px-4 py-2">
              {getStatusLabel(shipment.currentStatus)}
            </Badge>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Route Information */}
              <Card className="border-maritime-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-maritime-gold" />
                    Route Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-maritime-blue-light">Origin Port</p>
                      <p className="text-lg font-semibold">{shipment.originPort}</p>
                    </div>
                    <div>
                      <p className="text-sm text-maritime-blue-light">Destination Port</p>
                      <p className="text-lg font-semibold">{shipment.destinationPort}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-maritime-blue-light">Departure Date</p>
                      <p className="font-medium">{formatDate(shipment.departureDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-maritime-blue-light">Estimated Arrival</p>
                      <p className="font-medium">{formatDate(shipment.estimatedArrivalDate)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cargo Manifest */}
              <Card className="border-maritime-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-maritime-gold" />
                    Cargo Manifest
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {shipment.cargoDetails.map((cargo, index) => (
                      <div key={cargo.id} className="rounded-lg border border-maritime-border p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-semibold">Item {index + 1}</span>
                          <Badge variant="outline">{cargo.containerNumber}</Badge>
                        </div>
                        <p className="mb-2 text-sm text-maritime-blue-light">{cargo.description}</p>
                        <div className="flex gap-4 text-sm">
                          <span>
                            <strong>Quantity:</strong> {Number(cargo.quantity)}
                          </span>
                          <span>
                            <strong>Weight:</strong> {cargo.weight} kg
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tracking Timeline */}
              <Card className="border-maritime-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-maritime-gold" />
                    Tracking Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {shipment.trackingTimeline.length > 0 ? (
                    <div className="space-y-4">
                      {shipment.trackingTimeline.map((update, index) => (
                        <div key={index} className="relative pl-8 pb-4 last:pb-0">
                          <div className="absolute left-0 top-1 h-3 w-3 rounded-full bg-maritime-gold" />
                          {index < shipment.trackingTimeline.length - 1 && (
                            <div className="absolute left-[5px] top-4 h-full w-0.5 bg-maritime-border" />
                          )}
                          <div>
                            <p className="font-semibold">{update.status}</p>
                            <p className="text-sm text-maritime-blue-light">{update.location}</p>
                            <p className="text-xs text-maritime-blue-light">
                              {formatDate(update.timestamp)}
                            </p>
                            {update.notes && (
                              <p className="mt-1 text-sm italic">{update.notes}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-maritime-blue-light py-4">
                      No tracking updates yet
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Metadata */}
            <div className="space-y-6">
              {/* Vessel Information */}
              <Card className="border-maritime-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ship className="h-5 w-5 text-maritime-gold" />
                    Vessel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-maritime-gold hover:text-maritime-gold/80"
                    onClick={() => navigate({ to: '/fleet' })}
                  >
                    {shipment.vesselId}
                  </Button>
                </CardContent>
              </Card>

              {/* Customs Documentation */}
              <Card className="border-maritime-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-maritime-gold" />
                    Customs Documentation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm whitespace-pre-wrap">{shipment.customsDocumentation}</p>
                </CardContent>
              </Card>

              {/* Metadata */}
              <Card className="border-maritime-border">
                <CardHeader>
                  <CardTitle>Metadata</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <p className="text-maritime-blue-light">Requester</p>
                    <p className="font-medium">{shipment.requester}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-maritime-blue-light">Assigned By</p>
                    <p className="font-mono text-xs break-all">{shipment.assignedBy}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-maritime-blue-light">Created At</p>
                    <p className="font-medium">{formatDate(shipment.createdAt)}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-maritime-blue-light">Last Updated</p>
                    <p className="font-medium">{formatDate(shipment.updatedAt)}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
