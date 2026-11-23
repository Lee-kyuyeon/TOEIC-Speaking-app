// 실전 연습용 문제 세트
// Part 1·2·4는 교재 지문/사진/표를 그대로 사용하고,
// Part 3·5는 교재의 예시 질문과 만능 답변 주제를 바탕으로 앱에서 구성한 연습 문제입니다.

export interface Part3Set {
  id: number
  topic: string
  intro: string
  questions: string[] // Q5, Q6, Q7
  hint: string // 활용할 교재 표현
}

export const part3Sets: Part3Set[] = [
  {
    id: 1,
    topic: '소풍 / 야외 활동',
    intro: 'Imagine that a marketing firm is doing research in your area. You have agreed to participate in a telephone interview about outdoor activities.',
    questions: [
      'When was the last time you went on a picnic? Who did you go with?',
      'What time of day do you think is the best for picnics? Why?',
      'Do you prefer outdoor events or indoor events? Why?',
    ],
    hint: 'When was the last time / What time of day 유형 + "야외 활동이 더 좋은 이유" 만능 답변',
  },
  {
    id: 2,
    topic: '축제 / 박람회',
    intro: 'Imagine that a Canadian marketing firm is doing research in your country. You have agreed to participate in a telephone interview about festivals.',
    questions: [
      'When did you last attend a fair or festival? What kind of festival was it?',
      'Who do you usually go to festivals with? Why?',
      'If a festival were held in your city, would you volunteer to help with it? Why or why not?',
    ],
    hint: 'The last time I attended ~ was ___. / 같이 어울리는 사람 중요성 만능 답변',
  },
  {
    id: 3,
    topic: '신발 쇼핑',
    intro: 'Imagine that a shoe company is doing research in your area. You have agreed to participate in a telephone interview about buying shoes.',
    questions: [
      'How do you find out about new shoe stores in your area?',
      'How far away is the nearest shoe store from your home?',
      'If you were going to buy new shoes, would you be more likely to buy them online? Why or why not?',
    ],
    hint: 'by 동사ing / It takes ___ on foot / 가정법 + Time·Money 만능 콤보',
  },
  {
    id: 4,
    topic: '스트리밍 / 영화',
    intro: 'Imagine that an entertainment company is doing research in your country. You have agreed to participate in a telephone interview about watching movies.',
    questions: [
      'How often do you use a streaming service to watch a movie?',
      'What kind of movies do you usually watch? Why?',
      'What is the most important factor when you choose a movie to watch: reviews, actors, or recommendations from friends? Why?',
    ],
    hint: 'from time to time / What kind of ~ / "친구 추천" 또는 "고객 리뷰" 만능 답변',
  },
  {
    id: 5,
    topic: '주거 / 동네',
    intro: 'Imagine that a real estate company is doing research in your area. You have agreed to participate in a telephone interview about where you live.',
    questions: [
      'Do you live in an apartment or a house? How long have you lived in your current home?',
      'When did you move to this neighborhood? Why did you decide to move?',
      'Describe the neighborhood you live in. Would you recommend it to others? Why?',
    ],
    hint: '현재완료 for 기간 / 단순 과거 / "주거 지역 묘사" 만능 답변',
  },
  {
    id: 6,
    topic: '직장 생활 / 휴식',
    intro: 'Imagine that a business magazine is doing research about work habits. You have agreed to participate in a telephone interview.',
    questions: [
      'How many breaks do you get in a day? Would you like to get your breaks alone?',
      'Would you rather work early in the day or late at night? Why?',
      'Do you prefer to communicate with coworkers by email or face to face? Why?',
    ],
    hint: 'How many + 개수 / would rather / "이메일·문자 소통 선호" 만능 답변',
  },
  {
    id: 7,
    topic: '운동 / 스포츠 용품',
    intro: 'Imagine that a sports company is doing research in your area. You have agreed to participate in a telephone interview about exercise.',
    questions: [
      'Where do you usually buy sports equipment in your area?',
      'How often do you exercise, and how long do you usually exercise?',
      'Do you think using a smartphone app is helpful for exercising? Why or why not?',
    ],
    hint: 'at + 건물 / once a week, for an hour / "스마트폰 앱 사용 장점", "운동 중요성" 만능 답변',
  },
  {
    id: 8,
    topic: '선물',
    intro: 'Imagine that a gift shop is doing research in your country. You have agreed to participate in a telephone interview about gifts.',
    questions: [
      'When was the last time you bought a gift? Who was it for?',
      'What kind of gift do you usually give to your friends?',
      'Do you think a gift certificate is a good gift? Why or why not?',
    ],
    hint: 'a cake, a coupon, a book, gift certificate / "선물" 만능 답변',
  },
]

export interface Part5Question {
  id: number
  question: string
  type: string
  answerId: number // part5Answers 의 만능 답변 id
}

export const part5Questions: Part5Question[] = [
  { id: 1, type: '찬반', question: 'Do you agree or disagree with the following statement? Schools should require students to take computer classes.', answerId: 1 },
  { id: 2, type: '선호', question: 'Which do you prefer for learning a new hobby: taking an online class or taking an in-person class? Why?', answerId: 1 },
  { id: 3, type: '자질 선택', question: 'Which of the following is the most important quality for a leader to have? Knowledge, organizational skills, or a sense of humor. Give specific reasons and examples.', answerId: 2 },
  { id: 4, type: '찬반', question: 'Do you agree or disagree with the following statement? It is better to do difficult tasks first before doing easy tasks.', answerId: 2 },
  { id: 5, type: '의견', question: 'Do you think companies should offer stress management classes to their employees? Why or why not?', answerId: 3 },
  { id: 6, type: '찬반', question: 'Do you agree or disagree with the following statement? Elementary school students should not be given homework.', answerId: 4 },
  { id: 7, type: '장점', question: 'What are the advantages of reading world news on the internet?', answerId: 5 },
  { id: 8, type: '자질 선택', question: 'Which is the most important skill for working well with others at work? Communication skills, a sense of humor, or teamwork. Explain why.', answerId: 6 },
  { id: 9, type: '의견', question: 'Do you think people should buy products that are produced locally? Why or why not?', answerId: 7 },
  { id: 10, type: '선호', question: 'Which do you prefer: working at one company for a long time or changing jobs several times? Why?', answerId: 8 },
  { id: 11, type: '장점', question: 'What are the advantages of studying abroad for university students?', answerId: 9 },
]
