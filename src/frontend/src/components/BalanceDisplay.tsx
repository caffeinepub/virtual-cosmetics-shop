import type { Balance } from '../backend';

interface BalanceDisplayProps {
  balance: Balance;
}

export function BalanceDisplay({ balance }: BalanceDisplayProps) {
  const formattedBalance = balance.toLocaleString();

  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 rounded-2xl p-8 border-2 border-primary/20 shadow-lg backdrop-blur-sm">
        <div className="flex items-center justify-center gap-4">
          <img
            src="/assets/generated/currency-icon.dim_64x64.png"
            alt="Currency"
            className="w-12 h-12 drop-shadow-md"
          />
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Your Balance
            </p>
            <p className="text-4xl font-bold text-primary mt-1">
              £{formattedBalance}
            </p>
          </div>
        </div>
      </div>
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl -z-10 opacity-50" />
    </div>
  );
}
