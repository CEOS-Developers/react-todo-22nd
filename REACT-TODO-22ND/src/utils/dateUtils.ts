import type { DateKey } from '@/types/todoTypes';

// 기본 포맷팅 함수 2개
// 1. month + 1 처리 (Date 객체의 0부터 시작하는 month용)
const formatWithMonthPlus1 = (year: number, month: number, day?: number): string => {
  const realMonth = month + 1;
  const monthText = `${year}년 ${realMonth}월`;
  return day ? `${monthText} ${day}일` : monthText;
};

// 2. month 그대로 사용 (이미 1부터 시작하는 실제 month용)
const formatWithRealMonth = (year: number, month: number, day?: number): string => {
  const monthText = `${year}년 ${month}월`;
  return day ? `${monthText} ${day}일` : monthText;
};

// 날짜를 DateKey 형태로 변환 (년-월-일)
export const createDateKey = (year: number, month: number, day: number): DateKey => {
  return `${year}-${month + 1}-${day}`;
};

// DateKey를 Date 객체로 변환
export const parseDateKey = (dateKey: DateKey): Date => {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(year, month - 1, day);
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
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return { firstDay, daysInMonth };
};

// Date 객체에서 월 포맷팅 (달력 헤더용)
export const formatMonthFromDate = (year: number, month: number): string => {
  return formatWithMonthPlus1(year, month);
};

// DateKey를 한국어로 변환 (모달 제목용)
export const formatDateKeyToKorean = (dateKey: DateKey): string => {
  const [year, month, day] = dateKey.split('-').map(Number);
  return formatWithRealMonth(year, month, day);
};