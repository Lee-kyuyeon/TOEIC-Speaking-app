import { useMemo, useState } from 'react'
import { PageHeader, SpeakButton } from '../components/ui'
import { part2Scenes, part2Template, part3Combos, part3Topics, part4KeyPhrases, part5Answers, type Pair } from '../data/study'
import { useStored } from '../lib/storage'

interface Card extends Pair {
  id: string
  note?: string
}

const splitSentences = (s: string) => s.match(/[^.!?]+[.!?]+/g)?.map((x) => x.trim()) ?? [s]

const DECKS: { id: string; name: string; cards: Card[] }[] = [
  {
    id: 'combo',
    name: 'Part 3 만능 콤보',
    cards: part3Combos.map((c) => ({ id: `combo-${c.key}`, en: c.en, ko: c.ko, note: `${c.key} · ${c.label}` })),
  },
  {
    id: 'p3topic',
    name: 'Part 3 주제별 만능 답변',
    cards: part3Topics.flatMap((t) => t.sentences.map((s, i) => ({ id: `p3t-${t.id}-${i}`, en: s.en, ko: s.ko, note: t.title }))),
  },
  {
    id: 'p2',
    name: 'Part 2 묘사 문장',
    cards: [
      ...part2Template.map((t, i) => ({ id: `p2t-${i}`, en: t.en, ko: t.ko, note: `템플릿 · ${t.step}` })),
      ...part2Scenes.flatMap((s) => s.sentences.map((x, i) => ({ id: `p2s-${s.id}-${i}`, en: x.en, ko: x.ko, note: s.title }))),
    ],
  },
  {
    id: 'p4',
    name: 'Part 4 필수 표현',
    cards: part4KeyPhrases.map((p, i) => ({ id: `p4k-${i}`, en: p.en, ko: p.ko })),
  },
  {
    id: 'p5',
    name: 'Part 5 만능 답변 문장',
    cards: part5Answers.flatMap((a) => {
      const en = splitSentences(a.en)
      const ko = splitSentences(a.ko)
      // 문장 수가 다르면 영어만 카드로 (한국어 전체 해석은 메모로)
      return en.map((s, i) => ({
        id: `p5-${a.id}-${i}`,
        en: s,
        ko: en.length === ko.length ? ko[i] : `(만능 답변 ${a.id}) ${i + 1}번째 문장`,
        note: `만능 답변 ${String(a.id).padStart(2, '0')}`,
      }))
    }),
  },
]

function shuffle<T>(a: T[]) {
  const r = [...a]
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[r[i], r[j]] = [r[j], r[i]]
  }
  return r
}

export default function Flashcards() {
  const [deckId, setDeckId] = useState(DECKS[0].id)
  const [known, setKnown] = useStored<string[]>('known-cards', [])
  const [onlyUnknown, setOnlyUnknown] = useState(true)
  const [seed, setSeed] = useState(0)
  const [round, setRound] = useState(0)
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const deck = DECKS.find((d) => d.id === deckId)!
  const cards = useMemo(() => {
    const base = onlyUnknown ? deck.cards.filter((c) => !known.includes(c.id)) : deck.cards
    return seed ? shuffle(base) : base
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckId, onlyUnknown, seed, round])
  const card = cards[idx]
  const knownInDeck = deck.cards.filter((c) => known.includes(c.id)).length

  const next = (markKnown?: boolean) => {
    if (card && markKnown !== undefined) {
      setKnown((k) => (markKnown ? (k.includes(card.id) ? k : [...k, card.id]) : k.filter((x) => x !== card.id)))
    }
    setFlipped(false)
    setIdx((i) => i + 1)
  }

  const reset = (deck = deckId) => {
    setDeckId(deck)
    setRound((r) => r + 1)
    setIdx(0)
    setFlipped(false)
  }

  return (
    <>
      <PageHeader title="암기 카드" sub="한국어를 보고 영어로 소리 내어 말한 뒤, 카드를 눌러 정답을 확인하세요." back="/study" />
      <div className="seg" role="tablist">
        {DECKS.map((d) => (
          <button key={d.id} className={`chip ${d.id === deckId ? 'on' : ''}`} onClick={() => reset(d.id)} role="tab" aria-selected={d.id === deckId}>
            {d.name}
          </button>
        ))}
      </div>
      <div className="section-head">
        <span className="muted small">
          외운 카드 {knownInDeck}/{deck.cards.length}
        </span>
        <div className="chips">
          <label className="toggle">
            <input
              type="checkbox"
              checked={onlyUnknown}
              onChange={(e) => {
                setOnlyUnknown(e.target.checked)
                setIdx(0)
              }}
            />
            <span>못 외운 카드만</span>
          </label>
          <button
            className="btn ghost sm"
            onClick={() => {
              setSeed((s) => s + 1)
              setIdx(0)
              setFlipped(false)
            }}
          >
            🔀 섞기
          </button>
        </div>
      </div>

      {card ? (
        <>
          <button
            type="button"
            className="card flash"
            style={{ width: '100%', cursor: 'pointer', font: 'inherit', color: 'inherit' }}
            onClick={() => setFlipped((f) => !f)}
            aria-label="카드 뒤집기"
          >
            {card.note && <span className="muted small">{card.note}</span>}
            <span className="front">{card.ko}</span>
            {flipped ? <span className="back-side">{card.en}</span> : <span className="muted small">탭해서 영어 문장 보기</span>}
          </button>
          <div className="btn-row" style={{ justifyContent: 'space-between' }}>
            <SpeakButton text={card.en} />
            <span className="muted small" style={{ alignSelf: 'center' }}>
              {idx + 1} / {cards.length}
            </span>
          </div>
          <div className="btn-row">
            <button className="btn outline" style={{ flex: 1 }} onClick={() => next(false)}>
              다시 볼래요
            </button>
            <button className="btn" style={{ flex: 1 }} onClick={() => next(true)}>
              외웠어요 ✓
            </button>
          </div>
        </>
      ) : (
        <div className="card flash">
          <span className="front">{cards.length === 0 ? '이 덱의 카드를 모두 외웠어요! 🎉' : '한 바퀴 완료!'}</span>
          <div className="btn-row" style={{ justifyContent: 'center' }}>
            <button className="btn" onClick={() => reset()}>
              처음부터 다시
            </button>
            {knownInDeck > 0 && (
              <button
                className="btn outline"
                onClick={() => {
                  setKnown((k) => k.filter((id) => !deck.cards.some((c) => c.id === id)))
                  reset()
                }}
              >
                외운 표시 초기화
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}
