import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useApp } from '@/context/AppContext'
import { useToast } from '@/hooks/use-toast'
import { TransactionType, Category } from '@/context/AppContext'
import { cn } from '@/lib/utils'
import { CalendarIcon, Check, DollarSign } from 'lucide-react'

interface AddTransactionModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddTransactionModal({
  isOpen,
  onClose,
}: AddTransactionModalProps) {
  const { accounts, addTransaction } = useApp()
  const { toast } = useToast()

  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState<TransactionType>('expense')
  const [category, setCategory] = useState<Category>('Food')
  const [sourceId, setSourceId] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!description || !amount || !sourceId) {
      toast({
        title: 'Campos incompletos',
        description: 'Por favor preencha todos os campos obrigatórios.',
        variant: 'destructive',
      })
      return
    }

    const sourceAccount = accounts.find((a) => a.id === sourceId)

    addTransaction({
      description,
      amount: Number(amount),
      type,
      category,
      sourceId,
      sourceName: sourceAccount?.name || 'Conta Desconhecida',
      date,
    })

    toast({
      title: 'Transação Adicionada',
      description: 'Seu lançamento foi registrado com sucesso.',
      className:
        'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/50 dark:border-emerald-800 dark:text-emerald-200',
    })

    // Reset and Close
    setDescription('')
    setAmount('')
    setType('expense')
    onClose()
  }

  // Auto-categorize simulation
  const handleDescriptionChange = (val: string) => {
    setDescription(val)
    const lower = val.toLowerCase()
    if (
      lower.includes('uber') ||
      lower.includes('99') ||
      lower.includes('combustivel') ||
      lower.includes('posto')
    ) {
      setCategory('Transport')
    } else if (
      lower.includes('mc') ||
      lower.includes('ifood') ||
      lower.includes('restaurante') ||
      lower.includes('mercado')
    ) {
      setCategory('Food')
    } else if (
      lower.includes('netflix') ||
      lower.includes('spotify') ||
      lower.includes('cinema')
    ) {
      setCategory('Entertainment')
    } else if (
      lower.includes('luz') ||
      lower.includes('agua') ||
      lower.includes('internet')
    ) {
      setCategory('Utilities')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-3xl p-0 overflow-hidden gap-0 border-border/40 shadow-2xl">
        <DialogHeader className="p-6 pb-2 bg-muted/30 border-b border-border/40">
          <DialogTitle className="text-xl font-bold tracking-tight">
            Nova Transação
          </DialogTitle>
          <DialogDescription>
            Registre uma entrada ou saída financeira.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Type Selection */}
          <div className="flex p-1 bg-muted rounded-xl">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={cn(
                'flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                type === 'expense'
                  ? 'bg-background shadow-sm text-rose-600 dark:text-rose-400'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              Despesa
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={cn(
                'flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                type === 'income'
                  ? 'bg-background shadow-sm text-emerald-600 dark:text-emerald-400'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              Receita
            </button>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Label
                htmlFor="amount"
                className="text-xs uppercase font-semibold text-muted-foreground mb-1.5 block"
              >
                Valor
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  className="pl-10 h-11 rounded-xl bg-muted/20 border-border/60 text-lg font-semibold"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0,00"
                  autoFocus
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="description"
                className="text-xs uppercase font-semibold text-muted-foreground mb-1.5 block"
              >
                Descrição
              </Label>
              <Input
                id="description"
                className="h-11 rounded-xl bg-muted/20 border-border/60"
                value={description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                placeholder="Ex: Almoço, Uber, Salário"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="category"
                  className="text-xs uppercase font-semibold text-muted-foreground mb-1.5 block"
                >
                  Categoria
                </Label>
                <Select
                  value={category}
                  onValueChange={(v) => setCategory(v as Category)}
                >
                  <SelectTrigger className="h-11 rounded-xl bg-muted/20 border-border/60">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border/40 shadow-xl">
                    <SelectItem value="Food">Alimentação</SelectItem>
                    <SelectItem value="Transport">Transporte</SelectItem>
                    <SelectItem value="Utilities">Contas</SelectItem>
                    <SelectItem value="Entertainment">Lazer</SelectItem>
                    <SelectItem value="Health">Saúde</SelectItem>
                    <SelectItem value="Salary">Salário</SelectItem>
                    <SelectItem value="Shopping">Compras</SelectItem>
                    <SelectItem value="Other">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="date"
                  className="text-xs uppercase font-semibold text-muted-foreground mb-1.5 block"
                >
                  Data
                </Label>
                <div className="relative">
                  <Input
                    id="date"
                    type="date"
                    className="h-11 rounded-xl bg-muted/20 border-border/60 pl-3 text-sm"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label
                htmlFor="source"
                className="text-xs uppercase font-semibold text-muted-foreground mb-1.5 block"
              >
                Conta de Origem
              </Label>
              <Select value={sourceId} onValueChange={setSourceId}>
                <SelectTrigger className="h-11 rounded-xl bg-muted/20 border-border/60">
                  <SelectValue placeholder="Selecione a conta" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border/40 shadow-xl">
                  {accounts.map((acc) => (
                    <SelectItem key={acc.id} value={acc.id}>
                      <span className="font-medium">{acc.name}</span>{' '}
                      <span className="text-muted-foreground text-xs">
                        ({acc.provider})
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="submit"
              className="w-full h-11 rounded-xl text-base font-semibold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
            >
              Confirmar Transação
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
