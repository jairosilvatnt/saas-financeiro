import { useApp } from '@/context/AppContext'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { formatCurrency } from '@/lib/formatters'
import { CreditCard, Lock, Unlock, Calendar, TrendingDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function BenefitCards() {
  const { accounts, toggleBlockCard } = useApp()
  const benefitCards = accounts.filter((a) => a.type === 'benefit')

  // Helper to calculate daily budget
  const calculateDailyBudget = (balance: number, expiryDay: number = 30) => {
    const today = new Date().getDate()
    let daysLeft = expiryDay - today
    if (daysLeft < 0) daysLeft += 30 // Rough assumption for next month
    if (daysLeft === 0) daysLeft = 1
    return balance / daysLeft
  }

  const getCardColor = (provider: string) => {
    const p = provider.toLowerCase()
    if (p.includes('sodexo')) return 'bg-red-600 text-white'
    if (p.includes('alelo')) return 'bg-emerald-600 text-white'
    if (p.includes('vr')) return 'bg-pink-600 text-white'
    if (p.includes('ticket')) return 'bg-blue-600 text-white'
    return 'bg-slate-800 text-white'
  }

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Cartões de Benefício
        </h2>
        <p className="text-muted-foreground text-sm">
          Controle seus saldos de vale-refeição e alimentação.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {benefitCards.map((card) => {
          const dailyBudget = calculateDailyBudget(card.balance, card.expiryDay)
          const daysLeft = (card.expiryDay || 30) - new Date().getDate()

          return (
            <div key={card.id} className="group relative">
              {/* Visual Card Representation */}
              <div
                className={`aspect-[1.586/1] rounded-xl p-6 shadow-lg relative overflow-hidden transition-transform transform group-hover:-translate-y-1 ${getCardColor(card.provider)}`}
              >
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <CreditCard className="w-32 h-32" />
                </div>
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-lg tracking-wider">
                      {card.provider}
                    </span>
                    <CreditCard className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs opacity-80 uppercase tracking-widest">
                      Saldo Atual
                    </span>
                    <div className="text-3xl font-mono font-bold tracking-tight">
                      {card.blocked ? '****' : formatCurrency(card.balance)}
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-medium opacity-90">
                      {card.name}
                    </span>
                    <span className="text-xs opacity-75">
                      EXP {card.expiryDay}/mês
                    </span>
                  </div>
                </div>
                {card.blocked && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-20">
                    <Lock className="w-12 h-12 text-white/80" />
                  </div>
                )}
              </div>

              {/* Stats Panel */}
              <Card className="mt-[-20px] pt-8 border-t-0 rounded-t-none z-0 relative shadow-sm">
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Renova em {daysLeft > 0 ? daysLeft : 0} dias</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600 font-medium">
                      <TrendingDown className="w-4 h-4" />
                      <span>Meta diária: {formatCurrency(dailyBudget)}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Consumo do mês</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center border-t p-4 bg-slate-50/50 rounded-b-lg">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={card.blocked}
                      onCheckedChange={() => toggleBlockCard(card.id)}
                    />
                    <span className="text-sm text-slate-600 font-medium">
                      Bloquear Cartão
                    </span>
                  </div>
                  {card.blocked ? (
                    <Badge
                      variant="destructive"
                      className="flex items-center gap-1"
                    >
                      <Lock className="w-3 h-3" /> Bloqueado
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-emerald-600 border-emerald-200 bg-emerald-50 flex items-center gap-1"
                    >
                      <Unlock className="w-3 h-3" /> Ativo
                    </Badge>
                  )}
                </CardFooter>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}
