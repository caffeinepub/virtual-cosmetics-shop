import type { Item, Balance } from '../backend';
import { PurchaseButton } from './PurchaseButton';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface CosmeticItemProps {
  item: Item;
  userBalance: Balance;
  isOwned?: boolean;
}

function getImageSlug(itemName: string): string {
  // Map backend item names to image filenames
  const nameMap: Record<string, string> = {
    'Finger Painter': 'finger-painter',
    'AA Badge': 'aa-badge',
    'Illustrator Badge': 'illustrator-badge',
    'Forest Guide': 'forest-guide',
    'Stick': 'stick',
    'Banana': 'golden-banana',
    'Monocle': 'crystal-crown',
    'Top Hat': 'lava-rock',
    'Cowboy Hat': 'ice-shard',
    'Crown': 'rainbow-trail',
    'VR Headset': 'neon-gloves',
    'GT-@2@3m Reels': 'leaf-cape',
    'Witch Hat': 'moon-badge',
    'GT1 Plushie': 'star-badge',
    'Mini Banana': 'cloud-hat',
    'Gorilla Eyes': 'fire-wings',
    'Bowtie': 'water-droplet',
    'Wizard Hat': 'thunder-bolt',
    'GT1 Spray Can': 'earth-stone',
    'Pineapple': 'wind-feather',
    'Golden Gorilla': 'shadow-mask',
    'Flower Crown': 'light-halo',
    'Ice Cream': 'jungle-vine',
    'Mini Top Hat': 'beach-ball',
    'Tiny Stick': 'mountain-peak',
    'Beanie': 'desert-sand',
    'Pirate Hat': 'ocean-wave',
    'Rubber Duck': 'volcano-ash',
    'Butterfly Glasses': 'arctic-frost',
    'GT2 Flag': 'tropical-flower',
    'Sun Hat': 'canyon-rock',
    'Bowler Hat': 'coral-reef',
    'MTF Eyepatch': 'bamboo-stick',
    'Rainbow Scarf': 'cherry-blossom',
    'GT2 Sunglasses': 'pine-cone',
    'Pirate Patch': 'maple-leaf',
    'GT3 Hat': 'cactus-spike',
    'Small Banana': 'mushroom-cap',
    'Wizard Staff': 'snowflake',
    'Tiny Banana': 'sunbeam',
    'GT3 Cap': 'moonbeam',
    'Mini Top Hat II': 'starlight',
    'Tiny Bowtie': 'aurora',
    'The One Crown': 'meteor',
    'GT3 Ring': 'comet',
    'Magician\'s Hat': 'galaxy-swirl',
    'Mini Pineapple': 'nebula-cloud',
    'Tiny Monocle': 'black-hole',
    'GT3 Badge': 'supernova',
    'Small Stick': 'cosmic-dust',
  };

  return nameMap[itemName] || itemName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

export function CosmeticItem({ item, userBalance, isOwned = false }: CosmeticItemProps) {
  const canAfford = userBalance >= item.price;
  const [imageError, setImageError] = useState(false);
  const imageSlug = getImageSlug(item.name);
  const imagePath = `/assets/generated/${imageSlug}.dim_400x400.png`;

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
              <Sparkles className="w-20 h-20 text-primary/40 group-hover:text-primary/60 transition-colors duration-300" />
            </div>
          )}
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
