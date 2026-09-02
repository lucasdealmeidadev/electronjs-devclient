import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type { CreateCustomer } from '../shared/types/customer'

// Custom APIs for renderer
const api = {
  getPlatform: () => process.platform,
  isMacOS: () => process.platform === 'darwin',
  isWindows: () => process.platform === 'win32',
  isLinux: () => process.platform === 'linux',
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  customers: {
    list: () => ipcRenderer.invoke('customers:list'),
    create: (customer: CreateCustomer) => ipcRenderer.invoke('customers:create', customer),
    findById: (id: string) => ipcRenderer.invoke('customers:findById', id),
    remove: (id: string) => ipcRenderer.invoke('customers:remove', id)
  },
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
