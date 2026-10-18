import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../model/todo';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss'
})
export class TodoItem {
  @Input({ required: true }) todo!: Todo;

  @Output() toggle = new EventEmitter<Todo>();
  @Output() remove = new EventEmitter<number>();
}