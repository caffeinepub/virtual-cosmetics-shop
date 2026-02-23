import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Item, Balance, ItemId } from '../backend';
import { toast } from 'sonner';

export function useInitializeUser() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.initializeUser();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['balance'] });
    },
    onError: (error: Error) => {
      // Silently handle "User already exists" error
      if (!error.message.includes('already exists')) {
        console.error('Failed to initialize user:', error);
      }
    },
  });
}

export function useBalance() {
  const { actor, isFetching } = useActor();

  return useQuery<Balance>({
    queryKey: ['balance'],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return await actor.getBalance();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 60000, // Refetch every minute to catch periodic income
  });
}

export function useAvailableItems() {
  const { actor, isFetching } = useActor();

  return useQuery<Item[]>({
    queryKey: ['items'],
    queryFn: async () => {
      if (!actor) return [];
      return await actor.getAvailableItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useOwnedItems() {
  const { actor, isFetching } = useActor();

  return useQuery<ItemId[]>({
    queryKey: ['ownedItems'],
    queryFn: async () => {
      if (!actor) return [];
      return await actor.getOwnedItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePurchaseItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: ItemId) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.purchaseItem(itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['balance'] });
      queryClient.invalidateQueries({ queryKey: ['ownedItems'] });
      toast.success('Purchase successful!', {
        description: 'Your new cosmetic has been added to your collection.',
      });
    },
    onError: (error: Error) => {
      if (error.message.includes('Insufficient balance')) {
        toast.error('Insufficient balance', {
          description: 'You need more funds to purchase this item.',
        });
      } else {
        toast.error('Purchase failed', {
          description: error.message,
        });
      }
    },
  });
}

export function useAdminGrantFunds() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (code: bigint) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.adminGrantFunds(code);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['balance'] });
      toast.success('Admin code accepted!', {
        description: 'Your balance has been updated.',
      });
    },
    onError: () => {
      toast.error('Invalid code', {
        description: 'The code you entered is not valid.',
      });
    },
  });
}
