import '@testing-library/jest-dom'
import { getTimeAgo } from '../../lib/utils'

jest.spyOn(Date, 'now').mockReturnValue(1668825731190)

describe('Utils', () => {
  describe('Show year', () => {
    const timestamp = 1268825731190

    it('should show in spanish', () => {
      const date = getTimeAgo(timestamp, 'es')
      expect(date).toContain('Hace')
      expect(date).toContain('años')
    })

    it('should show in english', () => {
      const date = getTimeAgo(timestamp, 'en')
      expect(date).toContain('years ago')
    })
  })

  describe('Show month', () => {
    const timestamp = 1648825731190

    it('should show in spanish', () => {
      const date = getTimeAgo(timestamp, 'es')
      expect(date).toContain('Hace')
      expect(date).toContain('meses')
    })

    it('should show in english', () => {
      const date = getTimeAgo(timestamp, 'en')
      expect(date).toContain('months ago')
    })
  })

  describe('Show day', () => {
    const timestamp = 1668605731190

    it('should show in spanish', () => {
      const date = getTimeAgo(timestamp, 'es')
      expect(date).toContain('Hace')
      expect(date).toContain('dias')
    })

    it('should show in english', () => {
      const date = getTimeAgo(timestamp, 'en')
      expect(date).toContain('days ago')
    })
  })

  describe('Show hour', () => {
    const timestamp = 1668815731190

    it('should show in spanish', () => {
      const date = getTimeAgo(timestamp, 'es')
      expect(date).toContain('Hace')
      expect(date).toContain('horas')
    })

    it('should show in english', () => {
      const date = getTimeAgo(timestamp, 'en')
      expect(date).toContain('hours ago')
    })
  })

  describe('Show minute', () => {
    const timestamp = 1668822731190

    it('should show in spanish', () => {
      const date = getTimeAgo(timestamp, 'es')
      expect(date).toContain('Hace')
      expect(date).toContain('minutos')
    })

    it('should show in english', () => {
      const date = getTimeAgo(timestamp, 'en')
      expect(date).toContain('minutes ago')
    })
  })

  describe('Show second', () => {
    const timestamp = 1668825721190

    it('should show in spanish', () => {
      const date = getTimeAgo(timestamp, 'es')
      expect(date).toContain('Hace')
      expect(date).toContain('segundos')
    })

    it('should show in english', () => {
      const date = getTimeAgo(timestamp, 'en')
      expect(date).toContain('seconds ago')
    })
  })
})
