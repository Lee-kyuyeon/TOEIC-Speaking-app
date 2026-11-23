import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { stopSpeaking } from '../lib/tts'

const NAV = [
  { to: '/', label: '홈', icon: '⌂', end: true },
  { to: '/exam', label: '시험 정보', icon: 'ⓘ' },
  { to: '/register', label: '접수', icon: '✎' },
  { to: '/study', label: '학습', icon: '☰' },
  { to: '/practice', label: '실전', icon: '◉' },
]

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    stopSpeaking()
  }, [pathname])
  const inTest = pathname.startsWith('/practice/run')
  return (
    <div className="app">
      <main className="content">
        <Outlet />
      </main>
      {!inTest && (
        <nav className="tabbar" aria-label="주요 메뉴">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => (isActive ? 'tab active' : 'tab')}>
              <span className="tab-icon" aria-hidden>
                {n.icon}
              </span>
              <span>{n.label}</span>
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  )
}
