import { useApp } from '@/context/AppContext'
import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/formatters'
import {
  TrendingUp,
  Wallet,
  CreditCard,
  PiggyBank,
  MoreHorizontal,
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

export function OverviewCards() {
  const { getTotalBalance, accounts } = useApp()

  const totalBalance = getTotalBalance()
  const bankBalance = accounts
    .filter((a) => a.type === 'bank')
    .reduce((acc, curr) => acc + curr.balance, 0)
  const benefitBalance = accounts
    .filter((a) => a.type === 'benefit')
    .reduce((acc, curr) => acc + curr.balance, 0)

  // Simulation: Monthly spend progress
  const monthlyLimit = 5000
  const currentSpend = 3200
  const progress = (currentSpend / monthlyLimit) * 100

  const items = [
    {
      title: 'Saldo Total',
      value: totalBalance,
      icon: Wallet,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      trend: '+12%',
      trendUp: true,
    },
    {
      title: 'Conta Corrente',
      value: bankBalance,
      icon: PiggyBank,
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10',
      trend: '+5%',
      trendUp: true,
    },
    {
      title: 'Benefícios',
      value: benefitBalance,
      icon: CreditCard,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
      trend: '-2%',
      trendUp: false,
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {items.map((item, i) => (
        <Card
          key={i}
          className="group relative overflow-hidden border-border/40 shadow-sm hover:shadow-md transition-all duration-300 glass-card rounded-3xl"
        >
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div
                className={cn(
                  'p-3 rounded-2xl transition-colors duration-300',
                  item.bg,
                  item.color,
                )}
              >
                <item.icon className="h-6 w-6" />
              </div>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {item.title}
              </p>
              <h3 className="text-2xl font-bold tracking-tight text-foreground font-display">
                {formatCurrency(item.value)}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={cn(
                    'text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1',
                    item.trendUp
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'
                      : 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400',
                  )}
                >
                  <TrendingUp
                    className={cn(
                      'h-3 w-3',
                      !item.trendUp && 'rotate-180 transform',
                    )}
                  />
                  {item.trend}
                </span>
                <span className="text-xs text-muted-foreground">
                  vs mês anterior
                </span>
              </div>
            </div>
          </CardContent>
          <div
            className={cn(
              'absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-current to-transparent',
              item.color,
            )}
          />
        </Card>
      ))}

      <Card className="glass-card border-border/40 shadow-sm rounded-3xl flex flex-col justify-between">
        <CardContent className="p-6 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Meta Mensal
              </p>
              <h3 className="text-xl font-bold text-foreground mt-1">
                64% Utilizado
              </h3>
            </div>
            <div className="p-2 bg-primary/5 rounded-xl">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <Progress value={64} className="h-3 rounded-full" />
            <div className="flex justify-between text-xs text-muted-foreground font-medium">
              <span>{formatCurrency(currentSpend)}</span>
              <span>{formatCurrency(monthlyLimit)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
