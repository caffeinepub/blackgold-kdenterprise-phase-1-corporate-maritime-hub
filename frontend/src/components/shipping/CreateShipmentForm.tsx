import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateShipment, useGetVessels } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { CargoItem } from '@/backend';

interface CreateShipmentFormProps {
  onSuccess?: () => void;
}

interface FormData {
  originPort: string;
  destinationPort: string;
  vesselId: string;
  departureDate: string;
  estimatedArrivalDate: string;
  customsDocumentation: string;
  requester: string;
}

interface CargoFormItem {
  id: string;
  description: string;
  quantity: string;
  weight: string;
  containerNumber: string;
}

export default function CreateShipmentForm({ onSuccess }: CreateShipmentFormProps) {
  const { data: vessels } = useGetVessels();
  const createShipment = useCreateShipment();
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<FormData>();
  const [cargoItems, setCargoItems] = useState<CargoFormItem[]>([
    { id: '1', description: '', quantity: '', weight: '', containerNumber: '' },
  ]);

  const departureDate = watch('departureDate');

  const addCargoItem = () => {
    setCargoItems([
      ...cargoItems,
      {
        id: Date.now().toString(),
        description: '',
        quantity: '',
        weight: '',
        containerNumber: '',
      },
    ]);
  };

  const removeCargoItem = (id: string) => {
    if (cargoItems.length > 1) {
      setCargoItems(cargoItems.filter((item) => item.id !== id));
    }
  };

  const updateCargoItem = (id: string, field: keyof CargoFormItem, value: string) => {
    setCargoItems(
      cargoItems.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const onSubmit = async (data: FormData) => {
    // Validate cargo items
    const invalidCargo = cargoItems.some(
      (item) =>
        !item.description ||
        !item.quantity ||
        !item.weight ||
        !item.containerNumber
    );

    if (invalidCargo) {
      toast.error('Please fill in all cargo item fields');
      return;
    }

    // Validate dates
    const departure = new Date(data.departureDate);
    const arrival = new Date(data.estimatedArrivalDate);

    if (arrival <= departure) {
      toast.error('Estimated arrival date must be after departure date');
      return;
    }

    try {
      const cargoDetails: CargoItem[] = cargoItems.map((item) => ({
        id: item.id,
        description: item.description,
        quantity: BigInt(item.quantity),
        weight: parseFloat(item.weight),
        containerNumber: item.containerNumber,
      }));

      await createShipment.mutateAsync({
        originPort: data.originPort,
        destinationPort: data.destinationPort,
        vesselId: data.vesselId,
        cargoDetails,
        departureDate: BigInt(departure.getTime() * 1000000),
        estimatedArrivalDate: BigInt(arrival.getTime() * 1000000),
        customsDocumentation: data.customsDocumentation,
        requester: data.requester,
      });

      toast.success('Shipment created successfully');
      reset();
      setCargoItems([
        { id: '1', description: '', quantity: '', weight: '', containerNumber: '' },
      ]);
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to create shipment');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Information</h3>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="originPort">Origin Port *</Label>
            <Input
              id="originPort"
              {...register('originPort', { required: 'Origin port is required' })}
              placeholder="e.g., Singapore Port"
            />
            {errors.originPort && (
              <p className="text-sm text-destructive">{errors.originPort.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="destinationPort">Destination Port *</Label>
            <Input
              id="destinationPort"
              {...register('destinationPort', { required: 'Destination port is required' })}
              placeholder="e.g., Rotterdam Port"
            />
            {errors.destinationPort && (
              <p className="text-sm text-destructive">{errors.destinationPort.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="vesselId">Vessel *</Label>
          <Select
            onValueChange={(value) => {
              const event = { target: { name: 'vesselId', value } };
              register('vesselId', { required: 'Vessel is required' }).onChange(event);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a vessel" />
            </SelectTrigger>
            <SelectContent>
              {vessels?.map((vessel) => (
                <SelectItem key={vessel.id} value={vessel.id}>
                  {vessel.name} ({vessel.vesselType})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.vesselId && (
            <p className="text-sm text-destructive">{errors.vesselId.message}</p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="departureDate">Departure Date *</Label>
            <Input
              id="departureDate"
              type="datetime-local"
              {...register('departureDate', { required: 'Departure date is required' })}
            />
            {errors.departureDate && (
              <p className="text-sm text-destructive">{errors.departureDate.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="estimatedArrivalDate">Estimated Arrival Date *</Label>
            <Input
              id="estimatedArrivalDate"
              type="datetime-local"
              {...register('estimatedArrivalDate', {
                required: 'Estimated arrival date is required',
              })}
              min={departureDate}
            />
            {errors.estimatedArrivalDate && (
              <p className="text-sm text-destructive">{errors.estimatedArrivalDate.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="requester">Requester Name *</Label>
          <Input
            id="requester"
            {...register('requester', { required: 'Requester name is required' })}
            placeholder="Your name or company"
          />
          {errors.requester && (
            <p className="text-sm text-destructive">{errors.requester.message}</p>
          )}
        </div>
      </div>

      {/* Cargo Details */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Cargo Details</h3>
          <Button type="button" variant="outline" size="sm" onClick={addCargoItem}>
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>

        <div className="space-y-4">
          {cargoItems.map((item, index) => (
            <Card key={item.id} className="border-maritime-border">
              <CardContent className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-semibold">Item {index + 1}</span>
                  {cargoItems.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCargoItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Container Number *</Label>
                    <Input
                      value={item.containerNumber}
                      onChange={(e) =>
                        updateCargoItem(item.id, 'containerNumber', e.target.value)
                      }
                      placeholder="e.g., CONT123456"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description *</Label>
                    <Input
                      value={item.description}
                      onChange={(e) =>
                        updateCargoItem(item.id, 'description', e.target.value)
                      }
                      placeholder="e.g., Electronics"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Quantity *</Label>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateCargoItem(item.id, 'quantity', e.target.value)}
                      placeholder="e.g., 100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Weight (kg) *</Label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.weight}
                      onChange={(e) => updateCargoItem(item.id, 'weight', e.target.value)}
                      placeholder="e.g., 1500.50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Customs Documentation */}
      <div className="space-y-2">
        <Label htmlFor="customsDocumentation">Customs Documentation *</Label>
        <Textarea
          id="customsDocumentation"
          {...register('customsDocumentation', {
            required: 'Customs documentation is required',
          })}
          placeholder="Enter customs documentation details, reference numbers, etc."
          rows={4}
        />
        {errors.customsDocumentation && (
          <p className="text-sm text-destructive">{errors.customsDocumentation.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-3">
        <Button
          type="submit"
          disabled={createShipment.isPending}
          className="bg-maritime-gold text-maritime-navy hover:bg-maritime-gold/90"
        >
          {createShipment.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Shipment
        </Button>
      </div>
    </form>
  );
}
