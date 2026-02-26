import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

export function ComplianceShield() {
  return (
    <Card className="bg-kd-panel border-kd-neon/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-kd-text">
          <Shield className="h-6 w-6 text-kd-neon" />
          FULL VARA COMPLIANCE OVERLAY DEPLOYED
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-kd-text-muted text-sm">LICENSE</p>
            <Badge className="bg-success text-success-foreground mt-1">GRANTED</Badge>
          </div>
          <div>
            <p className="text-kd-text-muted text-sm">STAGE 3</p>
            <Badge className="bg-kd-neon text-kd-bg mt-1">SUBMITTED & LOCKED</Badge>
          </div>
          <div>
            <p className="text-kd-text-muted text-sm">TARGET ARR</p>
            <Badge className="bg-kd-neon text-kd-bg mt-1">$75B</Badge>
          </div>
        </div>
        <p className="text-center text-kd-text-muted text-sm mt-4">
          JUNE 15: VARA LICENSE SECURED | SEP 1 UNIVERSAL LAUNCH
        </p>
      </CardContent>
    </Card>
  );
}
