import { Link } from 'react-router-dom'
import { PageHeader } from '../components/ui'
import { PARTS } from '../data/exam'
import { useDone } from '../lib/storage'
import { TOTALS } from '../lib/plan'

export default function StudyIndex() {
  const { done } = useDone()
  const count = (p: number) => done.filter((d) => d.startsWith(`p${p}-`)).length
  return (
    <>
      <PageHeader title="파트별 학습" sub="교재 내용을 파트별로 정리했어요. ▶ 버튼으로 원어민 발음(TTS)을 들을 수 있어요." />
      <div className="grid">
        {PARTS.map((p) => {
          const total = TOTALS[`p${p.part}` as keyof typeof TOTALS]
          return (
            <Link key={p.part} to={`/study/part${p.part}`} className="card link-card">
              <div className="kicker">
                PART {p.part} · {p.questions}
              </div>
              <h3>{p.title}</h3>
              <p className="muted small" style={{ margin: '0 0 8px' }}>
                준비 {p.prep} · 답변 {p.answer}
              </p>
              <div className="progress">
                <i style={{ width: `${(count(p.part) / total) * 100}%` }} />
              </div>
              <div className="muted small" style={{ marginTop: 4 }}>
                {count(p.part)}/{total} 완료
              </div>
            </Link>
          )
        })}
        <Link to="/study/cards" className="card link-card">
          <div className="kicker">필수 문장 암기</div>
          <h3>암기 카드</h3>
          <p className="muted small" style={{ margin: 0 }}>
            한국어를 보고 영어로 말해 본 뒤 정답 확인
          </p>
        </Link>
      </div>
    </>
  )
}
