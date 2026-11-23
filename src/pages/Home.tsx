import { Link } from 'react-router-dom'
import { todayKey, useDone, useHistory, useStored } from '../lib/storage'
import { buildDailyPlan, isAutoDone } from '../lib/dailyPlan'
import { dday, fmt, parseDate } from '../lib/dates'
import { VideoButton } from '../components/ui'
import { VIDEOS } from '../data/videos'
import { DEFAULT_PLAN, TOTALS, type ExamPlan } from '../lib/plan'

export default function Home() {
  const [plan] = useStored<ExamPlan>('plan', DEFAULT_PLAN)
  const { done } = useDone()
  const [history] = useHistory()
  const exam = parseDate(plan.examDate)
  const total = Object.values(TOTALS).reduce((a, b) => a + b, 0)
  const pct = Math.round((done.length / total) * 100)
  const tKey = todayKey()
  const daily = buildDailyPlan(plan, done)
  const [checked, setChecked] = useStored<string[]>(`daily-${tKey}`, [])
  const isTaskDone = (id: string) => checked.includes(id) || isAutoDone(daily.tasks.find((t) => t.id === id)!, history, tKey)
  const doneCount = daily.tasks.filter((t) => isTaskDone(t.id)).length

  return (
    <>
      <header className="page-header">
        <p className="muted small" style={{ margin: 0 }}>
          빠르고 확실한 마리아쌤 토익스피킹
        </p>
        <h1>토익스피킹 준비</h1>
      </header>

      <div className="hero">
        {exam ? (
          <>
            <div className="small">내 시험일 · {fmt(exam)}</div>
            <div className="dday">{dday(exam)}</div>
            <div className="small" style={{ marginTop: 6 }}>
              목표 등급 <b>{plan.target}</b> · <Link to="/register">일정 수정</Link>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontWeight: 700, fontSize: '1.15rem' }}>시험일을 정하셨나요?</div>
            <p className="small" style={{ margin: '6px 0 12px' }}>
              접수 도우미에서 공식 사이트 접수를 진행하고 D-day를 설정하세요.
            </p>
            <Link to="/register" className="btn" style={{ background: 'var(--primary-ink)', color: 'var(--primary)', borderColor: 'var(--primary-ink)' }}>
              접수 도우미 열기
            </Link>
          </>
        )}
      </div>

      <section className="section">
        <div className="section-head">
          <h2>오늘의 학습</h2>
          <span className="muted small">
            {daily.mode} · {doneCount}/{daily.tasks.length}
          </span>
        </div>
        <div className="card daily">
          <ul className="checklist">
            {daily.tasks.map((t) => {
              const ok = isTaskDone(t.id)
              return (
                <li key={t.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={ok}
                      onChange={() => setChecked((c) => (c.includes(t.id) ? c.filter((x) => x !== t.id) : [...c, t.id]))}
                      aria-label={`${t.title} 완료`}
                    />
                    <Link to={t.to} style={{ flex: 1 }}>
                      <b className={ok ? 'done-text' : ''}>
                        {t.part && <span className="part-badge">P{t.part}</span>}
                        {t.title}
                      </b>
                      <br />
                      <span className="muted small">{t.desc}</span>
                    </Link>
                    <span aria-hidden className="muted">
                      ›
                    </span>
                  </label>
                </li>
              )
            })}
          </ul>
          {!exam && (
            <p className="muted small" style={{ marginBottom: 0 }}>
              시험일과 목표 등급을 입력하면 남은 기간에 맞춰 플랜이 바뀌어요 (시험 7일 전부터 집중 플랜).
            </p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>학습 진도</h2>
          <span className="muted small">
            {done.length}/{total} · {pct}%
          </span>
        </div>
        <div className="progress" aria-label={`학습 진도 ${pct}%`}>
          <i style={{ width: `${pct}%` }} />
        </div>
        <div className="stat-row" style={{ marginTop: 12 }}>
          <div className="stat">
            <b>{done.filter((d) => d.startsWith('p1-')).length}</b>
            <span>Part 1 지문 / {TOTALS.p1}</span>
          </div>
          <div className="stat">
            <b>{done.filter((d) => d.startsWith('p2-')).length}</b>
            <span>Part 2 사진 / {TOTALS.p2}</span>
          </div>
          <div className="stat">
            <b>{history.length}</b>
            <span>실전 연습 횟수</span>
          </div>
        </div>
        <Link to="/stats" className="btn outline block" style={{ marginTop: 12 }}>
          📊 학습 분석 보기
        </Link>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>바로 시작하기</h2>
        </div>
        <div className="grid">
          <Link to="/practice/run/mock" className="card link-card">
            <div className="kicker">실전 모의고사</div>
            <h3>11문항 전체 풀기</h3>
            <p className="muted small" style={{ margin: 0 }}>
              시험과 같은 준비·답변 시간, 녹음 후 모범 답안과 비교
            </p>
          </Link>
          <Link to="/study/shadow" className="card link-card">
            <div className="kicker">따라 말하기</div>
            <h3>음성 인식 피드백</h3>
            <p className="muted small" style={{ margin: 0 }}>
              원어민 음성을 따라 말하면 놓친 단어를 표시
            </p>
          </Link>
          <Link to="/study/cards" className="card link-card">
            <div className="kicker">암기 카드</div>
            <h3>필수 문장 외우기</h3>
            <p className="muted small" style={{ margin: 0 }}>
              만능 답변·템플릿 문장을 카드로 반복
            </p>
          </Link>
          <Link to="/exam" className="card link-card">
            <div className="kicker">시험 정보</div>
            <h3>구성 · 등급 · 규정</h3>
            <p className="muted small" style={{ margin: 0 }}>
              파트별 준비/답변 시간과 평가 기준
            </p>
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>단기 목표 달성을 위한 3가지</h2>
        </div>
        <div className="card">
          <ol className="list-plain">
            <li>자신감 있는 목소리로 연습하기</li>
            <li>필수 문장 완벽 암기하기</li>
            <li>유튜브 실전 모의고사 훈련하기</li>
          </ol>
          <div className="btn-row">
            <VideoButton video={VIDEOS.channel} />
          </div>
        </div>
      </section>

      {history.length > 0 && (
        <section className="section">
          <div className="section-head">
            <h2>최근 연습</h2>
          </div>
          <div className="card">
            <ul className="list-plain">
              {history
                .slice(-5)
                .reverse()
                .map((h) => (
                  <li key={h.at}>
                    {h.title} · {h.questions}문항 <span className="muted small">({new Date(h.at).toLocaleString('ko-KR')})</span>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
