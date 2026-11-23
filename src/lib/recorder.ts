// 마이크 녹음 — 답변 시간 동안 녹음하고 끝나면 재생 가능한 Blob 을 돌려준다.
export class AnswerRecorder {
  private stream: MediaStream | null = null
  private rec: MediaRecorder | null = null
  private chunks: Blob[] = []

  static supported() {
    return typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia && typeof MediaRecorder !== 'undefined'
  }

  /** 마이크 권한 요청. 성공 여부 반환 */
  async open(): Promise<boolean> {
    if (!AnswerRecorder.supported()) return false
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      return true
    } catch {
      return false
    }
  }

  get ready() {
    return !!this.stream
  }

  start() {
    if (!this.stream) return
    this.chunks = []
    this.rec = new MediaRecorder(this.stream)
    this.rec.ondataavailable = (e) => e.data.size && this.chunks.push(e.data)
    this.rec.start()
  }

  stop(): Promise<Blob | null> {
    return new Promise((resolve) => {
      const rec = this.rec
      if (!rec || rec.state === 'inactive') return resolve(null)
      rec.onstop = () => resolve(new Blob(this.chunks, { type: rec.mimeType || 'audio/webm' }))
      rec.stop()
    })
  }

  close() {
    if (this.rec && this.rec.state !== 'inactive') this.rec.stop()
    this.stream?.getTracks().forEach((t) => t.stop())
    this.stream = null
  }
}
