import { QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import { queryClient } from './lib/react-query'
import { useTheme } from './hooks/use-theme'
import { Routes } from './routes'

export default function App() {
  const { resolvedTheme } = useTheme()

  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme={resolvedTheme}
      />
    </QueryClientProvider>
  )
}
