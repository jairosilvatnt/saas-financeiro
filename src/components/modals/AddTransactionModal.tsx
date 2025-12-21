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
        title: 'Erro',
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
      title: 'Sucesso',
      description: 'Transação adicionada com sucesso!',
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
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova Transação</DialogTitle>
          <DialogDescription>
            Adicione uma receita ou despesa.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Tipo
            </Label>
            <div className="col-span-3 flex gap-2">
              <Button
                type="button"
                variant={type === 'expense' ? 'destructive' : 'outline'}
                className="flex-1"
                onClick={() => setType('expense')}
              >
                Despesa
              </Button>
              <Button
                type="button"
                variant={type === 'income' ? 'default' : 'outline'}
                className={cn(
                  'flex-1',
                  type === 'income' && 'bg-emerald-600 hover:bg-emerald-700',
                )}
                onClick={() => setType('income')}
              >
                Receita
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Valor
            </Label>
            <div className="col-span-3 relative">
              <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">
                R$
              </span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                className="pl-9"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0,00"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descrição
            </Label>
            <Input
              id="description"
              className="col-span-3"
              value={description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              placeholder="Ex: Almoço, Salário"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Categoria
            </Label>
            <Select
              value={category}
              onValueChange={(v) => setCategory(v as Category)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="source" className="text-right">
              Conta
            </Label>
            <Select value={sourceId} onValueChange={setSourceId}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione a conta" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((acc) => (
                  <SelectItem key={acc.id} value={acc.id}>
                    {acc.name} ({acc.provider})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Data
            </Label>
            <Input
              id="date"
              type="date"
              className="col-span-3"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full sm:w-auto">
              Salvar Transação
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
