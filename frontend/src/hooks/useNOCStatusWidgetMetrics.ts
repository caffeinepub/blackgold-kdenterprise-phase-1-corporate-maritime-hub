import { useEffect, useState } from 'react';
import type { AIStatus, TreasuryStatus, OmniMeshStatus } from '../backend';

export interface NOCWidgetMetrics {
  tvl: {
    value: string;
    isSimulated: boolean;
  };
  aiSelfHealing: {
    status: string;
    isSimulated: boolean;
  };
  blackHoleMode: {
    active: boolean;
    isSimulated: boolean;
  };
  predictiveFailover: {
    status: string;
    isSimulated: boolean;
  };
  lastUpdated: number;
}

interface UseNOCStatusWidgetMetricsProps {
  aiStatus?: AIStatus;
  treasuryStatus?: TreasuryStatus;
  omniMeshStatus?: OmniMeshStatus;
  universalLaunchState?: boolean;
}

export function useNOCStatusWidgetMetrics({
  aiStatus,
  treasuryStatus,
  omniMeshStatus,
  universalLaunchState,
}: UseNOCStatusWidgetMetricsProps): NOCWidgetMetrics {
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  // Periodic update signal (heartbeat)
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(Date.now());
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // TVL Metric
  const tvl = treasuryStatus
    ? {
        value: `$${Number(treasuryStatus.totalValue).toLocaleString()}`,
        isSimulated: false,
      }
    : {
        value: `$${(12500000 + Math.floor(Math.random() * 100000)).toLocaleString()}`,
        isSimulated: true,
      };

  // AI Self-Healing Status
  const aiSelfHealing = aiStatus
    ? {
        status: aiStatus.status === 'monitoring' ? 'Monitoring' : aiStatus.status === 'triggered' ? 'Active' : 'Idle',
        isSimulated: false,
      }
    : {
        status: Math.random() > 0.7 ? 'Active' : 'Monitoring',
        isSimulated: true,
      };

  // Black Hole Mode (Universal Launch State)
  const blackHoleMode =
    universalLaunchState !== undefined
      ? {
          active: universalLaunchState,
          isSimulated: false,
        }
      : {
          active: false,
          isSimulated: true,
        };

  // Predictive Failover Trigger (based on Omni-Mesh status)
  const predictiveFailover = omniMeshStatus
    ? {
        status: omniMeshStatus.active ? 'Ready' : 'Standby',
        isSimulated: false,
      }
    : {
        status: 'Ready',
        isSimulated: true,
      };

  return {
    tvl,
    aiSelfHealing,
    blackHoleMode,
    predictiveFailover,
    lastUpdated,
  };
}
