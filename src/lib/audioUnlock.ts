// iOS Safari 는 사용자가 탭한 순간에만 오디오/음성 합성을 '깨울' 수 있다.
// 시작 버튼 핸들러에서 호출해 두면 이후 비동기 흐름에서도 신호음·TTS 가 재생된다.
import { primeAudio } from './beep'

export function unlockAudio() {
  primeAudio()
  try {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(' ')
      u.volume = 0
      window.speechSynthesis.speak(u)
    }
  } catch {
    /* noop */
  }
}
