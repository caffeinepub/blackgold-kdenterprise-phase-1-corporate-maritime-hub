import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, PieChart, Activity } from 'lucide-react';

export function InstitutionalConsole() {
  return (
    <Card className="bg-kd-panel border-kd-panel-border">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-kd-neon">INSTITUTIONAL CONSOLE</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2 p-4 border border-kd-neon/30 rounded-lg">
            <div className="flex items-center gap-2 text-kd-text-muted">
              <TrendingUp className="h-5 w-5 text-kd-neon" />
              <h3 className="font-semibold">CAPITAL PIPELINE</h3>
            </div>
            <p className="text-3xl font-bold text-kd-neon">$4.8B</p>
            <p className="text-sm text-kd-text-muted">CLOSE PIPELINE ACTIVE</p>
          </div>

          <div className="space-y-2 p-4 border border-kd-neon/30 rounded-lg">
            <div className="flex items-center gap-2 text-kd-text-muted">
              <PieChart className="h-5 w-5 text-kd-neon" />
              <h3 className="font-semibold">GLOBAL MARKET SHARE</h3>
            </div>
            <p className="text-3xl font-bold text-kd-neon">98%</p>
            <p className="text-sm text-kd-text-muted">BOGTV DOMINANCE</p>
          </div>

          <div className="space-y-2 p-4 border border-kd-neon/30 rounded-lg">
            <div className="flex items-center gap-2 text-kd-text-muted">
              <Activity className="h-5 w-5 text-kd-neon" />
              <h3 className="font-semibold">STAKING TERMINAL</h3>
            </div>
            <p className="text-3xl font-bold text-kd-neon">97%</p>
            <p className="text-sm text-kd-text-muted">PnL ACCURACY</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
