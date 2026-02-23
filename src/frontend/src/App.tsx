import { useEffect, useState } from 'react';
import { ShopInterface } from './components/ShopInterface';
import { OwnedItemsView } from './components/OwnedItemsView';
import { AdminBox } from './components/AdminBox';
import { useInitializeUser } from './hooks/useQueries';
import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';

type Tab = 'shop' | 'owned';

function App() {
  const { mutate: initializeUser, isPending, isSuccess } = useInitializeUser();
  const [activeTab, setActiveTab] = useState<Tab>('shop');

  useEffect(() => {
    // Initialize user on first load
    if (!isPending && !isSuccess) {
      initializeUser();
    }
  }, [initializeUser, isPending, isSuccess]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-secondary/10">
      <header className="border-b border-border/40 bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent-foreground to-primary bg-clip-text text-transparent">
                Luxe Cosmetics Boutique
              </h1>
              <p className="text-muted-foreground mt-2">Discover your perfect beauty essentials</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={activeTab === 'shop' ? 'default' : 'outline'}
                onClick={() => setActiveTab('shop')}
                className="font-semibold"
              >
                Shop
              </Button>
              <Button
                variant={activeTab === 'owned' ? 'default' : 'outline'}
                onClick={() => setActiveTab('owned')}
                className="font-semibold"
              >
                Owned Items
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'shop' ? <ShopInterface /> : <OwnedItemsView />}
      </main>

      <footer className="border-t border-border/40 bg-card/60 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center gap-4">
            <AdminBox />
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} Luxe Cosmetics Boutique. Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'cosmetics-shop'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  );
}

export default App;
