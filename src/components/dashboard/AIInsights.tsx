import { Sparkles, Lightbulb, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function AIInsights() {
  return (
    <div className="grid gap-4 md:grid-cols-3 mb-8">
      <Card className="bg-gradient-to-br from-indigo-50 to-white border-indigo-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
          <Sparkles className="w-16 h-16 text-indigo-600" />
        </div>
        <CardContent className="p-4 flex gap-4 items-start relative z-10">
          <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-indigo-900 text-sm mb-1">
              Gasto Elevado em Transporte
            </h4>
            <p className="text-xs text-indigo-700 leading-relaxed">
              Você gastou 20% a mais com Uber esta semana. Considere usar o
              transporte público amanhã para economizar R$ 30,00.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-emerald-50 to-white border-emerald-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
          <Sparkles className="w-16 h-16 text-emerald-600" />
        </div>
        <CardContent className="p-4 flex gap-4 items-start relative z-10">
          <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-emerald-900 text-sm mb-1">
              Previsão de Saldo
            </h4>
            <p className="text-xs text-emerald-700 leading-relaxed">
              Seu Vale Refeição (Sodexo) deve durar até o dia 25. Sugerimos um
              limite diário de R$ 35,00.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
          <Sparkles className="w-16 h-16 text-amber-600" />
        </div>
        <CardContent className="p-4 flex gap-4 items-start relative z-10">
          <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-amber-900 text-sm mb-1">
              Dica Pro
            </h4>
            <p className="text-xs text-amber-700 leading-relaxed">
              Freelancer? Mude para o plano Business e separe seus gastos
              pessoais dos profissionais facilmente.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
