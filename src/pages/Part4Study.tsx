import { useState } from 'react'
import { Link } from 'react-router-dom'
import InfoTable from '../components/InfoTable'
import { DoneButton, PageHeader, PairLine, Section, SpeakButton, Toggle, VideoButton } from '../components/ui'
import { VIDEOS } from '../data/videos'
import { monthsAndDates, part4CommonMistake, part4KeyPhrases, part4TableTypes, part4Prepositions, part4QuestionPatterns, part4Sets } from '../data/study'
import { useDone } from '../lib/storage'

export default function Part4Study() {
  const [setId, setSetId] = useState(1)
  const [showKo, setShowKo] = useState(true)
  const [hideAnswers, setHideAnswers] = useState(false)
  const { isDone, toggle } = useDone()
  const set = part4Sets.find((s) => s.id === setId)!

  return (
    <>
      <PageHeader title="Part 4 · 표 보고 질문에 답하기" sub="표 읽기 45초 · 준비 각 3초 · 답변 15초 / 15초 / 30초 (Q10은 두 번 들려줌)" back="/study" />

      <Section title="빈출 질문 유형">
        {part4QuestionPatterns.map((p) => (
          <div key={p.q} className="card">
            <h3>
              <span className="part-badge">{p.q}</span>
              {p.desc}
            </h3>
            <ul className="list-plain small">
              {p.examples.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        ))}
        <div className="card">
          <h3>학생들이 자주 틀리는 빈출 표현</h3>
          <ul className="pairs">
            <PairLine en={'Q. ' + part4CommonMistake.q} ko={part4CommonMistake.qKo} hideKo={!showKo} />
            <PairLine en={'A. ' + part4CommonMistake.a} ko={part4CommonMistake.aKo} hideKo={!showKo} />
          </ul>
        </div>
      </Section>

      <Section title="기초 이론 · 전치사와 숫자">
        <p className="muted small" style={{ marginTop: 0 }}>
          표에는 항상 시간, 날짜, 주소, 금액 등의 숫자 정보가 등장합니다. 올바른 전치사를 사용하여 완전하고 정확한 답변을 하는 것이 중요합니다.
        </p>
        <div className="btn-row" style={{ marginTop: 0, marginBottom: 12 }}>
          <VideoButton video={VIDEOS.part4Theory} />
        </div>
        <div className="grid">
          {part4Prepositions.map((g) => (
            <div key={g.cat} className="card">
              <h3>{g.cat}</h3>
              <ul className="list-plain small">
                {g.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <details className="card">
          <summary>월 · 날짜(서수) 발음 연습</summary>
          <div className="chips" style={{ marginBottom: 12 }}>
            {monthsAndDates.months.map((m) => (
              <SpeakButton key={m} text={m} label={m} small />
            ))}
          </div>
          <div className="chips">
            {monthsAndDates.dates.map((d, i) => (
              <SpeakButton key={d} text={d} label={`${i + 1}일 ${d}`} small />
            ))}
          </div>
        </details>
        <details className="card">
          <summary>필수 표현</summary>
          <ul className="pairs">
            {part4KeyPhrases.map((p) => (
              <PairLine key={p.en} {...p} hideKo={!showKo} />
            ))}
          </ul>
        </details>
      </Section>

      <Section
        title="표 유형별 연습"
        aside={
          <div className="chips">
            <Toggle checked={hideAnswers} onChange={setHideAnswers} label="답안 가리기" />
            <Toggle checked={showKo} onChange={setShowKo} label="해석" />
          </div>
        }
      >
        <div className="seg" role="tablist">
          {part4Sets.map((s) => (
            <button key={s.id} className={`chip ${s.id === setId ? 'on' : ''}`} onClick={() => setSetId(s.id)} role="tab" aria-selected={s.id === setId}>
              {isDone(`p4-${s.id}`) ? '✓ ' : ''}표{s.id}. {s.type}
            </button>
          ))}
        </div>

        {(() => {
          const t = part4TableTypes.find((x) => x.sets.includes(set.id))
          return t ? (
            <p className="small" style={{ marginTop: 0 }}>
              <span className="part-badge">{t.type}</span>
              {t.desc}
            </p>
          ) : null
        })()}
        <InfoTable set={set} />

        <details className="card">
          <summary>★ 표를 문장으로 읽어 내는 연습</summary>
          <ul className="pairs">
            {set.readAloud.map((r) => (
              <PairLine key={r.en} en={r.en} ko={r.ko} hideKo={!showKo} />
            ))}
          </ul>
        </details>

        <div className="card">
          <h3>★ 질문에 맞게 답변하기</h3>
          <p className="small" style={{ marginTop: 0 }}>
            <i>{set.intro}</i>
            {showKo && <span className="muted"> — {set.introKo}</span>}
          </p>
          {set.questions.map((q, i) => (
            <div key={i} style={{ marginTop: 14 }}>
              <div className="pair-en">
                <b>
                  Q{8 + i}. {q.q}
                </b>
                <SpeakButton text={q.q} small label="" />
              </div>
              {showKo && <div className="pair-ko">{q.qKo}</div>}
              {!hideAnswers && (
                <ul className="pairs" style={{ marginTop: 4, paddingLeft: 12, borderLeft: '3px solid var(--primary-soft)' }}>
                  {q.answer.map((a, j) => (
                    <PairLine key={j} en={a} ko={q.answerKo[j]} hideKo={!showKo} />
                  ))}
                </ul>
              )}
            </div>
          ))}
          <div className="btn-row">
            <DoneButton done={isDone(`p4-${set.id}`)} onToggle={() => toggle(`p4-${set.id}`)} />
            <Link className="btn sm outline" to={`/practice/run/p4?item=${set.id}`}>
              🎙 이 표로 실전 연습
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
