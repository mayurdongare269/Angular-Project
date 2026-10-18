import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../model/todo';
import { TodosService } from '../services/todos.service';
import { TodoItem } from '../components/todo-item/todo-item';

type TodoFilter = 'all' | 'active' | 'completed';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [FormsModule, TodoItem],
  templateUrl: './todos.html',
  styleUrl: './todos.scss'
})
export class Todos implements OnInit {
  todos: Todo[] = [];
  newTitle = '';
  filter: TodoFilter = 'all';

  loading = false;
  error = '';
  saving = false;

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.loading = true;
    this.error = '';

    this.todosService.getTodos().subscribe({
      next: (data) => {
        this.todos = data.slice(0, 20);
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load todos. Please try again.';
        this.loading = false;
      }
    });
  }

  get filteredTodos(): Todo[] {
    if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    }

    if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    }

    return this.todos;
  }

  get completedCount(): number {
    return this.todos.filter(todo => todo.completed).length;
  }

  get activeCount(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  addTodo(): void {
    const title = this.newTitle.trim();

    if (!title || this.saving) {
      return;
    }

    this.saving = true;
    this.error = '';

    this.todosService.addTodo({
      userId: 1,
      title,
      completed: false
    }).subscribe({
      next: (response) => {
        const newTodo: Todo = {
          ...response,
          id: Date.now(),
          title,
          userId: 1,
          completed: false
        };

        this.todos = [newTodo, ...this.todos];
        this.newTitle = '';
        this.saving = false;
      },
      error: () => {
        this.error = 'Could not add todo. Please try again.';
        this.saving = false;
      }
    });
  }

  toggleTodo(todo: Todo): void {
    const updatedTodo: Todo = {
      ...todo,
      completed: !todo.completed
    };

    this.error = '';

    this.todosService.updateTodo(updatedTodo).subscribe({
      next: () => {
        this.todos = this.todos.map(item =>
          item.id === todo.id ? updatedTodo : item
        );
      },
      error: () => {
        this.error = 'Could not update todo. Please try again.';
      }
    });
  }

  deleteTodo(id: number): void {
    this.error = '';

    this.todosService.deleteTodo(id).subscribe({
      next: () => {
        this.todos = this.todos.filter(todo => todo.id !== id);
      },
      error: () => {
        this.error = 'Could not delete todo. Please try again.';
      }
    });
  }

  clearCompleted(): void {
    const completedTodos = this.todos.filter(todo => todo.completed);

    if (completedTodos.length === 0) {
      return;
    }

    // Delete each completed item through the API.
    completedTodos.forEach(todo => this.deleteTodo(todo.id));
  }
}