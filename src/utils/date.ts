export const WEEK_LABELS = ['일', '월', '화', '수', '목', '금', '토'] as const

export const pad = (n: number) => String(n).padStart(2, '0')
export const toYYYYMMDD = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

export const formatKoreanLabel = (yyyyMmDd: string) => {
  const d = new Date(yyyyMmDd + 'T00:00:00')
  return `${d.getMonth() + 1}월 ${d.getDate()}일 (${WEEK_LABELS[d.getDay()]})`
}
