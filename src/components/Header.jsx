const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'fr', label: 'FR' },
  { code: 'ja', label: 'JA' },
]

export default function Header({ language, onLanguageChange, t }) {
  return (
    <header className="header">
      <div className="header__inner container">
        <div className="header__brand">
          <span className="header__icon">🌿</span>
          <span className="header__title">{t.appName}</span>
        </div>
        <div className="header__lang" role="group" aria-label="Language selector">
          {LANGS.map(({ code, label }) => (
            <button
              key={code}
              className={`lang-btn ${language === code ? 'lang-btn--active' : ''}`}
              onClick={() => onLanguageChange(code)}
              aria-pressed={language === code}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
