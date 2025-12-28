/* 404 Page - Displays when a user attempts to access a non-existent route */
import { useLocation, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Home, AlertCircle } from 'lucide-react'

const NotFound = () => {
  const location = useLocation()

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname,
    )
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
        <div className="relative bg-muted/30 p-8 rounded-full border border-border/40">
          <AlertCircle className="w-16 h-16 text-primary" />
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-display">
        Página não encontrada
      </h1>
      <p className="text-muted-foreground max-w-md text-lg mb-8 leading-relaxed">
        Ops! Parece que a página{' '}
        <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">
          {location.pathname}
        </code>{' '}
        que você está procurando não existe ou foi movida.
      </p>

      <Button
        asChild
        size="lg"
        className="rounded-full px-8 shadow-lg shadow-primary/20"
      >
        <Link to="/">
          <Home className="mr-2 h-4 w-4" />
          Voltar para o Início
        </Link>
      </Button>
    </div>
  )
}

export default NotFound
