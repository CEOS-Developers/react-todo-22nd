import type { ReactElement } from 'react';
import { DateItem } from '@/components/Calendar/Calendar.Styled';
import { getMonthInfo, isToday, createDateKey } from '@/utils/dateUtils';
import type { TodosState } from '@/types/todoTypes';

// 개별 날짜 아이템 생성 함수
export const createDateItem = (
  day: number, 
  year: number, 
  month: number, 
  isOtherMonth: boolean,
  keyPrefix: string,
  todos: TodosState,
  onDateClick: (day: number) => void
): ReactElement => {
  const dateKey = createDateKey(year, month, day);
  const hasTodos = todos[dateKey] && todos[dateKey].length > 0;
  const todayCheck = !isOtherMonth && isToday(year, month, day);

  return (
    <DateItem
      key={`${keyPrefix}-${day}`}
      $isOtherMonth={isOtherMonth}
      $isToday={todayCheck}
      $hasTodos={hasTodos}
      onClick={isOtherMonth ? () => {} : () => onDateClick(day)}
    >
      {day}
    </DateItem>
  );
};

// 이전 달 날짜들 생성
export const renderPrevMonthDates = (
  year: number, 
  month: number, 
  firstDay: number,
  todos: TodosState,
  onDateClick: (day: number) => void
): ReactElement[] => {
  const dates = [];
  const prevMonth = new Date(year, month - 1, 0).getDate();
  
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = prevMonth - i;
    dates.push(createDateItem(day, year, month - 1, true, 'prev', todos, onDateClick));
  }
  
  return dates;
};

// 현재 달 날짜들 생성
export const renderCurrentMonthDates = (
  year: number, 
  month: number, 
  daysInMonth: number,
  todos: TodosState,
  onDateClick: (day: number) => void
): ReactElement[] => {
  const dates = [];
  
  for (let day = 1; day <= daysInMonth; day++) {
    dates.push(createDateItem(day, year, month, false, 'current', todos, onDateClick));
  }
  
  return dates;
};

// 다음 달 날짜들 생성
export const renderNextMonthDates = (
  year: number, 
  month: number, 
  firstDay: number, 
  daysInMonth: number,
  todos: TodosState,
  onDateClick: (day: number) => void
): ReactElement[] => {
  const dates = [];
  const remainingCells = 42 - (firstDay + daysInMonth);
  
  for (let day = 1; day <= remainingCells; day++) {
    dates.push(createDateItem(day, year, month + 1, true, 'next', todos, onDateClick));
  }
  
  return dates;
};

// 전체 달력 렌더링
export const renderCalendarDates = (
  currentDate: Date,
  todos: TodosState,
  onDateClick: (day: number) => void
): ReactElement[] => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const { firstDay, daysInMonth } = getMonthInfo(year, month);

  return [
    ...renderPrevMonthDates(year, month, firstDay, todos, onDateClick),
    ...renderCurrentMonthDates(year, month, daysInMonth, todos, onDateClick),
    ...renderNextMonthDates(year, month, firstDay, daysInMonth, todos, onDateClick)
  ];
};