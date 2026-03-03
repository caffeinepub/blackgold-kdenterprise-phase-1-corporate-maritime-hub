import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type {
  Service,
  Vessel,
  CompanyInfo,
  Tokenomics,
  GiftCard,
  AnalyticsData,
  Currency,
  Status,
  ExportMethod,
  EmailStatus,
  ConnectionStatus,
  UserProfile,
  AIStatus,
  TreasuryStatus,
  DAOProposal,
  OmniMeshStatus,
  Shipment,
  ShipmentStatus,
  CargoItem,
  ShipVessel,
} from '../backend';
import { Principal } from '@icp-sdk/core/principal';

export function useGetServices() {
  const { actor, isFetching } = useActor();

  return useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetVessels() {
  const { actor, isFetching } = useActor();

  return useQuery<Vessel[]>({
    queryKey: ['vessels'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getVessels();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetVesselsByType(vesselType: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Vessel[]>({
    queryKey: ['vessels', vesselType],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getVesselsByType(vesselType);
    },
    enabled: !!actor && !isFetching && !!vesselType,
  });
}

export function useGetCompanyInfo() {
  const { actor, isFetching } = useActor();

  return useQuery<CompanyInfo | null>({
    queryKey: ['companyInfo'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCompanyInfo();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTokenomics() {
  const { actor, isFetching } = useActor();

  return useQuery<Tokenomics | null>({
    queryKey: ['tokenomics'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getTokenomics();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitCareerInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; email: string; message: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitCareerInquiry(data.name, data.email, data.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['careerInquiries'] });
    },
  });
}

export function useSubmitInvestorInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; email: string; message: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitInvestorInquiry(data.name, data.email, data.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investorInquiries'] });
    },
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; email: string; message: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitContactForm(data.name, data.email, data.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactForms'] });
    },
  });
}

export function useGetGiftCards() {
  const { actor, isFetching } = useActor();

  return useQuery<GiftCard[]>({
    queryKey: ['giftCards'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGiftCards();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetGiftCardById(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<GiftCard | null>({
    queryKey: ['giftCard', id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getGiftCardById(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useGetGiftCardAnalytics() {
  const { actor, isFetching } = useActor();

  return useQuery<AnalyticsData>({
    queryKey: ['giftCardAnalytics'],
    queryFn: async () => {
      if (!actor)
        return {
          totalValue: BigInt(0),
          activeCards: BigInt(0),
          redemptionRate: 0,
          countriesActive: BigInt(0),
        };
      return actor.getGiftCardAnalytics();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useHealthCheck() {
  const { actor, isFetching } = useActor();

  return useQuery<string>({
    queryKey: ['healthCheck'],
    queryFn: async () => {
      if (!actor) return 'Actor not available';
      return actor.healthCheck();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30000,
  });
}

export function useGetConnectionStatus() {
  const { actor, isFetching } = useActor();

  return useQuery<ConnectionStatus>({
    queryKey: ['connectionStatus'],
    queryFn: async () => {
      if (!actor)
        return {
          status: 'disconnected',
          message: 'Actor not available',
          timestamp: BigInt(Date.now()),
          ping: undefined,
          retries: BigInt(0),
          environment: 'unknown',
          canisterId: 'unknown',
          network: 'unknown',
        };
      return actor.getConnectionStatus();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 10000,
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetTotalUsers(enabled: boolean = true) {
  const { actor, isFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['totalUsers'],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getTotalUsers();
    },
    enabled: !!actor && !isFetching && enabled,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddUser() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; email: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addUser(data.name, data.email);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['totalUsers'] });
    },
  });
}

export function useGetAIStatus() {
  const { actor, isFetching } = useActor();

  return useQuery<AIStatus>({
    queryKey: ['aiStatus'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAIStatus();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTreasuryStatus() {
  const { actor, isFetching } = useActor();

  return useQuery<TreasuryStatus>({
    queryKey: ['treasuryStatus'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getTreasuryStatus();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetDaoProposals() {
  const { actor, isFetching } = useActor();

  return useQuery<DAOProposal[]>({
    queryKey: ['daoProposals'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getDaoProposals();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useVoteOnProposal() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { proposalId: string; support: boolean }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.voteOnProposal(data.proposalId, data.support);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['daoProposals'] });
    },
  });
}

export function useGetZkCurrentRoot() {
  const { actor, isFetching } = useActor();

  return useQuery<string>({
    queryKey: ['zkCurrentRoot'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getZkCurrentRoot();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGenerateZkSolvencyProof() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.generateZkSolvencyProof();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['zkCurrentRoot'] });
    },
  });
}

export function useGetOmniMeshStatus() {
  const { actor, isFetching } = useActor();

  return useQuery<OmniMeshStatus>({
    queryKey: ['omniMeshStatus'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getOmniMeshStatus();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetUniversalLaunchState() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['universalLaunchState'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getUniversalLaunchState();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useToggleUniversalLaunch() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.toggleUniversalLaunch();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['universalLaunchState'] });
    },
  });
}

export function useGetCyclesBalance() {
  const { actor, isFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['cyclesBalance'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCyclesBalance();
    },
    enabled: !!actor && !isFetching,
  });
}

// Shipping Management Hooks

export function useGetAllShipments() {
  const { actor, isFetching } = useActor();

  return useQuery<Shipment[]>({
    queryKey: ['shipments'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllShipments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetShipmentById(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Shipment | null>({
    queryKey: ['shipment', id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getShipmentById(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useGetShipmentsByVessel(vesselId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Shipment[]>({
    queryKey: ['shipments', 'vessel', vesselId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getShipmentsByVessel(vesselId);
    },
    enabled: !!actor && !isFetching && !!vesselId,
  });
}

export function useCreateShipment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      originPort: string;
      destinationPort: string;
      vesselId: string;
      cargoDetails: CargoItem[];
      departureDate: bigint;
      estimatedArrivalDate: bigint;
      customsDocumentation: string;
      requester: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createShipment(
        data.originPort,
        data.destinationPort,
        data.vesselId,
        data.cargoDetails,
        data.departureDate,
        data.estimatedArrivalDate,
        data.customsDocumentation,
        data.requester
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipments'] });
    },
  });
}

export function useUpdateShipmentStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      shipmentId: string;
      newStatus: ShipmentStatus;
      location: string;
      notes: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateShipmentStatus(
        data.shipmentId,
        data.newStatus,
        data.location,
        data.notes
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipments'] });
    },
  });
}

// Vessel Registry Hooks

export function useGetMyVessels() {
  const { actor, isFetching } = useActor();

  return useQuery<ShipVessel[]>({
    queryKey: ['myVessels'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyVessels();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPublicDemoShips() {
  const { actor, isFetching } = useActor();

  return useQuery<ShipVessel[]>({
    queryKey: ['publicDemoShips'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublicDemoShips();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRegisterMyVessel() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (vesselName: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.registerMyVessel(vesselName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myVessels'] });
      queryClient.invalidateQueries({ queryKey: ['registryCount'] });
    },
  });
}

export function useSubmitStcwQuiz() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (answers: bigint[]) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitStcwQuiz(answers);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myVessels'] });
    },
  });
}

export function useGetRegistryCount() {
  const { actor, isFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['registryCount'],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getRegistryCount();
    },
    enabled: !!actor && !isFetching,
  });
}

// KD Trust Favorites Hooks

export function useGetFavorites(isAuthenticated: boolean) {
  const { actor, isFetching } = useActor();

  return useQuery<string[]>({
    queryKey: ['kdTrustFavorites'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFavorites();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
    retry: false,
  });
}

export function useSetFavorites() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (favorites: string[]) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setFavorites(favorites);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kdTrustFavorites'] });
    },
  });
}
