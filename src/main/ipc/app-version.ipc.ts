import { app, ipcMain } from 'electron'

export function registerAppVersionIpc() {
  ipcMain.handle('get-app-version', () => app.getVersion())
}