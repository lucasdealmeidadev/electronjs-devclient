import { ipcMain } from 'electron'
import * as customerRepository from '../../database/repositories/customer.repository'

export function registerCustomerIpc() {
  ipcMain.handle('customers:list', async () => {
    return customerRepository.list()
  })

  ipcMain.handle('customers:create', async (_, customer) => {
    return customerRepository.create(customer)
  })

  ipcMain.handle('customers:findById', async (_, id: string) => {
    return customerRepository.findById(id)
  })

  ipcMain.handle('customers:remove', async (_, id: string) => {
    return customerRepository.remove(id)
  })
}