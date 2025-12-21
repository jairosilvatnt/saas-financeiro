import { useState } from 'react'
import { useApp } from '@/context/AppContext'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
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
import { Download, Filter, Search } from 'lucide-react'
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
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Extrato de Lançamentos
          </h2>
          <p className="text-muted-foreground text-sm">
            Gerencie e visualize todas as suas movimentações.
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exportar CSV
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar transação..."
                className="pl-9"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
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
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
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
                    <TableCell colSpan={5} className="h-24 text-center">
                      Nenhuma transação encontrada.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell className="font-medium text-xs md:text-sm">
                        {formatDate(t.date)}
                      </TableCell>
                      <TableCell>{t.description}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge
                          variant="secondary"
                          className="font-normal text-xs"
                        >
                          {t.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                        {t.sourceName}
                      </TableCell>
                      <TableCell
                        className={`text-right font-mono font-medium ${t.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}
                      >
                        {t.type === 'income' ? '+' : '-'}{' '}
                        {formatCurrency(t.amount)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
