import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  LabelList,
  Cell,
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

  // Calculate category spending from actual context transactions would be ideal, but using mock for consistent chart look
  const spendingData = [
    { category: 'Alimentação', amount: 1250, fill: 'var(--color-food)' },
    { category: 'Transporte', amount: 450, fill: 'var(--color-transport)' },
    { category: 'Contas', amount: 850, fill: 'var(--color-utilities)' },
    { category: 'Outros', amount: 320, fill: 'var(--color-other)' },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mb-8">
      <Card className="col-span-4 shadow-sm border-slate-100">
        <CardHeader>
          <CardTitle>Fluxo de Caixa</CardTitle>
          <CardDescription>
            Receitas vs Despesas (Últimos 6 meses)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <BarChart
              accessibilityLayer
              data={cashFlowData}
              margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="#e5e7eb"
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar
                dataKey="income"
                fill="var(--color-income)"
                radius={4}
                name="Receitas"
              />
              <Bar
                dataKey="expense"
                fill="var(--color-expense)"
                radius={4}
                name="Despesas"
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="col-span-3 shadow-sm border-slate-100">
        <CardHeader>
          <CardTitle>Gastos por Categoria</CardTitle>
          <CardDescription>Onde você gastou mais este mês</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[300px]"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={spendingData}
                dataKey="amount"
                nameKey="category"
                innerRadius={60}
                strokeWidth={5}
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
