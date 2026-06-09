import { useState, useEffect, useRef } from 'react'

export default function HabitModal({ habit, categories, t, onSave, onClose }) {
  const [name, setName] = useState(habit?.name || '')
  const [category, setCategory] = useState(habit?.category || categories[0])
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setError(t.enterHabitName)
      return
    }
    onSave(name, category)
  }

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={habit ? t.editHabit : t.addHabit}>
        <div className="modal__header">
          <h2 className="modal__title">{habit ? t.editHabit : t.addHabit}</h2>
          <button className="modal__close" onClick={onClose} aria-label={t.cancel}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="18" height="18">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form className="modal__form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="habit-name">{t.habitName}</label>
            <input
              ref={inputRef}
              id="habit-name"
              className={`form-input${error ? ' form-input--error' : ''}`}
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError('') }}
              placeholder={t.enterHabitName}
              maxLength={60}
              autoComplete="off"
            />
            {error && <span className="form-error">{error}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="habit-category">{t.category}</label>
            <div className="select-wrap">
              <select
                id="habit-category"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {t.categories[cat] || cat}
                  </option>
                ))}
              </select>
              <svg className="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="14" height="14">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          <div className="modal__footer">
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              {t.cancel}
            </button>
            <button type="submit" className="btn btn--primary">
              {t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
