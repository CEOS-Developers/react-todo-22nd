import { useState } from 'react';
import type { TodosState } from '@/types/todoTypes';
import useLocalStorage from '@/hooks/useLocalStorage';
import { formatDateKorean, createDateKey } from '@/utils/dateUtils';
import { useTodoModalContext } from '@/contexts/TodoModalContext';

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todos] = useLocalStorage<TodosState>('todos', {});

  // Context에서 모달 열기 함수 가져오기
  const { openModal } = useTodoModalContext();

  // 이전 달로 이동
  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // 다음 달로 이동
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // 날짜 클릭 핸들러
  const handleDateClick = (day: number) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dateKey = createDateKey(year, month, day);
    openModal(dateKey);
  };

  // 현재 월 제목 가져오기
  const getMonthTitle = () => {
    return formatDateKorean(currentDate.getFullYear(), currentDate.getMonth());
  };

  return {
    currentDate,
    todos,
    goToPrevMonth,
    goToNextMonth,
    handleDateClick,
    getMonthTitle
  };
};