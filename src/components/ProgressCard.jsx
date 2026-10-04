export default function ProgressCard({ pct, done, total }) {
  const r = 52, c = 2 * Math.PI * r
  return (
    <section className="card prog">
      <div className="ring">
        <svg viewBox="0 0 120 120"><circle cx="60" cy="60" r={r} className="track" /><circle cx="60" cy="60" r={r} className="fill" strokeDasharray={c} strokeDashoffset={c - c * pct / 100} /></svg>
        <b>{pct}%</b>
      </div>
      <div className="grow">
        <h3>Overall Learning Progress</h3>
        <div className="bar"><i style={{ width: pct + '%' }} /></div>
        <p>{done} / {total} Days Completed</p>
      </div>
    </section>
  )
}
