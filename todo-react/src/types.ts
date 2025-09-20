export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export type Book = Record<string, Todo[]>;
