// 브라우저 음성 인식(Web Speech API) — 따라 말하기 피드백용. 인식은 브라우저 제공 엔진(Apple/Google)이 처리하고,
// 이 앱은 별도 서버로 음성을 보내지 않는다.
// iOS Safari 14.5+, Chrome 지원. (iOS는 '설정 > Siri'의 받아쓰기가 켜져 있어야 동작할 수 있음)

interface SRAlternative { transcript: string }
interface SRResult { isFinal: boolean; 0: SRAlternative; length: number }
interface SREvent { resultIndex: number; results: { length: number; [i: number]: SRResult } }
interface SR {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((e: SREvent) => void) | null
  onerror: ((e: { error: string }) => void) | null
  onend: (() => void) | null
  start(): void
  stop(): void
  abort(): void
}

function ctor(): (new () => SR) | null {
  const w = window as unknown as { SpeechRecognition?: new () => SR; webkitSpeechRecognition?: new () => SR }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

export const recognitionSupported = () => typeof window !== 'undefined' && ctor() !== null

export interface Listener {
  stop(): void
}

/** 듣기 시작. onText 로 중간/최종 결과 전달, 끝나면 onEnd(최종 텍스트, 오류) */
export function listen(onText: (text: string) => void, onEnd: (text: string, error?: string) => void): Listener | null {
  const C = ctor()
  if (!C) return null
  const rec = new C()
  rec.lang = 'en-US'
  rec.continuous = true
  rec.interimResults = true
  let finalText = ''
  let interim = ''
  let error: string | undefined
  rec.onresult = (e) => {
    interim = ''
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const r = e.results[i]
      if (r.isFinal) finalText += ' ' + r[0].transcript
      else interim += ' ' + r[0].transcript
    }
    onText((finalText + interim).trim())
  }
  rec.onerror = (e) => {
    error = e.error
  }
  rec.onend = () => onEnd((finalText + ' ' + interim).trim(), error)
  try {
    rec.start()
  } catch {
    return null
  }
  return { stop: () => rec.stop() }
}

/* ---------- 단어 비교 ---------- */
const NUM: Record<string, string> = {
  '1': 'one', '2': 'two', '3': 'three', '4': 'four', '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine', '10': 'ten',
  '11': 'eleven', '12': 'twelve', '15': 'fifteen', '20': 'twenty', '30': 'thirty', '100': 'hundred',
}

export function normWord(w: string) {
  const x = w.toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9']/g, '')
  return NUM[x] ?? x
}

export function words(s: string) {
  return s.split(/[\s\-–—/]+/).map((w) => ({ raw: w, n: normWord(w) })).filter((w) => w.n)
}

/** 원문 단어별로 말했는지(true/false) 표시 — LCS 기반 */
export function compare(target: string, spoken: string) {
  const t = words(target)
  const s = words(spoken).map((w) => w.n)
  const dp = Array.from({ length: t.length + 1 }, () => new Array<number>(s.length + 1).fill(0))
  for (let i = t.length - 1; i >= 0; i--)
    for (let j = s.length - 1; j >= 0; j--) dp[i][j] = t[i].n === s[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1])
  const hit = new Array<boolean>(t.length).fill(false)
  let i = 0
  let j = 0
  while (i < t.length && j < s.length) {
    if (t[i].n === s[j]) {
      hit[i] = true
      i++
      j++
    } else if (dp[i + 1][j] >= dp[i][j + 1]) i++
    else j++
  }
  const matched = hit.filter(Boolean).length
  return {
    tokens: t.map((w, k) => ({ word: w.raw, ok: hit[k] })),
    accuracy: t.length ? Math.round((matched / t.length) * 100) : 0,
    missed: t.filter((_, k) => !hit[k]).map((w) => w.raw),
    spokenCount: s.length,
  }
}

export function splitSentences(text: string) {
  return (text.match(/[^.!?]+[.!?]+["’']?/g) ?? [text]).map((x) => x.trim()).filter(Boolean)
}
