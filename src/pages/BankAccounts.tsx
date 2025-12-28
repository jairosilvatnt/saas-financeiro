import { useState } from 'react'
import { useApp } from '@/context/AppContext'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Landmark, Copy, Wallet } from 'lucide-react'
import { formatCurrency } from '@/lib/formatters'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function BankAccounts() {
  const { accounts, addAccount } = useApp()
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [newAccount, setNewAccount] = useState({
    name: '',
    provider: '',
    balance: '',
  })

  const bankAccounts = accounts.filter((a) => a.type === 'bank')

  const handleAdd = () => {
    addAccount({
      name: newAccount.name,
      provider: newAccount.provider,
      balance: Number(newAccount.balance),
      type: 'bank',
    })
    setIsAddOpen(false)
    setNewAccount({ name: '', provider: '', balance: '' })
  }

  const getBankGradient = (provider: string) => {
    const p = provider.toLowerCase()
    if (p.includes('nubank')) return 'from-purple-800 to-purple-600 text-white'
    if (p.includes('itaú') || p.includes('itau'))
      return 'from-orange-600 to-orange-500 text-white'
    if (p.includes('bradesco')) return 'from-red-600 to-red-500 text-white'
    if (p.includes('inter')) return 'from-orange-500 to-yellow-500 text-white'
    return 'from-slate-900 to-slate-700 text-white'
  }

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Contas Bancárias
          </h2>
          <p className="text-muted-foreground text-sm">
            Gerencie suas contas correntes e poupanças.
          </p>
        </div>
        <Button
          onClick={() => setIsAddOpen(true)}
          className="gap-2 rounded-full shadow-lg shadow-primary/20"
        >
          <Plus className="h-4 w-4" />
          Adicionar
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bankAccounts.map((acc) => (
          <div
            key={acc.id}
            className={`group relative h-56 rounded-3xl p-6 flex flex-col justify-between shadow-xl transition-transform hover:-translate-y-1 bg-gradient-to-br ${getBankGradient(acc.provider)}`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl">
                  <Landmark className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold tracking-wide">
                  {acc.provider}
                </span>
              </div>
              <div className="text-white/80 font-mono text-sm">
                {acc.number || '**** 8829'}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-white/60">
                Saldo Atual
              </span>
              <div className="text-3xl font-bold tracking-tight font-mono text-white">
                {formatCurrency(acc.balance)}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <span className="text-sm font-medium text-white/90">
                {acc.name}
              </span>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            {/* Shine effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent rounded-3xl pointer-events-none" />
          </div>
        ))}

        {bankAccounts.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-border/50 rounded-3xl bg-muted/10">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Wallet className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">Nenhuma conta conectada</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              Adicione sua primeira conta para começar a controlar seu saldo
              consolidado em um só lugar.
            </p>
            <Button onClick={() => setIsAddOpen(true)} className="rounded-full">
              Adicionar Conta
            </Button>
          </div>
        )}
      </div>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="rounded-3xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nova Conta</DialogTitle>
            <DialogDescription>
              Insira os detalhes da instituição financeira.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Apelido da Conta</Label>
              <Input
                value={newAccount.name}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, name: e.target.value })
                }
                placeholder="Ex: Reserva de Emergência"
                className="rounded-xl"
              />
            </div>
            <div className="grid gap-2">
              <Label>Banco / Instituição</Label>
              <Input
                value={newAccount.provider}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, provider: e.target.value })
                }
                placeholder="Ex: Nubank"
                className="rounded-xl"
              />
            </div>
            <div className="grid gap-2">
              <Label>Saldo Inicial</Label>
              <Input
                type="number"
                value={newAccount.balance}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, balance: e.target.value })
                }
                placeholder="0.00"
                className="rounded-xl"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAdd} className="w-full rounded-xl">
              Salvar Conta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
