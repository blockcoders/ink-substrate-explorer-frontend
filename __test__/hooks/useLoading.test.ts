import '@testing-library/jest-dom'
import { renderHook, act } from '@testing-library/react'
import { useLoading } from '../../hooks'

describe('useLoading', () => {
  it('should show isLoading in false as default', () => {
    const { result } = renderHook(() => useLoading())

    expect(result.current.isLoading).toBe(false)
  })

  it('should change isLoading to true', async () => {
    const { result } = renderHook(() => useLoading())

    await act(() => result.current.startLoading())

    expect(result.current.isLoading).toBe(true)
  })

  it('should change isLoading to false', async () => {
    const { result } = renderHook(() => useLoading())

    await act(() => result.current.startLoading())

    await act(() => result.current.endLoading())

    expect(result.current.isLoading).toBe(false)
  })
})
