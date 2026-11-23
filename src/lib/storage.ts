import { useCallback, useEffect, useState } from 'react'

const PREFIX = 'toeic-sp:'

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw == null ? fallback : (JSON.parse(raw) as T)
  } catch {
    return fallback
  }
}

export function save<T>(key: string, value: T) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    /* 저장 불가 환경(시크릿 모드 등)에서는 무시 */
  }
}

/** localStorage 에 저장되는 state. 같은 key 를 쓰는 컴포넌트끼리 동기화된다. */
export function useStored<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => load(key, fallback))
  useEffect(() => {
    const onSync = (e: Event) => {
      const detail = (e as CustomEvent).detail
      if (detail?.key === key) setValue(detail.value)
    }
    window.addEventListener('toeic-sp-sync', onSync)
    return () => window.removeEventListener('toeic-sp-sync', onSync)
  }, [key])
  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const v = typeof next === 'function' ? (next as (p: T) => T)(prev) : next
        save(key, v)
        queueMicrotask(() => window.dispatchEvent(new CustomEvent('toeic-sp-sync', { detail: { key, value: v } })))
        return v
      })
    },
    [key],
  )
  return [value, update] as const
}

/** 학습 완료 표시 (예: 'p1-3', 'p2-10') */
export function useDone() {
  const [done, setDone] = useStored<string[]>('done', [])
  const toggle = (id: string) => setDone((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]))
  const mark = (id: string) => setDone((d) => (d.includes(id) ? d : [...d, id]))
  return { done, isDone: (id: string) => done.includes(id), toggle, mark }
}

export interface PracticeLog {
  at: string // ISO
  mode: string
  title: string
  questions: number
}

export function useHistory() {
  return useStored<PracticeLog[]>('history', [])
}
