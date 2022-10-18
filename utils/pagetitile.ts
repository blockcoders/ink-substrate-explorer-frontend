export function getTitle(route: string) {
  let title
  if (route.includes('transaction')) {
    title = 'Transactions'
  } else if (route.includes('contract')) {
    title = 'Contracts'
  } else {
    title = 'Blocks'
  }
  return title
}
