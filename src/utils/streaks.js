export const getTodayString = () => new Date().toISOString().split('T')[0]

const offsetDate = (dateStr, days) => {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

export const calculateStreaks = (completions) => {
  if (!completions || completions.length === 0) return { currentStreak: 0, longestStreak: 0 }

  const sorted = [...new Set(completions)].sort()
  const today = getTodayString()
  const lastDate = sorted[sorted.length - 1]

  // Longest streak over all time
  let longestStreak = 1
  let tempStreak = 1
  for (let i = 1; i < sorted.length; i++) {
    const diffDays = (new Date(sorted[i]) - new Date(sorted[i - 1])) / 86400000
    if (diffDays === 1) {
      tempStreak++
      if (tempStreak > longestStreak) longestStreak = tempStreak
    } else {
      tempStreak = 1
    }
  }

  // Current streak: still active if last completion was today or yesterday
  let currentStreak = 0
  const yesterday = offsetDate(today, -1)
  if (lastDate === today || lastDate === yesterday) {
    currentStreak = 1
    let checkDate = lastDate
    for (let i = sorted.length - 2; i >= 0; i--) {
      if (sorted[i] === offsetDate(checkDate, -1)) {
        currentStreak++
        checkDate = sorted[i]
      } else {
        break
      }
    }
  }

  return { currentStreak, longestStreak: Math.max(longestStreak, currentStreak) }
}

export const getLast7Days = (today) =>
  Array.from({ length: 7 }, (_, i) => offsetDate(today, i - 6))

export const getWeekDays = (today) => {
  const d = new Date(today)
  const dayOfWeek = d.getUTCDay() // 0=Sun
  return Array.from({ length: 7 }, (_, i) => {
    const nd = new Date(d)
    nd.setUTCDate(d.getUTCDate() - dayOfWeek + i)
    return nd.toISOString().split('T')[0]
  })
}
