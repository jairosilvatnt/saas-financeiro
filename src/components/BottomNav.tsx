import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Receipt, Wallet, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'

export function BottomNav() {
  const location = useLocation()

  const links = [
    { to: '/', label: 'Início', icon: LayoutDashboard },
    { to: '/transactions', label: 'Extrato', icon: Receipt },
    { to: '/accounts', label: 'Contas', icon: Wallet },
    { to: '/subscription', label: 'Menu', icon: Menu },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t h-16 pb-safe flex items-center justify-around px-2 shadow-lg">
      {links.map((link) => {
        const Icon = link.icon
        const isActive = location.pathname === link.to
        return (
          <Link
            key={link.to}
            to={link.to}
            className={cn(
              'flex flex-col items-center justify-center p-2 rounded-lg w-16 transition-all duration-200',
              isActive
                ? 'text-primary scale-105'
                : 'text-muted-foreground hover:text-primary/70',
            )}
          >
            <Icon className={cn('h-5 w-5 mb-1', isActive && 'fill-current')} />
            <span className="text-[10px] font-medium">{link.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
