import { randomUUID } from 'node:crypto'
import { db } from '../index'
import { Customer, CreateCustomer } from '../schema/customer'

function handleDatabaseError(operation: string, error: unknown): never {
  const message = error instanceof Error ? error.message : 'Erro desconhecido'

  console.error(`[customer.repository] Falha ao ${operation}:`, error)

  throw new Error(`Falha ao ${operation}: ${message}`)
}

export async function create(customer: Customer) {
  try {
    return await db.put({
      ...customer,
      _id: randomUUID()
    })
  } catch (error) {
    return handleDatabaseError('criar cliente', error)
  }
}

export async function list() {
  try {
    const docs = await db.allDocs<Customer>({
      include_docs: true,
    })

    return docs.rows.map(row => row.doc!).filter(Boolean)
  } catch (error) {
    return handleDatabaseError('listar clientes', error)
  }
}

export async function findById(id: string) {
  try {
    return await db.get<Customer>(id)
  } catch (error) {
    return handleDatabaseError(`buscar cliente com id ${id}`, error)
  }
}

export async function remove(id: string) {
  try {
    const doc = await db.get<Customer>(id)
    return await db.remove(doc)
  } catch (error) {
    return handleDatabaseError(`remover cliente com id ${id}`, error)
  }
}