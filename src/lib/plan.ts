import { part1Passages, part2Scenes, part3Topics, part4Sets, part5Answers } from '../data/study'

export interface ExamPlan {
  examDate: string
  examTime: string
  target: string
}

export const DEFAULT_PLAN: ExamPlan = { examDate: '', examTime: '', target: 'IH' }

/** 파트별 학습 항목 수 (진도 계산용) */
export const TOTALS = {
  p1: part1Passages.length,
  p2: part2Scenes.length,
  p3: part3Topics.length,
  p4: part4Sets.length,
  p5: part5Answers.length,
}
