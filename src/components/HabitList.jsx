import { useState } from 'react'
import HabitCard from './HabitCard'

const CATEGORY_ORDER = ['Fitness', 'Mindfulness', 'Learning', 'Productivity', 'Drinking', 'Running']

export default function HabitList({ habits, today, t, onToggle, onEdit, onDelete }) {
  const [activeTab, setActiveTab] = useState('All')

  const presentCategories = CATEGORY_ORDER.filter((cat) => habits.some((h) => h.category === cat))
  const tabs = ['All', ...presentCategories]
  const validTab = tabs.includes(activeTab) ? activeTab : 'All'

  const byNewest = (a, b) => Number(b.id) - Number(a.id)
  const filtered = validTab === 'All' ? habits : habits.filter((h) => h.category === validTab)
  const incomplete = filtered.filter((h) => !h.completions.includes(today)).sort(byNewest)
  const complete = filtered.filter((h) => h.completions.includes(today)).sort(byNewest)
  const sorted = [...incomplete, ...complete]

  return (
    <section className="habit-list">
      <div className="category-tabs" role="tablist" aria-label="Filter by category">
        {tabs.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={validTab === cat}
            className={`category-tab${validTab === cat ? ' category-tab--active' : ''}`}
            onClick={() => setActiveTab(cat)}
          >
            {cat === 'All' ? t.all : (t.categories[cat] || cat)}
          </button>
        ))}
      </div>

      <div className="habit-list__grid">
        {sorted.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            today={today}
            t={t}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  )
}
