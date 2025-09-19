import { useState } from 'react';
import { 
  CalendarContainer, 
  CalendarHeader, 
  NavigationButton, 
  MonthTitle, 
  Weekdays, 
  WeekdayItem, 
  DatesGrid, 
  DateItem 
} from '@/components/Calendar/Calendar.Styled';
import { formatDateKorean, getMonthInfo, isToday, createDateKey } from '@/utils/dateUtils';
import type { TodosState } from '@/types/todoTypes';
import useLocalStorage from '@/hooks/useLocalStorage';

const Calendar = () => {
  // 현재 표시할 년월을 저장하는 상태
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // localStorage에서 todos 불러오기
  const [todos] = useLocalStorage<TodosState>('todos', {});

  // 이전 달로 이동
  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // 다음 달로 이동
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // 날짜 클릭 핸들러 (나중에 모달 연결)
  const handleDateClick = (day: number) => {
    console.log(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day} 클릭됨`);
    // TODO: 모달 열기 기능 구현 예정
  };

  // 달력 렌더링 함수
  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const { firstDay, daysInMonth } = getMonthInfo(year, month);

    const dates = [];

    // 이전 달의 마지막 날짜들
    const prevMonth = new Date(year, month - 1, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevMonth - i;
      const dateKey = createDateKey(year, month - 1, day);
      const hasTodos = todos[dateKey] && todos[dateKey].length > 0;
      
      dates.push(
        <DateItem
          key={`prev-${day}`}
          $isOtherMonth={true}
          $isToday={false}
          $hasTodos={hasTodos}
          onClick={() => {}} // 다른 달 날짜는 클릭 불가
        >
          {day}
        </DateItem>
      );
    }

    // 현재 달의 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = createDateKey(year, month, day);
      const hasTodos = todos[dateKey] && todos[dateKey].length > 0;
      const todayCheck = isToday(year, month, day);

      dates.push(
        <DateItem
          key={`current-${day}`}
          $isOtherMonth={false}
          $isToday={todayCheck}
          $hasTodos={hasTodos}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </DateItem>
      );
    }

    // 다음 달의 첫 날짜들로 나머지 칸 채우기
    const remainingCells = 42 - (firstDay + daysInMonth);
    for (let day = 1; day <= remainingCells; day++) {
      const dateKey = createDateKey(year, month + 1, day);
      const hasTodos = todos[dateKey] && todos[dateKey].length > 0;

      dates.push(
        <DateItem
          key={`next-${day}`}
          $isOtherMonth={true}
          $isToday={false}
          $hasTodos={hasTodos}
          onClick={() => {}} // 다른 달 날짜는 클릭 불가
        >
          {day}
        </DateItem>
      );
    }

    return dates;
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <NavigationButton onClick={goToPrevMonth}>
          ◀️
        </NavigationButton>
        <MonthTitle>
          {formatDateKorean(currentDate.getFullYear(), currentDate.getMonth())}
        </MonthTitle>
        <NavigationButton onClick={goToNextMonth}>
          ▶️
        </NavigationButton>
      </CalendarHeader>

      <Weekdays>
        <WeekdayItem>일</WeekdayItem>
        <WeekdayItem>월</WeekdayItem>
        <WeekdayItem>화</WeekdayItem>
        <WeekdayItem>수</WeekdayItem>
        <WeekdayItem>목</WeekdayItem>
        <WeekdayItem>금</WeekdayItem>
        <WeekdayItem>토</WeekdayItem>
      </Weekdays>

      <DatesGrid>
        {renderCalendar()}
      </DatesGrid>
    </CalendarContainer>
  );
};

export default Calendar;