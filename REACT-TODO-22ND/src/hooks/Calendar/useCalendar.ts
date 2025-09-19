import { useState } from 'react';
import { formatMonthFromDate, createDateKey } from '@/utils/dateUtils';
import { useTodoModalContext } from '@/contexts/TodoModalContext';

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

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
    const month = currentDate.getMonth(); // 0부터 시작
    const dateKey = createDateKey(year, month, day); // 내부에서 +1 처리됨
    openModal(dateKey);
  };

  // 현재 월 제목 가져오기
  const getMonthTitle = () => {
    return formatMonthFromDate(currentDate.getFullYear(), currentDate.getMonth());
  };

  return {
    currentDate,
    goToPrevMonth,
    goToNextMonth,
    handleDateClick,
    getMonthTitle
  };
};