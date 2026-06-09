export default function EmptyState({ t, onAddHabit }) {
  return (
    <section className="empty-state">
      <div className="empty-state__art" aria-hidden="true">
        <div className="empty-art__circle">
          <span className="empty-art__emoji">🌱</span>
        </div>
        <div className="empty-art__dots">
          <span />
          <span />
          <span />
        </div>
      </div>
      <h3 className="empty-state__title">{t.noHabitsTitle}</h3>
      <p className="empty-state__desc">{t.noHabitsDesc}</p>
      <button className="btn btn--primary btn--lg" onClick={onAddHabit}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        {t.addFirstHabit}
      </button>
    </section>
  )
}
