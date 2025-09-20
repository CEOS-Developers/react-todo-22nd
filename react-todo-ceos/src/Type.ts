export type Todo = {
  text: string;
  completed: boolean;
};

export type Todos = {
  [date: string]: Todo[];
};
