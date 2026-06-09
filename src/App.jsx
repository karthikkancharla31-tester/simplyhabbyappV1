import { useState, useEffect } from 'react'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import HabitList from './components/HabitList'
import HabitModal from './components/HabitModal'
import EmptyState from './components/EmptyState'
import { loadHabits, saveHabits, loadLanguage, saveLanguage } from './utils/storage'
import { getTodayString } from './utils/streaks'
import translations from './i18n/translations'
import './App.css'

export const CATEGORIES = ['Fitness', 'Mindfulness', 'Learning', 'Productivity', 'Drinking', 'Running']

function App() {
  const [habits, setHabits] = useState([])
  const [language, setLanguage] = useState('en')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingHabit, setEditingHabit] = useState(null)

  const t = translations[language]
  const today = getTodayString()

  useEffect(() => {
    setHabits(loadHabits())
    setLanguage(loadLanguage())
  }, [])

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
    saveLanguage(lang)
  }

  const handleAddHabit = (name, category) => {
    const newHabit = {
      id: Date.now().toString(),
      name: name.trim(),
      category,
      completions: [],
      createdAt: today,
    }
    const updated = [...habits, newHabit]
    setHabits(updated)
    saveHabits(updated)
    setModalOpen(false)
  }

  const handleEditHabit = (id, name, category) => {
    const updated = habits.map((h) =>
      h.id === id ? { ...h, name: name.trim(), category } : h
    )
    setHabits(updated)
    saveHabits(updated)
    setEditingHabit(null)
    setModalOpen(false)
  }

  const handleDeleteHabit = (id) => {
    const updated = habits.filter((h) => h.id !== id)
    setHabits(updated)
    saveHabits(updated)
  }

  const handleToggleComplete = (id) => {
    const updated = habits.map((h) => {
      if (h.id !== id) return h
      const completions = h.completions.includes(today)
        ? h.completions.filter((d) => d !== today)
        : [...h.completions, today]
      return { ...h, completions }
    })
    setHabits(updated)
    saveHabits(updated)
  }

  const openAddModal = () => {
    setEditingHabit(null)
    setModalOpen(true)
  }

  const openEditModal = (habit) => {
    setEditingHabit(habit)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingHabit(null)
  }

  const completedToday = habits.filter((h) => h.completions.includes(today)).length

  return (
    <div className="app">
      <Header language={language} onLanguageChange={handleLanguageChange} t={t} />

      <main className="main">
        <div className="container">
          <Dashboard
            habits={habits}
            completedToday={completedToday}
            today={today}
            t={t}
            onAddHabit={openAddModal}
          />

          {habits.length === 0 ? (
            <EmptyState t={t} onAddHabit={openAddModal} />
          ) : (
            <HabitList
              habits={habits}
              today={today}
              t={t}
              onToggle={handleToggleComplete}
              onEdit={openEditModal}
              onDelete={handleDeleteHabit}
            />
          )}
        </div>
      </main>

      <button className="fab" onClick={openAddModal} aria-label={t.addHabit}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      {modalOpen && (
        <HabitModal
          habit={editingHabit}
          categories={CATEGORIES}
          t={t}
          onSave={
            editingHabit
              ? (name, cat) => handleEditHabit(editingHabit.id, name, cat)
              : handleAddHabit
          }
          onClose={closeModal}
        />
      )}
    </div>
  )
}

export default App
