import styled from 'styled-components';

export const CalendarContainer = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  padding: 20px;
  max-width: 600px;
  width: 100%;
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const NavigationButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: 10px 15px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const MonthTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Weekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-bottom: 10px;
`;

export const WeekdayItem = styled.div`
  background: ${({ theme }) => theme.colors.lightGray};
  padding: 10px;
  text-align: center;
  font-weight: bold;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const DatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
`;

interface DateItemProps {
  $isOtherMonth: boolean;
  $isToday: boolean;
  $hasTodos: boolean;
}

export const DateItem = styled.div<DateItemProps>`
  background: ${({ theme, $isOtherMonth, $isToday, $hasTodos }) => {
    if ($isToday) return theme.colors.primary;
    if ($hasTodos) return theme.colors.yellow;
    if ($isOtherMonth) return theme.colors.lightGray;
    return theme.colors.white;
  }};
  
  border: 1px solid ${({ theme }) => theme.colors.gray};
  padding: 15px 5px;
  text-align: center;
  cursor: ${({ $isOtherMonth }) => $isOtherMonth ? 'default' : 'pointer'};
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  
  color: ${({ theme, $isOtherMonth, $isToday }) => {
    if ($isToday) return theme.colors.white;
    if ($isOtherMonth) return theme.colors.text.disabled;
    return theme.colors.text.primary;
  }};

  font-weight: ${({ $isToday }) => $isToday ? 'bold' : 'normal'};

  &:hover {
    background: ${({ theme, $isOtherMonth, $isToday, $hasTodos }) => {
      if ($isOtherMonth || $isToday) return; // 호버 효과 없음
      if ($hasTodos) return theme.colors.yellowDark;
      return theme.colors.lightBlue;
    }};
  }
`;