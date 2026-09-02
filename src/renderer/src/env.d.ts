/// <reference types="vite/client" />
/// <reference path="../../preload/index.d.ts" />

declare global {
  interface Window {
    api: {
      getPlatform: () => string
      isMacOS: () => boolean
      isWindows: () => boolean
      isLinux: () => boolean
    }
  }
}

export {}
