import '@testing-library/jest-dom'
import { getTimeAgo } from '../../lib/utils'

jest.spyOn(Date, 'now').mockReturnValue(1668825731190)

describe('Utils', () => {
  describe('Show year', () => {
    const timestampyear = 1268825731190

    it('should show in spanish', () => {
      const date = getTimeAgo(timestampyear, 'es')
      expect(date).toContain('Hace')
      expect(date).toContain('años')
    })

    it('should show in english', () => {
      const date = getTimeAgo(timestampyear, 'en')
      expect(date).toContain('years ago')
    })
  })

  describe('Show month', () => {
    const timestampyear = 1648825731190

    it('should show in spanish', () => {
      const date = getTimeAgo(timestampyear, 'es')
      expect(date).toContain('Hace')
      expect(date).toContain('meses')
    })

    it('should show in english', () => {
      const date = getTimeAgo(timestampyear, 'en')
      expect(date).toContain('months ago')
    })
  })

  describe('Show day', () => {
    const timestampyear = 1668605731190

    it('should show in spanish', () => {
      const date = getTimeAgo(timestampyear, 'es')
      expect(date).toContain('Hace')
      expect(date).toContain('dias')
    })

    it('should show in english', () => {
      const date = getTimeAgo(timestampyear, 'en')
      expect(date).toContain('days ago')
    })
  })

  describe('Show hour', () => {
    const timestampyear = 1668815731190

    it('should show in spanish', () => {
      const date = getTimeAgo(timestampyear, 'es')
      expect(date).toContain('Hace')
      expect(date).toContain('horas')
    })

    it('should show in english', () => {
      const date = getTimeAgo(timestampyear, 'en')
      expect(date).toContain('hours ago')
    })
  })

  describe('Show second', () => {
    const timestampyear = 1668825721190

    it('should show in spanish', () => {
      const date = getTimeAgo(timestampyear, 'es')
      expect(date).toContain('Hace')
      expect(date).toContain('segundos')
    })

    it('should show in english', () => {
      const date = getTimeAgo(timestampyear, 'en')
      expect(date).toContain('seconds ago')
    })
  })
})
