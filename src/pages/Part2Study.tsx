import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DoneButton, PageHeader, PairLine, Section, Toggle, VideoButton, PartIntro } from '../components/ui'
import { PARTS } from '../data/exam'
import { VIDEOS } from '../data/videos'
import { part2Expressions, part2Extra, part2Intro, part2Positions, part2Scenes, part2Template } from '../data/study'
import { useDone } from '../lib/storage'

const BASE = import.meta.env.BASE_URL

export default function Part2Study() {
  const [showKo, setShowKo] = useState(true)
  const [hideAnswer, setHideAnswer] = useState(false)
  const { isDone, toggle } = useDone()
  return (
    <>
      <PageHeader title="Part 2 · 사진 묘사하기" sub="사진 2장 · 각 준비 45초 · 답변 30초" back="/study" />
      <PartIntro text={PARTS.find((x) => x.part === 2)!.bookIntro} />

      <Section title="그림 묘사 템플릿">
        <div className="card">
          <ol className="list-plain">
            {part2Template.map((t) => (
              <li key={t.step}>
                <b>{t.step}</b> — {t.en}
                <div className="muted small">{t.ko}</div>
              </li>
            ))}
          </ol>
          <div className="btn-row">
            <VideoButton video={VIDEOS.part2Basic} />
          </div>
        </div>
      </Section>

      <Section title="위치 표현">
        <div className="card">
          <img className="figure" src={BASE + 'book/misc/positions.png'} alt="사진 속 위치 표현: foreground, background, middle, left, right" loading="lazy" />
          <ul className="pairs" style={{ marginTop: 8 }}>
            {part2Positions.map((p) => (
              <PairLine key={p.en} {...p} />
            ))}
          </ul>
        </div>
        <details className="card">
          <summary>전치사 · one/the other 그림 설명</summary>
          <img className="figure" src={BASE + 'book/misc/prepositions.jpg'} alt="in, on, under, next to, behind, in front of, between 그림" loading="lazy" />
          <img className="figure" style={{ marginTop: 12 }} src={BASE + 'book/misc/one-other.jpg'} alt="one, the other, some, the others, another 그림" loading="lazy" />
        </details>
      </Section>

      <Section title="필수 표현">
        {part2Expressions.map((g) => (
          <details key={g.title} className="card">
            <summary>{g.title}</summary>
            <ul className="pairs">
              {g.items.map((i) => (
                <PairLine key={i.en} {...i} />
              ))}
            </ul>
          </details>
        ))}
      </Section>

      <Section
        title="최다 기출 유형별 모범 답안"
        aside={
          <div className="chips">
            <Toggle checked={hideAnswer} onChange={setHideAnswer} label="답안 가리기" />
            <Toggle checked={showKo} onChange={setShowKo} label="해석" />
          </div>
        }
      >
        <p className="muted small">{part2Intro}</p>
        {part2Scenes.map((s) => (
          <article key={s.id} className="card">
            <div className="section-head" style={{ marginBottom: 8 }}>
              <h3>
                {s.id}. {s.title}
              </h3>
              <DoneButton done={isDone(`p2-${s.id}`)} onToggle={() => toggle(`p2-${s.id}`)} />
            </div>
            {s.image && <img className="figure" src={BASE + s.image} alt={`${s.title} 사진`} loading="lazy" />}
            {hideAnswer ? (
              <p className="muted small">사진을 보고 먼저 30초 동안 묘사해 본 뒤 ‘답안 가리기’를 끄고 확인하세요.</p>
            ) : (
              <ul className="pairs" style={{ marginTop: 8 }}>
                {s.sentences.map((x, i) => (
                  <PairLine key={i} en={x.en} ko={x.ko} hideKo={!showKo} />
                ))}
              </ul>
            )}
            <div className="btn-row">
              <Link className="btn sm outline" to={`/practice/run/p2?item=${s.id}`}>
                🎙 30초 실전 연습
              </Link>
            </div>
          </article>
        ))}
      </Section>

      <Section title="기타 사진 묘사 중요 포인트">
        {part2Extra.map((g) => (
          <details key={g.title} className="card">
            <summary>{g.title}</summary>
            <img className="figure" src={BASE + g.image} alt={`${g.title}`} loading="lazy" />
            <ul className="pairs" style={{ marginTop: 8 }}>
              {g.sentences.map((x) => (
                <PairLine key={x.en} en={x.en} ko={x.ko} hideKo={!showKo} />
              ))}
            </ul>
          </details>
        ))}
      </Section>
    </>
  )
}
