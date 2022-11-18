import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BackButton } from '../../components/BackButton/BackButton'

userEvent.setup()

const backMock = jest.fn()

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    back: backMock,
  })),
}))

describe('BackButton', () => {
  let container: HTMLElement

  beforeEach(() => {
    const { container: _container } = render(
      <div className="btn-container">
        <BackButton />
      </div>,
    )
    container = _container
  })

  it('should render', async () => {
    const backBtn = await container.getElementsByClassName('back_btn')?.[0]

    expect(backBtn).toBeInTheDocument()
  })

  it('show call router.back()', async () => {
    const backBtn = await container.getElementsByClassName('back_btn')?.[0]

    await fireEvent.click(backBtn)

    expect(backMock).toHaveBeenCalled()
  })
})
