export interface Message {
  id: number;
  date: number;
  user: string;
  content: string;
}

export interface APIResponse {
  name: string;
  age: number;
  count: number;
}

export interface APIData extends APIResponse {
  name: string;
}
