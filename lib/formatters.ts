import formatDuration from 'format-duration'

export const formateDuration = function formateDuration(duration = 0) {
  return formatDuration(duration * 1000)
}

export const formateDate = function formateDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
