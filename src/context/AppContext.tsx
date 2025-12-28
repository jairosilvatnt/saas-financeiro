import React, { createContext, useContext, useState } from 'react'

// Types
export type TransactionType = 'income' | 'expense'
export type Category =
  | 'Food'
  | 'Transport'
  | 'Utilities'
  | 'Salary'
  | 'Entertainment'
  | 'Health'
  | 'Shopping'
  | 'Other'
export type AccountType = 'bank' | 'benefit' | 'transport'

export interface Transaction {
  id: string
  description: string
  amount: number
  date: string
  type: TransactionType
  category: Category
  sourceId: string // Account ID
  sourceName: string
}

export interface Account {
  id: string
  name: string
  type: AccountType
  balance: number
  provider: string // e.g., Nubank, Sodexo
  number?: string
  blocked?: boolean
  expiryDay?: number
}

interface AppContextType {
  user: { name: string; email: string; plan: 'Free' | 'Pro' | 'Business' }
  accounts: Account[]
  transactions: Transaction[]
  addTransaction: (t: Omit<Transaction, 'id'>) => void
  addAccount: (a: Omit<Account, 'id'>) => void
  toggleBlockCard: (id: string) => void
  getAccountBalance: (id: string) => number
  getTotalBalance: () => number
}

const AppContext = createContext<AppContextType | undefined>(undefined)

// Mock Data
const INITIAL_ACCOUNTS: Account[] = [
  {
    id: '1',
    name: 'Conta Principal',
    type: 'bank',
    balance: 4520.5,
    provider: 'Nubank',
    number: '1234-5',
  },
  {
    id: '2',
    name: 'Reserva',
    type: 'bank',
    balance: 12500.0,
    provider: 'Itaú',
    number: '9876-0',
  },
  {
    id: '3',
    name: 'Vale Refeição',
    type: 'benefit',
    balance: 450.0,
    provider: 'Sodexo',
    expiryDay: 20,
  },
  {
    id: '4',
    name: 'Vale Alimentação',
    type: 'benefit',
    balance: 800.0,
    provider: 'Alelo',
    expiryDay: 15,
  },
  {
    id: '5',
    name: 'Mobilidade',
    type: 'transport',
    balance: 120.0,
    provider: 'Bilhete Único',
  },
]

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    description: 'Salário Mensal',
    amount: 8500,
    date: '2024-05-01',
    type: 'income',
    category: 'Salary',
    sourceId: '1',
    sourceName: 'Nubank',
  },
  {
    id: '2',
    description: 'Almoço Restaurante',
    amount: 45.9,
    date: '2024-05-02',
    type: 'expense',
    category: 'Food',
    sourceId: '3',
    sourceName: 'Sodexo',
  },
  {
    id: '3',
    description: 'Uber para Trabalho',
    amount: 24.5,
    date: '2024-05-03',
    type: 'expense',
    category: 'Transport',
    sourceId: '1',
    sourceName: 'Nubank',
  },
  {
    id: '4',
    description: 'Supermercado Semanal',
    amount: 450.2,
    date: '2024-05-05',
    type: 'expense',
    category: 'Food',
    sourceId: '4',
    sourceName: 'Alelo',
  },
  {
    id: '5',
    description: 'Netflix Assinatura',
    amount: 55.9,
    date: '2024-05-05',
    type: 'expense',
    category: 'Entertainment',
    sourceId: '1',
    sourceName: 'Nubank',
  },
  {
    id: '6',
    description: 'Conta de Luz',
    amount: 120.0,
    date: '2024-05-10',
    type: 'expense',
    category: 'Utilities',
    sourceId: '1',
    sourceName: 'Nubank',
  },
  {
    id: '7',
    description: 'Cinema + Pipoca',
    amount: 85.0,
    date: '2024-05-12',
    type: 'expense',
    category: 'Entertainment',
    sourceId: '1',
    sourceName: 'Nubank',
  },
  {
    id: '8',
    description: 'Farmácia',
    amount: 45.5,
    date: '2024-05-13',
    type: 'expense',
    category: 'Health',
    sourceId: '1',
    sourceName: 'Nubank',
  },
  {
    id: '9',
    description: 'Freelance Design',
    amount: 1200.0,
    date: '2024-05-15',
    type: 'income',
    category: 'Salary',
    sourceId: '2',
    sourceName: 'Itaú',
  },
  {
    id: '10',
    description: 'Café da Tarde',
    amount: 15.0,
    date: '2024-05-16',
    type: 'expense',
    category: 'Food',
    sourceId: '3',
    sourceName: 'Sodexo',
  },
]

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user] = useState({
    name: 'Alex Silva',
    email: 'alex@example.com',
    plan: 'Pro' as const,
  })
  const [accounts, setAccounts] = useState<Account[]>(INITIAL_ACCOUNTS)
  const [transactions, setTransactions] =
    useState<Transaction[]>(INITIAL_TRANSACTIONS)

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...t, id: Math.random().toString(36).substr(2, 9) }
    setTransactions((prev) => [newTransaction, ...prev])

    // Update balance
    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === t.sourceId) {
          return {
            ...acc,
            balance:
              t.type === 'income'
                ? acc.balance + t.amount
                : acc.balance - t.amount,
          }
        }
        return acc
      }),
    )
  }

  const addAccount = (a: Omit<Account, 'id'>) => {
    setAccounts((prev) => [
      ...prev,
      { ...a, id: Math.random().toString(36).substr(2, 9) },
    ])
  }

  const toggleBlockCard = (id: string) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === id ? { ...acc, blocked: !acc.blocked } : acc,
      ),
    )
  }

  const getAccountBalance = (id: string) =>
    accounts.find((a) => a.id === id)?.balance || 0

  const getTotalBalance = () =>
    accounts.reduce((acc, curr) => acc + curr.balance, 0)

  return (
    <AppContext.Provider
      value={{
        user,
        accounts,
        transactions,
        addTransaction,
        addAccount,
        toggleBlockCard,
        getAccountBalance,
        getTotalBalance,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
