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
import { Car, Bus, Fuel, MapPin, Calculator } from 'lucide-react'

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
    <div className="space-y-6 pb-20 md:pb-0">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Transporte & Mobilidade
        </h2>
        <p className="text-muted-foreground text-sm">
          Controle de VT, Bilhete Único, Uber e Combustível.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Transport Card Widget */}
        <Card className="col-span-1 border-indigo-100 bg-gradient-to-b from-indigo-50 to-white shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-900">
              <Bus className="h-5 w-5" /> Cartão Transporte
            </CardTitle>
            <CardDescription>Bilhete Único / RioCard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-white rounded-xl shadow-sm border border-indigo-50">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                Saldo Disponível
              </span>
              <div className="text-3xl font-bold text-indigo-600 font-mono mt-1">
                {formatCurrency(transportAccount?.balance || 0)}
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                Recarregar
              </Button>
              <Button variant="outline" className="w-full">
                Extrato
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Mobility Calculator */}
        <Card className="col-span-1 md:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-emerald-600" /> Calculadora de
              Mobilidade
            </CardTitle>
            <CardDescription>
              Análise mensal de custos de deslocamento.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-black text-white p-2 rounded-lg">
                    <Car className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Uber / 99</p>
                    <p className="text-xs text-muted-foreground">
                      12 corridas este mês
                    </p>
                  </div>
                </div>
                <span className="font-bold">R$ 245,90</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500 text-white p-2 rounded-lg">
                    <Fuel className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Combustível</p>
                    <p className="text-xs text-muted-foreground">
                      1 abastecimento
                    </p>
                  </div>
                </div>
                <span className="font-bold">R$ 180,00</span>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center text-center p-4 border rounded-xl bg-emerald-50/50 border-emerald-100">
              <span className="text-sm text-emerald-800 font-medium mb-2">
                Total Gasto em Mobilidade
              </span>
              <span className="text-4xl font-bold text-emerald-600">
                {formatCurrency(totalSpent + 245.9 + 180)}
              </span>
              <p className="text-xs text-emerald-700 mt-2 max-w-[200px]">
                Você gastou 15% a menos que no mês passado. Parabéns!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
