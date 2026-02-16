import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { TreasuryStatus, OmniMeshStatus, DAOProposal } from '../backend';

export function useGetTreasuryStatus() {
  const { actor, isFetching } = useActor();

  return useQuery<TreasuryStatus>({
    queryKey: ['reportTreasuryStatus'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getTreasuryStatus();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 10000,
    retry: 1,
  });
}

export function useGetOmniMeshStatus() {
  const { actor, isFetching } = useActor();

  return useQuery<OmniMeshStatus>({
    queryKey: ['reportOmniMeshStatus'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getOmniMeshStatus();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 10000,
    retry: 1,
  });
}

export function useGetCyclesBalance() {
  const { actor, isFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['reportCyclesBalance'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCyclesBalance();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 10000,
    retry: 1,
  });
}

export function useGetDaoProposals() {
  const { actor, isFetching } = useActor();

  return useQuery<DAOProposal[]>({
    queryKey: ['reportDaoProposals'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getDaoProposals();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 10000,
    retry: 1,
  });
}
