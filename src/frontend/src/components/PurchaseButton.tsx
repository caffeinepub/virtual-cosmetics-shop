import type { Item } from '../backend';
import { usePurchaseItem } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Loader2 } from 'lucide-react';

interface PurchaseButtonProps {
  item: Item;
  canAfford: boolean;
}

export function PurchaseButton({ item, canAfford }: PurchaseButtonProps) {
  const { mutate: purchaseItem, isPending } = usePurchaseItem();

  const handlePurchase = () => {
    purchaseItem(item.id);
  };

  return (
    <Button
      onClick={handlePurchase}
      disabled={!canAfford || isPending}
      className="w-full font-semibold"
      size="lg"
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <ShoppingBag className="mr-2 h-4 w-4" />
          {canAfford ? 'Purchase' : 'Insufficient Funds'}
        </>
      )}
    </Button>
  );
}
