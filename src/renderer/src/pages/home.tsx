import { useQuery } from '@tanstack/react-query'
import type { ReactElement } from 'react'
import { Link } from 'react-router'
import { Plus } from 'phosphor-react'
import { TableCustomer } from '../components/table-customer'

export function Home(): ReactElement {
  const { data, isFetching } = useQuery({
    queryKey: ['customers'],
    queryFn: () => window.api.customers.list()
  })

  return (
    <div className="flex-1 flex flex-col py-12 text-app-text px-6 md:px-10">
      <header className="flex items-center justify-between gap-4 mb-4 flex-wrap">
        <h1 className="text-app-heading text-xl lg:text-2xl font-semibold">Clientes</h1>
        <Link
          to="/create"
          className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" weight="bold" />
          Cadastrar cliente
        </Link>
      </header>

      <section className="flex flex-col gap-6 w-full h-screen overflow-y-auto pb-50">
        <TableCustomer data={data ?? []} loading={isFetching} />
      </section>
    </div>
  )
}
