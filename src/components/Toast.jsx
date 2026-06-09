import { useEffect, useRef, useState } from 'react'

const CATEGORY_EMOJI = {
  Fitness: '💪',
  Mindfulness: '🧘',
  Learning: '📚',
  Productivity: '⚡',
  Drinking: '💧',
  Running: '🏃',
}

export default function Toast({ toast, onClose }) {
  const timerRef = useRef(null)
  const [closing, setClosing] = useState(false)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  const dismiss = () => {
    clearTimeout(timerRef.current)
    setClosing(true)
    setTimeout(() => onCloseRef.current(), 220)
  }

  useEffect(() => {
    if (toast) setClosing(false)
  }, [toast])

  useEffect(() => {
    if (!toast?.message) return
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(dismiss, 5000)
    return () => clearTimeout(timerRef.current)
  }, [toast?.message])

  if (!toast) return null

  const emoji = CATEGORY_EMOJI[toast.category] || '✨'

  return (
    <div className={`toast${closing ? ' toast--closing' : ''}`} role="status" aria-live="polite">
      <span className="toast__emoji" aria-hidden="true">{emoji}</span>
      <div className="toast__content">
        <p className="toast__habit">{toast.habitName}</p>
        {toast.message ? (
          <p className="toast__message">{toast.message}</p>
        ) : (
          <div className="toast__loading" aria-label="Generating motivation">
            <span /><span /><span />
          </div>
        )}
      </div>
      <button className="toast__close" onClick={dismiss} aria-label="Dismiss">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  )
}
