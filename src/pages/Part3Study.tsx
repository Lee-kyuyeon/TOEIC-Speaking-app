import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DoneButton, PageHeader, PairLine, Section, SpeakButton, Toggle, VideoButton } from '../components/ui'
import { VIDEOS } from '../data/videos'
import { part3Combos, part3QuestionTypes, part3Tenses, part3Topics } from '../data/study'
import { useDone } from '../lib/storage'

export default function Part3Study() {
  const [showKo, setShowKo] = useState(true)
  const { isDone, toggle } = useDone()
  return (
    <>
      <PageHeader title="Part 3 · 질문에 답하기" sub="준비 각 3초 · 답변 15초 / 15초 / 30초" back="/study" />

      <Section title="빈출 질문 유형과 답변 어순">
        <p className="muted small" style={{ marginTop: 0 }}>
          화면에 문제가 제시되므로 의문사를 정확하게 파악하는 것이 중요합니다. 질문하는 이의 의도에 맞는 답변을 하세요.
        </p>
        <div className="btn-row" style={{ marginTop: 0, marginBottom: 12 }}>
          <VideoButton video={VIDEOS.part3Grammar} />
        </div>
        {part3QuestionTypes.map((q) => (
          <details key={q.type} className="card">
            <summary>{q.type}</summary>
            <p className="small" style={{ marginTop: 0 }}>
              <b>답변 어순</b> · {q.pattern}
            </p>
            <ul className="pairs">
              <PairLine en={'Q. ' + q.example} ko={q.exampleKo} hideKo={!showKo} />
              <PairLine en={'A. ' + q.answer} ko={q.answerKo} hideKo={!showKo} />
              {q.more?.map((m) => (
                <PairLine key={m.en} en={m.en} ko={m.ko} hideKo={!showKo} />
              ))}
            </ul>
          </details>
        ))}
      </Section>

      <Section title="시제 정리">
        {part3Tenses.map((t) => (
          <details key={t.tense} className="card">
            <summary>{t.tense}</summary>
            <p className="small" style={{ marginTop: 0 }}>
              {t.form}
            </p>
            <ul className="pairs">
              <PairLine en={'Q. ' + t.example} />
              <PairLine en={'A. ' + t.answer} ko={t.ko} hideKo={!showKo} />
            </ul>
          </details>
        ))}
      </Section>

      <Section title="만능 콤보 — Because ~ 다음에!">
        <p className="muted small">답변 시간이 남을 때 이유 뒤에 붙여 쓰는 문장이에요.</p>
        <div className="grid">
          {part3Combos.map((c) => (
            <div key={c.key} className="card">
              <div className="kicker" style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.8rem' }}>
                {c.key} · {c.label}
              </div>
              <p style={{ margin: '6px 0', fontWeight: 600 }}>{c.en}</p>
              {showKo && <p className="muted small" style={{ margin: 0 }}>{c.ko}</p>}
              <SpeakButton text={c.en} small />
            </div>
          ))}
        </div>
      </Section>

      <Section title="주제별 만능 답변 (Q7 30초 대비)" aside={<Toggle checked={showKo} onChange={setShowKo} label="해석" />}>
        {part3Topics.map((t) => (
          <details key={t.id} className="card">
            <summary>
              {isDone(`p3-${t.id}`) ? '✓ ' : ''}
              {t.title}
            </summary>
            <ul className="pairs">
              {t.sentences.map((s) => (
                <PairLine key={s.en} en={s.en} ko={s.ko} hideKo={!showKo} />
              ))}
            </ul>
            <div className="btn-row">
              <SpeakButton text={t.sentences.map((s) => s.en).join(' ')} label="전체 듣기" />
              <DoneButton done={isDone(`p3-${t.id}`)} onToggle={() => toggle(`p3-${t.id}`)} />
            </div>
          </details>
        ))}
        <div className="btn-row">
          <Link className="btn" to="/practice/run/p3">
            🎙 Part 3 실전 연습
          </Link>
        </div>
      </Section>
    </>
  )
}
