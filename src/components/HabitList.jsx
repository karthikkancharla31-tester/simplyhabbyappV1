import HabitCard from './HabitCard'

export default function HabitList({ habits, today, t, onToggle, onEdit, onDelete }) {
  const incomplete = habits.filter((h) => !h.completions.includes(today))
  const complete = habits.filter((h) => h.completions.includes(today))
  const sorted = [...incomplete, ...complete]

  return (
    <section className="habit-list">
      <h2 className="habit-list__heading">{t.allHabits}</h2>
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
