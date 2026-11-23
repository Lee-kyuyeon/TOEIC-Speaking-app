// 목표 등급 + 시험일 + 학습 진도로 '오늘의 학습'을 만든다 (토스트의 맞춤 학습 플랜 벤치마킹)
import { part1Passages, part2Scenes, part3Topics, part4Sets, part5Answers } from '../data/study'
import { part3Sets, part5Questions } from '../data/practice'
import type { ExamPlan } from './plan'
import { todayKey, type PracticeLog } from './storage'
import { daysBetween, parseDate, today } from './dates'

export interface DailyTask {
  id: string
  part: number | null
  title: string
  desc: string
  to: string
  /** 실전 연습 기록으로 자동 완료 판정 */
  auto?: { mode: string; item?: number }
}

const HIGH = ['AH', 'AM', 'AL']

function nextUndone<T extends { id: number }>(arr: T[], prefix: string, done: string[], offset: number) {
  const undone = arr.filter((x) => !done.includes(`${prefix}-${x.id}`))
  const pool = undone.length ? undone : arr
  return pool[offset % pool.length]
}

export function buildDailyPlan(plan: ExamPlan, done: string[], date = today()): { tasks: DailyTask[]; mode: string; daysLeft: number | null } {
  const exam = parseDate(plan.examDate)
  const daysLeft = exam ? daysBetween(date, exam) : null
  const dayNo = Math.floor(date.getTime() / 86400000)
  const high = HIGH.includes(plan.target)
  const tasks: DailyTask[] = []

  const sprint = daysLeft !== null && daysLeft >= 0 && daysLeft <= 7
  const mode = daysLeft === null ? '기본 플랜' : daysLeft < 0 ? '시험 종료' : sprint ? '시험 직전 집중 플랜' : '꾸준 학습 플랜'

  if (sprint) {
    tasks.push({ id: 'mock', part: null, title: '실전 모의고사 1회', desc: '11문항을 실제 시간으로 풀고 녹음 비교', to: '/practice/run/mock', auto: { mode: 'mock' } })
  }

  const p1 = nextUndone(part1Passages, 'p1', done, 0)
  tasks.push({ id: `p1-${p1.id}`, part: 1, title: `Part 1 지문 ${String(p1.id).padStart(2, '0')} 따라 말하기`, desc: `${p1.category} · 강세·끊어 읽기 확인 후 음성 인식 피드백`, to: `/study/shadow?src=p1-${p1.id}` })

  const p2 = nextUndone(part2Scenes, 'p2', done, 0)
  tasks.push({ id: `p2-${p2.id}`, part: 2, title: `Part 2 사진 묘사 · ${p2.title}`, desc: '템플릿으로 30초 묘사 후 모범 답안 비교', to: `/practice/run/p2?item=${p2.id}`, auto: { mode: 'p2', item: p2.id } })

  // 요일별로 Part 3 / 4 / 5 순환 (고득점 목표는 Part 5 매일)
  const rot = dayNo % 3
  if (rot === 0 || sprint) {
    const s = part3Sets[dayNo % part3Sets.length]
    tasks.push({ id: `p3set-${s.id}`, part: 3, title: `Part 3 실전 · ${s.topic}`, desc: '3문항 15/15/30초, 만능 콤보 활용', to: `/practice/run/p3?item=${s.id}`, auto: { mode: 'p3', item: s.id } })
  }
  if (rot === 1 || sprint) {
    const s = nextUndone(part4Sets, 'p4', done, 0)
    tasks.push({ id: `p4-${s.id}`, part: 4, title: `Part 4 표${s.id} · ${s.type}`, desc: '표 읽기 45초 + Q8–10', to: `/practice/run/p4?item=${s.id}`, auto: { mode: 'p4', item: s.id } })
  }
  if (rot === 2 || high || sprint) {
    const a = nextUndone(part5Answers, 'p5', done, 0)
    const q = part5Questions.find((x) => x.answerId === a.id) ?? part5Questions[0]
    tasks.push({ id: `p5q-${q.id}`, part: 5, title: `Part 5 의견 · 만능 답변 ${String(a.id).padStart(2, '0')}`, desc: '45초 준비, 60초 답변', to: `/practice/run/p5?item=${q.id}`, auto: { mode: 'p5', item: q.id } })
  }
  if (rot !== 0 && !sprint) {
    const t = nextUndone(part3Topics, 'p3', done, 0)
    tasks.push({ id: `p3-${t.id}`, part: 3, title: `Part 3 만능 답변 · ${t.title.replace(/\s*\(.*\)$/, '')}`, desc: '소리 내어 3번 읽고 학습 완료 표시', to: '/study/part3' })
  }
  tasks.push({ id: 'cards', part: null, title: '암기 카드 10장', desc: '못 외운 카드 위주로 반복', to: '/study/cards' })

  return { tasks, mode, daysLeft }
}

export function isAutoDone(task: DailyTask, history: PracticeLog[], dateKey: string) {
  if (!task.auto) return false
  return history.some((h) => todayKey(new Date(h.at)) === dateKey && h.mode === task.auto!.mode && (task.auto!.item === undefined || h.item === task.auto!.item))
}
