import { Outlet, useLocation } from 'react-router-dom'
import { AppSidebar } from './AppSidebar'
import { BottomNav } from './BottomNav'
import { Header } from './Header'
import { AppProvider } from '@/context/AppContext'

export default function Layout() {
  const location = useLocation()
  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/register'

  if (isAuthPage) {
    return <Outlet />
  }

  return (
    <AppProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row font-sans selection:bg-primary selection:text-primary-foreground">
        <AppSidebar />
        <div className="flex-1 flex flex-col md:ml-72 mb-20 md:mb-0 transition-all duration-300 ease-in-out">
          <Header />
          <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-x-hidden animate-fade-in max-w-7xl mx-auto w-full">
            <Outlet />
          </main>
        </div>
        <BottomNav />
      </div>
    </AppProvider>
  )
}
