import { registerCustomerIpc } from './customer.ipc'
import { registerAppVersionIpc } from './app-version.ipc'

export function registerIpc() {
  registerAppVersionIpc(),
  registerCustomerIpc()
}