// src/styles/theme.ts
export const theme = {
  colors: {
    primary: '#22c55e', // 버튼용 → 초록색
    bg: '#fdf6f0', // 배경용 → 주황빛(orange-100 계열)
    border: '#e6e6ef',
    textMuted: '#6b7280',
    done: '#15803d',
    danger: '#dc2626',
  },
  radius: '14px',
  shadow: '0 6px 24px rgba(0,0,0,0.06)',
}

export type Theme = typeof theme
