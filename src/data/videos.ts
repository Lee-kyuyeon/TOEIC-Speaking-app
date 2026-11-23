// 교재 QR 코드에서 해독한 강의 영상 링크 (네이버 단축 URL)
export interface VideoLink {
  title: string
  url: string
  page: number
}

export const VIDEOS = {
  channel: { title: '마리아쌤 유튜브 채널', url: 'https://m.site.naver.com/1lNLs', page: 2 },
  examCenter: { title: '실전 고사장 모습', url: 'https://m.site.naver.com/1lNMw', page: 3 },
  pronunciation: { title: '왕기초 발음 훈련 강의', url: 'https://m.site.naver.com/1lNNN', page: 9 },
  part1Guide: { title: 'Part 1 주제별 연습 가이드 영상', url: 'https://m.site.naver.com/1lT1b', page: 11 },
  part2Basic: { title: '그림 묘사 기초 설명 영상', url: 'https://m.site.naver.com/1lRYc', page: 22 },
  part3Grammar: { title: '기초 문법 설명 영상', url: 'https://m.site.naver.com/1lUEz', page: 49 },
  part4Theory: { title: 'Part 4 기초 이론 설명', url: 'https://m.site.naver.com/1m0ie', page: 64 },
  part5: { title: 'Part 5 강의 영상', url: 'https://m.site.naver.com/1m2Hf', page: 83 },
} satisfies Record<string, VideoLink>
