export default function Streak({ n }) {
  return (
    <section className="card streak">
      <div className="flame">🔥</div>
      <h3>{n} Day Streak</h3>
      <p>{n > 0 ? "You're on fire! Keep learning tomorrow." : 'Complete a day today to start your streak!'}</p>
    </section>
  )
}
