import { toast, type ToastOptions } from 'react-toastify'

const baseOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark'
}

export const customerToast = {
  created: () => toast.success('Cliente cadastrado com sucesso.', baseOptions),
  removed: () => toast.success('Cliente excluído com sucesso.', baseOptions),
  createError: () =>
    toast.error('Não foi possível cadastrar o cliente. Tente novamente.', baseOptions),
  removeError: () =>
    toast.error('Não foi possível excluir o cliente. Tente novamente.', baseOptions)
}
