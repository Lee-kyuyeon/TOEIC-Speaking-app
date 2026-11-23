let ctx: AudioContext | null = null

function getCtx() {
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
  ctx = ctx ?? new AC()
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

/** 사용자 탭 시점에 호출 — iOS 에서 이후 신호음이 나도록 오디오를 깨운다 */
export function primeAudio() {
  try {
    const c = getCtx()
    const buf = c.createBuffer(1, 1, 22050)
    const src = c.createBufferSource()
    src.buffer = buf
    src.connect(c.destination)
    src.start(0)
  } catch {
    /* 오디오 불가 환경 */
  }
}

/** 시험장처럼 준비/답변 시작을 알리는 짧은 신호음 */
export function beep(freq = 880, ms = 350) {
  try {
    const c = getCtx()
    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.frequency.value = freq
    osc.type = 'sine'
    gain.gain.setValueAtTime(0.15, c.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + ms / 1000)
    osc.connect(gain).connect(c.destination)
    osc.start()
    osc.stop(c.currentTime + ms / 1000)
  } catch {
    /* 오디오 불가 환경 */
  }
}
