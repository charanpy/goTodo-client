import { TodoService } from './../../services/todo.service';
import { Todo } from './../../model/Todo.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
})
export class TodolistComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {
    this.todoService.todos.subscribe((data) => {
      this.todos = [...data];
    });
  }

  ngOnInit(): void {}

  deleteTodo(id: String) {
    this.todoService.deleteTodo(id);
  }
}
