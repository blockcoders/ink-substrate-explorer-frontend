import { toast } from 'react-toastify'

export const useToast = () => {
  const showSuccessToast = (message: string) => {
    toast.dismiss()
    toast.success(message, {
      toastId: 'toast-success',
    })
  }

  const showErrorToast = (message: string) => {
    toast.dismiss()
    toast.error(message, {
      toastId: 'toast-error',
    })
  }

  const showLoadingToast = () => {
    toast.dismiss()
    toast.loading('Loading', {
      autoClose: false,
      toastId: 'toast-loading',
    })
  }

  return {
    showSuccessToast,
    showErrorToast,
    showLoadingToast,
  }
}
