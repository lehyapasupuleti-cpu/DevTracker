import { useState, useEffect, useRef } from 'react'
import Header from './components/Header.jsx'
import BottomNav from './components/BottomNav.jsx'
import Dashboard from './components/Dashboard.jsx'
import ProgressCard from './components/ProgressCard.jsx'
import AddLearning from './components/AddLearning.jsx'
import LearningTimeline from './components/LearningTimeline.jsx'
import SearchBar from './components/SearchBar.jsx'
import FilterButtons from './components/FilterButtons.jsx'
import Streak from './components/Streak.jsx'
import Achievements, { BADGES } from './components/Achievements.jsx'
import WeeklySummary from './components/WeeklySummary.jsx'

const K = 'devtracker-data', T = 'devtracker-theme'
const iso = (o = 0) => { const d = new Date(); d.setDate(d.getDate() + o); return d.toISOString().slice(0, 10) }
const seed = [
  { id: 1, day: 1, title: 'HTML Fundamentals', topic: 'Tags, forms, semantic HTML', date: iso(-2), minutes: 45, status: 'Done', doneOn: iso(-2) },
  { id: 2, day: 2, title: 'CSS Flexbox', topic: 'Layouts and alignment', date: iso(-1), minutes: 50, status: 'Done', doneOn: iso(-1) },
  { id: 3, day: 3, title: 'JavaScript Functions', topic: 'Arrow functions and callbacks', date: iso(), minutes: 60, status: 'In Progress', doneOn: null },
  { id: 4, day: 4, title: 'React Components', topic: 'Props and composition', date: iso(1), minutes: 60, status: 'Pending', doneOn: null },
  { id: 5, day: 5, title: 'React Hooks', topic: 'useState and useEffect', date: iso(2), minutes: 60, status: 'Pending', doneOn: null },
]
const load = () => { try { const v = JSON.parse(localStorage.getItem(K)); if (Array.isArray(v)) return v } catch (e) {} return seed }
const streakOf = (e) => {
  const s = new Set(e.filter(x => x.status === 'Done' && x.doneOn).map(x => x.doneOn))
  let o = s.has(iso(0)) ? 0 : -1, n = 0
  while (s.has(iso(o))) { n++; o-- }
  return n
}

export default function App() {
  const [entries, setEntries] = useState(load)
  const [dark, setDark] = useState(() => localStorage.getItem(T) === 'dark')
  const [tab, setTab] = useState('home')
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('All')
  const [form, setForm] = useState(null)
  const [toast, setToast] = useState('')
  const prevDone = useRef(null)

  useEffect(() => { localStorage.setItem(K, JSON.stringify(entries)) }, [entries])
  useEffect(() => { localStorage.setItem(T, dark ? 'dark' : 'light'); document.documentElement.dataset.theme = dark ? 'dark' : 'light' }, [dark])

  const say = (m) => { setToast(m); setTimeout(() => setToast(''), 2400) }
  const done = entries.filter(e => e.status === 'Done')
  const s = {
    total: entries.length, done: done.length, pending: entries.length - done.length,
    pct: entries.length ? Math.round(done.length / entries.length * 100) : 0,
    minutes: done.reduce((a, e) => a + Number(e.minutes || 0), 0), streak: streakOf(entries),
  }
  useEffect(() => {
    if (prevDone.current !== null && s.done > prevDone.current) {
      const b = BADGES.find(x => x.n === s.done)
      if (b) say(`${b.icon} Achievement unlocked: ${b.name}!`)
    }
    prevDone.current = s.done
  }, [s.done])

  const mission = [...entries].sort((a, b) => a.day - b.day).find(e => e.status !== 'Done')
  const setStatus = (id, st) => {
    setEntries(es => es.map(e => e.id === id ? { ...e, status: st, doneOn: st === 'Done' ? (e.doneOn || iso()) : null } : e))
    if (st === 'Done') say('🎉 Mission Complete!')
  }
  const save = (f) => {
    const e = { ...f, doneOn: f.status === 'Done' ? (f.doneOn || iso()) : null }
    setEntries(es => f.id ? es.map(x => x.id === f.id ? e : x) : [...es, { ...e, id: Date.now() }])
    setForm(null); say(f.id ? '✏️ Entry updated' : '✅ Learning day added')
  }
  const del = (id) => { if (window.confirm('Delete this learning day?')) { setEntries(es => es.filter(e => e.id !== id)); say('🗑️ Deleted') } }
  const reset = () => { if (window.confirm('Reset ALL data? This cannot be undone.')) { setEntries(seed); say('Data reset') } }
  const ql = q.trim().toLowerCase()
  const shown = entries.filter(e => (filter === 'All' || e.status === filter) &&
    (!ql || e.title.toLowerCase().includes(ql) || e.topic.toLowerCase().includes(ql) || String(e.day).padStart(2, '0').includes(ql) || ('day ' + e.day).includes(ql)))
    .sort((a, b) => a.day - b.day)
  const next = Math.max(0, ...entries.map(e => +e.day)) + 1

  return (
    <div className="app">
      <Header dark={dark} toggle={() => setDark(!dark)} />
      <main>
        {tab === 'home' && <Dashboard s={s} mission={mission} onStart={(id) => setStatus(id, 'In Progress')} onDone={(id) => setStatus(id, 'Done')} />}
        {tab === 'learn' && <>
          <SearchBar q={q} setQ={setQ} />
          <FilterButtons filter={filter} setFilter={setFilter} />
          <LearningTimeline items={shown} onStatus={setStatus} onEdit={setForm} onDelete={del} />
        </>}
        {tab === 'progress' && <>
          <ProgressCard pct={s.pct} done={s.done} total={s.total} />
          <WeeklySummary entries={entries} streak={s.streak} />
          <button className="btn danger wide" onClick={reset}>Reset All Data</button>
        </>}
        {tab === 'awards' && <><Streak n={s.streak} /><Achievements done={s.done} /></>}
      </main>
      <button className="fab" aria-label="Add learning day" onClick={() => setForm({ day: next, title: '', topic: '', date: iso(), minutes: 60, status: 'Pending' })}>＋</button>
      <BottomNav tab={tab} setTab={setTab} />
      {form && <AddLearning initial={form} onSave={save} onClose={() => setForm(null)} />}
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  )
}
