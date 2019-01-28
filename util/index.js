const util = {
  getDateString,
}

module.exports = util

function getDateString () {
  const date = new Date()
  const y = date.getFullYear()
  let m = date.getMonth()
  let d = date.getDay()
  if (m < 10) {m = '0' + m}
  if (d < 10) {d = '0' + m}
  return d + m + y
}
