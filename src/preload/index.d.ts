import { ElectronAPI } from '@electron-toolkit/preload'
import { CreateCustomer, Customer } from '../shared/types/customer'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getPlatform: () => string
      isMacOS: () => boolean
      isWindows: () => boolean
      isLinux: () => boolean
      getAppVersion: () => string
      customers: {
        list: () => Promise<Customer[]>,
        create: (customer: CreateCustomer) => Promise<PouchDB.Core.Response | void>,
        findById(id: string): Promise<Customer>,
        remove(id: string): Promise<PouchDB.Core.Response | void>
      },
    }
  }
}
