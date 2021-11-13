import { TodoResponse } from './../model/Response.model';
import { environment } from './../../environments/environment';
import { Todo } from './../model/Todo.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);

  headers = {
    headers: {
      Authorization: localStorage.getItem('gotodo') || '',
    },
  };

  constructor(private http: HttpClient) {}

  getTodos() {
    this.http
      .get(`${environment.API}/api/v1/todo`, this.headers)
      .subscribe((data) => {
        const res = ({ ...data } as TodoResponse).todos;
        this.todos.next(res || []);
      });
  }

  addTodo(todo: Todo) {
    this.http
      .post(`${environment.API}/api/v1/todo`, todo, this.headers)
      .subscribe((data) => {
        const res = { ...data } as TodoResponse;

        if (!res?._id || !res?.todo) return;
        res.todo._id = res._id;

        const todos = [...this.todos.value];
        todos.push(res.todo);
        this.todos.next(todos || []);
      });
  }

  deleteTodo(id: String) {
    this.http
      .delete(`${environment.API}/api/v1/todo/${id}`, this.headers)
      .subscribe(() => {
        const todos = [...this.todos.value].filter((todo) => todo._id !== id);
        this.todos.next(todos || []);
      });
  }
}
