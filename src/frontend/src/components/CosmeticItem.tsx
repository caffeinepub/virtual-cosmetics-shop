import type { Item, Balance } from '../backend';
import { PurchaseButton } from './PurchaseButton';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles } from 'lucide-react';

interface CosmeticItemProps {
  item: Item;
  userBalance: Balance;
  isOwned?: boolean;
}

export function CosmeticItem({ item, userBalance, isOwned = false }: CosmeticItemProps) {
  const canAfford = userBalance >= item.price;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-border/50 hover:border-primary/30 bg-card/80 backdrop-blur-sm overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg font-semibold line-clamp-2">{item.name}</CardTitle>
          <Badge variant="secondary" className="font-bold shrink-0">
            £{item.price.toString()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="relative aspect-square rounded-xl bg-gradient-to-br from-accent/10 to-secondary/10 p-6 flex items-center justify-center overflow-hidden">
          <Sparkles className="w-20 h-20 text-primary/40 group-hover:text-primary/60 transition-colors duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </CardContent>
      
      <CardFooter>
        {isOwned ? (
          <div className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-primary/10 border-2 border-primary/30 text-primary font-semibold">
            <Check className="h-5 w-5" />
            Already Owned
          </div>
        ) : (
          <PurchaseButton item={item} canAfford={canAfford} />
        )}
      </CardFooter>
    </Card>
  );
}
