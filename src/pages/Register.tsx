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
import { TrendingUp, Check } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Register() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/')
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row-reverse bg-background">
      {/* Visual Side */}
      <div className="hidden lg:flex flex-1 bg-slate-950 relative overflow-hidden flex-col justify-between p-12 text-white">
        <div className="z-10 flex items-center justify-end gap-2">
          <span className="font-bold text-xl tracking-tight">
            SaaS Financeiro
          </span>
          <div className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
        </div>
        <div className="z-10 max-w-lg ml-auto text-right">
          <h1 className="text-4xl font-bold tracking-tight mb-8 leading-tight">
            A ferramenta definitiva para suas finanças pessoais.
          </h1>
          <ul className="space-y-4 inline-block text-left">
            {[
              'Conexão com múltiplos bancos',
              'Gestão de cartões benefício',
              'Inteligência Artificial para insights',
              'Controle de gastos com transporte',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-slate-300">
                <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Check className="h-3 w-3 text-emerald-400" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="z-10 text-sm text-slate-500 text-right">
          Junte-se a +50.000 usuários
        </div>

        {/* Abstract shapes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 animate-fade-in">
        <Card className="w-full max-w-md border-none shadow-none bg-transparent">
          <CardHeader className="space-y-2 px-0 text-center lg:text-left">
            <CardTitle className="text-3xl font-bold tracking-tight">
              Crie sua conta
            </CardTitle>
            <CardDescription className="text-base">
              Comece a controlar suas finanças hoje mesmo.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 h-12 rounded-xl bg-muted/50 p-1">
                <TabsTrigger
                  value="personal"
                  className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Pessoal
                </TabsTrigger>
                <TabsTrigger
                  value="business"
                  className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Empresarial
                </TabsTrigger>
              </TabsList>
              <form onSubmit={handleRegister}>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        required
                        placeholder="João"
                        className="rounded-xl h-11 bg-muted/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastname">Sobrenome</Label>
                      <Input
                        id="lastname"
                        required
                        placeholder="Silva"
                        className="rounded-xl h-11 bg-muted/30"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      className="rounded-xl h-11 bg-muted/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      className="rounded-xl h-11 bg-muted/30"
                    />
                  </div>
                  <Button
                    className="w-full h-12 mt-4 text-base rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all"
                    disabled={loading}
                  >
                    {loading ? 'Criando conta...' : 'Começar Agora'}
                  </Button>
                </div>
              </form>
            </Tabs>
          </CardContent>
          <CardFooter className="justify-center px-0">
            <div className="text-center text-sm text-muted-foreground">
              Já tem uma conta?{' '}
              <Link
                to="/login"
                className="text-primary font-bold hover:underline"
              >
                Fazer Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
