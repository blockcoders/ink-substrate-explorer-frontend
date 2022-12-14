export const getTimeAgo = (timestamp: number, locale?: string | undefined) => {
  const isNotEspanish = locale !== 'es'

  const seconds = Math.floor((Date.now() - timestamp) / 1000)
  let interval = Math.floor(seconds / 31536000)
  if (interval > 1) {
    return isNotEspanish ? `${interval} years ago` : `${interval} años`
  }
  interval = Math.floor(seconds / 2592000)
  if (interval > 1) {
    return isNotEspanish ? `${interval} months ago` : `${interval} meses`
  }
  interval = Math.floor(seconds / 86400)
  if (interval > 1) {
    return isNotEspanish ? `${interval} days ago` : `${interval} dias`
  }
  interval = Math.floor(seconds / 3600)
  if (interval > 1) {
    return isNotEspanish ? `${interval} hours ago` : `${interval} horas`
  }
  interval = Math.floor(seconds / 60)
  if (interval > 1) {
    return isNotEspanish ? `${interval} minutes ago` : `${interval} minutos`
  }
  return isNotEspanish ? `${Math.floor(seconds)} seconds ago` : `${Math.floor(seconds)} segundos`
}

export const formatTimeAgo = (timestamp: number, locale?: string | undefined) => {
  return getTimeAgo(timestamp, locale) + `(${new Date(timestamp).toUTCString()})`
}

export const showShortHash = (hash: string) => {
  return `${hash.slice(0, 6)}...${hash.slice(-6)}`
}
