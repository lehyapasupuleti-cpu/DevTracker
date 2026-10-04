export default function SearchBar({ q, setQ }) {
  return <input className="field search" type="search" placeholder="Search your learning..." value={q} onChange={e => setQ(e.target.value)} aria-label="Search" />
}
