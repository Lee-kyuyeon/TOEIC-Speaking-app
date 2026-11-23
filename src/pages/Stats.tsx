import { Link } from 'react-router-dom'
import { PageHeader, Section } from '../components/ui'
import { PARTS } from '../data/exam'
import { TOTALS } from '../lib/plan'
import { todayKey, useDone, useHistory, useShadowLog, useStored } from '../lib/storage'

const PART_LINK: Record<number, string> = { 1: '/study/shadow?src=p1-1', 2: '/practice/run/p2', 3: '/practice/run/p3', 4: '/practice/run/p4', 5: '/practice/run/p5' }

function streak(days: Set<string>) {
  const d = new Date()
  if (!days.has(todayKey(d))) d.setDate(d.getDate() - 1)
  let n = 0
  while (days.has(todayKey(d))) {
    n++
    d.setDate(d.getDate() - 1)
  }
  return n
}

export default function Stats() {
  const [history] = useHistory()
  const [shadow] = useShadowLog()
  const [activity] = useStored<string[]>('activity', [])
  const { done } = useDone()

  const days = new Set([...activity, ...history.map((h) => todayKey(new Date(h.at))), ...shadow.map((s) => todayKey(new Date(s.at)))])

  // 최근 14일 활동량
  const last14 = Array.from({ length: 14 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (13 - i))
    const k = todayKey(d)
    const n =
      history.filter((h) => todayKey(new Date(h.at)) === k).reduce((a, h) => a + Math.max(1, h.answers?.length ?? 1), 0) +
      shadow.filter((s) => todayKey(new Date(s.at)) === k).length
    return { k, n: n || (days.has(k) ? 1 : 0), label: `${d.getMonth() + 1}/${d.getDate()}` }
  })
  const max = Math.max(1, ...last14.map((d) => d.n))

  const answers = history.flatMap((h) => h.answers ?? [])
  const parts = PARTS.map((p) => {
    const a = answers.filter((x) => x.part === p.part)
    const sh = shadow.filter((x) => x.part === p.part)
    const total = TOTALS[`p${p.part}` as keyof typeof TOTALS]
    const doneN = done.filter((d) => d.startsWith(`p${p.part}-`)).length
    const fill = a.length ? Math.round((a.reduce((s, x) => s + x.used / x.allotted, 0) / a.length) * 100) : null
    const acc = sh.length ? Math.round(sh.slice(-30).reduce((s, x) => s + x.accuracy, 0) / Math.min(sh.length, 30)) : null
    // 약점 점수: 진도·답변 시간 활용·정확도 중 아는 값의 평균
    const known = [doneN / total, fill !== null ? fill / 100 : null, acc !== null ? acc / 100 : null].filter((x): x is number => x !== null)
    const score = known.reduce((s, x) => s + x, 0) / known.length
    return { ...p, count: a.length, shadowN: sh.length, fill, acc, doneN, total, score }
  })
  const weakest = [...parts].sort((a, b) => a.score - b.score)[0]
  const totalSessions = history.length

  return (
    <>
      <PageHeader title="학습 분석" sub="이 기기에 저장된 연습 기록으로 계산해요." back="/" />

      <div className="stat-row">
        <div className="stat">
          <b>{streak(days)}일</b>
          <span>연속 학습</span>
        </div>
        <div className="stat">
          <b>{days.size}일</b>
          <span>총 학습일</span>
        </div>
        <div className="stat">
          <b>{totalSessions}회</b>
          <span>실전 연습</span>
        </div>
      </div>

      <Section title="최근 2주 학습량">
        <div className="card">
          <div className="bars" role="img" aria-label={`최근 14일 학습량: ${last14.map((d) => `${d.label} ${d.n}`).join(', ')}`}>
            {last14.map((d) => (
              <div key={d.k} className={d.n ? '' : 'zero'} style={{ height: `${(d.n / max) * 100}%` }} title={`${d.label}: ${d.n}`} />
            ))}
          </div>
          <div className="bar-labels" aria-hidden>
            {last14.map((d, i) => (
              <span key={d.k}>{i === 0 || i === 6 || i === 13 ? d.label : ''}</span>
            ))}
          </div>
          <p className="muted small" style={{ marginBottom: 0 }}>
            실전 답변 수 + 따라 말하기 횟수
          </p>
        </div>
      </Section>

      {weakest && (history.length > 0 || shadow.length > 0 || done.length > 0) && (
        <div className="notice info">
          지금 가장 보강이 필요한 파트는 <b>Part {weakest.part} {weakest.title}</b>예요.{' '}
          <Link to={PART_LINK[weakest.part]}>바로 연습하기 →</Link>
        </div>
      )}

      <Section title="파트별 분석">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>파트</th>
                <th>학습 완료</th>
                <th>실전 답변</th>
                <th>시간 활용</th>
                <th>따라 말하기</th>
              </tr>
            </thead>
            <tbody>
              {parts.map((p) => (
                <tr key={p.part}>
                  <td className="nowrap">
                    <b>Part {p.part}</b>
                  </td>
                  <td>
                    {p.doneN}/{p.total}
                  </td>
                  <td>{p.count}개</td>
                  <td>{p.fill !== null ? `${p.fill}%` : '–'}</td>
                  <td>{p.acc !== null ? `${p.acc}%` : p.part === 4 ? '해당 없음' : '–'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="list-plain small muted">
          <li>
            <b>시간 활용</b>: 주어진 답변 시간 중 실제로 말한 비율이에요. 답변 시간을 끝까지 채울수록 고득점에 유리해요.
          </li>
          <li>
            <b>따라 말하기</b>: 최근 30회 음성 인식 정확도 평균이에요.
          </li>
        </ul>
      </Section>

      {history.length > 0 && (
        <Section title="최근 실전 연습">
          <div className="card">
            <ul className="list-plain small">
              {history
                .slice(-10)
                .reverse()
                .map((h) => {
                  const a = h.answers ?? []
                  const fill = a.length ? Math.round((a.reduce((s, x) => s + x.used / x.allotted, 0) / a.length) * 100) : null
                  return (
                    <li key={h.at}>
                      {h.title} · {h.questions}문항{fill !== null && ` · 시간 활용 ${fill}%`}{' '}
                      <span className="muted">({new Date(h.at).toLocaleString('ko-KR', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })})</span>
                    </li>
                  )
                })}
            </ul>
          </div>
        </Section>
      )}
    </>
  )
}
