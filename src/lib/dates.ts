export function parseDate(s: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function today(): Date {
  const n = new Date()
  return new Date(n.getFullYear(), n.getMonth(), n.getDate())
}

export function daysBetween(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / 86400000)
}

export function dday(target: Date) {
  const diff = daysBetween(today(), target)
  if (diff === 0) return 'D-DAY'
  return diff > 0 ? `D-${diff}` : `D+${-diff}`
}

export function addBusinessDays(d: Date, n: number) {
  const r = new Date(d)
  let left = n
  while (left > 0) {
    r.setDate(r.getDate() + 1)
    const w = r.getDay()
    if (w !== 0 && w !== 6) left--
  }
  return r
}

export function addDays(d: Date, n: number) {
  const r = new Date(d)
  r.setDate(r.getDate() + n)
  return r
}

const WD = ['일', '월', '화', '수', '목', '금', '토']
export function fmt(d: Date) {
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')} (${WD[d.getDay()]})`
}

export function toInput(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** 캘린더 앱에 추가할 수 있는 .ics 파일 생성 */
export function downloadIcs(filename: string, events: { title: string; date: Date; desc?: string; time?: string }[]) {
  const pad = (n: number) => String(n).padStart(2, '0')
  const ymd = (d: Date) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`
  const esc = (s: string) => s.replace(/[\\;,]/g, (c) => '\\' + c).replace(/\n/g, '\\n')
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z')
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//TOEIC Speaking Prep//KO', 'CALSCALE:GREGORIAN']
  events.forEach((e, i) => {
    lines.push('BEGIN:VEVENT', `UID:${stamp}-${i}@toeic-speaking-prep`, `DTSTAMP:${stamp}`)
    if (e.time) {
      const [h, m] = e.time.split(':')
      lines.push(`DTSTART:${ymd(e.date)}T${h}${m}00`, `DURATION:PT1H`)
    } else {
      lines.push(`DTSTART;VALUE=DATE:${ymd(e.date)}`, `DTEND;VALUE=DATE:${ymd(addDays(e.date, 1))}`)
    }
    lines.push(`SUMMARY:${esc(e.title)}`)
    if (e.desc) lines.push(`DESCRIPTION:${esc(e.desc)}`)
    lines.push('BEGIN:VALARM', 'TRIGGER:-P1D', 'ACTION:DISPLAY', `DESCRIPTION:${esc(e.title)}`, 'END:VALARM', 'END:VEVENT')
  })
  lines.push('END:VCALENDAR')
  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename
  a.click()
  setTimeout(() => URL.revokeObjectURL(a.href), 1000)
}
