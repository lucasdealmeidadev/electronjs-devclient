export interface Customer {
  _id: string
  _rev?: string
  name: string
  email: string
  role: string
  status: boolean
  address?: string
  phone?: string
  createdAt?: string
}

export type CreateCustomer = Omit<Customer, '_id' | '_rev'>
export type UpdateCustomer = Partial<CreateCustomer>