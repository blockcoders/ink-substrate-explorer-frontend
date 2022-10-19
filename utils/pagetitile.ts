export function getTitle(route: string) {
  const title = route.split('/')[1]
  return title[0].toUpperCase() + title.substring(1)
}
