import { useState } from 'react'
import { calculateStreaks, getLast7Days } from '../utils/streaks'

const CATEGORY_STYLES = {
  Fitness:      { bg: '#dbeafe', color: '#1d4ed8' },
  Mindfulness:  { bg: '#ede9fe', color: '#6d28d9' },
  Learning:     { bg: '#fef3c7', color: '#b45309' },
  Productivity: { bg: '#d1fae5', color: '#065f46' },
  Drinking:     { bg: '#e0f2fe', color: '#0369a1' },
  Running:      { bg: '#ffedd5', color: '#c2410c' },
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  )
}

export default function HabitCard({ habit, today, t, onToggle, onEdit, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  const { currentStreak, longestStreak } = calculateStreaks(habit.completions)
  const isDoneToday = habit.completions.includes(today)
  const last7 = getLast7Days(today)
  const catStyle = CATEGORY_STYLES[habit.category] || { bg: '#f3f4f6', color: '#374151' }
  const streakDays = currentStreak === 1 ? t.day : t.days
  const bestDays = longestStreak === 1 ? t.day : t.days

  return (
    <article className={`habit-card${isDoneToday ? ' habit-card--done' : ''}`}>
      <div className="habit-card__main">
        <button
          className={`check-btn${isDoneToday ? ' check-btn--done' : ''}`}
          onClick={() => onToggle(habit.id)}
          aria-label={isDoneToday ? 'Mark incomplete' : 'Mark complete'}
        >
          {isDoneToday && <CheckIcon />}
        </button>

        <div className="habit-card__body">
          <div className="habit-card__row">
            <h3 className="habit-card__name">{habit.name}</h3>
            {currentStreak > 0 && (
              <span className="streak-badge">
                🔥 <strong>{currentStreak}</strong>
              </span>
            )}
          </div>

          <span
            className="category-badge"
            style={{ backgroundColor: catStyle.bg, color: catStyle.color }}
          >
            {t.categories[habit.category] || habit.category}
          </span>

          <div className="day-dots" aria-label="Last 7 days history">
            {last7.map((day) => (
              <span
                key={day}
                className={`day-dot${habit.completions.includes(day) ? ' day-dot--done' : ''}${day === today ? ' day-dot--today' : ''}`}
                aria-label={day}
              />
            ))}
          </div>

          <div className="habit-card__footer">
            <div className="streak-stats">
              <span>{t.currentStreak}: <strong>{currentStreak} {streakDays}</strong></span>
              <span className="streak-sep">·</span>
              <span>{t.longestStreak}: <strong>{longestStreak} {bestDays}</strong></span>
            </div>

            <div className="card-actions">
              {confirmDelete ? (
                <>
                  <button
                    className="action-btn action-btn--danger"
                    onClick={() => { onDelete(habit.id); setConfirmDelete(false) }}
                  >
                    {t.confirmYes}
                  </button>
                  <button
                    className="action-btn action-btn--ghost"
                    onClick={() => setConfirmDelete(false)}
                  >
                    {t.confirmNo}
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="icon-btn"
                    onClick={() => onEdit(habit)}
                    aria-label={t.editHabit}
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="icon-btn icon-btn--danger"
                    onClick={() => setConfirmDelete(true)}
                    aria-label={t.deleteHabit}
                  >
                    <TrashIcon />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
