import { Link } from 'react-router-dom'
import { PageHeader, Section } from '../components/ui'
import { PARTS } from '../data/exam'
import { part3Sets, part5Questions } from '../data/practice'
import { part4Sets } from '../data/study'

export default function PracticeHome() {
  return (
    <>
      <PageHeader title="실전 연습" sub="실제 시험처럼 시간을 재고, 녹음한 내 답변을 모범 답안과 비교하세요." />

      <Link to="/practice/run/mock" className="card link-card hero" style={{ display: 'block' }}>
        <div className="small">약 20분 · 11문항</div>
        <h2 style={{ fontSize: '1.4rem', margin: '4px 0' }}>실전 모의고사 시작</h2>
        <p className="small" style={{ margin: 0 }}>
          Part 1부터 5까지 교재 문제를 무작위로 뽑아 시험과 똑같은 순서와 시간으로 진행해요.
        </p>
      </Link>

      <div className="btn-row">
        <Link to="/stats" className="btn outline sm">
          📊 학습 분석
        </Link>
        <Link to="/study/shadow" className="btn outline sm">
          🗣 따라 말하기
        </Link>
      </div>

      <Section title="파트별 연습">
        <div className="grid">
          {PARTS.map((p) => (
            <Link key={p.part} to={`/practice/run/p${p.part}`} className="card link-card">
              <div className="kicker">PART {p.part}</div>
              <h3>{p.title}</h3>
              <p className="muted small" style={{ margin: 0 }}>
                준비 {p.prep} · 답변 {p.answer}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Part 3 문제 세트 골라 풀기">
        <div className="chips">
          {part3Sets.map((s) => (
            <Link key={s.id} className="chip" to={`/practice/run/p3?item=${s.id}`}>
              {s.topic}
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Part 4 표 골라 풀기">
        <div className="chips">
          {part4Sets.map((s) => (
            <Link key={s.id} className="chip" to={`/practice/run/p4?item=${s.id}`}>
              표{s.id}. {s.type}
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Part 5 문제 골라 풀기">
        <div className="card">
          <ul className="list-plain small">
            {part5Questions.map((q) => (
              <li key={q.id}>
                <Link to={`/practice/run/p5?item=${q.id}`}>
                  [{q.type}] {q.question}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="muted small">Part 3·5 문제는 교재의 예시 질문과 만능 답변 주제를 바탕으로 구성한 연습 문제예요.</p>
      </Section>
    </>
  )
}
