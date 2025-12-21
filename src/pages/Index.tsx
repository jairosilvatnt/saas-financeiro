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
} from 'lucide-react'

const CategoryIcon = ({ cat }: { cat: string }) => {
  switch (cat) {
    case 'Food':
      return <Coffee className="h-4 w-4" />
    case 'Transport':
      return <Car className="h-4 w-4" />
    default:
      return <Store className="h-4 w-4" />
  }
}

export default function Index() {
  const { transactions } = useApp()
  const recentTransactions = transactions.slice(0, 5)

  return (
    <div className="space-y-8 pb-20 md:pb-0">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          Olá, Alex 👋
        </h2>
        <p className="text-muted-foreground">
          Aqui está o resumo da sua saúde financeira hoje.
        </p>
      </div>

      <OverviewCards />
      <AIInsights />
      <DashboardCharts />

      <Card className="border-slate-100 shadow-sm">
        <CardHeader>
          <CardTitle>Transações Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between border-b border-slate-50 pb-4 last:border-0 last:pb-0 hover:bg-slate-50 p-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-full ${t.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}
                  >
                    {t.type === 'income' ? (
                      <ArrowUpCircle className="h-5 w-5" />
                    ) : (
                      <CategoryIcon cat={t.category} />
                    )}
                  </div>
                  <div className="grid gap-1">
                    <span className="font-medium text-sm">{t.description}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(t.date)} • {t.sourceName}
                    </span>
                  </div>
                </div>
                <span
                  className={`font-mono font-medium ${t.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}
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
