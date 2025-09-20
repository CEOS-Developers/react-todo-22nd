import { forwardRef } from 'react'
import styled from 'styled-components'
import TodoItem from './TodoItem'
import type { Todo } from '../types'

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0;
  margin: 0;
`

type Props = {
  todos: Todo[]
  onToggle: (id: string) => void
  onRemove: (id: string) => void
}

const TodoList = forwardRef<HTMLUListElement, Props>(({ todos, onToggle, onRemove }, ref) => {
  return (
    <Ul ref={ref} id='todoList'>
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={() => onToggle(t.id)}
          onRemove={() => onRemove(t.id)}
        />
      ))}
    </Ul>
  )
})

export default TodoList
