import { PageHeader, Section, Notice } from '../components/ui'
import { OFFICIAL_LINKS, LEVELS } from '../data/exam'
import { useStored } from '../lib/storage'
import { DEFAULT_PLAN, type ExamPlan } from '../lib/plan'
import { addBusinessDays, addDays, dday, downloadIcs, fmt, parseDate, today } from '../lib/dates'


const REG_STEPS = [
  { id: 'account', title: '공식 사이트 회원가입 / 로그인', desc: 'TOEIC Speaking & Writing 사이트에 로그인합니다. 영문 이름이 신분증·여권과 같은지 확인하세요.' },
  { id: 'photo', title: '증명사진 등록', desc: '최근 6개월 이내 촬영한 규격 사진을 준비합니다(성적표에 사용).' },
  { id: 'schedule', title: '시험 일정 · 고사장 선택', desc: '원하는 날짜와 시간, 집에서 가까운 고사장을 고릅니다. 채용 시즌에는 빨리 마감되니 미리 접수하세요.' },
  { id: 'pay', title: '응시료 결제', desc: '결제 화면의 금액이 최종 기준입니다. 정기/추가 접수에 따라 금액이 다를 수 있습니다.' },
  { id: 'confirm', title: '접수 완료 확인', desc: '접수 내역(시험 일시·고사장)을 확인하고, 이 앱에 시험일을 입력해 D-day를 설정하세요.' },
  { id: 'ticket', title: '수험표 출력 / 확인', desc: '시험 며칠 전 수험번호와 고사장 위치·입실 시간을 확인합니다.' },
]

const DAY_ITEMS = [
  { id: 'id', title: '규정 신분증 (주민등록증, 운전면허증, 여권 등)', desc: '사원증·대학교(원) 학생증은 인정되지 않습니다.' },
  { id: 'number', title: '수험번호 확인', desc: '' },
  { id: 'route', title: '고사장 위치 · 교통편 확인', desc: '입실 마감은 시험 시작 시각 10분 뒤까지 — 여유 있게 도착하세요.' },
  { id: 'warmup', title: '가볍게 목 풀기 · Part 1 지문 소리 내 읽기', desc: '' },
  { id: 'templates', title: 'Part 2 템플릿 · Part 3 만능 콤보 마지막 점검', desc: '' },
]

export default function Register() {
  const [plan, setPlan] = useStored<ExamPlan>('plan', DEFAULT_PLAN)
  const [checked, setChecked] = useStored<string[]>('reg-checks', [])
  const exam = parseDate(plan.examDate)
  const result = exam ? addBusinessDays(exam, 5) : null
  const t = today()

  const toggle = (id: string) => setChecked((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]))

  const addToCalendar = () => {
    if (!exam || !result) return
    const ev = [
      { title: '토익스피킹 시험', date: exam, time: plan.examTime || undefined, desc: '준비물: 규정 신분증, 수험번호. 입실 마감 시간 확인!' },
      { title: '토익스피킹 성적 발표 예정(예상)', date: result, desc: '응시일로부터 약 5일(평일 기준) 후 — 공식 사이트에서 확인' },
    ]
    const review = addDays(exam, -7)
    if (review > t) ev.push({ title: '토익스피킹 D-7 · 수험표·고사장 확인', date: review, desc: '수험번호, 고사장 위치, 신분증 확인' })
    downloadIcs('toeic-speaking.ics', ev)
  }

  const level = LEVELS.find((l) => l.level === plan.target)

  return (
    <>
      <PageHeader title="접수 도우미" sub="공식 사이트 접수를 빠짐없이 진행하도록 도와드려요" />

      <Notice tone="warn">
        이 앱은 공식 접수 시스템이 아니에요. 실제 접수·결제·취소는 공식 사이트에서 진행하고, 시험 일정·응시료·환불 규정은 공식 공지가 기준입니다.
      </Notice>

      <Section title="공식 사이트 바로가기">
        <div className="grid">
          {OFFICIAL_LINKS.map((l) => (
            <a key={l.url} className="card link-card" href={l.url} target="_blank" rel="noreferrer">
              <div className="kicker">새 창에서 열기 ↗</div>
              <h3>{l.name}</h3>
              <p className="muted small" style={{ margin: 0 }}>
                {l.desc}
              </p>
            </a>
          ))}
        </div>
      </Section>

      <Section title="내 시험 일정">
        <div className="card">
          <div className="grid">
            <div className="field">
              <label htmlFor="exam-date">시험일</label>
              <input id="exam-date" type="date" value={plan.examDate} onChange={(e) => setPlan({ ...plan, examDate: e.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="exam-time">입실 시간 (선택)</label>
              <input id="exam-time" type="time" value={plan.examTime} onChange={(e) => setPlan({ ...plan, examTime: e.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="target">목표 등급</label>
              <select id="target" value={plan.target} onChange={(e) => setPlan({ ...plan, target: e.target.value })}>
                {LEVELS.slice(0, 7).map((l) => (
                  <option key={l.level} value={l.level}>
                    {l.level} ({l.name})
                  </option>
                ))}
              </select>
            </div>
          </div>
          {exam && result ? (
            <>
              <div className="stat-row" style={{ marginTop: 4 }}>
                <div className="stat">
                  <b>{dday(exam)}</b>
                  <span>시험일 {fmt(exam).slice(5)}</span>
                </div>
                <div className="stat">
                  <b>{dday(result)}</b>
                  <span>성적 발표(예상) {fmt(result).slice(5)}</span>
                </div>
                <div className="stat">
                  <b>{level?.level}</b>
                  <span>목표 · {level?.score}점</span>
                </div>
              </div>
              <div className="btn-row">
                <button className="btn" onClick={addToCalendar}>
                  📅 캘린더에 추가 (.ics)
                </button>
                <button className="btn outline" onClick={() => setPlan(DEFAULT_PLAN)}>
                  초기화
                </button>
              </div>
              <p className="muted small">시험일, D-7 점검일, 성적 발표 예상일이 하루 전 알림과 함께 휴대폰·PC 캘린더에 추가돼요.</p>
            </>
          ) : (
            <p className="muted small" style={{ margin: 0 }}>
              공식 사이트에서 접수한 시험일을 입력하면 D-day와 성적 발표 예상일을 계산해 드려요.
            </p>
          )}
        </div>
      </Section>

      <Section title="접수 체크리스트" aside={<span className="muted small">{REG_STEPS.filter((s) => checked.includes(s.id)).length}/{REG_STEPS.length}</span>}>
        <div className="card">
          <ul className="checklist">
            {REG_STEPS.map((s, i) => (
              <li key={s.id}>
                <label>
                  <input type="checkbox" checked={checked.includes(s.id)} onChange={() => toggle(s.id)} />
                  <span>
                    <b className={checked.includes(s.id) ? 'done-text' : ''}>
                      {i + 1}. {s.title}
                    </b>
                    <br />
                    <span className="muted small">{s.desc}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
          <a className="btn block" href={OFFICIAL_LINKS[0].url} target="_blank" rel="noreferrer" style={{ marginTop: 12 }}>
            공식 사이트에서 접수하기 ↗
          </a>
        </div>
      </Section>

      <Section title="시험 당일 준비물">
        <div className="card">
          <ul className="checklist">
            {DAY_ITEMS.map((s) => (
              <li key={s.id}>
                <label>
                  <input type="checkbox" checked={checked.includes('day-' + s.id)} onChange={() => toggle('day-' + s.id)} />
                  <span>
                    <b className={checked.includes('day-' + s.id) ? 'done-text' : ''}>{s.title}</b>
                    {s.desc && (
                      <>
                        <br />
                        <span className="muted small">{s.desc}</span>
                      </>
                    )}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section title="접수 전에 알아 둘 점">
        <div className="card">
          <ul className="list-plain">
            <li>정기시험은 주로 매주 토·일요일에 있고, 채용 시즌에는 평일 추가 시험이 열립니다. 한 달에 많게는 8번 정도 시험이 있습니다.</li>
            <li>시험 접수는 시험일 며칠 전까지 가능하지만, 인기 고사장은 일찍 마감되니 원하는 날짜가 정해지면 바로 접수하세요.</li>
            <li>성적은 응시일로부터 약 5일(평일 기준) 후 발표되며, 유효기간은 2년입니다.</li>
            <li>응시료, 접수 취소·환불 비율, 연기 규정은 바뀔 수 있으니 결제 전에 공식 사이트에서 확인하세요.</li>
          </ul>
        </div>
      </Section>
    </>
  )
}
