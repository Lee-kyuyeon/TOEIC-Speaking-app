import { Link } from 'react-router-dom'
import { PageHeader, Section, Notice } from '../components/ui'
import { CHANGES_2022, EXAM_FACTS, EXAM_RULES, LEVELS, LEVEL_DESCRIPTIONS, OFFICIAL_LINKS, PARTS } from '../data/exam'

export default function ExamInfo() {
  return (
    <>
      <PageHeader title="시험 정보" sub="토익스피킹 시험 구성, 등급, 응시 규정 한눈에 보기" />

      <Notice>
        2022년 6월 개편 형식 기준이며, 2026년 현재까지 문항 구성이 추가로 바뀌었다는 공식 공지는 없습니다. 시험 전{' '}
        <a href={OFFICIAL_LINKS[1].url} target="_blank" rel="noreferrer">
          한국TOEIC위원회 공지사항
        </a>
        을 꼭 확인하세요.
      </Notice>

      <Section title="시험 개요">
        <div className="card">
          <dl style={{ margin: 0 }}>
            {EXAM_FACTS.map((f) => (
              <div key={f.label} style={{ display: 'flex', gap: 12, padding: '6px 0', borderBottom: '1px dashed var(--border)' }}>
                <dt style={{ minWidth: 96, fontWeight: 700 }}>{f.label}</dt>
                <dd style={{ margin: 0 }}>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section title="파트별 구성">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>파트</th>
                <th>문항</th>
                <th>준비</th>
                <th>답변</th>
              </tr>
            </thead>
            <tbody>
              {PARTS.map((p) => (
                <tr key={p.part}>
                  <td>
                    <b>Part {p.part}</b>
                    <br />
                    {p.title}
                  </td>
                  <td>{p.questions}</td>
                  <td>{p.prep}</td>
                  <td>{p.answer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 12 }}>
          {PARTS.map((p) => (
            <details key={p.part} className="card">
              <summary>
                <span className="part-badge">Part {p.part}</span>
                {p.title} <span className="muted small">({p.titleEn})</span>
              </summary>
              <p style={{ marginTop: 0 }}>{p.summary}</p>
              <p className="small">
                <b>평가 기준</b> · {p.criteria}
              </p>
              <div className="chips">
                {p.topics.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
              <div className="btn-row">
                <Link className="btn sm outline" to={`/study/part${p.part}`}>
                  Part {p.part} 학습하기
                </Link>
              </div>
            </details>
          ))}
        </div>
      </Section>

      <Section title="2022년 6월 개편 내용">
        <div className="card">
          <ul className="list-plain">
            {CHANGES_2022.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section title="등급 체계">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>등급</th>
                <th>명칭</th>
                <th>점수(참고)</th>
              </tr>
            </thead>
            <tbody>
              {LEVELS.map((l) => (
                <tr key={l.level}>
                  <td>
                    <b>{l.level}</b>
                  </td>
                  <td>{l.name}</td>
                  <td>{l.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="muted small">점수 구간은 일반적으로 알려진 참고값입니다. 정확한 환산 기준은 공식 사이트에서 확인하세요.</p>
        {LEVEL_DESCRIPTIONS.map((d) => (
          <div key={d.title} className="card">
            <h3>{d.title}</h3>
            <p style={{ margin: 0 }}>{d.text}</p>
          </div>
        ))}
      </Section>

      <Section title="응시 주의 사항">
        <div className="card">
          <ul className="list-plain">
            {EXAM_RULES.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
        <div className="btn-row">
          <Link to="/register" className="btn">
            접수 도우미로 이동
          </Link>
        </div>
      </Section>
    </>
  )
}
