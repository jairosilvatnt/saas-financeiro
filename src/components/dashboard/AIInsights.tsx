import { Sparkles, Lightbulb, TrendingDown, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function AIInsights() {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-violet-500 animate-pulse" />
        <h2 className="text-lg font-bold text-foreground">
          Insights Inteligentes
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-violet-500/5 to-transparent border-violet-500/20 shadow-sm hover:shadow-md transition-all duration-300 group rounded-3xl overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-violet-600 dark:text-violet-400 text-sm font-semibold uppercase tracking-wider">
              <TrendingDown className="h-4 w-4" /> Oportunidade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h4 className="font-bold text-foreground mb-2">
              Economia em Transporte
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Seus gastos com Uber subiram 20%. Utilizar o metrô 2x na semana
              economizaria <strong>R$ 120,00</strong> mensais.
            </p>
            <Button
              variant="link"
              className="p-0 h-auto text-violet-600 dark:text-violet-400 group-hover:translate-x-1 transition-transform"
            >
              Ver detalhes <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500/5 to-transparent border-emerald-500/20 shadow-sm hover:shadow-md transition-all duration-300 group rounded-3xl overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-semibold uppercase tracking-wider">
              <Lightbulb className="h-4 w-4" /> Planejamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h4 className="font-bold text-foreground mb-2">Previsão de VR</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Seu Vale Refeição dura até o dia 22 com o consumo atual. Sugerimos
              limitar o almoço a <strong>R$ 35,00</strong>.
            </p>
            <Button
              variant="link"
              className="p-0 h-auto text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform"
            >
              Ajustar meta <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500/5 to-transparent border-amber-500/20 shadow-sm hover:shadow-md transition-all duration-300 group rounded-3xl overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-sm font-semibold uppercase tracking-wider">
              <Sparkles className="h-4 w-4" /> Dica Pro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h4 className="font-bold text-foreground mb-2">
              Maximize seus Pontos
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Concentrar os gastos de supermercado no cartão Black aumentaria
              seu cashback em <strong>R$ 45,00</strong> este mês.
            </p>
            <Button
              variant="link"
              className="p-0 h-auto text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform"
            >
              Ativar benefício <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
