import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos();
  }
}
