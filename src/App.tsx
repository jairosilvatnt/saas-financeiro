import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from '@/components/ThemeProvider'
import Index from './pages/Index'
import Login from './pages/Login'
import Register from './pages/Register'
import Transactions from './pages/Transactions'
import BankAccounts from './pages/BankAccounts'
import BenefitCards from './pages/BenefitCards'
import Transport from './pages/Transport'
import Subscription from './pages/Subscription'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <BrowserRouter
      future={{ v7_startTransition: false, v7_relativeSplatPath: false }}
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/accounts" element={<BankAccounts />} />
            <Route path="/benefit-cards" element={<BenefitCards />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/subscription" element={<Subscription />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </ThemeProvider>
)

export default App
