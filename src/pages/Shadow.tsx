import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DoneButton, Notice, PageHeader, Toggle } from '../components/ui'
import { part1Passages, part2Scenes, part3Combos, part3Topics, part5Answers, type Pair } from '../data/study'
import { AnswerRecorder } from '../lib/recorder'
import { compare, listen, recognitionSupported, splitSentences, type Listener } from '../lib/speech'
import { logActivity, useDone, useShadowLog } from '../lib/storage'
import { speak, stopSpeaking, ttsSupported } from '../lib/tts'
import { unlockAudio } from '../lib/audioUnlock'

const BASE = import.meta.env.BASE_URL

interface Source {
  key: string
  part: number
  label: string
  doneId?: string
  image?: string
  lines: Pair[]
}

const pad = (n: number) => String(n).padStart(2, '0')

function koSplit(en: string, ko: string): Pair[] {
  const e = splitSentences(en)
  const k = splitSentences(ko)
  return e.map((s, i) => ({ en: s, ko: e.length === k.length ? k[i] : '' }))
}

const GROUPS: { id: string; name: string; sources: Source[] }[] = [
  {
    id: 'p1',
    name: 'Part 1 지문',
    sources: part1Passages.map((p) => ({ key: `p1-${p.id}`, part: 1, label: `${pad(p.id)}. ${p.category}`, doneId: `p1-${p.id}`, image: p.image, lines: koSplit(p.en, p.ko) })),
  },
  {
    id: 'p2',
    name: 'Part 2 묘사 문장',
    sources: part2Scenes.map((s) => ({ key: `p2-${s.id}`, part: 2, label: `${pad(s.id)}. ${s.title}`, doneId: `p2-${s.id}`, image: s.image, lines: s.sentences })),
  },
  {
    id: 'p3',
    name: 'Part 3 만능 답변',
    sources: [
      { key: 'combo', part: 3, label: '만능 콤보 6개', lines: part3Combos.flatMap((c) => koSplit(c.en, c.ko)) },
      ...part3Topics.map((t) => ({ key: `p3-${t.id}`, part: 3, label: t.title.replace(/\s*\(.*\)$/, ''), doneId: `p3-${t.id}`, lines: t.sentences })),
    ],
  },
  {
    id: 'p5',
    name: 'Part 5 만능 답변',
    sources: part5Answers.map((a) => ({ key: `p5-${a.id}`, part: 5, label: `만능 답변 ${pad(a.id)}`, doneId: `p5-${a.id}`, lines: koSplit(a.en, a.ko) })),
  },
]

const ALL = GROUPS.flatMap((g) => g.sources)

type Result = ReturnType<typeof compare>

export default function Shadow() {
  const [params, setParams] = useSearchParams()
  const srcKey = params.get('src') ?? 'p1-1'
  const source = ALL.find((s) => s.key === srcKey) ?? ALL[0]
  const group = GROUPS.find((g) => g.sources.includes(source))!
  const [idx, setIdx] = useState(0)
  const [hideText, setHideText] = useState(false)
  const [showKo, setShowKo] = useState(true)
  const [slow, setSlow] = useState(false)
  const [listening, setListening] = useState(false)
  const [live, setLive] = useState('')
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState('')
  const [recUrl, setRecUrl] = useState('')
  const [scores, setScores] = useState<Record<number, number>>({})
  const [, setLog] = useShadowLog()
  const { isDone, toggle } = useDone()
  const listener = useRef<Listener | null>(null)
  const recorder = useRef<AnswerRecorder | null>(null)
  const supported = useMemo(() => recognitionSupported(), [])

  const line = source.lines[Math.min(idx, source.lines.length - 1)]

  useEffect(() => {
    setIdx(0)
    setScores({})
  }, [srcKey])

  useEffect(() => {
    setResult(null)
    setLive('')
    setError('')
    setRecUrl('')
  }, [idx, srcKey])

  useEffect(
    () => () => {
      listener.current?.stop()
      recorder.current?.close()
      stopSpeaking()
    },
    [],
  )

  const choose = (key: string) => setParams({ src: key }, { replace: true })

  const play = async () => {
    unlockAudio()
    await speak(line.en, slow ? 0.75 : 0.95)
  }

  const finish = (text: string, err?: string) => {
    setListening(false)
    listener.current = null
    if (err && err !== 'no-speech' && err !== 'aborted') {
      setError(err === 'not-allowed' || err === 'service-not-allowed' ? '마이크·음성 인식 권한이 필요해요. (아이폰: 설정 > Safari > 마이크, 설정 > 일반 > 키보드 > 받아쓰기 켜기)' : `음성 인식 오류: ${err}`)
    }
    if (!text) {
      if (!err || err === 'no-speech') setError('목소리를 듣지 못했어요. 다시 한 번 또박또박 말해 보세요.')
      return
    }
    const r = compare(line.en, text)
    setResult(r)
    setScores((s) => ({ ...s, [idx]: Math.max(s[idx] ?? 0, r.accuracy) }))
    setLog((l) => [...l.slice(-499), { at: new Date().toISOString(), src: source.key, part: source.part, accuracy: r.accuracy }])
    logActivity()
  }

  const toggleListen = async () => {
    stopSpeaking()
    if (listening) {
      listener.current?.stop()
      return
    }
    setResult(null)
    setError('')
    setLive('')
    if (supported) {
      const l = listen(setLive, finish)
      if (!l) {
        setError('음성 인식을 시작하지 못했어요.')
        return
      }
      listener.current = l
      setListening(true)
    } else {
      // 음성 인식 미지원: 녹음 후 직접 비교
      if (!recorder.current) {
        const r = new AnswerRecorder()
        if (!(await r.open())) {
          setError('마이크를 사용할 수 없어요.')
          return
        }
        recorder.current = r
      }
      recorder.current.start()
      setListening(true)
    }
  }

  const stopRecording = async () => {
    const blob = await recorder.current?.stop()
    setListening(false)
    if (blob) setRecUrl(URL.createObjectURL(blob))
    logActivity()
  }

  const avg = Object.values(scores).length ? Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length) : null

  return (
    <>
      <PageHeader title="따라 말하기" sub="원어민 음성을 듣고 따라 말하면, 음성 인식으로 빠뜨리거나 잘못 말한 단어를 표시해 드려요." back="/study" />

      {!supported && (
        <Notice tone="warn">이 브라우저는 음성 인식을 지원하지 않아 녹음 후 직접 비교하는 방식으로 연습해요. 아이폰 Safari, Chrome에서는 자동 피드백이 동작해요.</Notice>
      )}

      <div className="seg" role="tablist">
        {GROUPS.map((g) => (
          <button key={g.id} className={`chip ${g.id === group.id ? 'on' : ''}`} role="tab" aria-selected={g.id === group.id} onClick={() => choose(g.sources[0].key)}>
            {g.name}
          </button>
        ))}
      </div>
      <div className="field">
        <label htmlFor="src">연습할 내용</label>
        <select id="src" value={source.key} onChange={(e) => choose(e.target.value)}>
          {group.sources.map((s) => (
            <option key={s.key} value={s.key}>
              {s.doneId && isDone(s.doneId) ? '✓ ' : ''}
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {source.image && source.part === 1 && (
        <details className="card">
          <summary>강세·끊어 읽기 표시 지문 보기</summary>
          <img className="figure" src={BASE + source.image} alt="강세·끊어 읽기 표시 지문" />
        </details>
      )}
      {source.image && source.part === 2 && <img className="figure" src={BASE + source.image} alt={source.label} style={{ maxHeight: 220, objectFit: 'cover', width: '100%' }} />}

      <div className="section-head" style={{ marginTop: 16 }}>
        <span className="muted small">
          문장 {idx + 1} / {source.lines.length}
          {avg !== null && ` · 평균 정확도 ${avg}%`}
        </span>
        <div className="chips">
          <Toggle checked={hideText} onChange={setHideText} label="문장 가리기" />
          <Toggle checked={showKo} onChange={setShowKo} label="해석" />
          <Toggle checked={slow} onChange={setSlow} label="천천히" />
        </div>
      </div>

      <div className="card shadow-card">
        {hideText && !result ? (
          <p className="muted" style={{ margin: 0 }}>
            문장을 가렸어요. 듣고 기억해서 따라 말해 보세요.
          </p>
        ) : result ? (
          <p className="passage" style={{ margin: 0 }} aria-label={`정확도 ${result.accuracy}%`}>
            {result.tokens.map((t, i) => (
              <span key={i} className={t.ok ? 'w-ok' : 'w-miss'}>
                {t.word}{' '}
              </span>
            ))}
          </p>
        ) : (
          <p className="passage" style={{ margin: 0 }}>
            {line.en}
          </p>
        )}
        {showKo && line.ko && <p className="ko-block">{line.ko}</p>}

        {listening && supported && (
          <p className="live" aria-live="polite">
            🎙 {live || '듣고 있어요… 말을 마치면 버튼을 다시 누르세요'}
          </p>
        )}

        {result && (
          <div className={`score ${result.accuracy >= 85 ? 'good' : result.accuracy >= 60 ? 'mid' : 'low'}`}>
            <b>{result.accuracy}%</b>
            <span>
              {result.accuracy >= 85 ? '훌륭해요! 다음 문장으로 가세요.' : result.accuracy >= 60 ? '좋아요. 빨간 단어를 신경 써서 한 번 더!' : '천천히 듣고 다시 따라 해 보세요.'}
              {result.missed.length > 0 && (
                <>
                  <br />
                  <span className="small">놓친 단어: {result.missed.slice(0, 8).join(', ')}</span>
                </>
              )}
            </span>
          </div>
        )}
        {error && <p className="small" style={{ color: 'var(--accent)' }}>{error}</p>}
        {recUrl && <audio controls src={recUrl} />}

        <div className="btn-row">
          {ttsSupported() && (
            <button className="btn outline" onClick={play} disabled={listening}>
              ▶ 듣기
            </button>
          )}
          {supported || !listening ? (
            <button className={`btn ${listening ? 'danger' : ''}`} style={{ flex: 1 }} onClick={toggleListen}>
              {listening ? '■ 말하기 끝' : '🎙 따라 말하기'}
            </button>
          ) : (
            <button className="btn danger" style={{ flex: 1 }} onClick={stopRecording}>
              ■ 녹음 끝
            </button>
          )}
        </div>
      </div>

      <div className="btn-row">
        <button className="btn outline" style={{ flex: 1 }} disabled={idx === 0} onClick={() => setIdx((i) => i - 1)}>
          ← 이전 문장
        </button>
        <button className="btn outline" style={{ flex: 1 }} disabled={idx >= source.lines.length - 1} onClick={() => setIdx((i) => i + 1)}>
          다음 문장 →
        </button>
      </div>
      {source.doneId && (
        <div className="btn-row">
          <DoneButton done={isDone(source.doneId)} onToggle={() => toggle(source.doneId!)} />
        </div>
      )}
      <p className="muted small">음성 인식은 발음 점수가 아니라 '알아들을 수 있게 말했는지'를 확인하는 용도예요. 인식은 브라우저가 제공하는 음성 인식(아이폰은 Apple, Chrome은 Google)이 처리하며, 이 앱 자체는 음성을 저장하거나 다른 곳으로 보내지 않아요.</p>
    </>
  )
}
