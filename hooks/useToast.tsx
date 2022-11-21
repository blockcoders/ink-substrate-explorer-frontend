import { toast } from 'react-toastify'
import { useFormatIntl } from './useFormatIntl'

const toastCommonProps = {
  style: {
    backgroundColor: '#F0EFEF',
    color: '#000',
  },
}

export const useToast = () => {
  const { format } = useFormatIntl()

  const showSuccessToast = (message: string) => {
    toast.dismiss()
    toast.success(message, {
      toastId: 'toast-success',
      ...toastCommonProps,
    })
  }

  const showErrorToast = (message: string) => {
    toast.dismiss()
    toast.error(String(message), {
      toastId: 'toast-error',
      ...toastCommonProps,
    })
  }

  const showLoadingToast = () => {
    toast.dismiss()
    toast.loading(format('loading'), {
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
