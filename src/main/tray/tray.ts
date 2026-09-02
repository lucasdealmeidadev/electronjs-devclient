import { Menu, Tray, nativeImage, BrowserWindow } from 'electron'
import path from 'node:path'

export function createTray(mainWindow: BrowserWindow) {
  const iconPath = path.join(__dirname, 'resources', 'menuTemplate.png')
  let trayIcon = nativeImage.createFromPath(iconPath)

  const tray = new Tray(trayIcon)
  const menu = Menu.buildFromTemplate([
    { label: 'Dev Clientes', enabled: false },
    { type:  'separator' },
    {
      label: 'Abrir',
      click: () => {
        if (mainWindow.isMinimized()) {
          mainWindow.restore()
        }

        mainWindow.show()
        mainWindow.focus()
      }
    },
    { label: 'Sair', role: 'quit' }
  ])

  tray.setToolTip('Dev Clientes')

  tray.setContextMenu(menu)
}