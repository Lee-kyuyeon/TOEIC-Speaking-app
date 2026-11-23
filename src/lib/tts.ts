// 브라우저 음성 합성(TTS) — 교재 음원 대신 영어 문장을 읽어 준다.
let cachedVoice: SpeechSynthesisVoice | null | undefined

function pickVoice(): SpeechSynthesisVoice | null {
  if (cachedVoice !== undefined && cachedVoice !== null) return cachedVoice
  const voices = window.speechSynthesis?.getVoices() ?? []
  cachedVoice =
    voices.find((v) => v.lang === 'en-US' && /Google|Samantha|Aria|Jenny|Natural/i.test(v.name)) ??
    voices.find((v) => v.lang === 'en-US') ??
    voices.find((v) => v.lang.startsWith('en')) ??
    null
  return cachedVoice
}

export const ttsSupported = () => typeof window !== 'undefined' && 'speechSynthesis' in window

export function stopSpeaking() {
  if (ttsSupported()) window.speechSynthesis.cancel()
}

/** 텍스트를 읽고, 다 읽으면 resolve. TTS 미지원이면 글자 수에 비례해 기다린다. */
export function speak(text: string, rate = 0.95): Promise<void> {
  return new Promise((resolve) => {
    if (!ttsSupported()) {
      setTimeout(resolve, Math.min(8000, 60 * text.length))
      return
    }
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'en-US'
    u.rate = rate
    const v = pickVoice()
    if (v) u.voice = v
    let finished = false
    const finish = () => {
      if (!finished) {
        finished = true
        clearTimeout(guard)
        resolve()
      }
    }
    // 일부 브라우저에서 onend 가 오지 않는 경우 대비
    const guard = setTimeout(finish, 2000 + 120 * text.length)
    u.onend = finish
    u.onerror = finish
    window.speechSynthesis.speak(u)
  })
}

if (ttsSupported()) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoice = undefined
  }
}
