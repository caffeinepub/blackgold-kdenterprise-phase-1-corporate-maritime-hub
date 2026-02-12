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
  GiftCardType,
  UserProfile,
  ConnectionStatus,
} from '../backend';

export function useServices() {
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

export function useVessels() {
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

export function useCompanyInfo() {
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

export function useTokenomics() {
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

export function useGiftCards() {
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

export function useGiftCardAnalytics() {
  const { actor, isFetching } = useActor();

  return useQuery<AnalyticsData>({
    queryKey: ['giftCardAnalytics'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getGiftCardAnalytics();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateGiftCard() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id: string;
      code: string;
      value: bigint;
      currency: Currency;
      cardType: GiftCardType;
      owner: string;
      notes: string;
      expirationDate: bigint;
      originCountry: string;
      mobileNumber: string;
      createdBy: string;
      creationMetadata: string;
      lastUpdatedBy: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createGiftCard(
        data.id,
        data.code,
        data.value,
        data.currency,
        data.cardType,
        data.owner,
        data.notes,
        data.expirationDate,
        data.originCountry,
        data.mobileNumber,
        data.createdBy,
        data.creationMetadata,
        data.lastUpdatedBy
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['giftCards'] });
      queryClient.invalidateQueries({ queryKey: ['giftCardAnalytics'] });
    },
  });
}

export function useUpdateGiftCardStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: string; newStatus: any }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateGiftCardStatus(data.id, data.newStatus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['giftCards'] });
      queryClient.invalidateQueries({ queryKey: ['giftCardAnalytics'] });
    },
  });
}

export function useRecordRedemption() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      cardId: string;
      location: string;
      amount: bigint;
      currency: Currency;
      redeemedBy: string;
      notes: string;
      verificationData: string;
      deviceDetails: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.recordRedemption(
        data.cardId,
        data.location,
        data.amount,
        data.currency,
        data.redeemedBy,
        data.notes,
        data.verificationData,
        data.deviceDetails
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['giftCards'] });
      queryClient.invalidateQueries({ queryKey: ['giftCardAnalytics'] });
    },
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

export function useHealthCheck() {
  const { actor, isFetching } = useActor();

  return useQuery<string>({
    queryKey: ['healthCheck'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.healthCheck();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30000,
  });
}

export function useConnectionStatus() {
  const { actor, isFetching } = useActor();

  return useQuery<ConnectionStatus>({
    queryKey: ['connectionStatus'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getConnectionStatus();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 10000,
  });
}

export function useTotalUsers(enabled: boolean = true) {
  const { actor, isFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['totalUsers'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getTotalUsers();
    },
    enabled: enabled && !!actor && !isFetching,
    retry: false,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
    retry: false,
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
