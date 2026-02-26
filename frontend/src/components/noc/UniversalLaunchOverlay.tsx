import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGetOmniMeshStatus } from '../../hooks/useQueries';

export function UniversalLaunchOverlay() {
  const [countdown, setCountdown] = useState(14 * 24 * 60 * 60);
  const { data: omniMeshStatus } = useGetOmniMeshStatus();

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(countdown / 86400);
  const hours = Math.floor((countdown % 86400) / 3600);
  const mins = Math.floor((countdown % 3600) / 60);

  return (
    <Card className="bg-gradient-to-br from-kd-panel to-kd-bg border-kd-neon">
      <CardHeader>
        <CardTitle className="text-3xl font-black text-kd-neon text-center">
          🚀 UNIVERSAL LAUNCH ACTIVE
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-kd-text-muted text-sm">Omni-Mesh</p>
            <Badge className="bg-kd-neon text-kd-bg mt-1">
              {omniMeshStatus?.status || 'SYNCED'}
            </Badge>
          </div>
          <div>
            <p className="text-kd-text-muted text-sm">Black Hole Mode</p>
            <Badge className="bg-success text-success-foreground mt-1">ENGAGED</Badge>
          </div>
        </div>
        <div className="text-center">
          <p className="text-kd-text-muted text-sm mb-2">Countdown</p>
          <p className="text-4xl font-bold text-kd-neon">
            T-{days}d {hours}h {mins}m
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
