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
      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        <AppSidebar />
        <div className="flex-1 flex flex-col md:ml-64 mb-16 md:mb-0 transition-all duration-300 ease-in-out">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden animate-fade-in">
            <Outlet />
          </main>
        </div>
        <BottomNav />
      </div>
    </AppProvider>
  )
}
