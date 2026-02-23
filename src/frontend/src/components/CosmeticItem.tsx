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
