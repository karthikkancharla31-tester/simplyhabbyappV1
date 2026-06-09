const HABITS_KEY = 'simply_habby_habits'
const LANGUAGE_KEY = 'simply_habby_language'

export const loadHabits = () => {
  try {
    const data = localStorage.getItem(HABITS_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export const saveHabits = (habits) => {
  localStorage.setItem(HABITS_KEY, JSON.stringify(habits))
}

export const loadLanguage = () => {
  return localStorage.getItem(LANGUAGE_KEY) || 'en'
}

export const saveLanguage = (lang) => {
  localStorage.setItem(LANGUAGE_KEY, lang)
}
