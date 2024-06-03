const SPREADSHEET_ID = '1kUhXAJuCglttg6bUYQvcGilyXnUKAtW99Z8bJzQi0LU'
const GOOGLE_API_KEY = 'AIzaSyDwBvbu-oNjWyUdOhKZJXJyG7zeSzckj94'

export default defineEventHandler(async () => {
  const rowRange = 'Lowest Score!A2:E'
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${rowRange}?key=${GOOGLE_API_KEY}`
  return await $fetch(url)
})
