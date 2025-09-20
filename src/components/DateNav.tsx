import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { formatKoreanLabel } from '../utils/date'

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 8px;

  button {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 4px 8px;
    cursor: pointer;
  }
  button:hover {
    filter: brightness(0.98);
  }
  button:active {
    transform: translateY(1px);
  }
  button:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }
`

type Props = {
  currentDate: string // YYYY-MM-DD
  onPrev: () => void
  onNext: () => void
  onPick: (yyyyMmDd: string) => void
}

function DateNav({ currentDate, onPrev, onNext, onPick }: Props) {
  const dateInputRef = useRef<HTMLInputElement | null>(null)

  const openPicker = () => {
    const input = dateInputRef.current
    if (!input) return

    input.value = currentDate
    // 지원 브라우저면 네이티브 showPicker
    if (typeof input.showPicker === 'function') {
      input.showPicker()
      return
    }
    input.focus({ preventScroll: true })
    try {
      input.click()
    } catch {}
  }

  useEffect(() => {
    const input = dateInputRef.current
    if (!input) return
    const handler = () => {
      if (input.value) onPick(input.value)
    }
    input.addEventListener('change', handler)
    return () => input.removeEventListener('change', handler)
  }, [onPick])

  return (
    <Bar className='date-nav'>
      <button aria-label='이전 날짜' onClick={onPrev}>
        ←
      </button>
      <span id='todayLabel'>{formatKoreanLabel(currentDate)}</span>
      <button aria-label='다음 날짜' onClick={onNext}>
        →
      </button>
      <button type='button' aria-label='달력 열기' onClick={openPicker}>
        📅
      </button>
      <input ref={dateInputRef} type='date' className='visually-hidden' />
    </Bar>
  )
}

export default DateNav
