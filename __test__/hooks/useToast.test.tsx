import '@testing-library/jest-dom'
import { renderHook } from '@testing-library/react'
import { useToast } from '../../hooks'

const dismissMock = jest.fn()
const successMock = jest.fn()
const errorMock = jest.fn()
const loadingMock = jest.fn()

jest.mock('react-toastify', () => ({
  toast: {
    dismiss: () => dismissMock(),
    success: () => successMock(),
    error: () => errorMock(),
    loading: () => loadingMock(),
  },
}))

describe('useToast', () => {
  it('should call success toast', () => {
    const { result } = renderHook(() => useToast())

    result.current.showSuccessToast('Show success')

    expect(dismissMock).toHaveBeenCalled()
    expect(successMock).toHaveBeenCalled()
  })

  it('should call error toast', () => {
    const { result } = renderHook(() => useToast())

    result.current.showErrorToast('Show success')

    expect(dismissMock).toHaveBeenCalled()
    expect(errorMock).toHaveBeenCalled()
  })

  it('should call loading toast', () => {
    const { result } = renderHook(() => useToast())

    result.current.showLoadingToast()

    expect(dismissMock).toHaveBeenCalled()
    expect(loadingMock).toHaveBeenCalled()
  })
})
