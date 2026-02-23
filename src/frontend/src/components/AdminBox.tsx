import { useState } from 'react';
import { useAdminGrantFunds } from '../hooks/useQueries';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, Loader2 } from 'lucide-react';

export function AdminBox() {
  const [code, setCode] = useState('');
  const { mutate: grantFunds, isPending } = useAdminGrantFunds();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      grantFunds(BigInt(code));
      setCode('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 opacity-30 hover:opacity-100 transition-opacity duration-300">
      <Lock className="h-3 w-3 text-muted-foreground" />
      <Input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Admin code"
        className="w-32 h-8 text-xs"
        disabled={isPending}
      />
      <Button
        type="submit"
        size="sm"
        variant="ghost"
        disabled={isPending || !code.trim()}
        className="h-8 px-3 text-xs"
      >
        {isPending ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          'Apply'
        )}
      </Button>
    </form>
  );
}
