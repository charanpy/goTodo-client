import { TodoService } from './../../services/todo.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.css', '../auth/auth.component.css'],
})
export class AddtodoComponent implements OnInit {
  @ViewChild('todo') todo: ElementRef = {} as ElementRef;
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  onAddTodo() {
    const todo: string = this.todo.nativeElement.value;
    if (!todo) return;
    this.todoService.addTodo({ todo });
  }
}
