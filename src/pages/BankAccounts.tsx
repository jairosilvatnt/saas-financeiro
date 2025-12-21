import { useState } from 'react'
import { useApp } from '@/context/AppContext'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Landmark, ExternalLink } from 'lucide-react'
import { formatCurrency } from '@/lib/formatters'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
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

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Contas Bancárias
          </h2>
          <p className="text-muted-foreground text-sm">
            Gerencie suas contas correntes e poupanças.
          </p>
        </div>
        <Button
          onClick={() => setIsAddOpen(true)}
          className="gap-2 bg-slate-900"
        >
          <Plus className="h-4 w-4" />
          Adicionar
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bankAccounts.map((acc) => (
          <Card
            key={acc.id}
            className="border-slate-200 shadow-md bg-gradient-to-br from-white to-slate-50"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <Landmark className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold">
                    {acc.provider}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {acc.name}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold font-mono text-slate-900 tracking-tight">
                {formatCurrency(acc.balance)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Conta: {acc.number || '****'}
              </p>
            </CardContent>
            <CardFooter className="bg-slate-50/50 border-t p-3">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
              >
                <ExternalLink className="h-3 w-3 mr-2" />
                Simular Open Finance
              </Button>
            </CardFooter>
          </Card>
        ))}

        {bankAccounts.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-lg border-slate-200 bg-slate-50/50">
            <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Landmark className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="font-medium text-slate-900">
              Nenhuma conta bancária
            </h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
              Adicione sua primeira conta para começar a controlar seu saldo
              consolidado.
            </p>
            <Button onClick={() => setIsAddOpen(true)}>Adicionar Conta</Button>
          </div>
        )}
      </div>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Conta Bancária</DialogTitle>
            <DialogDescription>
              Insira os dados da sua nova conta.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Nome da Conta (Apelido)</Label>
              <Input
                value={newAccount.name}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, name: e.target.value })
                }
                placeholder="Ex: Conta Principal"
              />
            </div>
            <div className="grid gap-2">
              <Label>Instituição</Label>
              <Input
                value={newAccount.provider}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, provider: e.target.value })
                }
                placeholder="Ex: Nubank, Itaú"
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
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAdd}>Salvar Conta</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
