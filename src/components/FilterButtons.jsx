export default function FilterButtons({ filter, setFilter }) {
  return (
    <div className="filters">
      {['All', 'Done', 'In Progress', 'Pending'].map(f => <button key={f} className={filter === f ? 'on' : ''} onClick={() => setFilter(f)}>{f}</button>)}
    </div>
  )
}
