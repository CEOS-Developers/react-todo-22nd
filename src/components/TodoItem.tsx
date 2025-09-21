import styled from 'styled-components'
import type { Todo } from '../types'

const Li = styled.li<{ done: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #c8f74b; /* 바닐라 .todo-item 배경 */
  padding: 8px 10px;
  border-radius: 8px;

  .title {
    text-decoration: ${({ done }) => (done ? 'line-through' : 'none')};
    opacity: ${({ done }) => (done ? 0.6 : 1)};
  }

  .actions button {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 4px 8px;
    cursor: pointer;
  }
`

type Props = {
  todo: Todo
  onToggle: () => void
  onRemove: () => void
}

function TodoItem({ todo, onToggle, onRemove }: Props) {
  return (
    <Li className='todo-item' done={todo.done} data-id={todo.id}>
      <span className='title'>{todo.text}</span>
      <div className='actions'>
        <label style={{ marginRight: 8 }}>
          <input type='checkbox' checked={todo.done} onChange={onToggle} data-action='toggle' />
        </label>
        <button onClick={onRemove} aria-label='삭제' data-action='delete'>
          X
        </button>
      </div>
    </Li>
  )
}

export default TodoItem
