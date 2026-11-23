import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DoneButton, PageHeader, Section, SpeakButton, Toggle } from '../components/ui'
import { loanWords, minimalPairs, part1Passages, part1Tips, sameRootWords } from '../data/study'
import { useDone } from '../lib/storage'

const BASE = import.meta.env.BASE_URL

export default function Part1Study() {
  const cats = Array.from(new Set(part1Passages.map((p) => p.category)))
  const [cat, setCat] = useState<string>('전체')
  const [showKo, setShowKo] = useState(false)
  const [showMarked, setShowMarked] = useState(true)
  const { isDone, toggle } = useDone()
  const list = cat === '전체' ? part1Passages : part1Passages.filter((p) => p.category === cat)

  return (
    <>
      <PageHeader title="Part 1 · 지문 크게 읽기" sub="준비 45초 · 답변 45초 · 발음, 억양, 강세 평가" back="/study" />

      <Section title="읽기 요령">
        <div className="card">
          <ul className="list-plain">
            {part1Tips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section title="기초 발음 연습">
        {minimalPairs.map((m) => (
          <div key={m.sound} className="card">
            <h3>{m.sound}</h3>
            <div className="chips">
              {m.words.map((w) => (
                <SpeakButton key={w} text={w.replace(' / ', ', ')} label={w} small />
              ))}
            </div>
          </div>
        ))}
        <details className="card">
          <summary>동일 어근 단어 (강세 위치 주의)</summary>
          <div className="table-wrap">
            <table>
              <tbody>
                {sameRootWords.map((w) => (
                  <tr key={w.word}>
                    <td>
                      <b>{w.word}</b>
                    </td>
                    <td>{w.ipa}</td>
                    <td>{w.meaning}</td>
                    <td>
                      <SpeakButton text={w.word.replace(/ \(.+\)/, '')} small label="" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
        <details className="card">
          <summary>외래어 영향으로 잘못 발음하기 쉬운 단어</summary>
          <div className="chips">
            {loanWords.map((w) => (
              <SpeakButton key={w.word} text={w.word} label={`${w.word} ${w.ipa}`} small />
            ))}
          </div>
        </details>
      </Section>

      <Section
        title={`주제별 지문 ${list.length}개`}
        aside={
          <div className="chips">
            <Toggle checked={showMarked} onChange={setShowMarked} label="강세·끊어 읽기 표시" />
            <Toggle checked={showKo} onChange={setShowKo} label="해석" />
          </div>
        }
      >
        <div className="seg" role="tablist">
          {['전체', ...cats].map((c) => (
            <button key={c} className={`chip ${c === cat ? 'on' : ''}`} onClick={() => setCat(c)} role="tab" aria-selected={c === cat}>
              {c}
            </button>
          ))}
        </div>
        {list.map((p) => (
          <article key={p.id} className="card" id={`p1-${p.id}`}>
            <div className="section-head" style={{ marginBottom: 8 }}>
              <h3>
                <span className="part-badge">{p.category}</span>Practice {String(p.id).padStart(2, '0')}
              </h3>
              <DoneButton done={isDone(`p1-${p.id}`)} onToggle={() => toggle(`p1-${p.id}`)} />
            </div>
            {showMarked ? (
              <img className="figure" src={BASE + p.image} alt={`강세·끊어 읽기 표시 지문: ${p.en}`} loading="lazy" />
            ) : (
              <p className="passage">{p.en}</p>
            )}
            {showKo && <p className="ko-block">{p.ko}</p>}
            <div className="btn-row">
              <SpeakButton text={p.en} label="모범 낭독 듣기" />
              <Link className="btn sm outline" to={`/practice/run/p1?item=${p.id}`}>
                🎙 45초 실전 연습
              </Link>
            </div>
          </article>
        ))}
      </Section>
    </>
  )
}
