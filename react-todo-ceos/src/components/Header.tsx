import styled from 'styled-components';

interface TodoHeaderProps {
  currentDate: string;
  onPrev: () => void;
  onNext: () => void;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  font-size: 16px;
  padding: 15px;
`;

const Button = styled.button`
  background-color: gray;
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #b6b6b6;
    color: gray;
  }
`;

const Header: React.FC<TodoHeaderProps> = ({ currentDate, onPrev, onNext }) => {
  return (
    <>
      <h2>투두리스트</h2>
      <Container>
        <Button onClick={onPrev}>이전</Button>
        {currentDate}
        <Button onClick={onNext}>다음</Button>
      </Container>
    </>
  );
};

export default Header;
