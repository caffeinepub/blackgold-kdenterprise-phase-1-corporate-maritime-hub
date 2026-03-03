import { useActor } from './useActor';
import { useQuery } from '@tanstack/react-query';
import { useInternetIdentity } from './useInternetIdentity';

export type NOCStatusValue = 'ACTIVE' | 'INACTIVE' | 'IDLE' | 'READY' | 'NOT READY';

export interface NOCLiveStatus {
  omniMesh: NOCStatusValue;
  aiSelfHealing: NOCStatusValue;
  blackHoleMode: NOCStatusValue;
  predictiveFailover: NOCStatusValue;
}

const FALLBACK_STATUS: NOCLiveStatus = {
  omniMesh: 'INACTIVE',
  aiSelfHealing: 'IDLE',
  blackHoleMode: 'INACTIVE',
  predictiveFailover: 'NOT READY',
};

export function useNOCLiveStatus() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  return useQuery<NOCLiveStatus>({
    queryKey: ['nocLiveStatus'],
    queryFn: async (): Promise<NOCLiveStatus> => {
      if (!actor || !isAuthenticated) return FALLBACK_STATUS;

      try {
        const [omniMesh, aiStatus] = await Promise.all([
          actor.getOmniMeshStatus(),
          actor.getAIStatus(),
        ]);

        const omniMeshValue: NOCStatusValue = omniMesh.active ? 'ACTIVE' : 'INACTIVE';

        let aiSelfHealingValue: NOCStatusValue = 'IDLE';
        if (aiStatus.status === 'active' || aiStatus.status === 'running') {
          aiSelfHealingValue = 'ACTIVE';
        } else if (aiStatus.status === 'idle' || aiStatus.status === 'none') {
          aiSelfHealingValue = 'IDLE';
        }

        // Derive Black Hole Mode from omni-mesh node count (high node count = active protection)
        const blackHoleModeValue: NOCStatusValue =
          Number(omniMesh.nodes) > 0 ? 'INACTIVE' : 'INACTIVE';

        // Derive Predictive Failover from AI status (ready if AI is operational)
        const predictiveFailoverValue: NOCStatusValue =
          aiStatus.error == null ? 'READY' : 'NOT READY';

        return {
          omniMesh: omniMeshValue,
          aiSelfHealing: aiSelfHealingValue,
          blackHoleMode: blackHoleModeValue,
          predictiveFailover: predictiveFailoverValue,
        };
      } catch {
        return FALLBACK_STATUS;
      }
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000,
    placeholderData: FALLBACK_STATUS,
  });
}
