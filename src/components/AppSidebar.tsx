import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Receipt,
  CreditCard,
  Wallet,
  Car,
  Settings,
  LogOut,
  TrendingUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useApp } from '@/context/AppContext'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

export function AppSidebar() {
  const location = useLocation()
  const { user } = useApp()

  const links = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/transactions', label: 'Lançamentos', icon: Receipt },
    { to: '/accounts', label: 'Contas Bancárias', icon: Wallet },
    { to: '/benefit-cards', label: 'Cartões Benefício', icon: CreditCard },
    { to: '/transport', label: 'Mobilidade', icon: Car },
  ]

  const settingsLinks = [
    { to: '/subscription', label: 'Configurações', icon: Settings },
  ]

  return (
    <aside className="hidden md:flex h-screen w-72 flex-col border-r border-border/40 bg-card/50 backdrop-blur-xl fixed left-0 top-0 z-40 shadow-sm transition-all duration-300">
      <div className="p-8 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
            <TrendingUp className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl tracking-tight text-foreground">
              SaaS Financeiro
            </h1>
            <p className="text-xs text-muted-foreground">Gestão Inteligente</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-2">
        <Separator className="bg-border/50" />
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-8">
        <div>
          <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Principal
          </p>
          <div className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon
              const isActive = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4 transition-colors',
                      isActive
                        ? 'text-primary-foreground'
                        : 'text-muted-foreground group-hover:text-foreground',
                    )}
                  />
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>

        <div>
          <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Conta
          </p>
          <div className="space-y-1">
            {settingsLinks.map((link) => {
              const Icon = link.icon
              const isActive = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4 transition-colors',
                      isActive
                        ? 'text-primary-foreground'
                        : 'text-muted-foreground group-hover:text-foreground',
                    )}
                  />
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      <div className="p-4 mt-auto">
        <div className="glass-card rounded-2xl p-4 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-background">
              <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=male" />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold truncate text-foreground">
                {user.name}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {user.email}
              </span>
            </div>
          </div>
          <Link to="/login">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-center gap-2 text-muted-foreground hover:text-destructive hover:border-destructive/30 hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sair da Conta
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  )
}
