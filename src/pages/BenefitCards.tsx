import { useApp } from '@/context/AppContext'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { formatCurrency } from '@/lib/formatters'
import {
  CreditCard,
  Lock,
  Unlock,
  Calendar,
  TrendingDown,
  Utensils,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function BenefitCards() {
  const { accounts, toggleBlockCard } = useApp()
  const benefitCards = accounts.filter((a) => a.type === 'benefit')

  // Helper to calculate daily budget
  const calculateDailyBudget = (balance: number, expiryDay: number = 30) => {
    const today = new Date().getDate()
    let daysLeft = expiryDay - today
    if (daysLeft < 0) daysLeft += 30
    if (daysLeft === 0) daysLeft = 1
    return balance / daysLeft
  }

  const getCardColor = (provider: string) => {
    const p = provider.toLowerCase()
    if (p.includes('sodexo') || p.includes('pluxee'))
      return 'bg-gradient-to-r from-red-600 to-pink-600'
    if (p.includes('alelo'))
      return 'bg-gradient-to-r from-emerald-600 to-teal-600'
    if (p.includes('vr')) return 'bg-gradient-to-r from-pink-500 to-purple-500'
    if (p.includes('ticket'))
      return 'bg-gradient-to-r from-blue-600 to-indigo-600'
    if (p.includes('flash')) return 'bg-gradient-to-r from-pink-500 to-rose-500'
    return 'bg-gradient-to-r from-slate-800 to-slate-900'
  }

  return (
    <div className="space-y-8 animate-slide-up">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Cartões de Benefício
        </h2>
        <p className="text-muted-foreground text-sm">
          Controle seus saldos de vale-refeição e alimentação.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {benefitCards.map((card) => {
          const dailyBudget = calculateDailyBudget(card.balance, card.expiryDay)
          const daysLeft = (card.expiryDay || 30) - new Date().getDate()

          return (
            <div key={card.id} className="group relative">
              {/* Visual Card Representation */}
              <div
                className={`aspect-[1.586/1] rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-all duration-300 transform group-hover:scale-[1.02] group-hover:-translate-y-2 z-10 ${getCardColor(card.provider)}`}
              >
                {/* Abstract patterns */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl -ml-12 -mb-12 pointer-events-none" />

                <div className="relative z-10 flex flex-col justify-between h-full text-white">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <Utensils className="w-5 h-5 opacity-80" />
                      <span className="font-bold text-lg tracking-wider drop-shadow-md">
                        {card.provider}
                      </span>
                    </div>
                    {/* Chip simulation */}
                    <div className="w-10 h-8 bg-yellow-400/80 rounded-md border border-yellow-500/50 flex items-center justify-center overflow-hidden relative">
                      <div className="absolute inset-0 border border-black/10 rounded-md" />
                      <div className="w-full h-[1px] bg-black/20" />
                      <div className="h-full w-[1px] bg-black/20" />
                    </div>
                  </div>

                  <div className="space-y-1 my-auto">
                    <span className="text-[10px] opacity-80 uppercase tracking-widest font-semibold">
                      Saldo Disponível
                    </span>
                    <div className="text-3xl font-mono font-bold tracking-tight drop-shadow-sm">
                      {card.blocked ? '****' : formatCurrency(card.balance)}
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-[10px] opacity-70 uppercase">
                        Titular
                      </span>
                      <span className="text-sm font-medium tracking-wide text-shadow-sm">
                        {card.name.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] opacity-70 uppercase">
                        Expira
                      </span>
                      <span className="text-sm font-mono opacity-90">
                        Dia {card.expiryDay}
                      </span>
                    </div>
                  </div>
                </div>

                {card.blocked && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-20 rounded-2xl">
                    <div className="bg-white/10 p-4 rounded-full border border-white/20">
                      <Lock className="w-8 h-8 text-white" />
                    </div>
                  </div>
                )}
              </div>

              {/* Stats Panel */}
              <Card className="mt-[-24px] pt-10 border-border/40 rounded-b-3xl rounded-t-none z-0 relative shadow-md glass-card bg-background/60">
                <CardContent className="space-y-5 px-6 pb-4">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="p-1.5 bg-muted rounded-lg">
                        <Calendar className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs">
                        Renova em {daysLeft > 0 ? daysLeft : 0} dias
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
                      <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                        <TrendingDown className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs">
                        Meta: {formatCurrency(dailyBudget)}/dia
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium text-muted-foreground">
                      <span>Consumo do mês</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-2 rounded-full" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center border-t border-border/40 p-4 bg-muted/20 rounded-b-3xl">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={card.blocked}
                      onCheckedChange={() => toggleBlockCard(card.id)}
                    />
                    <span className="text-xs font-medium text-muted-foreground">
                      {card.blocked
                        ? 'Desbloquear'
                        : 'Bloquear temporariamente'}
                    </span>
                  </div>
                  {card.blocked ? (
                    <Badge
                      variant="destructive"
                      className="flex items-center gap-1 rounded-full px-3"
                    >
                      <Lock className="w-3 h-3" /> Bloqueado
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400 flex items-center gap-1 rounded-full px-3"
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
