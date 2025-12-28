import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  LabelList,
  Pie,
  PieChart,
} from 'recharts'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart'
import { useApp } from '@/context/AppContext'

const chartConfig = {
  income: {
    label: 'Receitas',
    color: 'hsl(var(--chart-2))',
  },
  expense: {
    label: 'Despesas',
    color: 'hsl(var(--chart-1))',
  },
  food: { label: 'Alimentação', color: 'hsl(var(--chart-3))' },
  transport: { label: 'Transporte', color: 'hsl(var(--chart-4))' },
  utilities: { label: 'Contas', color: 'hsl(var(--chart-5))' },
  other: { label: 'Outros', color: 'hsl(var(--muted-foreground))' },
} satisfies ChartConfig

export function DashboardCharts() {
  const { transactions } = useApp()

  // Mock data for Cash Flow
  const cashFlowData = [
    { month: 'Jan', income: 8200, expense: 4500 },
    { month: 'Fev', income: 8500, expense: 5200 },
    { month: 'Mar', income: 8200, expense: 4100 },
    { month: 'Abr', income: 9000, expense: 6500 },
    { month: 'Mai', income: 8500, expense: 3800 },
    { month: 'Jun', income: 8500, expense: 2200 },
  ]

  // Mock spending
  const spendingData = [
    { category: 'food', amount: 1250, fill: 'var(--color-food)' },
    {
      category: 'transport',
      amount: 450,
      fill: 'var(--color-transport)',
    },
    { category: 'utilities', amount: 850, fill: 'var(--color-utilities)' },
    { category: 'other', amount: 320, fill: 'var(--color-other)' },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mb-8">
      <Card className="col-span-4 shadow-sm border-border/40 glass-card rounded-3xl">
        <CardHeader>
          <CardTitle className="text-lg">Fluxo de Caixa</CardTitle>
          <CardDescription>
            Comparativo semestral de entradas e saídas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <BarChart
              accessibilityLayer
              data={cashFlowData}
              margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
              barGap={8}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="currentColor"
                className="text-border/30"
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <ChartTooltip
                cursor={{ fill: 'hsl(var(--muted)/0.2)' }}
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    className="bg-background/90 backdrop-blur border-border/50 shadow-xl rounded-xl"
                  />
                }
              />
              <Bar
                dataKey="income"
                fill="var(--color-income)"
                radius={[6, 6, 0, 0]}
                name="Receitas"
              />
              <Bar
                dataKey="expense"
                fill="var(--color-expense)"
                radius={[6, 6, 0, 0]}
                name="Despesas"
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="col-span-3 shadow-sm border-border/40 glass-card rounded-3xl">
        <CardHeader>
          <CardTitle className="text-lg">Gastos por Categoria</CardTitle>
          <CardDescription>Distribuição das despesas do mês.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[300px] w-full"
          >
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    hideLabel
                    className="bg-background/90 backdrop-blur border-border/50 shadow-xl rounded-xl"
                  />
                }
              />
              <Pie
                data={spendingData}
                dataKey="amount"
                nameKey="category"
                innerRadius={65}
                outerRadius={100}
                paddingAngle={5}
                strokeWidth={0}
              >
                <LabelList
                  dataKey="category"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                  formatter={(value: keyof typeof chartConfig) =>
                    chartConfig[value as keyof typeof chartConfig]?.label
                  }
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
