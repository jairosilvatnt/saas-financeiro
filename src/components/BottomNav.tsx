import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Receipt, Wallet, Menu, Car } from 'lucide-react'
import { cn } from '@/lib/utils'

export function BottomNav() {
  const location = useLocation()

  const links = [
    { to: '/', label: 'Início', icon: LayoutDashboard },
    { to: '/transactions', label: 'Extrato', icon: Receipt },
    { to: '/accounts', label: 'Contas', icon: Wallet },
    { to: '/transport', label: 'Mobilidade', icon: Car },
    { to: '/subscription', label: 'Menu', icon: Menu },
  ]

  return (
    <nav className="md:hidden fixed bottom-6 left-4 right-4 z-50 bg-background/80 backdrop-blur-xl border border-white/20 dark:border-slate-800/50 rounded-2xl shadow-glass flex items-center justify-around p-2 transition-all duration-300">
      {links.map((link) => {
        const Icon = link.icon
        const isActive = location.pathname === link.to
        return (
          <Link
            key={link.to}
            to={link.to}
            className={cn(
              'flex flex-col items-center justify-center p-2 rounded-xl w-full transition-all duration-300 relative',
              isActive
                ? 'text-primary'
                : 'text-muted-foreground hover:text-primary/70',
            )}
          >
            <div
              className={cn(
                'absolute inset-0 bg-primary/10 rounded-xl scale-0 transition-transform duration-300',
                isActive && 'scale-100',
              )}
            />
            <Icon
              className={cn(
                'h-5 w-5 mb-1 relative z-10 transition-transform duration-300',
                isActive && '-translate-y-0.5 scale-110',
              )}
            />
            <span
              className={cn(
                'text-[10px] font-medium relative z-10 transition-opacity duration-300',
                isActive ? 'opacity-100 font-bold' : 'opacity-70',
              )}
            >
              {link.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
