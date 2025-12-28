import { OverviewCards } from '@/components/dashboard/OverviewCards'
import { AIInsights } from '@/components/dashboard/AIInsights'
import { DashboardCharts } from '@/components/dashboard/Charts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useApp } from '@/context/AppContext'
import { formatCurrency, formatDate } from '@/lib/formatters'
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Store,
  Coffee,
  Car,
  Zap,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const CategoryIcon = ({ cat }: { cat: string }) => {
  switch (cat) {
    case 'Food':
      return <Coffee className="h-4 w-4" />
    case 'Transport':
      return <Car className="h-4 w-4" />
    case 'Utilities':
      return <Zap className="h-4 w-4" />
    default:
      return <Store className="h-4 w-4" />
  }
}

export default function Index() {
  const { transactions } = useApp()
  const recentTransactions = transactions.slice(0, 5)

  return (
    <div className="space-y-8 animate-slide-up">
      <OverviewCards />
      <AIInsights />
      <DashboardCharts />

      <Card className="glass-card border-border/40 rounded-3xl overflow-hidden shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 bg-muted/20 px-6 py-4">
          <CardTitle className="text-lg">Transações Recentes</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-primary hover:text-primary/80"
          >
            <Link to="/transactions">Ver tudo</Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/40">
            {recentTransactions.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center shadow-sm ${
                      t.type === 'income'
                        ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {t.type === 'income' ? (
                      <ArrowUpCircle className="h-5 w-5" />
                    ) : (
                      <CategoryIcon cat={t.category} />
                    )}
                  </div>
                  <div className="grid gap-0.5">
                    <span className="font-semibold text-sm text-foreground">
                      {t.description}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      {formatDate(t.date)} • {t.sourceName}
                    </span>
                  </div>
                </div>
                <span
                  className={`font-mono font-medium text-sm ${
                    t.type === 'income'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-foreground'
                  }`}
                >
                  {t.type === 'income' ? '+' : '-'} {formatCurrency(t.amount)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
