import { useState } from 'react'
import { Bell, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLocation } from 'react-router-dom'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { AddTransactionModal } from '@/components/modals/AddTransactionModal'

export function Header() {
  const location = useLocation()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard'
      case '/transactions':
        return 'Extrato'
      case '/accounts':
        return 'Contas Bancárias'
      case '/benefit-cards':
        return 'Cartões Benefício'
      case '/transport':
        return 'Mobilidade'
      case '/subscription':
        return 'Assinatura'
      default:
        return 'SaaS Financeiro'
    }
  }

  return (
    <header className="sticky top-0 z-20 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b flex items-center justify-between px-6 py-4 md:py-4 h-16">
      <h1 className="text-xl font-bold tracking-tight text-foreground">
        {getTitle()}
      </h1>

      <div className="flex items-center gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 font-medium border-b">Notificações</div>
            <div className="p-4 text-sm space-y-3">
              <div className="flex gap-3 items-start">
                <div className="h-2 w-2 mt-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                <p className="text-muted-foreground">
                  Seu saldo no Sodexo está acabando. Restam apenas 5 dias.
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <div className="h-2 w-2 mt-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                <p className="text-muted-foreground">
                  Novo insight disponível sobre seus gastos de transporte.
                </p>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Button
          size="sm"
          className="hidden md:flex bg-emerald-600 hover:bg-emerald-700 text-white gap-1"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Novo
        </Button>
        <Button
          size="icon"
          className="md:hidden bg-emerald-600 hover:bg-emerald-700 text-white rounded-full h-8 w-8"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </header>
  )
}
