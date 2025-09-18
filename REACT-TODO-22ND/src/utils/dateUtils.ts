import type { DateKey } from '@/types/todoTypes';

// 날짜를 DateKey 형태로 변환 (년-월-일)
export const createDateKey = (year: number, month: number, day: number): DateKey => {
  return `${year}-${month + 1}-${day}`;
};

// DateKey를 Date 객체로 변환
export const parseDateKey = (dateKey: DateKey): Date => {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(year, month - 1, day); // month는 0부터 시작하므로 -1
};

// 오늘 날짜인지 확인
export const isToday = (year: number, month: number, day: number): boolean => {
  const today = new Date();
  return (
    year === today.getFullYear() &&
    month === today.getMonth() &&
    day === today.getDate()
  );
};

// 해당 월의 첫 날 요일과 총 일수 반환
export const getMonthInfo = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1).getDay(); // 첫날이 무슨 요일인지
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // 해당 월의 총 일수
  
  return { firstDay, daysInMonth };
};

// 날짜를 한국어 형태로 포맷팅 ("2025년 9월" 또는 "2025년 9월 18일")
export const formatDateKorean = (year: number, month: number, day?: number): string => {
  const monthText = `${year}년 ${month + 1}월`;
  return day ? `${monthText} ${day}일` : monthText;
};