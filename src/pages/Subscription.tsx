import { useApp } from '@/context/AppContext'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Subscription() {
  const { user } = useApp()

  const plans = [
    {
      name: 'Free',
      price: 'R$ 0',
      features: [
        'Até 2 contas bancárias',
        '1 Cartão benefício',
        'Lançamentos manuais',
        'Dashboard básico',
      ],
      current: user.plan === 'Free',
    },
    {
      name: 'Pro',
      price: 'R$ 29,90',
      features: [
        'Contas ilimitadas',
        'Cartões ilimitados',
        'Open Finance (Beta)',
        'Insights IA Avançados',
      ],
      current: user.plan === 'Pro',
    },
    {
      name: 'Business',
      price: 'R$ 59,90',
      features: [
        'Múltiplos perfis (PJ/PF)',
        'Gestão de equipe',
        'Relatórios Fiscais',
        'Suporte Prioritário',
      ],
      current: user.plan === 'Business',
    },
  ]

  return (
    <div className="space-y-8 pb-20 md:pb-0">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 border-2 border-white shadow-md">
          <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=male" />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">{user.email}</span>
            <Badge variant="secondary" className="text-xs">
              {user.plan}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Configurações de Perfil</CardTitle>
            <CardDescription>
              Atualize suas informações pessoais.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Nome Completo</Label>
              <Input defaultValue={user.name} />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input defaultValue={user.email} />
            </div>
            <div className="pt-2">
              <Button>Salvar Alterações</Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Seu Plano</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative flex flex-col ${plan.current ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500' : 'border-slate-200'}`}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <div className="text-2xl font-bold">
                    {plan.price}
                    <span className="text-xs font-normal text-muted-foreground">
                      /mês
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Check className="h-3 w-3 text-emerald-500" /> {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={plan.current ? 'default' : 'outline'}
                    className="w-full"
                    disabled={plan.current}
                  >
                    {plan.current ? 'Atual' : 'Escolher'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
