import { useState } from 'react'
import styled from 'styled-components'

const Form = styled.form`
  margin: 0;
  display: flex;
  gap: 8px;
`

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  border: none;
  background: #e9e9e9;
  font-size: 14px;
  &:focus {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }
`

const Button = styled.button`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 4px 8px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.98);
  }
  &:active {
    transform: translateY(1px);
  }
  &:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }
`

type Props = { addTodo: (text: string) => void }

function TodoInput({ addTodo }: Props) {
  const [text, setText] = useState('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    addTodo(text.trim())
    setText('')
  }

  return (
    <Form className='input-section' onSubmit={onSubmit}>
      <Input
        placeholder='오늘의 할 일을 적어보세요'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button type='submit'>추가</Button>
    </Form>
  )
}

export default TodoInput
