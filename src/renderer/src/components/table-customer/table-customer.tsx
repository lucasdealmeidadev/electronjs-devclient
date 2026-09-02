import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customerToast } from '../../lib/toast'
import { TableCustomerRow, type Customer } from './table-customer-row'
import { TableCustomerEmpty } from './table-customer-empty'

export type { Customer }

export function TableCustomer({
  data,
  loading
}: {
  data: Customer[]
  loading?: boolean
}): React.ReactElement {
  const queryClient = useQueryClient()
  const isEmpty = data.length === 0

  const { isPending: isDeleting, mutate: removeCustomer } = useMutation({
    mutationFn: (id: string) => window.api.customers.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      customerToast.removed()
    },
    onError: (error) => {
      console.error('Error removing customer: ', error)
      customerToast.removeError()
    }
  })

  function handleDelete(id: string): void {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      removeCustomer(id)
    }
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-app-border bg-app-surface">
      <table className="w-full text-left text-sm text-app-text">
        <thead className="hidden bg-app-muted text-xs uppercase text-app-muted-text sm:table-header-group">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold">
              Nome
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              E-mail
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Telefone
            </th>
            <th scope="col" className="px-4 py-3 font-semibold text-center">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {loading && isEmpty ? (
            <tr>
              <td
                colSpan={4}
                className="block px-4 py-12 text-center text-app-muted-text sm:table-cell"
              >
                Carregando...
              </td>
            </tr>
          ) : isEmpty ? (
            <TableCustomerEmpty />
          ) : (
            data.map((customer) => (
              <TableCustomerRow
                key={customer._id}
                customer={customer}
                onDelete={handleDelete}
                isDeleting={isDeleting}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
