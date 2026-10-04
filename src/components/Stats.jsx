export default function Stats({ s }) {
  const items = [['📅', s.total, 'Total Days'], ['✅', s.done, 'Completed'], ['⏳', s.pending, 'Pending'], ['⏱️', s.minutes, 'Minutes']]
  return (
    <section className="stats">
      {items.map(([ic, v, l]) => <div className="card stat" key={l}><span>{ic}</span><b>{v}</b><small>{l}</small></div>)}
    </section>
  )
}
