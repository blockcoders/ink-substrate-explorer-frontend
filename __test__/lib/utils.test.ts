import '@testing-library/jest-dom'
import { getTimeAgo } from '../../lib/utils'

describe('Utils', () => {
  beforeAll(() => {
    jest.spyOn(Date, 'now').mockImplementation(() => 1666930664553)
  })

  describe('getTimego', () => {
    it('should render months time', () => {
      jest.spyOn(Date, 'now').mockImplementation(() => 1666930664553)

      const time = getTimeAgo(1646930623755)

      expect(time).toContain('months')
    })

    it('should render years time', () => {
      jest.spyOn(Date, 'now').mockImplementation(() => 1666930664553)

      const time = getTimeAgo(1566930623755)

      expect(time).toContain('years')
    })

    it('should render minutes time', () => {
      jest.spyOn(Date, 'now').mockImplementation(() => 1666930664553)

      const time = getTimeAgo(1666924664553)

      expect(time).toContain('minutes')
    })
  })
})
