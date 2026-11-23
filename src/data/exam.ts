// 시험 형식·접수 관련 정보
// 시험 형식은 2022년 6월 개편안 기준(2026년 현재까지 추가 개편 공지 없음).
// 교재 4·6·8쪽의 오기(Part2 문항 수, Part4 표 읽기 시간/문항 번호, "Part6")는 바로잡아 반영함.

export type PartId = 1 | 2 | 3 | 4 | 5

export interface PartFormat {
  part: PartId
  title: string
  titleEn: string
  questions: string
  prep: string
  answer: string
  criteria: string
  summary: string
  /** 교재 '주제별 종류' — 그룹이 없는 파트는 group 생략 */
  topics: { group?: string; items: string[] }[]
  /** 교재의 파트 안내 문구 */
  notes?: string[]
}

export const PARTS: PartFormat[] = [
  {
    part: 1,
    title: '지문 크게 읽기',
    titleEn: 'Read a text aloud',
    questions: 'Q1–Q2 (2문항)',
    prep: '각 45초',
    answer: '각 45초',
    criteria: '발음, 억양, 강세',
    summary:
      '화면에 제시된 5–6개 문장의 지문을 45초 동안 준비하고 45초 동안 읽습니다. 의미 단위로 적절히 끊어 읽어 전달력이 좋을수록 높은 점수를 받습니다.',
    topics: [{ items: ['동영상 소개', '연설문', '제품 소개', '인물 소개', '녹음 메시지', '광고문', '라디오 방송', '교통 방송', '날씨 방송', '여행 가이드', '안내문', '지역뉴스', '행사 안내'] }],
  },
  {
    part: 2,
    title: '사진 묘사하기',
    titleEn: 'Describe a picture',
    questions: 'Q3–Q4 (2문항, 사진 2장)',
    prep: '각 45초',
    answer: '각 30초',
    criteria: '발음, 억양·강세, 문법, 어휘, 일관성',
    summary:
      '사진 한 장을 45초간 준비한 후 30초 동안 묘사합니다. 위치별 주요 인물과 주변 사물의 동작·특이 사항 위주로 상세하게 묘사할수록 높은 점수를 받습니다.',
    topics: [
      { group: '실내', items: ['사무실', '도서관', '공항', '식료품 가게', '식당', '주방'] },
      { group: '실외', items: ['길거리', '공원', '야외 시장', '주차장'] },
    ],
  },
  {
    part: 3,
    title: '질문에 답하기',
    titleEn: 'Respond to questions',
    questions: 'Q5–Q7 (3문항)',
    prep: '각 3초',
    answer: 'Q5·Q6 15초 / Q7 30초',
    criteria: '발음, 억양·강세, 문법, 어휘, 일관성, 내용 연결성, 완성도',
    summary:
      '한 가지 주제에 대한 세 개의 질문이 연속으로 나옵니다. 의문사를 정확히 파악하고, 주어진 시간 동안 가능한 많은 문장을 말하는 것이 중요합니다.',
    topics: [
      { group: '의식주', items: ['주거 형태', '외식', '근무 선호도 등'] },
      { group: '생활 속 일반 활동', items: ['쇼핑', '음악 감상', '독서 등'] },
      { group: '생활 속 특별 활동', items: ['기부', '관광 명소', '팟캐스트 등'] },
      { group: '특정 사물', items: ['스마트폰', '아이스크림', '기념품 등'] },
    ],
    notes: [
      '한 가지 주제로 3가지 질문에 답하게 됩니다.',
      '설문조사에 답하는 형태가 나올 수도 있고, 친구나 이웃과의 대화 상황 설정이 될 수 있습니다.',
      '가능한 주어진 시간에 묻는 질문 의도(시제와 의문사)에 맞게 대답하고 추가 표현도 해 주는 것이 좋습니다.',
      '주제와 관련 있는 대화를 자연스럽게 이어나가는 것이 중요합니다.',
    ],
  },
  {
    part: 4,
    title: '표 보고 질문에 답하기',
    titleEn: 'Respond to questions using information provided',
    questions: 'Q8–Q10 (3문항)',
    prep: '표 읽기 45초 + 각 3초',
    answer: 'Q8·Q9 15초 / Q10 30초',
    criteria: '발음, 억양·강세, 문법, 어휘, 일관성, 내용 연결성, 완성도',
    summary:
      '화면의 표를 45초 동안 파악한 후, 음성으로만 들려주는 3개의 질문에 답합니다. Q10은 질문을 두 번 들려줍니다(2022년 6월~). 문법 오류 없이 정확하게 말하는 것이 고득점 포인트입니다.',
    topics: [
      { group: '일정표', items: ['회의 일정표', '출장 일정표', '행사 일정표', '인터뷰 진행 일정 등'] },
      { group: '여행 일정', items: ['비즈니스 일정', '여행 일정', '비행 일정'] },
      { group: '프로그램', items: ['워크숍 프로그램', '학습 프로그램', '강좌 프로그램', '하이킹 투어 등'] },
      { group: '기타 유형', items: ['광고지', '이력서 등'] },
    ],
  },
  {
    part: 5,
    title: '의견 제시하기',
    titleEn: 'Express an opinion',
    questions: 'Q11 (1문항)',
    prep: '45초',
    answer: '60초',
    criteria: '발음, 억양·강세, 문법, 어휘, 일관성, 내용 연결성, 완성도',
    summary:
      '화면에 제시된 논제에 대해 45초 동안 생각을 정리한 후 60초 동안 답변합니다. 한 가지 입장을 정해 이유와 구체적인 예시로 일관성 있게 답변하세요.',
    topics: [{ items: ['직업 및 직장에 대한 의견', '기술 발달에 따른 삶의 변화 의견', '교육 현상에 대한 의견', '환경 보호에 관한 의견', '친구와 가족에 관한 의견', '독서의 장점'] }],
    notes: [
      '주제는 주로 직업 및 직장 상황 문제, 사회적 문제 및 교육적 문제로 구분할 수 있습니다.',
      '질문 유형: 선호 사항 묻기, 찬반 여부 묻기, 세 가지 항목 중 한 가지 선택하기',
      '논리 정연하게 한 가지 입장으로 임하며 일관성 있는 답변을 제시한다면 높은 점수를 받을 수 있습니다.',
    ],
  },
]

export const LEVELS = [
  { level: 'AH', name: 'Advanced High', score: '200', group: '고급' },
  { level: 'AM', name: 'Advanced Mid', score: '180–190', group: '고급' },
  { level: 'AL', name: 'Advanced Low', score: '160–170', group: '중급' },
  { level: 'IH', name: 'Intermediate High', score: '140–150', group: '중급' },
  { level: 'IM3', name: 'Intermediate Mid 3', score: '130', group: '초급' },
  { level: 'IM2', name: 'Intermediate Mid 2', score: '120', group: '초급' },
  { level: 'IM1', name: 'Intermediate Mid 1', score: '110', group: '초급' },
  { level: 'IL', name: 'Intermediate Low', score: '90–100', group: '기초' },
  { level: 'NH', name: 'Novice High', score: '60–80', group: '기초' },
  { level: 'NM/NL', name: 'Novice Mid / Low', score: '0–50', group: '기초' },
]
// 점수 구간은 일반적으로 알려진 참고값입니다. 정확한 기준은 공식 사이트에서 확인하세요.

export const LEVEL_DESCRIPTIONS = [
  {
    title: '영어 말하기 초급자 – IM2, IM3',
    text: '발음 및 문법적인 오류가 어느 정도 발생합니다. 질문에 대한 기본적인 정보를 답변할 수는 있지만, 가끔 대답하기 어렵거나 표현을 떠올리는 데 어려움이 있습니다.',
  },
  {
    title: '영어 말하기 중급자 – IH, AL',
    text: '전달해야 하는 내용으로 답변을 구성해 말로 옮길 수 있으며, 일상적인 비즈니스 회화가 가능합니다. 어려운 발음이나 문법에서 실수하는 경우가 있습니다.',
  },
  {
    title: '영어 말하기 고급자 – AM, AH',
    text: '일상 회화뿐 아니라 자신의 의견을 영어로 자유롭게 말할 수 있습니다. 발음이 깨끗한 편이며 문법적인 오류도 거의 발생하지 않습니다.',
  },
]

export const EXAM_RULES = [
  '규정 신분증 미지참 시 응시 불가 (사원증, 대학교(원) 학생증 인정 안 됨)',
  '필기구 사용 가능 (2019년 6월 1일부터 적용)',
  '기자재(컴퓨터, 헤드셋 등) 임의 조작 금지',
  '입실 시간 제한 (해당 시간의 10분 뒤까지)',
]

export const EXAM_FACTS = [
  { label: '주관', value: 'ETS 개발 · YBM 한국TOEIC위원회 시행' },
  { label: '시험 방식', value: '지정 고사장 컴퓨터 + 헤드셋으로 화면을 보고 듣고 답변을 녹음 (CBT)' },
  { label: '시험 일정', value: '매주 토·일요일 정기시험, 채용 시즌 등에는 평일 추가 시험 시행' },
  { label: '총 문항 / 시간', value: '11문항 · 약 20분' },
  { label: '성적 발표', value: '응시일로부터 약 5일(평일 기준) 후, 온라인 확인' },
  { label: '성적 유효기간', value: '2년' },
  { label: '등급 표기', value: '2022년 6월부터 ACTFL 기반 11개 등급 + 0–200점 점수 병기' },
]

export const CHANGES_2022 = [
  'Part 2 사진 묘사가 2문항(Q3·Q4)으로 늘어나고 답변 시간이 30초로 변경',
  'Part 4의 마지막 문항(Q10)은 질문을 두 번 들려줌',
  'Part 5(Q11) 준비 시간이 30초 → 45초로 연장',
  '"해결책 제시하기" 유형 폐지',
  '성적표에 ACTFL 기준 등급(AH~NL) 표기',
]

export const OFFICIAL_LINKS = [
  {
    name: 'TOEIC Speaking & Writing 공식 사이트',
    url: 'https://www.toeicswt.co.kr',
    desc: '시험 일정 확인, 접수, 수험표 출력, 성적 확인',
  },
  {
    name: 'YBM 한국TOEIC위원회',
    url: 'https://www.toeic.co.kr',
    desc: '공지사항(규정 변경, 추가 시험), 응시료·환불 규정',
  },
]
