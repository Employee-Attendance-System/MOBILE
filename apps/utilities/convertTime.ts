export function convertISOToRegular(isoString: string): string {
  const date = new Date(isoString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export function splitIsoDate(isoDate: string): { date: string; time: string } {
  const date = new Date(isoDate)

  // Format the date as YYYY-MM-DD
  const formattedDate = `${date.getUTCFullYear()}-${String(
    date.getUTCMonth() + 1
  ).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`

  // Format the time as HH:MM:SS
  const formattedTime = `${String(date.getUTCHours()).padStart(2, '0')}:${String(
    date.getUTCMinutes()
  ).padStart(2, '0')}:${String(date.getUTCSeconds()).padStart(2, '0')}`

  return {
    date: formattedDate,
    time: formattedTime
  }
}
