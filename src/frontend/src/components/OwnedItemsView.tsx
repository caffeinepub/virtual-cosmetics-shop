import { useOwnedItems, useAvailableItems } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Package, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { Item } from '../backend';

export function OwnedItemsView() {
  const { data: ownedItemIds = [], isLoading: ownedLoading, error: ownedError } = useOwnedItems();
  const { data: allItems = [], isLoading: itemsLoading } = useAvailableItems();

  if (ownedError) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load your owned items. Please refresh the page and try again.
        </AlertDescription>
      </Alert>
    );
  }

  const isLoading = ownedLoading || itemsLoading;

  // Filter items to only show owned ones
  const ownedItems = allItems.filter((item) =>
    ownedItemIds.some((id) => id === item.id)
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground">Your Collection</h2>
        <p className="text-muted-foreground mt-2">
          {isLoading ? 'Loading...' : `${ownedItems.length} item${ownedItems.length !== 1 ? 's' : ''} owned`}
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-80 rounded-2xl" />
          ))}
        </div>
      ) : ownedItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="rounded-full bg-accent/10 p-6 mb-4">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No items yet</h3>
          <p className="text-muted-foreground text-center max-w-md">
            You haven't purchased any cosmetics yet. Visit the shop to start building your collection!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ownedItems.map((item) => (
            <OwnedItemCard key={item.id.toString()} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function OwnedItemCard({ item }: { item: Item }) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-primary/30 bg-card/80 backdrop-blur-sm overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg font-semibold line-clamp-2">{item.name}</CardTitle>
          <Badge variant="default" className="font-bold shrink-0">
            Owned
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="relative aspect-square rounded-xl bg-gradient-to-br from-accent/10 to-secondary/10 p-6 flex items-center justify-center overflow-hidden">
          <Sparkles className="w-20 h-20 text-primary/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </CardContent>
    </Card>
  );
}
