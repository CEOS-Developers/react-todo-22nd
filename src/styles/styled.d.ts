// src/styles/styled.d.ts  ← 새 파일
import 'styled-components'
import type { Theme } from './theme'

declare module 'styled-components' {
  // styled-components가 내부적으로 쓰는 DefaultTheme를 우리 프로젝트의 Theme으로 확장
  export interface DefaultTheme extends Theme {}
}
