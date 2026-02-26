import { useState, useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGetAllShipments } from '@/hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Ship, Plus, Package } from 'lucide-react';
import { ShipmentStatus } from '@/backend';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import CreateShipmentForm from '@/components/shipping/CreateShipmentForm';

export default function ShippingDashboardPage() {
  const navigate = useNavigate();
  const { data: shipments, isLoading, error } = useGetAllShipments();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const filteredShipments = useMemo(() => {
    if (!shipments) return [];
    if (statusFilter === 'all') return shipments;
    return shipments.filter((s) => s.currentStatus === statusFilter);
  }, [shipments, statusFilter]);

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
    return new Date(Number(timestamp) / 1000000).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-maritime-gold" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="border-destructive">
          <CardContent className="p-6">
            <p className="text-destructive">Error loading shipments. Please try again.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-maritime-navy py-12">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-4xl font-bold text-white">Shipping Dashboard</h1>
              <p className="text-xl text-maritime-blue-light">
                Manage and track all shipments
              </p>
            </div>
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-maritime-gold text-maritime-navy hover:bg-maritime-gold/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Shipment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Shipment</DialogTitle>
                </DialogHeader>
                <CreateShipmentForm onSuccess={() => setCreateDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-maritime-border bg-maritime-section py-6">
        <div className="container">
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="border-maritime-border">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-maritime-gold">
                  {shipments?.length || 0}
                </div>
                <div className="text-sm text-maritime-blue-light">Total Shipments</div>
              </CardContent>
            </Card>
            <Card className="border-maritime-border">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-yellow-600">
                  {shipments?.filter((s) => s.currentStatus === 'pending').length || 0}
                </div>
                <div className="text-sm text-maritime-blue-light">Pending</div>
              </CardContent>
            </Card>
            <Card className="border-maritime-border">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">
                  {shipments?.filter((s) => s.currentStatus === 'inTransit').length || 0}
                </div>
                <div className="text-sm text-maritime-blue-light">In Transit</div>
              </CardContent>
            </Card>
            <Card className="border-maritime-border">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {shipments?.filter((s) => s.currentStatus === 'delivered').length || 0}
                </div>
                <div className="text-sm text-maritime-blue-light">Delivered</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Filter and Table Section */}
      <section className="py-8">
        <div className="container">
          <Card className="border-maritime-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-maritime-gold" />
                  All Shipments
                </CardTitle>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inTransit">In Transit</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {filteredShipments.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Shipment ID</TableHead>
                        <TableHead>Vessel</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead>Departure</TableHead>
                        <TableHead>ETA</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Cargo Items</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredShipments.map((shipment) => (
                        <TableRow
                          key={shipment.id}
                          className="cursor-pointer hover:bg-maritime-section"
                          onClick={() => navigate({ to: `/shipments/${shipment.id}` })}
                        >
                          <TableCell className="font-mono text-sm">
                            {shipment.id.substring(0, 12)}...
                          </TableCell>
                          <TableCell className="font-medium">{shipment.vesselId}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="text-sm">{shipment.originPort}</span>
                              <span className="text-xs text-maritime-blue-light">→ {shipment.destinationPort}</span>
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(shipment.departureDate)}</TableCell>
                          <TableCell>{formatDate(shipment.estimatedArrivalDate)}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(shipment.currentStatus)}>
                              {getStatusLabel(shipment.currentStatus)}
                            </Badge>
                          </TableCell>
                          <TableCell>{shipment.cargoDetails.length}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Ship className="mx-auto mb-4 h-16 w-16 text-maritime-gold/30" />
                  <p className="text-lg text-maritime-blue-light">
                    {statusFilter === 'all'
                      ? 'No shipments found'
                      : `No ${statusFilter} shipments found`}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
