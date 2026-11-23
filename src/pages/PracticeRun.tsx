import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import InfoTable from '../components/InfoTable'
import { Notice, SpeakButton } from '../components/ui'
import { part1Passages, part1Tips, part2Scenes, part2Template, part3Combos, part3QuestionTypes, part4QuestionPatterns, part4Sets, part5Answers, part5FirstSentence, part5Structure, type Part1Passage, type Part2Scene, type Part4Set } from '../data/study'
import { part3Sets, part5Questions, type Part3Set, type Part5Question } from '../data/practice'
import { beep } from '../lib/beep'
import { AnswerRecorder } from '../lib/recorder'
import { logActivity, useHistory, type AnswerLog } from '../lib/storage'
import { unlockAudio } from '../lib/audioUnlock'
import { speak, stopSpeaking } from '../lib/tts'

const BASE = import.meta.env.BASE_URL

type View =
  | { kind: 'p1'; passage: Part1Passage }
  | { kind: 'p2'; scene: Part2Scene }
  | { kind: 'p3'; set: Part3Set; qi: number }
  | { kind: 'p4'; set: Part4Set; qi: number | null }
  | { kind: 'p5'; q: Part5Question }

interface Step {
  key: string
  qno: number | null // 시험 문항 번호 (Q1~Q11), 표 읽기 단계는 null
  part: number
  narrate: string[]
  prep: number
  prepLabel: string
  answer: number
  view: View
}

const DIRECTIONS: Record<number, string> = {
  1: 'In this part of the test, you will read aloud the text on the screen. You will have 45 seconds to prepare. Then you will have 45 seconds to read the text aloud.',
  2: 'In this part of the test, you will describe the picture on your screen in as much detail as you can. You will have 45 seconds to prepare your response. Then you will have 30 seconds to speak about the picture.',
  3: 'In this part of the test, you will answer three questions. You will have three seconds to prepare after you hear each question. You will have 15 seconds to respond to Questions 5 and 6, and 30 seconds to respond to Question 7.',
  4: 'In this part of the test, you will answer three questions based on the information provided. You will have 45 seconds to read the information before the questions begin. You will have three seconds to prepare and 15 seconds to respond to Questions 8 and 9. You will hear Question 10 two times and have 30 seconds to respond.',
  5: 'In this part of the test, you will give your opinion about a specific topic. Be sure to say as much as you can in the time allowed. You will have 45 seconds to prepare. Then you will have 60 seconds to speak.',
}

const pick = <T,>(arr: T[], n: number): T[] => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a.slice(0, n)
}

function p1Steps(ps: Part1Passage[], startQ: number): Step[] {
  return ps.map((p, i) => ({ key: `p1-${p.id}-${i}`, qno: startQ + i, part: 1, narrate: [], prep: 45, prepLabel: '준비 시간', answer: 45, view: { kind: 'p1', passage: p } }))
}
function p2Steps(ss: Part2Scene[], startQ: number): Step[] {
  return ss.map((s, i) => ({ key: `p2-${s.id}-${i}`, qno: startQ + i, part: 2, narrate: [], prep: 45, prepLabel: '준비 시간', answer: 30, view: { kind: 'p2', scene: s } }))
}
function p3Steps(set: Part3Set): Step[] {
  return set.questions.map((q, i) => ({
    key: `p3-${set.id}-${i}`,
    qno: 5 + i,
    part: 3,
    narrate: i === 0 ? [set.intro, q] : [q],
    prep: 3,
    prepLabel: '준비 시간',
    answer: i === 2 ? 30 : 15,
    view: { kind: 'p3', set, qi: i },
  }))
}
function p4Steps(set: Part4Set): Step[] {
  return [
    { key: `p4-${set.id}-read`, qno: null, part: 4, narrate: [], prep: 45, prepLabel: '표 읽기 시간', answer: 0, view: { kind: 'p4', set, qi: null } },
    ...set.questions.map((q, i) => ({
      key: `p4-${set.id}-${i}`,
      qno: 8 + i,
      part: 4,
      narrate: i === 0 ? [set.intro, q.q] : i === 2 ? [q.q, q.q] : [q.q],
      prep: 3,
      prepLabel: '준비 시간',
      answer: i === 2 ? 30 : 15,
      view: { kind: 'p4' as const, set, qi: i },
    })),
  ]
}
function p5Steps(q: Part5Question): Step[] {
  return [{ key: `p5-${q.id}`, qno: 11, part: 5, narrate: [q.question], prep: 45, prepLabel: '준비 시간', answer: 60, view: { kind: 'p5', q } }]
}

function buildSteps(mode: string, item: number | null): { title: string; steps: Step[] } {
  const byId = <T extends { id: number }>(arr: T[]) => (item ? arr.filter((x) => x.id === item) : [])
  switch (mode) {
    case 'p1': {
      const ps = byId(part1Passages)
      return { title: 'Part 1 지문 읽기', steps: p1Steps(ps.length ? ps : pick(part1Passages, 2), 1) }
    }
    case 'p2': {
      const ss = byId(part2Scenes)
      return { title: 'Part 2 사진 묘사', steps: p2Steps(ss.length ? ss : pick(part2Scenes, 2), 3) }
    }
    case 'p3':
      return { title: 'Part 3 질문에 답하기', steps: p3Steps(byId(part3Sets)[0] ?? pick(part3Sets, 1)[0]) }
    case 'p4':
      return { title: 'Part 4 표 보고 답하기', steps: p4Steps(byId(part4Sets)[0] ?? pick(part4Sets, 1)[0]) }
    case 'p5':
      return { title: 'Part 5 의견 제시', steps: p5Steps(byId(part5Questions)[0] ?? pick(part5Questions, 1)[0]) }
    default:
      return {
        title: '실전 모의고사',
        steps: [
          ...p1Steps(pick(part1Passages, 2), 1),
          ...p2Steps(pick(part2Scenes, 2), 3),
          ...p3Steps(pick(part3Sets, 1)[0]),
          ...p4Steps(pick(part4Sets, 1)[0]),
          ...p5Steps(pick(part5Questions, 1)[0]),
        ],
      }
  }
}

type Phase = 'ready' | 'directions' | 'narrate' | 'prep' | 'answer' | 'review'

export default function PracticeRun() {
  const { mode = 'mock' } = useParams()
  const [params] = useSearchParams()
  const item = params.get('item') ? Number(params.get('item')) : null
  const navigate = useNavigate()
  const [, setHistory] = useHistory()

  const [seed, setSeed] = useState(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { title, steps } = useMemo(() => buildSteps(mode, item), [mode, item, seed])

  const [phase, setPhase] = useState<Phase>('ready')
  const [stepIdx, setStepIdx] = useState(0)
  const [remaining, setRemaining] = useState(0)
  const [total, setTotal] = useState(1)
  const [narrating, setNarrating] = useState('')
  const [recordings, setRecordings] = useState<Record<string, string>>({})
  const [micOk, setMicOk] = useState<boolean | null>(null)
  const [showHint, setShowHint] = useState(false)

  const recorder = useRef<AnswerRecorder | null>(null)
  const runToken = useRef(0)
  const skipFlag = useRef(false)

  // 언마운트 시 정리
  useEffect(
    () => () => {
      runToken.current++
      stopSpeaking()
      recorder.current?.close()
    },
    [],
  )

  const alive = (token: number) => token === runToken.current

  const countdown = (sec: number, token: number) =>
    new Promise<void>((resolve) => {
      const end = Date.now() + sec * 1000
      setTotal(sec)
      setRemaining(sec)
      skipFlag.current = false
      const iv = setInterval(() => {
        const left = Math.max(0, (end - Date.now()) / 1000)
        setRemaining(left)
        if (!alive(token) || skipFlag.current || left <= 0) {
          clearInterval(iv)
          resolve()
        }
      }, 200)
    })

  const run = async () => {
    const token = ++runToken.current
    let lastPart = 0
    const answers: AnswerLog[] = []
    for (let i = 0; i < steps.length; i++) {
      if (!alive(token)) return
      const s = steps[i]
      setStepIdx(i)
      setShowHint(false)
      if (s.part !== lastPart) {
        lastPart = s.part
        setPhase('directions')
        setNarrating(DIRECTIONS[s.part])
        skipFlag.current = false
        await Promise.race([speak(DIRECTIONS[s.part]), waitSkip(token)])
        stopSpeaking()
      }
      if (!alive(token)) return
      if (s.narrate.length) {
        setPhase('narrate')
        skipFlag.current = false
        for (const t of s.narrate) {
          if (!alive(token) || skipFlag.current) break
          setNarrating(t)
          await Promise.race([speak(t), waitSkip(token)])
        }
        stopSpeaking()
      }
      if (!alive(token)) return
      setPhase('prep')
      beep(660)
      await countdown(s.prep, token)
      if (!alive(token)) return
      if (s.answer > 0) {
        setPhase('answer')
        beep(990)
        recorder.current?.start()
        const t0 = Date.now()
        await countdown(s.answer, token)
        answers.push({ part: s.part, allotted: s.answer, used: Math.min(s.answer, Math.round((Date.now() - t0) / 1000)) })
        const blob = await recorder.current?.stop()
        if (blob && alive(token)) {
          const url = URL.createObjectURL(blob)
          setRecordings((r) => ({ ...r, [s.key]: url }))
        }
      }
    }
    if (!alive(token)) return
    beep(520, 600)
    setPhase('review')
    recorder.current?.close()
    logActivity()
    setHistory((h) => [...h.slice(-49), { at: new Date().toISOString(), mode, title, item, answers, questions: steps.filter((s) => s.qno).length }])
  }

  const waitSkip = (token: number) =>
    new Promise<void>((resolve) => {
      const iv = setInterval(() => {
        if (!alive(token) || skipFlag.current) {
          clearInterval(iv)
          resolve()
        }
      }, 150)
    })

  const start = async () => {
    unlockAudio() // iOS: 탭한 순간에 오디오·음성 합성을 깨워 둔다
    const rec = new AnswerRecorder()
    const ok = await rec.open()
    recorder.current = ok ? rec : null
    setMicOk(ok)
    setRecordings({})
    run()
  }

  const stop = () => {
    runToken.current++
    stopSpeaking()
    recorder.current?.close()
    setPhase('review')
  }

  const restart = () => {
    runToken.current++
    stopSpeaking()
    Object.values(recordings).forEach((u) => URL.revokeObjectURL(u))
    setRecordings({})
    setStepIdx(0)
    setSeed((s) => s + 1)
    setPhase('ready')
  }

  const step = steps[stepIdx]

  /* ---------------- 시작 화면 ---------------- */
  if (phase === 'ready') {
    return (
      <div className="test">
        <header className="page-header">
          <Link to="/practice" className="back">
            ← 실전 연습
          </Link>
          <h1>{title}</h1>
          <p className="muted">
            {steps.filter((s) => s.qno).length}문항 · 실제 시험과 같은 준비/답변 시간
          </p>
        </header>
        <div className="card">
          <h3>진행 방식</h3>
          <ul className="list-plain small">
            <li>안내 음성과 질문은 영어 음성(TTS)으로 들려줘요. 소리를 켜 주세요.</li>
            <li>신호음이 울리면 준비 시간, 두 번째 신호음이 울리면 답변 시간이에요.</li>
            <li>답변 시간 동안 마이크로 녹음되고, 끝나면 내 답변과 모범 답안을 비교할 수 있어요.</li>
            <li>녹음은 이 기기 안에서만 재생되며 어디에도 전송·저장되지 않아요.</li>
          </ul>
          <button className="btn block" style={{ marginTop: 12 }} onClick={start}>
            🎙 시작하기 (마이크 허용)
          </button>
        </div>
        {!AnswerRecorder.supported() && <Notice tone="warn">이 브라우저는 녹음을 지원하지 않아요. 타이머만으로 연습할 수 있어요.</Notice>}
      </div>
    )
  }

  /* ---------------- 리뷰 화면 ---------------- */
  if (phase === 'review') {
    return (
      <div className="test">
        <header className="page-header">
          <h1>연습 결과</h1>
          <p className="muted">내 녹음을 듣고 모범 답안과 비교해 보세요. 녹음은 이 화면을 나가면 사라져요.</p>
        </header>
        {steps
          .filter((s) => s.answer > 0)
          .map((s) => (
            <div key={s.key} className="card">
              <div className="qlabel">
                Question {s.qno} · Part {s.part}
              </div>
              <QuestionView step={s} compact />
              {recordings[s.key] ? <audio controls src={recordings[s.key]} /> : <p className="muted small">녹음 없음</p>}
              <details style={{ marginTop: 8 }}>
                <summary style={{ cursor: 'pointer', fontWeight: 700, color: 'var(--primary)' }}>모범 답안 / 학습 포인트</summary>
                <ModelAnswer step={s} />
              </details>
            </div>
          ))}
        <div className="btn-row">
          <button className="btn" onClick={restart}>
            새 문제로 다시 풀기
          </button>
          <button className="btn outline" onClick={() => navigate('/practice')}>
            실전 연습 목록
          </button>
        </div>
      </div>
    )
  }

  /* ---------------- 진행 화면 ---------------- */
  const pct = total ? (remaining / total) * 100 : 0
  return (
    <div className="test">
      <div className="test-top">
        <span className="qlabel">{step.qno ? `Question ${step.qno} of 11` : 'Part 4 · 표 읽기'}</span>
        <button className="btn ghost sm" onClick={stop}>
          그만하기
        </button>
      </div>
      {micOk === false && <Notice tone="warn">마이크를 사용할 수 없어 녹음 없이 진행해요.</Notice>}

      {phase === 'directions' ? (
        <div className="card">
          <h3>Part {step.part} Directions</h3>
          <p className="directions">{narrating}</p>
        </div>
      ) : (
        <>
          <QuestionView step={step} narrating={phase === 'narrate' ? narrating : undefined} />
        </>
      )}

      {(phase === 'prep' || phase === 'answer') && (
        <div className={`timer ${phase === 'answer' ? 'answer' : ''}`} role="timer" aria-live="off">
          {phase === 'answer' && micOk && <span className="rec-dot" aria-label="녹음 중" />}
          <span className="t-phase">{phase === 'prep' ? step.prepLabel : micOk ? '답변 시간 · 녹음 중' : '답변 시간'}</span>
          <span className="t-sec">{Math.ceil(remaining)}</span>
          <div className="bar progress">
            <i style={{ width: `${pct}%`, background: phase === 'answer' ? 'var(--accent)' : 'var(--primary)' }} />
          </div>
        </div>
      )}
      {showHint && (phase === 'prep' || phase === 'answer') && <Hint step={step} />}
      {(phase === 'directions' || phase === 'narrate') && <div className="timer"><span className="t-phase">🔊 음성 안내 중…</span></div>}

      <div className="btn-row">
        {(phase === 'prep' || phase === 'answer') && (
          <button className="btn outline sm" onClick={() => setShowHint((h) => !h)} aria-expanded={showHint}>
            💡 {showHint ? '힌트 닫기' : '힌트'}
          </button>
        )}
        <button className="btn outline sm" onClick={() => (skipFlag.current = true)}>
          {phase === 'answer' ? '답변 끝내기 →' : '건너뛰기 →'}
        </button>
      </div>
    </div>
  )
}

function QuestionView({ step, narrating, compact }: { step: Step; narrating?: string; compact?: boolean }) {
  const v = step.view
  switch (v.kind) {
    case 'p1':
      return (
        <div className={compact ? '' : 'card'}>
          <p className="passage" style={{ margin: 0 }}>
            {v.passage.en}
          </p>
        </div>
      )
    case 'p2':
      return <img className="figure" src={BASE + v.scene.image} alt={`${v.scene.title} 사진`} style={compact ? { maxHeight: 200, objectFit: 'cover', width: '100%' } : undefined} />
    case 'p3':
      return (
        <div className={compact ? '' : 'card'}>
          {!compact && <p className="small muted" style={{ marginTop: 0 }}>{v.set.intro}</p>}
          <p style={{ fontWeight: 700, margin: 0 }}>{v.set.questions[v.qi]}</p>
          {narrating && narrating !== v.set.questions[v.qi] && <p className="muted small">🔊 {narrating}</p>}
        </div>
      )
    case 'p4':
      if (compact) return <p style={{ fontWeight: 700 }}>{v.qi !== null && v.set.questions[v.qi].q}</p>
      return (
        <>
          <InfoTable set={v.set} />
          {narrating && <p className="muted small">🔊 질문을 잘 들으세요 (화면에 표시되지 않아요)</p>}
        </>
      )
    case 'p5':
      return (
        <div className={compact ? '' : 'card'}>
          <p style={{ fontWeight: 700, margin: 0 }}>{v.q.question}</p>
        </div>
      )
  }
}

function ModelAnswer({ step }: { step: Step }) {
  const v = step.view
  switch (v.kind) {
    case 'p1':
      return (
        <>
          <img className="figure" src={BASE + v.passage.image} alt="강세·끊어 읽기 표시 지문" />
          <div className="btn-row">
            <SpeakButton text={v.passage.en} label="모범 낭독 듣기" />
          </div>
          <p className="small muted">빨간 글자는 강세, / 는 끊어 읽기, 화살표는 억양이에요. 내 녹음과 끊어 읽은 위치를 비교해 보세요.</p>
        </>
      )
    case 'p2':
      return (
        <ul className="pairs">
          {v.scene.sentences.map((s, i) => (
            <li key={i} className="pair">
              <div className="pair-en">{s.en}</div>
              <div className="pair-ko">{s.ko}</div>
            </li>
          ))}
        </ul>
      )
    case 'p3':
      return (
        <>
          <p className="small">
            <b>활용할 교재 표현</b> · {v.set.hint}
          </p>
          <p className="small muted">의문사에 맞는 어순으로 첫 문장을 말하고, 남은 시간은 Because ~ + 만능 콤보(Time/Money/Rest/Quality/Taste/Fun)로 채우세요.</p>
          <Link className="btn sm outline" to="/study/part3">
            Part 3 학습 보기
          </Link>
        </>
      )
    case 'p4': {
      if (v.qi === null) return null
      const q = v.set.questions[v.qi]
      return (
        <ul className="pairs">
          {q.answer.map((a, i) => (
            <li key={i} className="pair">
              <div className="pair-en">
                {a} <SpeakButton text={a} small label="" />
              </div>
              <div className="pair-ko">{q.answerKo[i]}</div>
            </li>
          ))}
        </ul>
      )
    }
    case 'p5': {
      const a = part5Answers.find((x) => x.id === v.q.answerId)
      const key = ({ 장점: '장단점', '자질 선택': '선호' } as Record<string, string>)[v.q.type] ?? v.q.type
      const first = part5FirstSentence.find((f) => f.type.startsWith(key))
      return (
        <>
          {first && (
            <p className="small">
              <b>첫 문장</b> · {first.start}
            </p>
          )}
          {a && (
            <>
              <p className="small">
                <b>활용할 만능 답변 {String(a.id).padStart(2, '0')}</b>
              </p>
              <p className="passage" style={{ fontSize: '0.95rem' }}>
                {a.en}
              </p>
              <SpeakButton text={a.en} label="전체 듣기" />
            </>
          )}
        </>
      )
    }
  }
}

/** 실전 중 막힐 때 보는 힌트 — 교재의 템플릿·공식 (토스트의 '실전 연습 힌트' 벤치마킹) */
function Hint({ step }: { step: Step }) {
  const v = step.view
  let title = ''
  let items: string[] = []
  switch (v.kind) {
    case 'p1':
      title = 'Part 1 읽기 요령'
      items = part1Tips
      break
    case 'p2':
      title = '그림 묘사 템플릿'
      items = part2Template.map((t) => `${t.step}: ${t.en}`)
      break
    case 'p3': {
      const q = v.set.questions[v.qi].toLowerCase()
      // 질문에 들어 있는 유형 키워드 중 가장 긴(구체적인) 것을 고른다 (예: 'when was the last time' > 'when')
      let type: (typeof part3QuestionTypes)[number] | undefined
      let best = 0
      for (const t of part3QuestionTypes) {
        for (const k of t.type
          .toLowerCase()
          .split(/[/(),?~]/)
          .map((x) => x.replace(/[^a-z ]/g, '').trim())
          .filter((x) => x.length > 2)) {
          if (q.includes(k) && k.length > best) {
            best = k.length
            type = t
          }
        }
      }
      title = type ? `질문 유형: ${type.type}` : 'Part 3 답변 공식'
      items = [
        ...(type ? [`어순: ${type.pattern}`, `예) ${type.answer}`] : []),
        v.qi === 2 ? 'Q7(30초): 입장 → 이유(Because ~) → 만능 콤보 → 예시' : '첫 문장은 질문을 그대로 살려 완전한 문장으로',
        `만능 콤보: ${part3Combos.map((c) => c.key).join(' / ')}`,
        part3Combos[0].en,
      ]
      break
    }
    case 'p4': {
      title = v.qi === null ? '표 읽기 요령' : `Q${8 + v.qi} 답변 요령`
      items =
        v.qi === null
          ? ['제목·날짜·장소·가격·메모(*, 괄호)를 먼저 확인', '변경·취소(moved, canceled)와 추가 요금 표시는 Q9 단골', 'Q10은 같은 종류(세션, 면접, 투어)를 묶어서 찾아 두기']
          : [part4QuestionPatterns[v.qi].desc, ...part4QuestionPatterns[v.qi].examples.slice(0, 2), v.qi === 2 ? 'Sure thing. There are two ___ scheduled. Firstly, ~ Secondly, ~' : 'From 시간 to 시간, there will be ~ / Please note that ~']
      break
    }
    case 'p5': {
      const key = ({ 장점: '장단점', '자질 선택': '선호' } as Record<string, string>)[v.q.type] ?? v.q.type
      const first = part5FirstSentence.find((f) => f.type.startsWith(key))
      const a = part5Answers.find((x) => x.id === v.q.answerId)
      title = `Part 5 · ${v.q.type} 유형`
      items = [
        ...(first ? [`첫 문장: ${first.start}`] : []),
        ...part5Structure.map((p) => `${p.step} ${p.desc}`),
        ...(a ? [`만능 답변 ${String(a.id).padStart(2, '0')}: ${a.en.split('. ')[0]}.`] : []),
      ]
      break
    }
  }
  return (
    <div className="hint" role="note">
      <b>💡 {title}</b>
      <ul>
        {items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  )
}
