import { useApp } from '@/context/AppContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/formatters'
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  CreditCard,
  PiggyBank,
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
      title: 'Saldo Consolidado',
      value: totalBalance,
      icon: Wallet,
      color: 'text-emerald-600',
      sub: '+12% vs mês passado',
    },
    {
      title: 'Em Conta Corrente',
      value: bankBalance,
      icon: PiggyBank,
      color: 'text-blue-600',
      sub: 'Disponível para saque',
    },
    {
      title: 'Benefícios',
      value: benefitBalance,
      icon: CreditCard,
      color: 'text-amber-600',
      sub: 'Alimentação e Refeição',
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => (
        <Card
          key={i}
          className="shadow-subtle border-slate-100 hover:shadow-md transition-shadow"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.title}
            </CardTitle>
            <item.icon className={cn('h-4 w-4', item.color)} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono tracking-tight text-slate-900">
              {formatCurrency(item.value)}
            </div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              {i === 0 ? (
                <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
              ) : null}
              {item.sub}
            </p>
          </CardContent>
        </Card>
      ))}
      <Card className="shadow-subtle border-slate-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Meta de Gastos
          </CardTitle>
          <ArrowDownRight className="h-4 w-4 text-rose-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-mono tracking-tight text-slate-900">
            64%
          </div>
          <Progress value={64} className="h-2 mt-2" />
          <p className="text-xs text-muted-foreground mt-2">
            R$ {currentSpend} de R$ {monthlyLimit}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
