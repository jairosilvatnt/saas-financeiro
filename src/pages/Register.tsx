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
import { Wallet } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-lg border-slate-200">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 bg-slate-900 rounded-xl flex items-center justify-center mb-2">
            <Wallet className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Crie sua conta</CardTitle>
          <CardDescription>
            Comece a controlar suas finanças hoje.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="personal">Pessoal</TabsTrigger>
              <TabsTrigger value="business">Empresarial</TabsTrigger>
            </TabsList>
            <form onSubmit={handleRegister}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" required placeholder="João" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastname">Sobrenome</Label>
                    <Input id="lastname" required placeholder="Silva" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input id="password" type="password" required />
                </div>
                <Button
                  className="w-full bg-slate-900 hover:bg-slate-800 mt-4"
                  disabled={loading}
                >
                  {loading ? 'Criando conta...' : 'Cadastrar'}
                </Button>
              </div>
            </form>
          </Tabs>
        </CardContent>
        <CardFooter className="justify-center">
          <div className="text-center text-sm text-muted-foreground">
            Já tem uma conta?{' '}
            <Link
              to="/login"
              className="text-emerald-600 font-medium hover:underline"
            >
              Fazer Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
