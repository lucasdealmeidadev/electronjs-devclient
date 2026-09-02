import { useQueryClient, useMutation } from '@tanstack/react-query'
import { ArrowLeft, CheckCircle } from 'phosphor-react'
import { useRef, type ReactElement, type SubmitEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { customerToast } from '../lib/toast'
import { TooltipWrapper } from '../components/tooltip'

interface DataMutation {
  name: string
  email: string
  phone: string
  address: string
  role: string
  status: boolean
}

const inputClasses =
  'w-full mt-2 px-4 py-3 rounded-lg bg-app-input border border-app-border text-app-text placeholder:text-app-placeholder focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors'

const labelClasses = 'text-xs uppercase tracking-wide text-app-muted-text font-semibold'

export function Create(): ReactElement {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { isPending, mutate: createCustomer } = useMutation({
    mutationFn: (data: DataMutation) => window.api.customers.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      customerToast.created()
      navigate('/')
    },
    onError: (error) => {
      console.error('Error creating customer: ', error)
      customerToast.createError()
    }
  })

  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const phoneRef = useRef<HTMLInputElement | null>(null)
  const addressRef = useRef<HTMLInputElement | null>(null)
  const roleRef = useRef<HTMLInputElement | null>(null)

  function handleAddCustomer(e: SubmitEvent<HTMLFormElement>): void {
    e.preventDefault()

    const data: DataMutation = {
      name: nameRef.current?.value ?? '',
      email: emailRef.current?.value ?? '',
      phone: phoneRef.current?.value ?? '',
      address: addressRef.current?.value ?? '',
      role: roleRef.current?.value ?? '',
      status: true
    }

    createCustomer(data)
  }

  return (
    <main className="flex-1 flex flex-col py-12 px-6 md:px-10 overflow-y-auto text-app-text">
      <header className="flex items-center gap-3 mb-6">
        <TooltipWrapper content="Voltar" side="right">
          <Link
            to="/"
            aria-label="Voltar para listagem"
            className="inline-flex items-center justify-center p-2 rounded-full bg-app-muted hover:bg-app-border text-app-heading transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-app-heading" weight="bold" />
          </Link>
        </TooltipWrapper>
        <h1 className="text-app-heading text-xl lg:text-2xl font-semibold">Cadastrar cliente</h1>
      </header>

      <section className="flex flex-1 justify-center">
        <form
          onSubmit={handleAddCustomer}
          className="w-full max-w-2xl bg-app-surface border border-app-border rounded-lg p-6 flex flex-col gap-5"
        >
          <div>
            <label htmlFor="name" className={labelClasses}>
              Nome
            </label>
            <input
              id="name"
              type="text"
              placeholder="Digite o nome do cliente"
              className={inputClasses}
              ref={nameRef}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="email" className={labelClasses}>
                E-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="email@exemplo.com"
                className={inputClasses}
                ref={emailRef}
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className={labelClasses}>
                Telefone
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="(00) 00000-0000"
                className={inputClasses}
                ref={phoneRef}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="address" className={labelClasses}>
              Endereço
            </label>
            <input
              id="address"
              type="text"
              placeholder="Rua, número, cidade"
              className={inputClasses}
              ref={addressRef}
              required
            />
          </div>

          <div>
            <label htmlFor="role" className={labelClasses}>
              Cargo
            </label>
            <input
              id="role"
              type="text"
              placeholder="Ex.: Gerente, Desenvolvedor..."
              className={inputClasses}
              ref={roleRef}
              required
            />
          </div>

          <div className="border-t border-app-border pt-4 flex items-center justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle className="w-4 h-4 text-white" weight="bold" />
              {isPending ? 'Cadastrando...' : 'Cadastrar cliente'}
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}
