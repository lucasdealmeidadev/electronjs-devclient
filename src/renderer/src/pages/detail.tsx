import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  ArrowLeft,
  Envelope,
  Phone,
  MapPin,
  CheckCircle,
  XCircle,
  Trash,
  User
} from 'phosphor-react'
import type { ReactElement } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { customerToast } from '../lib/toast'
import { TooltipWrapper } from '../components/tooltip'

export function Detail(): ReactElement {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data, isFetching } = useQuery({
    queryKey: ['customer'],
    queryFn: () => window.api.customers.findById(id!)
  })

  const { isPending, mutate: removeCustomer } = useMutation({
    mutationFn: (customerId: string) => window.api.customers.remove(customerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      customerToast.removed()
      navigate('/')
    },
    onError: (error) => {
      console.error('Error removing customer: ', error)
      customerToast.removeError()
    }
  })

  function handleDelete(): void {
    if (!data) return
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      removeCustomer(data._id)
    }
  }

  return (
    <main className="flex-1 flex flex-col py-12 text-app-text px-6 md:px-10">
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
        <h1 className="text-app-heading text-xl lg:text-2xl font-semibold">Detalhes do cliente</h1>
      </header>

      <section className="flex flex-1 justify-center">
        <div className="w-full max-w-2xl">
          {isFetching && <p className="text-app-muted-text text-sm">Carregando...</p>}

          {!isFetching && !data && (
            <p className="text-app-muted-text text-sm">Cliente não encontrado.</p>
          )}

          {data && (
            <div className="bg-app-surface border border-app-border rounded-lg max-w-2xl w-full flex flex-col">
              <div className="flex items-center gap-4 p-6 pb-4">
                <div className="w-14 h-14 rounded-full bg-app-muted flex items-center justify-center shrink-0">
                  <User className="w-7 h-7 text-app-muted-text" weight="bold" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-app-heading truncate">{data.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    {data.status ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-500">
                        <CheckCircle className="w-4 h-4" weight="fill" />
                        Ativo
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-500">
                        <XCircle className="w-4 h-4" weight="fill" />
                        Inativo
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-app-border" />

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 pb-4">
                <div className="flex items-start gap-3">
                  <Envelope className="w-5 h-5 text-app-muted-text shrink-0 mt-0.5" weight="bold" />
                  <div className="min-w-0">
                    <dt className="text-xs uppercase text-app-muted-text font-semibold">E-mail</dt>
                    <dd className="text-sm text-app-text break-all">{data.email}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-app-muted-text shrink-0 mt-0.5" weight="bold" />
                  <div className="min-w-0">
                    <dt className="text-xs uppercase text-app-muted-text font-semibold">
                      Telefone
                    </dt>
                    <dd className="text-sm text-app-text">{data.phone || '—'}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:col-span-2">
                  <MapPin className="w-5 h-5 text-app-muted-text shrink-0 mt-0.5" weight="bold" />
                  <div className="min-w-0">
                    <dt className="text-xs uppercase text-app-muted-text font-semibold">
                      Endereço
                    </dt>
                    <dd className="text-sm text-app-text">{data.address || '—'}</dd>
                  </div>
                </div>

                {data.role && (
                  <div className="flex items-start gap-3 sm:col-span-2">
                    <User className="w-5 h-5 text-app-muted-text shrink-0 mt-0.5" weight="bold" />
                    <div className="min-w-0">
                      <dt className="text-xs uppercase text-app-muted-text font-semibold">
                        Função
                      </dt>
                      <dd className="text-sm text-app-text">{data.role}</dd>
                    </div>
                  </div>
                )}
              </dl>

              <div className="border-t border-app-border bg-app-subtle rounded-b-lg px-6 py-4 flex items-center justify-end gap-3">
                <TooltipWrapper content="Excluir cliente">
                  <button
                    type="button"
                    aria-label="Excluir cliente"
                    disabled={isPending}
                    onClick={handleDelete}
                    className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash className="w-4 h-4 text-white" weight="regular" />
                    {isPending ? 'Excluindo...' : 'Excluir cliente'}
                  </button>
                </TooltipWrapper>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
