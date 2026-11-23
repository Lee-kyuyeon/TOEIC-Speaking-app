import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { speak, stopSpeaking, ttsSupported } from '../lib/tts'

export function SpeakButton({ text, label = '듣기', small }: { text: string; label?: string; small?: boolean }) {
  const [on, setOn] = useState(false)
  if (!ttsSupported()) return null
  return (
    <button
      type="button"
      className={`btn ghost ${small ? 'sm' : ''}`}
      aria-label={on ? '읽기 멈춤' : `${label}: ${text.slice(0, 40)}`}
      onClick={async () => {
        if (on) {
          stopSpeaking()
          setOn(false)
          return
        }
        setOn(true)
        await speak(text)
        setOn(false)
      }}
    >
      {on ? '■ 멈춤' : `▶ ${label}`}
    </button>
  )
}

export function PageHeader({ title, sub, back }: { title: string; sub?: string; back?: string }) {
  return (
    <header className="page-header">
      {back && (
        <Link to={back} className="back">
          ← 뒤로
        </Link>
      )}
      <h1>{title}</h1>
      {sub && <p className="muted">{sub}</p>}
    </header>
  )
}

export function Section({ title, children, aside }: { title: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <section className="section">
      <div className="section-head">
        <h2>{title}</h2>
        {aside}
      </div>
      {children}
    </section>
  )
}

/** 영어 문장 + (토글 가능한) 한국어 해석 */
export function PairLine({ en, ko, hideKo }: { en: string; ko?: string; hideKo?: boolean }) {
  return (
    <li className="pair">
      <div className="pair-en">
        <span>{en}</span>
        <SpeakButton text={en} small label="" />
      </div>
      {ko && !hideKo && <div className="pair-ko">{ko}</div>}
    </li>
  )
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="toggle">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  )
}

export function DoneButton({ done, onToggle }: { done: boolean; onToggle: () => void }) {
  return (
    <button type="button" className={`btn ${done ? 'ok' : 'outline'} sm`} onClick={onToggle} aria-pressed={done}>
      {done ? '✓ 학습 완료' : '학습 완료 표시'}
    </button>
  )
}

export function Notice({ children, tone = 'info' }: { children: ReactNode; tone?: 'info' | 'warn' }) {
  return <div className={`notice ${tone}`}>{children}</div>
}
