import { Todo } from './Todo.model';
import { User } from './User.model';
export interface Response {
  user: User;
  token?: string;
}

export interface TodoResponse {
  _id?: String;
  todo?: Todo;
  todos?: Todo[];
}
