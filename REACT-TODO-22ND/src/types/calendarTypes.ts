export interface CalendarDate {
  day: number; // 일
  year: number; // 년
  month: number; // 월 -> 0부터 시작 (0이 1월임)
  isOtherMonth: boolean; // 현재 달이 아닌지 여부 -> true 일시 회색, 클릭 불가
  isToday: boolean; // 오늘 날짜인지 여부 -> true 일시 초록색
  hasTodos: boolean; // 할 일이 있는지 여부 -> true 일시 점 표시 or 노란색
}

export interface CalendarState {
  currentDate: Date; // 현재 달의 첫째 날이 포함된 Date 객체
}