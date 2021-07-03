const durationFormatter = (seconds) => {
  if (!seconds) return ''

  let duration = seconds

  let hours = duration / (60 * 60)
  duration = duration % (60 * 60)

  let min = parseInt(duration / 60)
  duration = duration % 60

  let sec = parseInt(duration)

  if (parseInt(hours, 10) > 0) {
    return `${parseInt(hours, 10)}h ${min}m ${sec}s`
  } else if (min === 0) {
    return `${sec}s`
  } else {
    return `${min}m ${sec}s`
  }
}

export { durationFormatter }
