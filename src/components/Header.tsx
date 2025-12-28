import { useState } from 'react'
import { Bell, Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLocation } from 'react-router-dom'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { AddTransactionModal } from '@/components/modals/AddTransactionModal'
import { ThemeToggle } from './ThemeToggle'
import { useApp } from '@/context/AppContext'

export function Header() {
  const location = useLocation()
  const { user } = useApp()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return `Olá, ${user.name.split(' ')[0]}`
      case '/transactions':
        return 'Extrato'
      case '/accounts':
        return 'Contas Bancárias'
      case '/benefit-cards':
        return 'Cartões Benefício'
      case '/transport':
        return 'Mobilidade'
      case '/subscription':
        return 'Perfil & Assinatura'
      default:
        return 'SaaS Financeiro'
    }
  }

  const getSubtitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Visão geral das suas finanças hoje.'
      case '/transactions':
        return 'Gerencie todas as suas movimentações.'
      case '/accounts':
        return 'Monitore seus saldos bancários.'
      case '/benefit-cards':
        return 'Controle seus vales e benefícios.'
      case '/transport':
        return 'Gestão de custos com deslocamento.'
      case '/subscription':
        return 'Gerencie seus dados e plano.'
      default:
        return ''
    }
  }

  return (
    <header className="sticky top-0 z-30 w-full bg-background/80 backdrop-blur-md border-b border-border/40 transition-all duration-300">
      <div className="flex items-center justify-between px-6 py-4 md:py-5">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-xl md:text-2xl font-display font-bold tracking-tight text-foreground">
            {getTitle()}
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground hidden md:block">
            {getSubtitle()}
          </p>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              className="pl-9 bg-muted/50 border-transparent focus:bg-background transition-all rounded-full h-9 text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-full hover:bg-muted"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-background animate-pulse" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-80 p-0 rounded-2xl shadow-xl border-border/50"
                align="end"
              >
                <div className="p-4 font-semibold border-b border-border/50 bg-muted/30">
                  Notificações
                </div>
                <div className="p-2 space-y-1">
                  <div className="flex gap-3 items-start p-3 hover:bg-muted/50 rounded-xl transition-colors cursor-pointer">
                    <div className="h-2 w-2 mt-2 rounded-full bg-rose-500 flex-shrink-0 shadow-sm shadow-rose-500/50" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Alerta de Saldo
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Seu saldo no Sodexo está acabando. Restam apenas 5 dias.
                      </p>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button
              size="sm"
              className="hidden md:flex rounded-full px-4 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Novo Lançamento
            </Button>
            <Button
              size="icon"
              className="md:hidden rounded-full h-9 w-9 shadow-lg shadow-primary/20"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </header>
  )
}
