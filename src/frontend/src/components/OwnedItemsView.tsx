import { useOwnedItems, useGetItems } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Package, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { Item } from '../backend';
import { useState } from 'react';

function getImageSlug(itemName: string): string {
  // Available images in /assets/generated (15 cosmetic items)
  const availableImages = [
    'aa-badge',
    'cloud-hat',
    'crystal-crown',
    'finger-painter',
    'forest-guide',
    'golden-banana',
    'ice-shard',
    'illustrator-badge',
    'lava-rock',
    'leaf-cape',
    'moon-badge',
    'neon-gloves',
    'rainbow-trail',
    'star-badge',
    'stick',
  ];

  // Map backend item names to available image filenames
  const nameMap: Record<string, string> = {
    'Finger Painter': 'finger-painter',
    'AA Badge': 'aa-badge',
    'Illustrator Badge': 'illustrator-badge',
    'Forest Guide': 'forest-guide',
    'Stick': 'stick',
    'Banana': 'golden-banana',
    'Monocle': 'crystal-crown',
    'Top Hat': 'cloud-hat',
    'Cowboy Hat': 'forest-guide',
    'Crown': 'crystal-crown',
    'VR Headset': 'neon-gloves',
    'GT-@2@3m Reels': 'rainbow-trail',
    'Witch Hat': 'moon-badge',
    'GT1 Plushie': 'star-badge',
    'Mini Banana': 'golden-banana',
    'Gorilla Eyes': 'ice-shard',
    'Bowtie': 'leaf-cape',
    'Wizard Hat': 'moon-badge',
    'GT1 Spray Can': 'lava-rock',
    'Pineapple': 'golden-banana',
    'Golden Gorilla': 'golden-banana',
    'Flower Crown': 'leaf-cape',
    'Ice Cream': 'ice-shard',
    'Mini Top Hat': 'cloud-hat',
    'Tiny Stick': 'stick',
    'Beanie': 'cloud-hat',
    'Pirate Hat': 'cloud-hat',
    'Rubber Duck': 'golden-banana',
    'Butterfly Glasses': 'neon-gloves',
    'GT2 Flag': 'rainbow-trail',
    'Sun Hat': 'cloud-hat',
    'Bowler Hat': 'cloud-hat',
    'MTF Eyepatch': 'aa-badge',
    'Rainbow Scarf': 'rainbow-trail',
    'GT2 Sunglasses': 'neon-gloves',
    'Pirate Patch': 'aa-badge',
    'GT3 Hat': 'cloud-hat',
    'Small Banana': 'golden-banana',
    'Wizard Staff': 'stick',
    'Tiny Banana': 'golden-banana',
    'GT3 Cap': 'cloud-hat',
    'Mini Top Hat II': 'cloud-hat',
    'Tiny Bowtie': 'leaf-cape',
    'The One Crown': 'crystal-crown',
    'GT3 Ring': 'crystal-crown',
    'Magician\'s Hat': 'moon-badge',
    'Mini Pineapple': 'golden-banana',
    'Tiny Monocle': 'crystal-crown',
    'GT3 Badge': 'star-badge',
    'Small Stick': 'stick',
  };

  return nameMap[itemName] || availableImages[0];
}

export function OwnedItemsView() {
  const { data: ownedItemIds = [], isLoading: ownedLoading, error: ownedError } = useOwnedItems();
  const { data: allItems = [], isLoading: itemsLoading } = useGetItems();

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
  const [imageError, setImageError] = useState(false);
  const imageSlug = getImageSlug(item.name);
  const imagePath = `/assets/generated/${imageSlug}.dim_400x400.png`;

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
        <div className="relative aspect-square rounded-xl bg-gradient-to-br from-accent/10 to-secondary/10 overflow-hidden">
          {!imageError ? (
            <img
              src={imagePath}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full p-6 flex items-center justify-center">
              <Sparkles className="w-20 h-20 text-primary/60" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </CardContent>
    </Card>
  );
}
