import { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  onAdd: (text: string) => void;
  date: Date;
  setDate: (d: Date) => void;
  todoCount: number;
  doneCount: number;
};

export default function TodoInput({
  onAdd,
  date,
  setDate,
  todoCount,
  doneCount,
}: Props) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const submit = () => {
    const x = text.trim();
    if (!x) return;
    onAdd(x);
    setText("");
  };

  return (
    <Container>
      <Input
        placeholder="오늘의 할 일을 적어주세요!"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
      />
      <Right>
        <IconButton type="button" onClick={() => setOpen((o) => !o)}>
          📆
        </IconButton>

        <Badges>
          <Badge>{todoCount} 개</Badge>
          <Badge $ok>✅ {doneCount} 개</Badge>
        </Badges>

        <SubmitButton onClick={submit}>등록</SubmitButton>

        {open && (
          <Popup>
            <DatePicker
              selected={date}
              onChange={(d) => {
                if (d) setDate(d);
                setOpen(false);
              }}
              inline
            />
          </Popup>
        )}
      </Right>
    </Container>
  );
}

const Container = styled.div`
  max-width: 440px;
  margin: 20px auto 10px;
  background: #fff;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 28px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  padding: 12px 14px;
  font-size: 16px;
  border-radius: 18px;
`;

const SubmitButton = styled.button`
  border: none;
  padding: 10px 16px;
  border-radius: 18px;
  background: #0040ff;
  color: white;
  font-weight: 800;
  cursor: pointer;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
`;

const IconButton = styled.button`
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
`;

const Badges = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const Badge = styled.span<{ $ok?: boolean }>`
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 13px;
  background: ${({ $ok }) => ($ok ? "#10b98122" : "#ffd54f55")};
  color: ${({ $ok }) => ($ok ? "#0f766e" : "#1f2937")};
`;
const Popup = styled.div`
  position: absolute;
  top: 110%;
  right: 0;
  z-index: 1000;
`;
