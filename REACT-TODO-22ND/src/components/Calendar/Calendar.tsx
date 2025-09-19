import { 
  CalendarContainer, 
  CalendarHeader, 
  NavigationButton, 
  MonthTitle, 
  Weekdays, 
  WeekdayItem, 
  DatesGrid
} from '@/components/Calendar/Calendar.Styled';
import { useCalendar } from '@/hooks/Calendar/useCalendar';
import { renderCalendarDates } from '@/utils/Calendar/calendarRender';
import { useTodoModalContext } from '@/contexts/TodoModalContext';

const Calendar = () => {
  const {
    currentDate,
    goToPrevMonth,
    goToNextMonth,
    handleDateClick,
    getMonthTitle
  } = useCalendar();

  // Context에서 todos 가져오기
  const { getTodos } = useTodoModalContext();
  
  // 요일 배열
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <CalendarContainer>
      <CalendarHeader>
        <NavigationButton onClick={goToPrevMonth}>
          ◀️
        </NavigationButton>
        <MonthTitle>
          {getMonthTitle()}
        </MonthTitle>
        <NavigationButton onClick={goToNextMonth}>
          ▶️
        </NavigationButton>
      </CalendarHeader>

      <Weekdays>
        {weekdays.map((day) => (
          <WeekdayItem key={day}>{day}</WeekdayItem>
        ))}
      </Weekdays>

      <DatesGrid>
        {renderCalendarDates(currentDate, getTodos(), handleDateClick)}
      </DatesGrid>
    </CalendarContainer>
  );
};

export default Calendar;