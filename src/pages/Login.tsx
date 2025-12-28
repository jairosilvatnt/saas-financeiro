import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { TrendingUp, ArrowRight } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/')
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Visual Side */}
      <div className="hidden lg:flex flex-1 bg-slate-900 relative overflow-hidden flex-col justify-between p-12 text-white">
        <div className="z-10 flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">
            SaaS Financeiro
          </span>
        </div>
        <div className="z-10 max-w-lg">
          <h1 className="text-5xl font-bold tracking-tight mb-6 leading-tight">
            Controle financeiro moderno para mentes ambiciosas.
          </h1>
          <p className="text-slate-400 text-lg">
            Junte-se a milhares de usuários que transformaram sua relação com o
            dinheiro usando nossa plataforma inteligente.
          </p>
        </div>
        <div className="z-10 text-sm text-slate-500">
          © 2024 SaaS Financeiro Inc.
        </div>

        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
      </div>

      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 animate-fade-in">
        <Card className="w-full max-w-md border-none shadow-none bg-transparent">
          <CardHeader className="space-y-2 px-0">
            <CardTitle className="text-3xl font-bold tracking-tight">
              Bem-vindo de volta
            </CardTitle>
            <CardDescription className="text-base">
              Entre com suas credenciais para acessar sua conta.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-6 px-0 mt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  className="rounded-xl h-12 bg-muted/30"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link
                    to="#"
                    className="text-xs text-primary font-medium hover:underline"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  className="rounded-xl h-12 bg-muted/30"
                />
              </div>
              <Button
                className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Acessar Conta'}
                {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 px-0">
              <div className="text-center text-sm text-muted-foreground">
                Não tem uma conta?{' '}
                <Link
                  to="/register"
                  className="text-primary font-bold hover:underline"
                >
                  Cadastre-se gratuitamente
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
