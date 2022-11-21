import '@testing-library/jest-dom'
import { render, renderHook } from '@testing-library/react'
import { IntlProvider } from 'react-intl'
import { useToast } from '../../hooks'
import { messages } from '../../pages/_app'

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

jest.mock('../../hooks/useFormatIntl', () => ({
  useFormatIntl: jest.fn(() => ({
    format: jest.fn(),
  })),
}))

describe('useToast', () => {
  beforeEach(() => {
    render(<IntlProvider locale="en" messages={messages['en']}></IntlProvider>)
  })

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
