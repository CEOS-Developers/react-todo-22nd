import React, { useState } from "react";
import styled from "styled-components";

export default function TodoInput({
  onAdd,
}: {
  onAdd: (text: string) => void;
}) {
  const [text, setText] = useState("");

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
      <SubmitButton onClick={submit}>등록</SubmitButton>
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
