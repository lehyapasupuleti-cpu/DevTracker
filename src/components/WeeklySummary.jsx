const iso = o => { const d = new Date(); d.setDate(d.getDate() + o); return d.toISOString().slice(0, 10) }
export default function WeeklySummary({ entries, streak }) {
  const days = [...Array(7)].map((_, i) => iso(i - 6))
  const done = entries.filter(e => e.status === 'Done' && days.includes(e.doneOn))
  const mins = days.map(d => done.filter(e => e.doneOn === d).reduce((a, e) => a + Number(e.minutes || 0), 0))
  const max = Math.max(1, ...mins)
  const pct = Math.round(new Set(done.map(e => e.doneOn)).size / 7 * 100)
  return (
    <section className="card">
      <h3>📈 Weekly Summary</h3>
      <div className="wk">
        {mins.map((m, i) => <div key={i}><i style={{ height: Math.max(4, m / max * 70) + 'px' }} title={m + ' min'} /><small>{new Date(days[i] + 'T00:00').toLocaleDateString('en', { weekday: 'narrow' })}</small></div>)}
      </div>
      <div className="wkstats">
        <span><b>{done.length}</b> days done</span><span><b>{mins.reduce((a, b) => a + b, 0)}</b> minutes</span>
        <span><b>{pct}%</b> active days</span><span><b>{streak}</b> day streak</span>
      </div>
    </section>
  )
}
