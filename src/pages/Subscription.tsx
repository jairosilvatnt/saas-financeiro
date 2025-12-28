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
import { Check, Crown, Shield, User } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Subscription() {
  const { user } = useApp()

  const plans = [
    {
      name: 'Free',
      price: 'R$ 0',
      icon: User,
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
      icon: Shield,
      popular: true,
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
      icon: Crown,
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
    <div className="space-y-8 animate-slide-up max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-6 p-6 glass-card rounded-3xl border-border/40">
        <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
          <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=male" />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">{user.name}</h2>
          <div className="flex flex-col md:flex-row items-center gap-3">
            <span className="text-muted-foreground">{user.email}</span>
            <Badge
              variant="secondary"
              className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary"
            >
              Membro {user.plan}
            </Badge>
          </div>
        </div>
        <div className="md:ml-auto">
          <Button variant="outline" className="rounded-full">
            Editar Foto
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="glass-card border-border/40 rounded-3xl h-fit">
          <CardHeader>
            <CardTitle>Dados Pessoais</CardTitle>
            <CardDescription>
              Mantenha suas informações atualizadas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Nome Completo</Label>
              <Input defaultValue={user.name} className="rounded-xl" />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input defaultValue={user.email} className="rounded-xl" />
            </div>
            <div className="pt-4">
              <Button className="w-full rounded-xl">Salvar Alterações</Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <h3 className="text-xl font-bold px-1">Planos Disponíveis</h3>
          <div className="grid gap-4">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative flex flex-col md:flex-row items-center p-2 rounded-3xl transition-all duration-300 ${plan.current ? 'border-primary ring-1 ring-primary shadow-lg shadow-primary/10' : 'border-border/40 hover:border-primary/50'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    Recomendado
                  </div>
                )}
                <div className="p-6 flex flex-col items-center md:items-start min-w-[140px]">
                  <div
                    className={`p-3 rounded-2xl mb-3 ${plan.current ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                  >
                    <plan.icon className="h-6 w-6" />
                  </div>
                  <span className="font-bold text-lg">{plan.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {plan.price}/mês
                  </span>
                </div>

                <CardContent className="flex-1 p-4 pt-0 md:pt-4">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {plan.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />{' '}
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="p-4 w-full md:w-auto">
                  <Button
                    variant={plan.current ? 'secondary' : 'default'}
                    className="w-full md:w-auto rounded-xl px-6"
                    disabled={plan.current}
                  >
                    {plan.current ? 'Plano Atual' : 'Escolher'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
