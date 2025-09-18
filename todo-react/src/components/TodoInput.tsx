import React, { useState } from "react";

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
    <>
      <input
        placeholder="오늘의 할 일을 적어주세요!"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
      />
      <button onClick={submit}>등록</button>
    </>
  );
}
