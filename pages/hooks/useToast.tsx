import { toast } from 'react-toastify'

const toastCommonProps = {
  style: {
    backgroundColor: '#F0EFEF',
    color: '#000',
  },
}

export const useToast = () => {
  const showSuccessToast = (message: string) => {
    toast.dismiss()
    toast.success(message, {
      toastId: 'toast-success',
      ...toastCommonProps,
    })
  }

  const showErrorToast = (message: string) => {
    toast.dismiss()
    toast.error(message, {
      toastId: 'toast-error',
      ...toastCommonProps,
    })
  }

  const showLoadingToast = () => {
    toast.dismiss()
    toast.loading('Loading', {
      autoClose: false,
      toastId: 'toast-loading',
      ...toastCommonProps,
    })
  }

  return {
    showSuccessToast,
    showErrorToast,
    showLoadingToast,
  }
}
