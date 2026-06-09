import { calculateStreaks } from '../utils/streaks'

function formatDate(today, lang) {
  const date = new Date(today + 'T12:00:00')
  const localeMap = { en: 'en-US', es: 'es-ES', fr: 'fr-FR', ja: 'ja-JP' }
  return date.toLocaleDateString(localeMap[lang] || 'en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

export default function Dashboard({ habits, completedToday, today, t, onAddHabit }) {
  const total = habits.length
  const pct = total === 0 ? 0 : Math.round((completedToday / total) * 100)
  const activeStreaks = habits.filter((h) => calculateStreaks(h.completions).currentStreak > 0).length

  const completedLabel =
    completedToday === 1 ? t.habitCompleted : t.habitsCompleted

  return (
    <section className="dashboard">
      <div className="dashboard__top">
        <div>
          <p className="dashboard__date">{formatDate(today, 'en')}</p>
          <h2 className="dashboard__heading">{t.todayProgress}</h2>
        </div>
        <button className="btn-add-top" onClick={onAddHabit} aria-label={t.addHabit}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {t.addHabit}
        </button>
      </div>

      <div className="progress-wrap">
        <div className="progress-bar" role="progressbar" aria-valuenow={pct} aria-valuemin="0" aria-valuemax="100">
          <div className="progress-bar__fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="progress-label">
          <span className="progress-label__pct">{pct}%</span>
          <span className="progress-label__text">
            {total === 0
              ? t.noHabitsTitle
              : `${completedToday} ${t.of} ${total} ${completedLabel}`}
          </span>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-card__value">{total}</span>
          <span className="stat-card__label">{t.totalHabits}</span>
        </div>
        <div className="stat-card stat-card--accent">
          <span className="stat-card__value">{completedToday}</span>
          <span className="stat-card__label">{t.completedToday}</span>
        </div>
        <div className="stat-card stat-card--flame">
          <span className="stat-card__value">
            {activeStreaks > 0 && <span className="stat-flame">🔥</span>}
            {activeStreaks}
          </span>
          <span className="stat-card__label">{t.activeStreaks}</span>
        </div>
      </div>
    </section>
  )
}
