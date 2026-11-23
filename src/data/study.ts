// 교재(빠르고 확실한 마리아쌤 토익스피킹, 2024)의 학습 내용을 구조화한 데이터
import book from './book.json'

export interface Pair { en: string; ko: string }

export interface Part1Passage { id: number; category: string; en: string; ko: string; image: string }
export interface Part2Scene { id: number; title: string; image?: string; sentences: Pair[] }
export interface TopicAnswer { id: number; title: string; sentences: Pair[] }
export interface Part5Answer { id: number; topics: string; en: string; ko: string }

export const part1Passages = book.part1 as Part1Passage[]
export const part2Intro = book.part2Intro as string
export const part2Scenes = book.part2Scenes as Part2Scene[]
export const part3Topics = book.part3Topics as TopicAnswer[]
export const part5Answers = book.part5Answers as Part5Answer[]

/* ---------------- Part 1 ---------------- */
export const part1Tips = [
  '굵게(빨간색) 표시된 부분은 강세 — 강조하여 힘 있게 읽기',
  '/ 표시는 끊어 읽기 — 덩어리 단위로 읽는 연습하기',
  '/ 표시에서 들숨, 날숨에 한 덩어리를 한 번에 읽기',
  '↗ 나열·쉼표 앞은 올려 읽고, ↘ 문장 끝은 내려 읽기',
]

export const minimalPairs: { sound: string; words: string[] }[] = [
  { sound: '[f] 와 [p]', words: ['file / pile', 'coffee / copy', 'full / pull', 'face / pace', 'fill / pill', 'fan / pan', 'fat / pat', 'fine / pin'] },
  { sound: '[v] 와 [b]', words: ['very / berry', 'vote / boat', 'van / ban', 'vest / best'] },
  { sound: '[r] 와 [l]', words: ['rain / lane', 'wrong / long', 'row / low', 'right / light', 'wrist / list', 'road / load', 'read / lead', 'rate / late'] },
  { sound: '[θ] 와 [s]', words: ['thick / sick', 'thing / sing', 'thank / sank', 'thin / sin', 'path / pass', 'faith / face', 'mouth / mouse', 'worth / worse'] },
  { sound: '[i] 와 [iː]', words: ['fill / feel', 'sit / seat', 'live / leave', 'hit / heat', 'list / least', 'chip / cheap', 'hill / heal', 'gin / jean'] },
  { sound: '[ou] 와 [ɔː]', words: ["won't / want", 'boat / bought', 'hole / hall', 'cold / called'] },
]

export const sameRootWords: { word: string; ipa: string; meaning: string }[] = [
  { word: 'exhibit', ipa: '/ɪɡˈzɪbɪt/', meaning: '전시물' },
  { word: 'exhibition', ipa: '/ˌeksɪˈbɪʃ(ə)n/', meaning: '전시회' },
  { word: 'certificate (n.)', ipa: '/sə(r)ˈtɪfɪkət/', meaning: '자격증' },
  { word: 'certificate (v.)', ipa: '[sər|tɪfɪkeɪt]', meaning: '부여하다' },
  { word: 'associate (v.)', ipa: '[ə|soʊsieɪt]', meaning: '연합하다' },
  { word: 'associate (n.)', ipa: '[ə|soʊʃiət]', meaning: '직원' },
  { word: 'estimate (v.)', ipa: '[estɪmeɪt]', meaning: '견적을 내다' },
  { word: 'estimate (n.)', ipa: '[estɪmət]', meaning: '견적서' },
  { word: 'photo', ipa: '[foʊtoʊ]', meaning: '사진' },
  { word: 'photograph', ipa: '[foʊtəgrӕf]', meaning: '사진' },
  { word: 'photography', ipa: '[fə|tɑ:grəfi]', meaning: '촬영' },
  { word: 'photographer', ipa: '[fə|tɑ:grəfə(r)]', meaning: '사진사' },
  { word: 'exit (n.)', ipa: '[eksɪt]', meaning: '출구' },
  { word: 'exit (v.)', ipa: '[eksɪt]', meaning: '나가다' },
]

export const loanWords: { word: string; ipa: string }[] = [
  { word: 'discount', ipa: '[dɪskaʊnt]' },
  { word: 'model', ipa: '[mɑ:dl]' },
  { word: 'system', ipa: '[sɪstəm]' },
  { word: 'Athens', ipa: '[ǽθinz]' },
  { word: 'event', ipa: '[ɪˈvent]' },
  { word: 'recreation', ipa: '[rekri|eɪʃn]' },
  { word: 'café', ipa: '[kӕfeɪ]' },
  { word: 'enjoy', ipa: '[ɪn|dƷɔɪ]' },
  { word: 'Rome', ipa: '[róum]' },
  { word: 'film', ipa: '[fɪlm]' },
]

/* ---------------- Part 2 ---------------- */
export const part2Template = [
  { step: '장소', en: 'This is a picture of a ___ (inside / outside).', ko: '첫 문장: 어디에서 찍은 사진인지' },
  { step: '사람', en: '[위치], there is a [사람]. → 외모 → 동작', ko: '머리 색 + 옷차림 + 동작 (가장 많은 부분을 차지하는 위치 순으로)' },
  { step: '사물', en: '[위치], I can see ___. / There is ___. / [사물] is p.p.', ko: '주변 사물 묘사' },
  { step: '마무리', en: 'Overall, it looks peaceful.', ko: '전체적인 느낌으로 마무리' },
]

export const part2Expressions: { title: string; items: Pair[] }[] = [
  {
    title: '헤어스타일엔 have 동사',
    items: [
      { en: 'A man has short hair / a beard.', ko: '짧은 머리 / 턱수염' },
      { en: 'A woman has blond hair / a ponytail.', ko: '금발 머리 / 하나로 묶은 머리' },
      { en: 'She has tied up her hair.', ko: '묶어 올린 머리' },
    ],
  },
  {
    title: '옷차림엔 be wearing',
    items: [
      { en: 'is wearing a formal suit / casual clothes', ko: '정장 / 편안한 복장' },
      { en: 'is wearing light clothes / heavy clothes', ko: '가벼운 옷차림 / 두터운 옷차림' },
      { en: 'a hat, sunglasses, shorts, jeans', ko: '모자, 선글라스, 반바지, 청바지' },
      { en: 'a checkered shirt / a striped shirt', ko: '체크무늬 셔츠 / 줄무늬 셔츠' },
    ],
  },
  {
    title: '전치사 활용 (with / in)',
    items: [
      { en: 'There is a man with glasses.', ko: '사람 + with + 안경 / 미소 / 헤어' },
      { en: 'There is a man in a formal suit.', ko: '사람 + in + 의상' },
    ],
  },
  {
    title: 'a/an 과 the',
    items: [
      { en: 'There is a woman. / A woman is sitting on a bench.', ko: '처음 언급할 때는 A woman' },
      { en: 'The woman (She) is reading a book.', ko: '다시 언급할 때는 The woman 또는 She' },
    ],
  },
  {
    title: '셀 수 있는 / 없는 명사',
    items: [
      { en: 'a chair → some chairs, many chairs', ko: '셀 수 있는 명사' },
      { en: 'a child → several children / one woman → two women', ko: '불규칙 복수형 주의' },
      { en: 'a person → some people', ko: '불규칙 복수형 주의' },
      { en: 'furniture, some bread, some fruit, some grass', ko: '셀 수 없는 명사 (a 붙이지 않기)' },
      { en: 'some furniture', ko: '약간의 가구 (furniture는 세상의 모든 가구)' },
    ],
  },
  {
    title: '사물 묘사 표현',
    items: [
      { en: 'be organized / be scattered', ko: '정리되어 있는 / 흐트러진' },
      { en: 'be displayed / be put', ko: '진열되어 있는 / 놓여 있는' },
      { en: 'be lined up', ko: '일렬로 늘어선' },
      { en: 'be set up / be put up', ko: '설치되어 있는 / 펼쳐진' },
      { en: 'A table is set up with some dishes.', ko: '테이블이 식사를 위해 차려져 있다' },
      { en: 'be parked / be hanging', ko: '주차되어 있는 / 매달려 있는' },
    ],
  },
  {
    title: '느낌 표현 (Level up)',
    items: [
      { en: 'The street looks crowded. / People look happy.', ko: '주어 + look + 형용사' },
      { en: 'It looks like people are moving into a new place.', ko: 'It looks like + 주어 + 동사' },
      { en: 'It looks like they are having a good time.', ko: 'It looks like + 주어 + 동사' },
      { en: 'It seems like he is choosing a book.', ko: 'It seems like + 주어 + 동사' },
      { en: 'It seems like this picture was taken at a hot restaurant.', ko: 'It seems like + 주어 + 동사' },
    ],
  },
]

export const part2Positions = [
  { en: 'In the foreground', ko: '앞쪽(전경)에' },
  { en: 'In the background', ko: '뒤쪽(배경)에' },
  { en: 'In the middle of the picture', ko: '가운데에' },
  { en: 'On the left / right side of the picture', ko: '왼쪽 / 오른쪽에' },
  { en: 'At the upper side', ko: '그림의 위쪽에' },
  { en: 'At the bottom side', ko: '그림의 아래쪽에' },
]

export const part2Extra: { title: string; image: string; sentences: Pair[] }[] = [
  {
    title: '동물원, 농장',
    image: 'book/part2/s21.jpg',
    sentences: [
      { en: 'I can see some animals behind the fence.', ko: '울타리 너머로 동물들이 보인다.' },
      { en: 'A kid is feeding the animals.', ko: '어떤 아이가 동물들에게 먹이를 주고 있다.' },
      { en: 'Some animals are walking on the grassy area.', ko: '동물들은 잔디밭 위에서 걷고 있다.' },
    ],
  },
  {
    title: '문 잡아 주는 사진',
    image: 'book/part2/s22.jpg',
    sentences: [
      { en: 'A man is holding a door for a woman.', ko: '한 남자가 한 여자를 위해 문을 잡아 주고 있다.' },
      { en: 'He seems very friendly.', ko: '그는 매우 친절해 보인다.' },
      { en: 'The woman is smiling at the man.', ko: '여자는 남자를 보며 미소 짓고 있다.' },
    ],
  },
  {
    title: '거실 사진',
    image: 'book/part2/s23.jpg',
    sentences: [
      { en: 'They are looking at a photo album.', ko: '그들은 사진 앨범을 보고 있어요.' },
      { en: 'A rug is spread on the floor.', ko: '양탄자가 바닥에 깔려 있어요.' },
      { en: 'Some cushions are put on the sofa.', ko: '쿠션이 소파에 놓여 있어요.' },
      { en: 'drawers / a fireplace / a lamp', ko: '서랍장 / 벽난로 / 조명' },
    ],
  },
  {
    title: '구두 닦는 사진',
    image: 'book/part2/s24.jpg',
    sentences: [
      { en: 'A man is having his shoes polished.', ko: '한 남자가 구두 닦는 서비스를 받고 있다.' },
      { en: "A shoe shiner is cleaning the man's shoes.", ko: '구두닦이는 남자의 구두를 깨끗이 해 주고 있다.' },
      { en: "I guess he is applying some wax paste on the man's shoes.", ko: '그는 남자의 구두에 왁스를 바르고 있는 것 같다.' },
    ],
  },
  {
    title: '와인 투어 사진',
    image: 'book/part2/s25.jpg',
    sentences: [
      { en: 'This is a picture of a wine cellar.', ko: '이것은 와인 저장고의 사진입니다.' },
      { en: 'It seems like some people are attending a wine tasting.', ko: '몇몇 사람들이 와인 시음회에 참석한 것 같아요.' },
      { en: 'I guess the server is letting them know the different types of wine.', ko: '종업원이 와인 종류를 설명해 주고 있는 것 같아요.' },
    ],
  },
  {
    title: '자동차 정비공 사진',
    image: 'book/part2/s26.jpg',
    sentences: [
      { en: 'An auto mechanic is repairing a car.', ko: '자동차 정비공이 차를 수리하고 있습니다.' },
      { en: 'He is using a device.', ko: '그는 도구를 사용하고 있습니다.' },
      { en: 'He is wearing overalls.', ko: '그는 작업복을 입고 있습니다.' },
      { en: 'The hood of the vehicle is open.', ko: '자동차 후드가 열려 있습니다.' },
    ],
  },
]

/* ---------------- Part 3 ---------------- */
export interface QuestionType {
  type: string
  pattern: string
  example: string
  exampleKo: string
  answer: string
  answerKo: string
  /** 교재의 추가 예문·어휘 */
  more?: Pair[]
}

export const part3QuestionTypes: QuestionType[] = [
  {
    type: 'When / What time of day(year)',
    pattern: '주어 + 동사 + in the morning / afternoon / evening, at night, in + 계절/달',
    example: 'What time of day do you think is the best for picnics? Why?',
    exampleKo: '하루 중 언제가 소풍을 즐기기에 좋은가요? 왜?',
    answer: 'I think afternoon is the best for picnics because the weather is mild. It is great for outdoor activities.',
    answerKo: '제 생각에 오후가 소풍을 즐기기에 가장 좋은 것 같습니다. 날씨가 온화하고 야외 활동하기에 좋습니다.',
    more: [
      { en: 'What time of the day ~ ? → in the morning / afternoon / evening, at night', ko: '하루 중 어느 때 ~' },
      { en: 'What time of the year ~ ? → in + 계절 / 달', ko: '일 년 중 어느 때 ~' },
    ],
  },
  {
    type: 'When was the last time ~?',
    pattern: 'The last time (that) I Ved was ___. (yesterday / last week / 2 weeks ago)',
    example: 'When did you last attend a fair or festival?',
    exampleKo: '언제 마지막으로 박람회나 축제에 참여했나요?',
    answer: 'The last time I attended a festival was 2 years ago.',
    answerKo: '가장 마지막으로 축제에 참여했을 때는 2년 전입니다.',
  },
  {
    type: 'Where ~?',
    pattern: 'in + 실내 공간 / at + 건물 / on + 길, on the internet',
    example: 'When was the last time you bought something from a vending machine? Where was it located?',
    exampleKo: '언제 마지막으로 자판기에서 무엇을 구매하였나요? 어디에 있었나요?',
    answer: 'The last time I bought something from a vending machine was 2 weeks ago. It was located at school.',
    answerKo: '가장 마지막으로 자판기에서 구매한 것은 2주 전입니다. 학교 건물에 있었습니다.',
    more: [
      { en: 'It was located on a street.', ko: '그것은 길에 있었습니다.' },
      { en: 'It was located at school.', ko: '그것은 학교 건물에 있었습니다.' },
    ],
  },
  {
    type: 'What kind(s) of ~?',
    pattern: 'I think 명사 is the best. / It was ___.',
    example: 'What kind of festival was it?',
    exampleKo: '어떤 종류의 축제였나요?',
    answer: 'It was a cherry blossom festival.',
    answerKo: '벚꽃 축제였어요.',
    more: [
      { en: 'What kind of TV program → news programs, dramas, comedy shows, variety shows', ko: 'TV 프로그램 종류' },
      { en: 'What kind of movie → action movies, sci-fi movies, romance movies', ko: '영화 종류' },
      { en: 'What kind of gift → a cake, a coupon, candles, a book, a gift certificate', ko: '선물 종류' },
      { en: 'What kind of food → Korean food, fast food, Chinese food, pizza', ko: '음식 종류' },
    ],
  },
  {
    type: 'Who do you ~ with?',
    pattern: '주어 + 동사 + with 같이 하는 사람 / alone / by myself',
    example: 'When was the last time you went on a picnic? Who did you go with?',
    exampleKo: '언제 마지막으로 소풍을 갔나요? 누구와 함께 갔나요?',
    answer: 'The last time I went on a picnic was last year. I went with my friends.',
    answerKo: '마지막으로 소풍을 간 것은 작년입니다. 친구들과 함께 갔습니다.',
  },
  {
    type: 'How often ~?',
    pattern: '주어 + 동사 + once a week / twice a week / from time to time',
    example: 'How often do you use a streaming service to watch a movie?',
    exampleKo: '얼마나 자주 영화를 보기 위해 스트리밍 서비스를 이용하나요?',
    answer: 'I use a streaming service from time to time to watch a movie.',
    answerKo: '영화를 보기 위해 스트리밍 서비스를 가끔 이용합니다.',
    more: [
      { en: 'once a week / twice a week / three times a week', ko: '일주일에 한 번 / 두 번 / 세 번' },
      { en: 'from time to time', ko: '가끔' },
    ],
  },
  {
    type: 'How many ~?',
    pattern: '답변에 개수 + 명사를 꼭 표현',
    example: 'How many breaks do you get in a day? Would you like to get your breaks alone?',
    exampleKo: '하루에 몇 번 쉬는 시간을 가지나요? 혼자 쉬는 것을 좋아하나요?',
    answer: 'I take about two breaks in a day. I would like to get my breaks alone. I can easily chill out.',
    answerKo: '하루에 2번 정도 쉬어요. 혼자 쉬는 것을 좋아합니다. 쉽게 휴식을 취할 수 있어요.',
  },
  {
    type: 'How far ~? / Where is the nearest ~?',
    pattern: 'It is two blocks away. / It takes 시간 by 교통수단 / on foot.',
    example: 'Where do you usually buy sports equipment in your area? How far away is the nearest sporting goods store from your home?',
    exampleKo: '어디에서 스포츠 용품을 구매하나요? 가장 가까운 스포츠 용품점은 집에서 얼마나 떨어져 있나요?',
    answer: 'I usually buy sports equipment at ABC shopping mall. It takes only 5 minutes on foot.',
    answerKo: '주로 ABC 쇼핑몰에서 구매합니다. 걸어서 5분이면 도착합니다.',
  },
  {
    type: 'How long / How much time ~?',
    pattern: '주어 + 동사 + for 기간 / 주어 + spend + 시간 + 동사ing',
    example: 'Do you live in an apartment or house? How long have you lived in your current home?',
    exampleKo: '아파트에 사나요, 주택에 사나요? 지금 집에 얼마나 오래 살았나요?',
    answer: 'I live in an apartment. I have lived in my current home for 3 years.',
    answerKo: '아파트에 살고 있어요. 현재 집에서 3년째 거주 중입니다.',
    more: [
      { en: 'I watch TV for an hour every day.', ko: '매일 하루에 한 시간 동안 TV를 봅니다. (주어 + 동사 + for 기간)' },
      { en: 'I spend one hour watching TV every day.', ko: '매일 TV를 보느라 1시간 정도를 씁니다. (*주의할 어순: 주어 + spend + 시간 + 동사ing)' },
    ],
  },
  {
    type: 'How do you find out ~?',
    pattern: '주어 + 동사 + by 동사ing (~함으로써)',
    example: 'How do you find out about new shoe stores in your area? Why?',
    exampleKo: '동네에 새로운 신발 가게를 어떻게 알게 되나요? 왜?',
    answer: 'I can find out about new shoe stores in my area by looking at the posters. A lot of posters are displayed on streets.',
    answerKo: '포스터를 보며 알게 됩니다. 많은 포스터가 길에 붙어 있어요.',
    more: [
      { en: 'by using the internet', ko: '인터넷을 이용함으로써' },
    ],
  },
  {
    type: 'Would you ~? (가정법)',
    pattern: 'I would (rather) 동사원형 ~ because ~',
    example: 'Would you rather work early in the day or late at night? Why?',
    exampleKo: '아침 일찍 일하고 싶나요, 밤늦게 일하고 싶나요? 왜?',
    answer: 'I would rather work early in the day because I want to get some rest in the evening.',
    answerKo: '아침 일찍 일하고 싶어요. 저녁에는 휴식을 취하고 싶기 때문입니다.',
    more: [
      { en: 'Would you V, if S Ved? (가정법 현재)', ko: '만약 ~라면 ~하고 싶어? — 답변에서 would를 활용하는 것이 중요!' },
    ],
  },
]

export const part3Tenses: { tense: string; form: string; example: string; answer: string; ko: string }[] = [
  {
    tense: '단순 현재 (반복되는 일상)',
    form: 'Do you 동사? → 주어 + 동사원형 / don’t + 동사원형',
    example: 'Do you have many candy stores in your area? Do you visit there often?',
    answer: "We don't have many candy stores in my area and I don't visit there often.",
    ko: '저희 동네에 사탕 가게가 많지 않고, 자주 방문하지 않습니다.',
  },
  {
    tense: '단순 과거 (정확한 과거 시점)',
    form: 'Did you 동사원형? → 주어 + 동사ed / didn’t + 동사원형',
    example: 'When did you move to this neighborhood? Why did you decide to move?',
    answer: 'I moved to this neighborhood 3 years ago. I decided to move here because it is close to the workplace.',
    ko: '3년 전에 이사 왔습니다. 직장과 가깝기 때문에 이곳으로 이사 오기로 결심했습니다.',
  },
  {
    tense: '현재 완료 (경험 / 지속)',
    form: 'Have you (ever) p.p? → Yes, I have p.p. / No, I haven’t p.p.',
    example: 'Have you attended driving schools?',
    answer: "Yes, I have. I attended a driving school 10 years ago to get a driver's license.",
    ko: '네, 있습니다. 10년 전에 운전면허를 따기 위해 운전 학원을 다녔습니다.',
  },
  {
    tense: '미래 (계획 / 의향 / 가능성)',
    form: 'Do you plan to ~? / Would you ~? / Are you more likely to ~?',
    example: 'Are you planning to travel to another country in the next month? Why or why not?',
    answer: 'No, I am not planning to travel to another country in the next month because it takes a long time. Instead, I will travel to another city soon.',
    ko: '아니요, 시간이 오래 걸려서 다음 달에 해외여행 계획은 없습니다. 대신 곧 다른 도시로 여행 갈 거예요.',
  },
  {
    tense: '가정법 현재 (현재 상황을 가정)',
    form: 'If 주어 동사ed, 주어 would 동사원형',
    example: 'If you were going to buy new shoes, would you be more likely to buy them online? Why or why not?',
    answer: 'I would be more likely to buy them online because I can save time and money. It is very convenient.',
    ko: '온라인으로 구매할 것 같습니다. 시간과 돈을 절약할 수 있어서 매우 편리합니다.',
  },
]

export const part3Combos: { key: string; label: string; en: string; ko: string }[] = [
  { key: 'Time', label: '시간 절약 강조', en: "I can save my time and energy. It's very convenient.", ko: '시간과 에너지를 절약해요. 매우 편리합니다.' },
  { key: 'Money', label: '돈 절약 강조', en: "It is cost-effective. Since I have a tight budget, I can't afford to buy an expensive one.", ko: '비용 효율적이에요. 예산이 빡빡해서 비싼 것을 살 여유가 없어요.' },
  { key: 'Rest', label: '휴식 강조', en: 'I can chill out and recharge my batteries.', ko: '쉴 수 있고 재충전을 할 수 있어요.' },
  { key: 'Quality', label: '삶의 질 강조', en: 'I can get motivated. I can spend quality time.', ko: '동기부여가 됩니다. 의미 있는 시간을 보낼 수 있어요.' },
  { key: 'Taste', label: '취향 설명', en: 'This is not my cup of tea. I am not interested.', ko: '별로 제 취향이 아니에요. 관심 없습니다.' },
  { key: 'Fun', label: '재미, 스트레스 해소', en: 'This is my favorite thing. I release my stress.', ko: '제가 가장 좋아하는 것이에요. 스트레스를 풀 수 있어요.' },
]

/* ---------------- Part 4 ---------------- */
export const part4QuestionPatterns = [
  { q: 'Q8', desc: '표의 대략적인 정보 (날짜, 장소, 시작 시각, 가격 등)', examples: ['When / What date / Where / What time ~ ?'] },
  {
    q: 'Q9',
    desc: '표의 상세 정보 확인 — 잘못된 정보를 정정하는 경우가 많음',
    examples: ['As far as I know, ~ is that right?', 'I heard that ~, can you confirm this?', 'Is it possible for me to ~?'],
  },
  {
    q: 'Q10',
    desc: '특정 조건에 해당하는 항목을 모두 알려 달라 (질문 두 번 들려줌)',
    examples: ['Could you please tell me all the details about ~?', 'Can you tell me regarding ~?', 'Would you let me know all the sessions which will deal with ~?'],
  },
]

export const part4Prepositions = [
  { cat: '시간', items: ['at + 시각', 'on + 요일 / 날짜', 'in + 월', 'from ~ to ~'] },
  { cat: '장소', items: ['in + 실내 공간 / 도시', 'on + 층수 / 길 이름', 'at + 건물 / 번지수'] },
  { cat: '숫자 읽기', items: ['방·비행기 번호는 떨어뜨려 읽기: Room 101, Flight #285', '번지수는 붙여 읽기: at 75, Park Avenue', '주소: 건물 is located at 번지수, 길 in 도시.'] },
  { cat: '인물 소개', items: ['by 발표자 / with 같이 회의·식사하는 사람', 'by Maria Kim, the manager', 'by Maria Kim from marketing department', 'by Maria Kim, the manager of ABC hotel'] },
]

/** 교재 '학생들이 자주 틀리는 빈출 표현 정리' */
export const part4CommonMistake = {
  q: "I don't think I can arrive until 9 a.m. What will I miss?",
  qKo: '아무래도 9시 이전에 도착은 못 할 것 같아요. 무엇을 놓치게 될까요?',
  a: "Well, don't worry. The meeting will start at 10 a.m.",
  aKo: '걱정하지 마세요. 회의는 오전 10시에 시작합니다.',
}

/** 표 유형별 교재 분류 */
export const part4TableTypes = [
  { type: '단체 행사 표', desc: 'Conference / Workshop / Seminar / Event (회의 / 워크숍 / 세미나 / 이벤트)', sets: [1, 2, 3] },
  { type: '인터뷰 일정', desc: 'there will be an interview with 지원자 for a ___ position', sets: [4] },
  { type: '투어 일정', desc: 'You will go on a tour of 장소.', sets: [5] },
  { type: '개인 일정', desc: '한 사람의 개인 일정', sets: [6] },
  { type: '직원 회의', desc: '발표자 소개: by 이름 in the ___ department / team', sets: [7] },
]

export const part4KeyPhrases: Pair[] = [
  { en: 'take place (= be held)', ko: '개최되다, 열리다' },
  { en: 'There will be ~', ko: '~가 있을 예정입니다' },
  { en: 'Please note that ~', ko: '~라는 점 참고해 주세요' },
  { en: 'No, I think you received the wrong information.', ko: '아니요, 잘못된 정보를 받으신 것 같습니다.' },
  { en: "Well, don't worry. / No worries.", ko: '걱정하지 마세요.' },
  { en: 'Sure thing. There are two sessions scheduled. Firstly, ~ Secondly, ~', ko: '물론입니다. 두 가지 일정이 있습니다. 첫째로 ~ 둘째로 ~' },
  { en: 'there will be an interview with 지원자 for a ___ position', ko: '~ 자리에 지원한 ~와의 면접이 있을 예정입니다' },
  { en: 'specialize in ~', ko: '~를 전문으로 한다' },
  { en: 'be working for ~', ko: '~에 종사 중입니다' },
  { en: 'be from 소속 기관', ko: '현재 ~에 소속되어 있습니다' },
  { en: 'by ~', ko: '~에 의해 (발표자)' },
  { en: 'You will go on a tour of 장소', ko: '~로 견학을 가게 될 것입니다' },
]

export interface Part4Set {
  id: number
  type: string
  title: string
  header: string[]
  columns?: string[]
  rows: string[][]
  footer?: string[]
  readAloud: Pair[]
  intro: string
  introKo: string
  questions: { q: string; qKo: string; answer: string[]; answerKo: string[] }[]
}

export const part4Sets: Part4Set[] = [
  {
    id: 1,
    type: '컨퍼런스',
    title: 'Professional Psychologists Conference',
    header: ['Professional Psychologists Conference', 'Ascent Lounge Conference Center', 'March 2', 'Registration fee: $200'],
    columns: ['Time', 'Schedule'],
    rows: [
      ['9:30 – 10:00 a.m.', 'Opening Speech'],
      ['10:00 – 11:00 a.m.', 'Role-play: Learning Psychology Through Play'],
      ['11:00 a.m. – Noon', 'Workshop: Research Skills Development'],
      ['Noon – 1:00 p.m.', 'Buffet Lunch ($15 extra)'],
      ['1:30 – 3:00 p.m.', 'Lecture: Insights from Psychology Experts'],
      ['3:00 – 4:30 p.m.', 'Presentation: Innovative Research Techniques'],
      ['4:30 – 6:00 p.m.', 'Real-world Applications of Psychology Theories'],
    ],
    readAloud: [
      { en: 'The conference will take place at Ascent Lounge Conference Center on March second.', ko: '컨퍼런스는 3월 2일 애센트 라운지 컨퍼런스 센터에서 개최될 예정입니다.' },
      { en: 'The registration fee is two hundred dollars.', ko: '등록비는 200달러입니다.' },
      { en: 'From 9:30 to 10 a.m., there will be an opening speech.', ko: '오전 9시 30분부터 10시까지 개회사가 있을 예정입니다.' },
      { en: 'From 10 to 11 a.m., there will be a session on role-play. We are going to learn psychology through play.', ko: '오전 10시부터 11시까지 롤플레이 세션이 있습니다. 연극을 통해 심리학을 배웁니다.' },
      { en: 'From 11 a.m. to noon, a workshop on research skills development will be held.', ko: '오전 11시부터 정오까지 연구 기술 개발 워크숍이 열립니다.' },
      { en: 'From noon to 1 p.m., buffet lunch will be served, but an extra fifteen dollars will be charged for lunch.', ko: '정오부터 오후 1시까지 뷔페 점심이 제공되지만 점심값으로 15달러가 추가 청구됩니다.' },
      { en: 'From 1:30 to 3 p.m., the lecture on insights from psychology experts will be given.', ko: '오후 1시 30분부터 3시까지 심리 전문가들의 통찰에 관한 강의가 있습니다.' },
      { en: 'From 3 to 4:30 p.m., the presentation on innovative research techniques will be delivered.', ko: '오후 3시부터 4시 30분까지 혁신적인 연구 기법에 관한 발표가 있습니다.' },
      { en: 'From 4:30 to 6 p.m., there will be the last session. The topic is real-world applications of psychology theories.', ko: '오후 4시 30분부터 6시까지 마지막 세션이 있습니다. 주제는 심리학 이론의 실제 적용입니다.' },
    ],
    intro: "I am planning to attend the Professional Psychologists Conference. I think I received the schedule, but I seem to have misplaced it. I have a few questions, so could you please provide some answers?",
    introKo: '전문 심리학자 컨퍼런스에 참석하려고 합니다. 일정을 받은 것 같은데 잃어버린 것 같아요. 몇 가지 질문에 답해 주실 수 있나요?',
    questions: [
      {
        q: 'What date will the conference be held? And what time does it end?',
        qKo: '컨퍼런스는 어떤 날짜에 열리나요? 몇 시에 끝나나요?',
        answer: ['The conference will take place on March second and it will end at 6 p.m.'],
        answerKo: ['컨퍼런스는 3월 2일에 개최되며 오후 6시에 끝날 예정입니다.'],
      },
      {
        q: 'I heard that the registration fee includes lunch. Can you confirm that for me?',
        qKo: '등록비에 점심값이 포함되어 있다고 들었습니다. 확인해 주실 수 있나요?',
        answer: ['No, I think you received the wrong information.', 'Please note that an extra fifteen dollars will be charged for lunch.'],
        answerKo: ['아니요, 잘못된 정보를 받으신 것 같습니다.', '점심값으로 15달러가 추가 청구될 예정입니다.'],
      },
      {
        q: 'I enjoy staying up to date with research in my field. Could you provide me with all the information you have that includes research?',
        qKo: '제 분야의 최신 연구를 따라가는 것을 좋아합니다. 연구와 관련된 모든 정보를 알려 주실 수 있나요?',
        answer: [
          'Sure thing. There are two sessions scheduled.',
          'Firstly, from 11 a.m. to noon, a workshop on research skills development will be held.',
          'Secondly, from 3 to 4:30 p.m., the presentation on innovative research techniques will be delivered.',
        ],
        answerKo: ['물론입니다. 두 가지 세션이 예정되어 있습니다.', '첫째, 오전 11시부터 정오까지 연구 기술 개발 워크숍이 열립니다.', '둘째, 오후 3시부터 4시 30분까지 혁신적인 연구 기법에 관한 발표가 있습니다.'],
      },
    ],
  },
  {
    id: 2,
    type: '수업 일정',
    title: 'Mind Over Muscle Center',
    header: ['Mind Over Muscle Center', 'Healthy Eating and Exercise Programs', 'Spring Courses date: March 2 to May 30', 'Deadline for registration: February 7th'],
    columns: ['Course', 'Day of the week', 'Time'],
    rows: [
      ['Meal Planning: Healthy Eating Habits', 'Mondays', '9 – 10 a.m.'],
      ['Fitness: Fun Exercise Routines', 'Fridays', '2 – 3 p.m.'],
      ['Meal Planning: Tasty Nutrition Tips', 'Saturdays', '10 – 11 a.m.'],
      ['Happy Moves for a Healthy You', 'Tuesdays', '5 – 6 p.m.'],
      ['Fitness: Workout Ideas for Everyone', 'Sundays', '10 – 11 a.m.'],
    ],
    footer: ['Prices: $120 per course'],
    readAloud: [
      { en: 'The spring courses will take place from March 2nd to May 30th at Mind Over Muscle Center.', ko: '3월 2일부터 5월 30일까지 마인드 오버 머슬 센터에서 봄 학기 수업이 열립니다.' },
      { en: 'You can register by February 7th.', ko: '2월 7일까지 등록 가능합니다.' },
      { en: 'There will be a course on meal planning from 9 to 10 a.m. on Mondays. You will learn about healthy eating habits.', ko: '월요일 오전 9시부터 10시까지 식단 계획 수업이 있습니다. 건강한 식습관에 대해 배웁니다.' },
      { en: 'There will be a course on fitness from 2 to 3 p.m. on Fridays. The topic of fun exercise routines will be discussed.', ko: '금요일 오후 2시부터 3시까지 피트니스 수업이 있습니다. 재미있는 운동 루틴에 대해 다룹니다.' },
      { en: 'There will be a course on meal planning from 10 to 11 a.m. on Saturdays. You will learn about tasty nutrition tips.', ko: '토요일 오전 10시부터 11시까지 식단 계획 수업이 있습니다. 맛있는 영양 팁을 배웁니다.' },
      { en: 'There will be a course on Happy Moves for a Healthy You from 5 to 6 p.m. on Tuesdays.', ko: '화요일 오후 5시부터 6시까지 "건강한 당신을 위한 행복한 움직임" 수업이 있습니다.' },
      { en: 'There will be a course on fitness from 10 to 11 a.m. on Sundays. Workout ideas for everyone will be discussed.', ko: '일요일 오전 10시부터 11시까지 피트니스 수업이 있습니다. 모두를 위한 운동 아이디어를 다룹니다.' },
      { en: 'Please note that the price is one hundred twenty dollars per course.', ko: '가격은 과정당 120달러입니다.' },
    ],
    intro: "I am interested in attending the spring courses at Mind Over Muscle Center, but there isn't much information. Can I ask a few questions?",
    introKo: '마인드 오버 머슬 센터의 봄 학기 수업에 참여하고 싶은데 정보가 많지 않네요. 몇 가지 질문해도 될까요?',
    questions: [
      {
        q: 'On what date do the spring courses begin? How much does each course cost?',
        qKo: '봄 학기는 언제 시작하나요? 각 과정의 가격은 얼마인가요?',
        answer: ['The spring courses will begin on March 2nd and the price is one hundred twenty dollars per course.'],
        answerKo: ['봄 학기는 3월 2일에 시작하고 가격은 과정당 120달러입니다.'],
      },
      {
        q: 'I heard that there is a meal planning session for nutrition tips on Fridays. Can you confirm that for me?',
        qKo: '금요일에 영양 팁에 관한 식단 계획 수업이 있다고 들었어요. 확인해 주시겠어요?',
        answer: ['No, actually not.', 'There will be a course on meal planning from 10 to 11 a.m. on Saturdays.', 'You will learn about tasty nutrition tips.'],
        answerKo: ['아니요, 그렇지 않습니다.', '토요일 오전 10시부터 11시까지 식단 계획 수업이 있습니다.', '맛있는 영양 팁을 배우게 됩니다.'],
      },
      {
        q: "I'm interested in fitness courses. Can you provide all the details you have about them?",
        qKo: '피트니스 수업에 관심이 있습니다. 자세히 알려 주실 수 있나요?',
        answer: [
          'Sure thing. There are two different fitness courses scheduled.',
          'The first one will take place from 2 to 3 p.m. on Fridays, and you will learn about fun exercise routines.',
          'The other one will be held from 10 to 11 a.m. on Sundays, and workout ideas for everyone will be discussed.',
        ],
        answerKo: ['물론입니다. 두 가지 피트니스 수업이 있습니다.', '첫 번째는 금요일 오후 2시부터 3시까지이며 재미있는 운동 루틴을 배웁니다.', '다른 하나는 일요일 오전 10시부터 11시까지이며 모두를 위한 운동 아이디어를 다룹니다.'],
      },
    ],
  },
  {
    id: 3,
    type: '행사 일정',
    title: 'Hansborough Recreation Center',
    header: ['Hansborough Recreation Center', 'May Events Schedule', 'Opening Hours: 6 a.m. to 10 p.m. daily'],
    columns: ['Date', 'Time', 'Event', 'Note'],
    rows: [
      ['May 4', '7:00 – 10:00 p.m.', 'Live Band Performances', 'Local bands'],
      ['May 9', '8:00 – 10:00 a.m.', 'Fitness Classes by the River', ''],
      ['May 12', '10:00 a.m. – 2:00 p.m.', 'Bird Watching Tour', 'Bird-watch glasses for rent'],
      ['May 18', '6:30 – 8:00 p.m.', 'Riverfront Picnicking', ''],
      ['May 23', '2:00 – 5:00 p.m.', 'Guided Nature Walks', '5 kilometers'],
      ['May 25', '10:00 a.m. – 7:00 p.m.', 'River Rafting Adventures', ''],
    ],
    readAloud: [
      { en: 'We are open from 6 a.m. to 10 p.m. every day.', ko: '매일 오전 6시부터 오후 10시까지 운영합니다.' },
      { en: 'From 7 to 10 p.m. on May 4th, there will be live band performances by local bands.', ko: '5월 4일 오후 7시부터 10시까지 지역 밴드의 라이브 공연이 있습니다.' },
      { en: 'From 8 to 10 a.m. on May 9th, there will be fitness classes by the river.', ko: '5월 9일 오전 8시부터 10시까지 강가에서 피트니스 수업이 있습니다.' },
      { en: 'From 10 a.m. to 2 p.m. on May 12th, you can attend a bird watching tour. Please note that bird-watch glasses will be available for rent.', ko: '5월 12일 오전 10시부터 오후 2시까지 새 관찰 투어에 참여할 수 있습니다. 쌍안경은 대여 가능합니다.' },
      { en: 'From 6:30 to 8 p.m. on May 18th, there will be riverfront picnicking.', ko: '5월 18일 오후 6시 30분부터 8시까지 강가 소풍이 있습니다.' },
      { en: 'From 2 to 5 p.m. on May 23rd, there will be guided nature walks. It will be 5 kilometers long.', ko: '5월 23일 오후 2시부터 5시까지 가이드와 함께하는 자연 걷기가 있습니다. 5킬로미터 코스입니다.' },
      { en: 'From 10 a.m. to 7 p.m. on May 25th, there will be river rafting adventures.', ko: '5월 25일 오전 10시부터 오후 7시까지 강 래프팅 체험이 있습니다.' },
    ],
    intro: "I want to participate in the events at Hansborough Recreation Center, but I don't have detailed information right now. Could you answer a few questions for me?",
    introKo: '한스보로 레크리에이션 센터의 행사에 참여하고 싶은데 지금 상세 정보가 없습니다. 몇 가지 질문에 답해 주시겠어요?',
    questions: [
      {
        q: 'I heard that there would be guided nature walks for the May events. What date is it on, and how many kilometers is it?',
        qKo: '5월 행사로 가이드와 함께하는 자연 걷기가 있다고 들었어요. 어느 날짜이고 몇 킬로미터인가요?',
        answer: ['From 2 to 5 p.m. on May 23rd, there will be guided nature walks. It will be 5 kilometers long.'],
        answerKo: ['5월 23일 오후 2시부터 5시까지 가이드와 함께하는 자연 걷기가 있습니다. 5킬로미터입니다.'],
      },
      {
        q: 'I am interested in the bird watching tour. Do I need to bring my own bird-watch glasses?',
        qKo: '새 관찰 투어에 관심이 있습니다. 쌍안경을 직접 가져가야 하나요?',
        answer: ["No, you don't need to.", 'Please note that bird-watch glasses will be available for rent.'],
        answerKo: ['아니요, 그러실 필요 없습니다.', '쌍안경은 대여 가능합니다.'],
      },
      {
        q: 'My coworkers would like to join the events; however, they are only available after 6 p.m. Can you provide me with information about the events being held after 6 p.m.?',
        qKo: '동료들도 참여하고 싶어 하는데 저녁 6시 이후에만 가능합니다. 6시 이후에 열리는 행사 정보를 주실 수 있나요?',
        answer: [
          'Sure thing. There are two events scheduled after 6 p.m.',
          'Firstly, from 7 to 10 p.m. on May 4th, there will be live band performances by local bands.',
          'Secondly, from 6:30 to 8 p.m. on May 18th, there will be riverfront picnicking.',
        ],
        answerKo: ['물론입니다. 저녁 6시 이후에 두 가지 행사가 있습니다.', '첫째, 5월 4일 오후 7시부터 10시까지 지역 밴드의 라이브 공연이 있습니다.', '둘째, 5월 18일 오후 6시 30분부터 8시까지 강가 소풍이 있습니다.'],
      },
    ],
  },
  {
    id: 4,
    type: '면접 일정',
    title: 'Nationwide Insurance Services',
    header: ['Nationwide Insurance Services', 'Schedule of Interviews', 'Friday, July 10', 'Location: Conference Room 3A'],
    columns: ['Time', 'Applicant', 'Applied Position', 'Current Employer'],
    rows: [
      ['9:30 – 10:00 a.m.', 'Carlos Hill', 'Claims Manager', 'Secure Insurance'],
      ['10:00 – 10:30 a.m.', 'Kimberly Patterson', 'Marketing Manager', 'Safeguard Insurance'],
      ['10:30 – 11:00 a.m.', 'Frances Moore', 'Risk Analyst', 'Heritage Insurance'],
      ['11:00 – 11:30 a.m.', 'Brian Phillips', 'Marketing Manager', 'Trust Assurance'],
      ['1:00 – 1:30 p.m.', 'David Cook', 'Risk Analyst', 'EverSafe Agency'],
      ['1:30 – 2:00 p.m.', 'Steven Miller', 'Marketing Manager', 'Liberty Group'],
    ],
    readAloud: [
      { en: 'The interviews will take place in Conference Room 3A on Friday, July 10th.', ko: '면접은 7월 10일 금요일 3A 회의실에서 진행됩니다.' },
      { en: 'From 9:30 to 10 a.m., there will be an interview with Carlos Hill for a claims manager position. Now, he is working for Secure Insurance.', ko: '오전 9시 30분부터 10시까지 보상 담당 매니저 자리에 지원한 카를로스 힐의 면접이 있습니다. 현재 시큐어 보험에서 근무 중입니다.' },
      { en: 'From 10 to 10:30 a.m., there will be an interview with Kimberly Patterson for a marketing manager position. Now, she is working for Safeguard Insurance.', ko: '오전 10시부터 10시 30분까지 마케팅 매니저 자리에 지원한 킴벌리 패터슨의 면접이 있습니다. 현재 세이프가드 보험에서 근무 중입니다.' },
      { en: 'From 10:30 to 11 a.m., there will be an interview with Frances Moore for a risk analyst position. Now, Frances is working for Heritage Insurance.', ko: '오전 10시 30분부터 11시까지 리스크 분석가 자리에 지원한 프랜시스 무어의 면접이 있습니다. 현재 헤리티지 보험에서 근무 중입니다.' },
      { en: 'From 11 to 11:30 a.m., there will be an interview with Brian Phillips for a marketing manager position. Now, he is working for Trust Assurance.', ko: '오전 11시부터 11시 30분까지 마케팅 매니저 자리에 지원한 브라이언 필립스의 면접이 있습니다. 현재 트러스트 어슈어런스에서 근무 중입니다.' },
      { en: 'From 1 to 1:30 p.m., there will be an interview with David Cook for a risk analyst position. Now, he is working for EverSafe Agency.', ko: '오후 1시부터 1시 30분까지 리스크 분석가 자리에 지원한 데이비드 쿡의 면접이 있습니다. 현재 에버세이프 에이전시에서 근무 중입니다.' },
      { en: 'From 1:30 to 2 p.m., there will be an interview with Steven Miller for a marketing manager position. Now, he is working for Liberty Group.', ko: '오후 1시 30분부터 2시까지 마케팅 매니저 자리에 지원한 스티븐 밀러의 면접이 있습니다. 현재 리버티 그룹에서 근무 중입니다.' },
    ],
    intro: "I am a member of the Nationwide Insurance committee, and I don't have the schedule of the interviews with me. So, I would like to obtain some details about it.",
    introKo: '네이션와이드 보험 위원회 구성원입니다. 면접 일정표가 없어서 세부 사항을 알고 싶습니다.',
    questions: [
      {
        q: 'What time does the first interview start, and for which position is the applicant applying?',
        qKo: '첫 번째 면접은 몇 시에 시작하고, 지원자는 어떤 직책에 지원했나요?',
        answer: ['The first interview will start at 9:30 a.m., and the applicant is applying for a claims manager position.'],
        answerKo: ['첫 번째 면접은 오전 9시 30분에 시작하며, 지원자는 보상 담당 매니저 자리에 지원했습니다.'],
      },
      {
        q: 'Last time I checked, we had three applicants applying for the marketing manager position. Can you confirm that for me?',
        qKo: '지난번에 확인했을 때 마케팅 매니저 자리에 지원자가 3명이었습니다. 확인해 주실 수 있나요?',
        answer: ["Yes, that's true.", 'Kimberly Patterson, Brian Phillips, and Steven Miller are applying for the marketing manager position.'],
        answerKo: ['네, 맞습니다.', '킴벌리 패터슨, 브라이언 필립스, 스티븐 밀러가 마케팅 매니저 자리에 지원했습니다.'],
      },
      {
        q: 'I know we have three applicants who are applying for the risk analyst position this time. Can you tell me who is looking for a job as a risk analyst in detail?',
        qKo: '이번에 리스크 분석가 자리에 지원자가 3명 있는 것으로 압니다. 누가 지원했는지 자세히 알려 주실 수 있나요?',
        answer: [
          'Well, actually, there are only two applicants applying for the risk analyst position.',
          'Firstly, from 10:30 to 11 a.m., there will be an interview with Frances Moore. Now, Frances is working for Heritage Insurance.',
          'Secondly, from 1 to 1:30 p.m., there will be an interview with David Cook. Now, he is working for EverSafe Agency.',
        ],
        answerKo: ['사실 리스크 분석가 자리에는 지원자가 2명뿐입니다.', '첫째, 오전 10시 30분부터 11시까지 프랜시스 무어의 면접이 있습니다. 현재 헤리티지 보험에서 근무 중입니다.', '둘째, 오후 1시부터 1시 30분까지 데이비드 쿡의 면접이 있습니다. 현재 에버세이프 에이전시에서 근무 중입니다.'],
      },
    ],
  },
  {
    id: 5,
    type: '투어 일정',
    title: 'Urban Wander LA Tours',
    header: ['Urban Wander LA Tours'],
    columns: ['Day', 'Time', 'Schedule'],
    rows: [
      ['Day 1 (March 8)', '9 – 11 a.m.', 'Visiting Venice Beach'],
      ['', 'Noon – 2 p.m.', 'Lunch: The Sidewalk Café'],
      ['', '2 – 5 p.m.', 'Walking along Hollywood'],
      ['Day 2 (March 9)', '10 a.m. – Noon', 'Guided tour: Universal Studios'],
      ['', 'Noon – 1:30 p.m.', 'Lunch: Blue Sky Deli'],
      ['', '1:30 – 5 p.m.', 'Free time'],
      ['Day 3 (March 10)', '9 a.m. – Noon', 'Guided tour: Getty Center'],
      ['', 'Noon – 2 p.m.', 'Lunch: Sushi Express'],
      ['', '2 – 6 p.m.', 'Shopping along Sunset Strip'],
    ],
    footer: ['* Only meals listed are included'],
    readAloud: [
      { en: 'You will go on Urban Wander LA Tours from March 8th to 10th.', ko: '3월 8일부터 10일까지 어반 원더 LA 투어를 가게 됩니다.' },
      { en: 'From 9 to 11 a.m. on the first day, you are going to visit Venice Beach.', ko: '첫째 날 오전 9시부터 11시까지 베니스 비치를 방문합니다.' },
      { en: 'From noon to 2 p.m. on March 8th, you will have lunch at The Sidewalk Café.', ko: '3월 8일 정오부터 오후 2시까지 사이드워크 카페에서 점심을 먹습니다.' },
      { en: 'From 2 to 5 p.m. on the first day, you will walk along Hollywood.', ko: '첫째 날 오후 2시부터 5시까지 할리우드를 따라 걷습니다.' },
      { en: 'On the second day, there are three things scheduled. From 10 a.m. to noon, you will go on a guided tour of Universal Studios.', ko: '둘째 날에는 세 가지 일정이 있습니다. 오전 10시부터 정오까지 유니버설 스튜디오 가이드 투어를 합니다.' },
      { en: 'From noon to 1:30 p.m., you will have lunch at Blue Sky Deli.', ko: '정오부터 오후 1시 30분까지 블루 스카이 델리에서 점심을 먹습니다.' },
      { en: 'From 1:30 to 5 p.m., you will have free time.', ko: '오후 1시 30분부터 5시까지 자유 시간입니다.' },
      { en: 'From 9 a.m. to noon on March 10th, you will go on a guided tour of the Getty Center.', ko: '3월 10일 오전 9시부터 정오까지 게티 센터 가이드 투어를 합니다.' },
      { en: 'From noon to 2 p.m., you will have lunch at Sushi Express.', ko: '정오부터 오후 2시까지 스시 익스프레스에서 점심을 먹습니다.' },
      { en: 'From 2 to 6 p.m. on the third day, you will go shopping along Sunset Strip.', ko: '셋째 날 오후 2시부터 6시까지 선셋 스트립에서 쇼핑합니다.' },
      { en: 'Please note that only the meals listed are included.', ko: '목록에 있는 식사만 포함됩니다.' },
    ],
    intro: "I'm planning to go on the Urban Wander LA Tours. Since I don't have the detailed itinerary, I have a few questions. Could you please provide some answers?",
    introKo: '어반 원더 LA 투어를 가려고 합니다. 세부 일정이 없어서 몇 가지 질문이 있습니다. 답해 주시겠어요?',
    questions: [
      {
        q: 'On what date in March does the trip to LA begin? What date does it end?',
        qKo: '3월 며칠에 LA 여행이 시작되나요? 언제 끝나나요?',
        answer: ['The trip to LA will begin on March 8th and it will end on March 10th.'],
        answerKo: ['LA 여행은 3월 8일에 시작해서 3월 10일에 끝납니다.'],
      },
      {
        q: "I'm looking forward to walking along Hollywood. Is it scheduled for March 9th, on day two?",
        qKo: '할리우드를 걷는 일정을 기대하고 있어요. 둘째 날인 3월 9일에 예정되어 있죠?',
        answer: ['No, I think you received the wrong information.', 'From 2 to 5 p.m. on March 8th, you will walk along Hollywood.'],
        answerKo: ['아니요, 잘못된 정보를 받으신 것 같습니다.', '3월 8일 오후 2시부터 5시까지 할리우드를 따라 걷게 됩니다.'],
      },
      {
        q: "I'm particularly interested in guided tours. Can you tell me all the details that you have about guided tours?",
        qKo: '가이드 투어에 특히 관심이 있습니다. 가이드 투어에 대해 자세히 알려 주시겠어요?',
        answer: [
          'Sure thing. There are two guided tours scheduled.',
          'Firstly, from 10 a.m. to noon on the second day, you will go on a guided tour of Universal Studios.',
          'Secondly, from 9 a.m. to noon on March 10th, you will go on a guided tour of the Getty Center.',
        ],
        answerKo: ['물론입니다. 두 개의 가이드 투어가 있습니다.', '첫째, 둘째 날 오전 10시부터 정오까지 유니버설 스튜디오 가이드 투어를 합니다.', '둘째, 3월 10일 오전 9시부터 정오까지 게티 센터 가이드 투어를 합니다.'],
      },
    ],
  },
  {
    id: 6,
    type: '개인 일정',
    title: 'Terry Walker – Schedule',
    header: ['Terry Walker, Project Manager', 'Ace Architecture Group', 'Schedule for Friday, March 10'],
    columns: ['Time', 'Schedule'],
    rows: [
      ['9:00 – 10:00 a.m.', 'Meeting: Project Updates'],
      ['10:00 – 11:00 a.m.', 'Presentation: Design Progress and Budget'],
      ['11:00 a.m. – Noon', 'Lunch meeting: Team Building and Strategy'],
      ['1:00 – 2:00 p.m.', 'Presentation: Planning for Upcoming Projects'],
      ['2:00 – 3:00 p.m.', 'Meeting: New Client, Sunrise Construction Company'],
      ['3:00 – 4:00 p.m.', 'Meeting: Site Managers — moved to March 12, 5 p.m.'],
      ['4:00 – 5:00 p.m.', 'Team Collaboration Session'],
      ['5:00 – 6:00 p.m.', 'Managerial Review and Planning'],
    ],
    readAloud: [
      { en: 'From 9 to 10 a.m., you are going to attend a meeting for project updates.', ko: '오전 9시부터 10시까지 프로젝트 업데이트 회의에 참석합니다.' },
      { en: 'From 10 to 11 a.m., you will give a presentation on design progress and budget.', ko: '오전 10시부터 11시까지 디자인 진행 상황과 예산에 관해 발표합니다.' },
      { en: 'From 11 a.m. to noon, you will have a lunch meeting to discuss team building and strategy.', ko: '오전 11시부터 정오까지 팀 빌딩과 전략을 논의하는 점심 회의가 있습니다.' },
      { en: 'From 1 to 2 p.m., you are scheduled to deliver a presentation on planning for upcoming projects.', ko: '오후 1시부터 2시까지 향후 프로젝트 계획에 관한 발표가 예정되어 있습니다.' },
      { en: 'From 2 to 3 p.m., you will have a meeting with a new client from Sunrise Construction Company.', ko: '오후 2시부터 3시까지 선라이즈 건설의 신규 고객과 미팅이 있습니다.' },
      { en: 'From 3 to 4 p.m., you were scheduled to meet the site managers, but this meeting has been moved to 5 p.m. on March 12th.', ko: '오후 3시부터 4시까지 현장 관리자 미팅이 예정되어 있었으나 3월 12일 오후 5시로 변경되었습니다.' },
      { en: 'From 4 to 5 p.m., you will participate in a team collaboration session.', ko: '오후 4시부터 5시까지 팀 협업 세션에 참여합니다.' },
      { en: 'From 5 to 6 p.m., you will do the managerial review and planning.', ko: '오후 5시부터 6시까지 관리 검토 및 계획 업무를 합니다.' },
    ],
    intro: "I am currently outside for work, and I don't have my schedule with me. I have a few questions about my schedule for today.",
    introKo: '지금 외근 중이라 일정표가 없어요. 오늘 일정에 대해 몇 가지 물어볼게요.',
    questions: [
      {
        q: 'I have a meeting with a new client. What time is my meeting with the new client, and whom am I meeting with?',
        qKo: '신규 고객과 미팅이 있어요. 몇 시이고 누구를 만나나요?',
        answer: ['From 2 to 3 p.m., you will have a meeting with a new client from Sunrise Construction Company.'],
        answerKo: ['오후 2시부터 3시까지 선라이즈 건설의 신규 고객과 미팅이 있습니다.'],
      },
      {
        q: 'What time is my meeting with the site managers on that day?',
        qKo: '그날 현장 관리자들과의 미팅은 몇 시인가요?',
        answer: ['Well, it was scheduled, but the meeting has been moved to 5 p.m. on March 12th.'],
        answerKo: ['예정되어 있었지만, 그 미팅은 3월 12일 오후 5시로 변경되었습니다.'],
      },
      {
        q: 'I have several presentations scheduled for that day. Could you provide me with all the information about these presentations?',
        qKo: '그날 발표가 여러 개 있습니다. 발표에 관한 정보를 모두 알려 주시겠어요?',
        answer: [
          'Sure thing. There are two presentations scheduled.',
          'Firstly, from 10 to 11 a.m., you will give a presentation on design progress and budget.',
          'Secondly, from 1 to 2 p.m., you are scheduled to deliver a presentation on planning for upcoming projects.',
        ],
        answerKo: ['물론입니다. 두 개의 발표가 예정되어 있습니다.', '첫째, 오전 10시부터 11시까지 디자인 진행 상황과 예산에 관해 발표합니다.', '둘째, 오후 1시부터 2시까지 향후 프로젝트 계획에 관해 발표합니다.'],
      },
    ],
  },
  {
    id: 7,
    type: '직원 회의',
    title: "Aldi's Supermarket Staff Meeting",
    header: ["Aldi's Supermarket Staff Meeting", 'September 10th'],
    columns: ['Time', 'Session', 'Presenter'],
    rows: [
      ['2:00 – 2:15 p.m.', 'Review of Previous Meeting', 'Justin Brooks, Human Resources'],
      ['2:15 – 2:30 p.m.', 'Product and Stock Updates\n- Ice cream: chocolate flavor\n- Cheesecake: available this week', 'Mildred Baker, Marketing'],
      ['2:30 – 3:00 p.m.', 'Store Operations', 'Sandra Thompson, Maintenance'],
      ['3:00 – 3:45 p.m.', 'Equipment Updates\n- Self-checkout kiosks: replacement ordered\n- Security camera: upgrading camera', 'Maria Foster, Operations'],
    ],
    readAloud: [
      { en: 'The meeting will take place on September 10th.', ko: '회의는 9월 10일에 열립니다.' },
      { en: 'From 2 to 2:15 p.m., there will be a review session of the previous meeting by Justin Brooks in the human resources department.', ko: '오후 2시부터 2시 15분까지 인사부 저스틴 브룩스가 지난 회의를 검토합니다.' },
      { en: 'From 2:15 to 2:30 p.m., there will be a session on product and stock updates by Mildred Baker in the marketing team.', ko: '오후 2시 15분부터 2시 30분까지 마케팅팀 밀드레드 베이커가 제품·재고 업데이트를 발표합니다.' },
      { en: 'The first topic is ice cream. Chocolate flavor has been updated. The second topic is cheesecake. Please note that this product will be available as of this week.', ko: '첫 번째 주제는 아이스크림입니다. 초콜릿 맛이 추가되었습니다. 두 번째 주제는 치즈케이크로 이번 주부터 판매됩니다.' },
      { en: 'From 2:30 to 3 p.m., there will be a session on store operations by Sandra Thompson in the maintenance department.', ko: '오후 2시 30분부터 3시까지 관리부 샌드라 톰슨이 매장 운영에 대해 발표합니다.' },
      { en: 'From 3 to 3:45 p.m., there will be a session on equipment updates by Maria Foster in the operations team.', ko: '오후 3시부터 3시 45분까지 운영팀 마리아 포스터가 장비 업데이트를 발표합니다.' },
      { en: 'The first topic is self-checkout kiosks. Please note that a replacement has been ordered. The second topic is the security camera. Please note that the camera is being upgraded.', ko: '첫 번째 주제는 셀프 계산대 키오스크로 교체품이 주문되었습니다. 두 번째 주제는 보안 카메라로 업그레이드 중입니다.' },
    ],
    intro: "Hello, I am a member of the Aldi's Supermarket committee, and I am scheduled to attend this week's staff meeting. I hope you can provide me with the information I need for the meeting.",
    introKo: '안녕하세요, 알디스 슈퍼마켓 위원회 구성원입니다. 이번 주 직원 회의에 참석할 예정이에요. 회의 관련 정보를 알려 주셨으면 합니다.',
    questions: [
      {
        q: 'What date will the staff meeting be held, and what time will it start?',
        qKo: '직원 회의는 어느 날짜에 열리고 몇 시에 시작하나요?',
        answer: ['The meeting will take place on September 10th and it will begin at 2 p.m.'],
        answerKo: ['회의는 9월 10일에 열리며 오후 2시에 시작합니다.'],
      },
      {
        q: 'I have to leave for another meeting at 4 p.m. Will I miss any presentations?',
        qKo: '오후 4시에 다른 회의 때문에 나가야 합니다. 놓치는 발표가 있을까요?',
        answer: ['No worries.', "The staff meeting will finish at 3:45 p.m. You won't miss anything."],
        answerKo: ['걱정하지 마세요.', '직원 회의는 오후 3시 45분에 끝납니다. 놓치는 것은 없을 거예요.'],
      },
      {
        q: 'I understand that we will be discussing new products. Could you please provide me with all the available details about any new product updates?',
        qKo: '신제품에 대해 논의한다고 알고 있습니다. 신제품 소식에 대해 자세히 알려 주실 수 있나요?',
        answer: [
          'Sure thing. From 2:15 to 2:30 p.m., there will be a session on product and stock updates by Mildred Baker in the marketing team.',
          'The first topic is ice cream. Chocolate flavor has been updated.',
          'The second topic is cheesecake. Please note that this product will be available as of this week.',
        ],
        answerKo: ['물론입니다. 오후 2시 15분부터 2시 30분까지 마케팅팀 밀드레드 베이커의 제품·재고 업데이트 세션이 있습니다.', '첫 번째 주제는 아이스크림으로 초콜릿 맛이 추가되었습니다.', '두 번째 주제는 치즈케이크로 이번 주부터 판매됩니다.'],
      },
    ],
  },
]

export const monthsAndDates = {
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  dates: ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth', 'twentieth', 'twenty-first', 'twenty-second', 'twenty-third', 'twenty-fourth', 'twenty-fifth', 'twenty-sixth', 'twenty-seventh', 'twenty-eighth', 'twenty-ninth', 'thirtieth', 'thirty-first'],
}

/* ---------------- Part 5 ---------------- */
export const part5FirstSentence = [
  { type: '찬반 (Do you agree or disagree ~?)', start: 'I agree / disagree that 주어 + 동사. / I agree / disagree with 명사.' },
  { type: '장단점 (What are the advantages / disadvantages of ~?)', start: 'There are some advantages / disadvantages of ~.' },
  { type: '선호 (Which do you prefer the most ~?)', start: 'I prefer ___ the most.' },
  { type: '의견 (Do you think people should ~?)', start: 'Yes, I think that is a good idea. / No, I don’t think that is a good idea.' },
]

export const part5Structure = [
  { step: '1. 입장', desc: '첫 문장에서 질문 유형에 맞춰 입장을 분명히', example: 'I agree that schools should require computer classes.' },
  { step: '2. 이유', desc: '만능 답변의 일반론 문장으로 이유 제시', example: 'Technology has made a world of difference in our lives.' },
  { step: '3. 예시', desc: '"In my case / For example" + 개인 경험 (만능 답변 스토리)', example: 'In my case, I started learning how to play the guitar last year...' },
  { step: '4. 마무리', desc: '입장을 다시 한 번 정리', example: 'That is why I agree that ~.' },
]
