import { useState } from 'react';
import type { TodosState } from '@/types/todoTypes';
import useLocalStorage from '@/hooks/useLocalStorage';
import { formatDateKorean } from '@/utils/dateUtils';

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todos] = useLocalStorage<TodosState>('todos', {});

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
    console.log(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day} 클릭됨`);
    // TODO: 모달 열기 기능 구현 예정
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