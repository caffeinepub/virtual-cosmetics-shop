import { BalanceDisplay } from './BalanceDisplay';
import { CosmeticItem } from './CosmeticItem';
import { useBalance, useAvailableItems, useOwnedItems } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function ShopInterface() {
  const { data: balance, isLoading: balanceLoading } = useBalance();
  const { data: items, isLoading: itemsLoading, error } = useAvailableItems();
  const { data: ownedItemIds = [] } = useOwnedItems();

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load shop items. Please refresh the page and try again.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8">
      {/* Balance Display */}
      <div className="flex justify-center">
        {balanceLoading ? (
          <Skeleton className="h-24 w-64 rounded-2xl" />
        ) : (
          <BalanceDisplay balance={balance || BigInt(0)} />
        )}
      </div>

      {/* Shop Grid */}
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">Gorilla Tag Cosmetics</h2>
          <p className="text-muted-foreground mt-2">Exclusive collection of OG items</p>
        </div>

        {itemsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items?.map((item) => (
              <CosmeticItem
                key={item.id.toString()}
                item={item}
                userBalance={balance || BigInt(0)}
                isOwned={ownedItemIds.some((id) => id === item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
