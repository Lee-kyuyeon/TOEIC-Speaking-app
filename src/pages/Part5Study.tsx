import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DoneButton, PageHeader, Section, SpeakButton, Toggle, VideoButton } from '../components/ui'
import { VIDEOS } from '../data/videos'
import { part5Answers, part5FirstSentence, part5Structure } from '../data/study'
import { part5Questions } from '../data/practice'
import { useDone } from '../lib/storage'

export default function Part5Study() {
  const [showKo, setShowKo] = useState(false)
  const { isDone, toggle } = useDone()
  return (
    <>
      <PageHeader title="Part 5 · 의견 제시하기" sub="준비 45초 · 답변 60초" back="/study" />

      <Section title="첫 문장 대답하기 스킬">
        <div className="btn-row" style={{ marginTop: 0, marginBottom: 12 }}>
          <VideoButton video={VIDEOS.part5} />
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>질문 유형</th>
                <th>첫 문장</th>
              </tr>
            </thead>
            <tbody>
              {part5FirstSentence.map((f) => (
                <tr key={f.type}>
                  <td>{f.type}</td>
                  <td>
                    <b>{f.start}</b>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="60초 답변 구성">
        <div className="card">
          <ol className="list-plain">
            {part5Structure.map((s) => (
              <li key={s.step}>
                <b>{s.step.slice(3)}</b> — {s.desc}
                <div className="muted small">
                  <i>{s.example}</i>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section title="만능 답변 9가지" aside={<Toggle checked={showKo} onChange={setShowKo} label="해석" />}>
        <p className="muted small">아래 주제로 물으면 제시된 입장으로 주장하고 만능 답변을 활용하세요.</p>
        {part5Answers.map((a) => {
          const qs = part5Questions.filter((q) => q.answerId === a.id)
          return (
            <article key={a.id} className="card">
              <div className="section-head" style={{ marginBottom: 6 }}>
                <h3>만능 답변 {String(a.id).padStart(2, '0')}</h3>
                <DoneButton done={isDone(`p5-${a.id}`)} onToggle={() => toggle(`p5-${a.id}`)} />
              </div>
              <p className="small" style={{ marginTop: 0, background: 'var(--surface-2)', padding: '8px 10px', borderRadius: 8 }}>
                <b>활용 주제</b> · {a.topics}
              </p>
              <p className="passage">{a.en}</p>
              {showKo && <p className="ko-block">{a.ko}</p>}
              <div className="btn-row">
                <SpeakButton text={a.en} label="전체 듣기" />
                {qs[0] && (
                  <Link className="btn sm outline" to={`/practice/run/p5?item=${qs[0].id}`}>
                    🎙 관련 문제로 60초 연습
                  </Link>
                )}
              </div>
            </article>
          )
        })}
      </Section>
    </>
  )
}
