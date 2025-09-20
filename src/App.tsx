import { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { toYYYYMMDD } from './utils/date'
import DateNav from './components/dateNav'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import type { Todo } from './types'

const STORAGE_KEY = 'vanilla_todo_step3' // 바닐라와 동일 키

const AppCard = styled.main`
  background: #fdf6f0;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  h1 {
    margin: 0;
    text-align: center;
  }
`

const ListSection = styled.section<{ scrolling: boolean; maxH: number | null }>`
  ${({ scrolling, maxH }) => (scrolling ? `overflow-y:auto; max-height:${maxH ?? 0}px;` : '')}
`

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentDate, setCurrentDate] = useState<string>(() => toYYYYMMDD(new Date()))

  // 스크롤 영역 계산용
  const listRef = useRef<HTMLUListElement | null>(null)
  const [scrolling, setScrolling] = useState(false)
  const [maxH, setMaxH] = useState<number | null>(null)

  // 초기 로드
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Todo[]
      // 과거 데이터에 due 없으면 현재 날짜로 보정
      const fixed = parsed.map((t) => (t.due ? t : { ...t, due: currentDate }))
      setTodos(fixed)
    }
  }, []) // eslint-disable-line

  // 저장
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  // 현재 날짜의 목록
  const todays = useMemo(() => todos.filter((t) => t.due === currentDate), [todos, currentDate])

  // 5개 초과 시 높이 동적 계산(바닐라와 동일한 로직)
  useEffect(() => {
    const ul = listRef.current
    if (!ul) return

    const items = Array.from(ul.querySelectorAll<HTMLLIElement>('.todo-item'))
    if (items.length > 5) {
      let max = 0
      for (let i = 0; i < 5; i++) {
        max += items[i].getBoundingClientRect().height
      }
      const cs = getComputedStyle(ul)
      const rowGap = parseFloat(cs.rowGap || (cs as any).gap || '0')
      max += rowGap * 4
      setMaxH(Math.ceil(max))
      setScrolling(true)
    } else {
      setMaxH(null)
      setScrolling(false)
    }
  }, [todays.length])

  // 추가/토글/삭제
  const addTodo = (text: string) => {
    setTodos((prev) => [
      ...prev,
      {
        id: `${Date.now()}${Math.random().toString(16).slice(2)}`,
        text,
        done: false,
        due: currentDate,
      },
    ])
  }
  const toggleTodo = (id: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }
  const removeTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  // 날짜 이동/선택
  const goPrev = () => {
    const d = new Date(currentDate + 'T00:00:00')
    d.setDate(d.getDate() - 1)
    setCurrentDate(toYYYYMMDD(d))
  }
  const goNext = () => {
    const d = new Date(currentDate + 'T00:00:00')
    d.setDate(d.getDate() + 1)
    setCurrentDate(toYYYYMMDD(d))
  }
  const pickDate = (yyyyMmDd: string) => setCurrentDate(yyyyMmDd)

  return (
    <AppCard className='app'>
      <Header className='app-header'>
        <h1>TO-DO</h1>
        <DateNav currentDate={currentDate} onPrev={goPrev} onNext={goNext} onPick={pickDate} />
      </Header>

      <section className='input-section'>
        <TodoInput addTodo={addTodo} />
      </section>

      <ListSection
        className={scrolling ? 'list-section scrolling' : 'list-section'}
        scrolling={scrolling}
        maxH={maxH}
      >
        <TodoList ref={listRef} todos={todays} onToggle={toggleTodo} onRemove={removeTodo} />
      </ListSection>
    </AppCard>
  )
}

export default App
