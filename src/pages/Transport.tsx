import { useApp } from '@/context/AppContext'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/formatters'
import { Car, Bus, Fuel, Calculator, MapPin, Navigation } from 'lucide-react'

export default function Transport() {
  const { transactions, accounts } = useApp()
  const transportAccount = accounts.find((a) => a.type === 'transport')

  // Filter transport transactions
  const transportExpenses = transactions.filter(
    (t) => t.category === 'Transport',
  )
  const totalSpent = transportExpenses.reduce(
    (acc, curr) => acc + curr.amount,
    0,
  )

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Transporte & Mobilidade
        </h2>
        <p className="text-muted-foreground text-sm">
          Controle de VT, Bilhete Único, Uber e Combustível.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Transport Card Widget */}
        <Card className="col-span-1 border-indigo-200 bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950/30 dark:to-background dark:border-indigo-900 shadow-lg rounded-3xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Bus className="w-32 h-32" />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 text-lg">
              <Bus className="h-5 w-5" /> Cartão Transporte
            </CardTitle>
            <CardDescription>Bilhete Único / RioCard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 relative z-10">
            <div className="p-6 bg-white dark:bg-indigo-950/50 rounded-2xl shadow-sm border border-indigo-100 dark:border-indigo-900">
              <span className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                Saldo Disponível
              </span>
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 font-mono mt-2 tracking-tight">
                {formatCurrency(transportAccount?.balance || 0)}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/20">
                Recarregar
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-xl border-indigo-200 text-indigo-700 dark:border-indigo-800 dark:text-indigo-400"
              >
                Extrato
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Mobility Calculator */}
        <Card className="col-span-1 md:col-span-2 shadow-sm border-border/40 glass-card rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-emerald-600" /> Calculadora de
              Mobilidade
            </CardTitle>
            <CardDescription>
              Análise mensal detalhada de custos de deslocamento.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="bg-foreground text-background p-2.5 rounded-xl shadow-md">
                    <Navigation className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Uber / 99</p>
                    <p className="text-xs text-muted-foreground">
                      12 corridas este mês
                    </p>
                  </div>
                </div>
                <span className="font-bold font-mono text-lg">R$ 245,90</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500 text-white p-2.5 rounded-xl shadow-md shadow-amber-500/20">
                    <Fuel className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Combustível</p>
                    <p className="text-xs text-muted-foreground">
                      1 abastecimento
                    </p>
                  </div>
                </div>
                <span className="font-bold font-mono text-lg">R$ 180,00</span>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center text-center p-6 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-3">
                <Car className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-sm text-emerald-800 dark:text-emerald-300 font-medium mb-1">
                Total Gasto
              </span>
              <span className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 tracking-tight">
                {formatCurrency(totalSpent + 245.9 + 180)}
              </span>
              <div className="mt-4 px-3 py-1 bg-emerald-200/50 dark:bg-emerald-900/50 rounded-full text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                15% menos que mês passado 👏
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
