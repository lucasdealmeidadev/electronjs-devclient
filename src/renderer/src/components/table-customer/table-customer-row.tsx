import { Eye, Trash } from 'phosphor-react'
import { Link } from 'react-router'
import { TooltipWrapper } from '../tooltip'

export type Customer = {
  _id: string
  name: string
  email: string
  phone?: string
}

type TableCustomerRowProps = {
  customer: Customer
  onDelete: (id: string) => void
  isDeleting?: boolean
}

const cellClasses =
  'block px-0 py-1 text-app-text sm:table-cell sm:px-4 sm:py-3 before:content-[attr(data-label)] before:font-semibold before:text-app-muted-text before:mr-2 sm:before:content-none'

export function TableCustomerRow({ customer, onDelete, isDeleting }: TableCustomerRowProps) {
  return (
    <tr className="block border-b border-app-border p-4 sm:table-row hover:bg-app-muted transition-colors">
      <td className={cellClasses}>
        <Link
          to={`/customers/${customer._id}`}
          title={customer.name}
          className="block max-w-[180px] truncate font-semibold text-app-heading hover:text-app-text"
        >
          {customer.name}
        </Link>
      </td>
      <td data-label="E-mail" className={cellClasses}>
        <span className="block max-w-[220px] truncate" title={customer.email}>
          {customer.email}
        </span>
      </td>
      <td data-label="Telefone" className={cellClasses}>
        <span className="block max-w-[140px] truncate" title={customer.phone || ''}>
          {customer.phone || '—'}
        </span>
      </td>
      <td data-label="Ações" className={`${cellClasses} sm:text-center`}>
        <div className="flex items-center justify-center gap-2">
          <TooltipWrapper content="Visualizar">
            <Link
              to={`/customers/${customer._id}`}
              aria-label="Visualizar cliente"
              className="inline-flex items-center justify-center p-2 rounded-full bg-blue-500 hover:bg-blue-600 border border-transparent text-white transition-colors"
            >
              <Eye className="w-5 h-5 text-white" weight="bold" />
            </Link>
          </TooltipWrapper>
          <TooltipWrapper content="Excluir cliente">
            <button
              type="button"
              aria-label="Excluir cliente"
              disabled={isDeleting}
              onClick={() => onDelete(customer._id)}
              className="inline-flex items-center justify-center p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash className="w-5 h-5 text-white" weight="bold" />
            </button>
          </TooltipWrapper>
        </div>
      </td>
    </tr>
  )
}
