export interface Todo {
  id: string; // uuid 사용
  text: string; // 할 일 내용
  completed: boolean; // 완료 여부
}

export interface TodosState {
  [key: string]: Todo[]; // key는 "2025-9-18" 형태의 날짜 문자열
}

// 날짜 키 타입 별칭
export type DateKey = string; // 2025-9-18 형태