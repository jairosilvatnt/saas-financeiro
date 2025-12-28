import { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatCurrency, formatDate } from '@/lib/formatters'
import {
  Download,
  Filter,
  Search,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function Transactions() {
  const { transactions } = useApp()
  const [filter, setFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.description.toLowerCase().includes(filter.toLowerCase()) ||
      t.sourceName.toLowerCase().includes(filter.toLowerCase())
    const matchesCategory =
      categoryFilter === 'all' || t.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Extrato</h2>
          <p className="text-muted-foreground text-sm">
            Gerencie e visualize todas as suas movimentações.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2 rounded-xl">
            <Filter className="h-4 w-4" /> Filtros
          </Button>
          <Button variant="outline" size="sm" className="gap-2 rounded-xl">
            <Download className="h-4 w-4" /> Exportar
          </Button>
        </div>
      </div>

      <Card className="glass-card border-border/40 rounded-3xl overflow-hidden shadow-sm">
        <CardHeader className="pb-4 bg-muted/20 border-b border-border/40">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, conta..."
                className="pl-9 bg-background/50 border-transparent focus:bg-background transition-all rounded-full"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px] rounded-full border-transparent bg-background/50 focus:bg-background">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-xl border-border/40">
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="Food">Alimentação</SelectItem>
                  <SelectItem value="Transport">Transporte</SelectItem>
                  <SelectItem value="Utilities">Contas</SelectItem>
                  <SelectItem value="Salary">Salário</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent border-border/40">
                <TableHead className="w-[120px]">Data</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="hidden md:table-cell">
                  Categoria
                </TableHead>
                <TableHead className="hidden md:table-cell">Conta</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-32 text-center text-muted-foreground"
                  >
                    Nenhuma transação encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((t) => (
                  <TableRow
                    key={t.id}
                    className="hover:bg-muted/20 border-border/40 group"
                  >
                    <TableCell className="font-medium text-xs md:text-sm text-muted-foreground">
                      {formatDate(t.date)}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{t.description}</span>
                        <span className="md:hidden text-xs text-muted-foreground">
                          {t.sourceName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge
                        variant="secondary"
                        className="font-normal text-xs rounded-full px-2.5 py-0.5 bg-secondary/50 text-secondary-foreground"
                      >
                        {t.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                      {t.sourceName}
                    </TableCell>
                    <TableCell className="text-right">
                      <div
                        className={`inline-flex items-center font-mono font-medium ${t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-foreground'}`}
                      >
                        {t.type === 'income' ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1 text-muted-foreground" />
                        )}
                        {formatCurrency(t.amount)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
