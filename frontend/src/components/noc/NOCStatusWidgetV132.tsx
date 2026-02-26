import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ChevronDown, ChevronUp, DollarSign, Activity, Zap, Shield } from 'lucide-react';
import { useNOCStatusWidgetMetrics } from '../../hooks/useNOCStatusWidgetMetrics';
import type { AIStatus, TreasuryStatus, OmniMeshStatus } from '../../backend';

interface NOCStatusWidgetV132Props {
  aiStatus?: AIStatus;
  treasuryStatus?: TreasuryStatus;
  omniMeshStatus?: OmniMeshStatus;
  universalLaunchState?: boolean;
}

export function NOCStatusWidgetV132({
  aiStatus,
  treasuryStatus,
  omniMeshStatus,
  universalLaunchState,
}: NOCStatusWidgetV132Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const metrics = useNOCStatusWidgetMetrics({
    aiStatus,
    treasuryStatus,
    omniMeshStatus,
    universalLaunchState,
  });

  const scrollToDashboard = () => {
    const dashboardElement = document.getElementById('v132-live-dashboard');
    if (dashboardElement) {
      dashboardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const showExpanded = isExpanded || isHovered;

  return (
    <TooltipProvider>
      <div
        className="fixed top-20 right-4 z-40 noc-widget-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card className="bg-kd-panel/95 backdrop-blur-sm border-kd-panel-border shadow-lg noc-widget-card">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-kd-neon noc-widget-pulse" />
                <span className="text-xs font-semibold text-kd-text">NOC Status</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-6 w-6 p-0 hover:bg-kd-bg"
              >
                {showExpanded ? (
                  <ChevronUp className="h-3 w-3 text-kd-text-muted" />
                ) : (
                  <ChevronDown className="h-3 w-3 text-kd-text-muted" />
                )}
              </Button>
            </div>

            <div className="space-y-2">
              {/* TVL */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="h-3 w-3 text-kd-neon" />
                      <span className="text-kd-text-muted">TVL:</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-kd-text font-semibold">{metrics.tvl.value}</span>
                      {metrics.tvl.isSimulated && (
                        <Badge variant="outline" className="text-[9px] px-1 py-0 h-4 border-kd-neon/30 text-kd-text-muted">
                          Sim
                        </Badge>
                      )}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="left" className="bg-kd-panel border-kd-panel-border text-kd-text">
                  <p className="text-xs">Total Value Locked across all treasury assets</p>
                </TooltipContent>
              </Tooltip>

              {/* AI Self-Healing */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <Activity className="h-3 w-3 text-kd-neon" />
                      <span className="text-kd-text-muted">AI:</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge
                        variant="outline"
                        className={`text-[9px] px-1.5 py-0 h-4 ${
                          metrics.aiSelfHealing.status === 'Active'
                            ? 'border-success text-success'
                            : 'border-kd-neon text-kd-neon'
                        }`}
                      >
                        {metrics.aiSelfHealing.status}
                      </Badge>
                      {metrics.aiSelfHealing.isSimulated && (
                        <Badge variant="outline" className="text-[9px] px-1 py-0 h-4 border-kd-neon/30 text-kd-text-muted">
                          Sim
                        </Badge>
                      )}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="left" className="bg-kd-panel border-kd-panel-border text-kd-text">
                  <p className="text-xs">AI Self-Healing system status and monitoring</p>
                </TooltipContent>
              </Tooltip>

              {showExpanded && (
                <>
                  {/* Black Hole Mode */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <Zap className="h-3 w-3 text-kd-neon" />
                          <span className="text-kd-text-muted">Black Hole:</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge
                            variant="outline"
                            className={`text-[9px] px-1.5 py-0 h-4 ${
                              metrics.blackHoleMode.active
                                ? 'border-destructive text-destructive noc-widget-pulse'
                                : 'border-kd-text-muted text-kd-text-muted'
                            }`}
                          >
                            {metrics.blackHoleMode.active ? 'Active' : 'Inactive'}
                          </Badge>
                          {metrics.blackHoleMode.isSimulated && (
                            <Badge variant="outline" className="text-[9px] px-1 py-0 h-4 border-kd-neon/30 text-kd-text-muted">
                              Sim
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="bg-kd-panel border-kd-panel-border text-kd-text">
                      <p className="text-xs">Universal Launch Black Hole Mode state</p>
                    </TooltipContent>
                  </Tooltip>

                  {/* Predictive Failover */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <Shield className="h-3 w-3 text-kd-neon" />
                          <span className="text-kd-text-muted">Failover:</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge
                            variant="outline"
                            className={`text-[9px] px-1.5 py-0 h-4 ${
                              metrics.predictiveFailover.status === 'Ready'
                                ? 'border-success text-success'
                                : 'border-kd-text-muted text-kd-text-muted'
                            }`}
                          >
                            {metrics.predictiveFailover.status}
                          </Badge>
                          {metrics.predictiveFailover.isSimulated && (
                            <Badge variant="outline" className="text-[9px] px-1 py-0 h-4 border-kd-neon/30 text-kd-text-muted">
                              Sim
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="bg-kd-panel border-kd-panel-border text-kd-text">
                      <p className="text-xs">Predictive Failover Trigger readiness</p>
                    </TooltipContent>
                  </Tooltip>

                  {/* Last Updated */}
                  <div className="pt-1 border-t border-kd-panel-border">
                    <p className="text-[9px] text-kd-text-muted text-center">
                      Updated: {new Date(metrics.lastUpdated).toLocaleTimeString()}
                    </p>
                  </div>

                  {/* View Dashboard Button */}
                  <Button
                    size="sm"
                    onClick={scrollToDashboard}
                    className="w-full h-7 text-xs bg-kd-neon text-kd-bg hover:bg-kd-neon/90"
                  >
                    View Full Dashboard
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
