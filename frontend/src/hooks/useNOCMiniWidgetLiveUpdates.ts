import { useEffect } from 'react';
import { useGetTreasuryStatus, useGetOmniMeshStatus, useGetAIStatus, useGetUniversalLaunchState } from './useQueries';

/**
 * Hook that feeds live NOC metrics from React Query data sources
 * into the snippet widget via window.updateNOCWidget
 */
export function useNOCMiniWidgetLiveUpdates() {
  const { data: treasuryStatus } = useGetTreasuryStatus();
  const { data: omniMeshStatus } = useGetOmniMeshStatus();
  const { data: aiStatus } = useGetAIStatus();
  const { data: universalLaunchState } = useGetUniversalLaunchState();

  useEffect(() => {
    // Guard: only update if the widget script has loaded and registered the function
    if (typeof window.updateNOCWidget !== 'function') {
      return;
    }

    // Prepare widget data with safe fallbacks
    const widgetData: Parameters<NonNullable<typeof window.updateNOCWidget>>[0] = {};

    // TVL from treasury
    if (treasuryStatus) {
      widgetData.tvl = `$${Number(treasuryStatus.totalValue).toLocaleString()}`;
    }

    // Omni-Mesh status
    if (omniMeshStatus) {
      widgetData.omniMesh = omniMeshStatus.active ? 'Active' : 'Inactive';
    }

    // AI Self-Healing status
    if (aiStatus) {
      const statusMap: Record<string, string> = {
        monitoring: 'Monitoring',
        triggered: 'Active',
        idle: 'Idle',
      };
      widgetData.aiSelfHealing = statusMap[aiStatus.status] || aiStatus.status;
    }

    // Black Hole Mode (Universal Launch State)
    if (universalLaunchState !== undefined) {
      widgetData.blackHoleMode = universalLaunchState ? 'Active' : 'Inactive';
    }

    // Predictive Failover (derived from Omni-Mesh)
    if (omniMeshStatus) {
      widgetData.predictiveFailover = omniMeshStatus.active ? 'Ready' : 'Standby';
    }

    // Update the widget with error handling
    try {
      window.updateNOCWidget(widgetData);
    } catch (error) {
      console.warn('Failed to update NOC Mini Widget:', error);
    }
  }, [treasuryStatus, omniMeshStatus, aiStatus, universalLaunchState]);

  // Periodic update interval (every 5 seconds) to keep widget fresh
  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window.updateNOCWidget !== 'function') {
        return;
      }

      const widgetData: Parameters<NonNullable<typeof window.updateNOCWidget>>[0] = {};

      if (treasuryStatus) {
        widgetData.tvl = `$${Number(treasuryStatus.totalValue).toLocaleString()}`;
      }
      if (omniMeshStatus) {
        widgetData.omniMesh = omniMeshStatus.active ? 'Active' : 'Inactive';
      }
      if (aiStatus) {
        const statusMap: Record<string, string> = {
          monitoring: 'Monitoring',
          triggered: 'Active',
          idle: 'Idle',
        };
        widgetData.aiSelfHealing = statusMap[aiStatus.status] || aiStatus.status;
      }
      if (universalLaunchState !== undefined) {
        widgetData.blackHoleMode = universalLaunchState ? 'Active' : 'Inactive';
      }
      if (omniMeshStatus) {
        widgetData.predictiveFailover = omniMeshStatus.active ? 'Ready' : 'Standby';
      }

      try {
        window.updateNOCWidget(widgetData);
      } catch (error) {
        // Silent fail on periodic updates to avoid console spam
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [treasuryStatus, omniMeshStatus, aiStatus, universalLaunchState]);
}
