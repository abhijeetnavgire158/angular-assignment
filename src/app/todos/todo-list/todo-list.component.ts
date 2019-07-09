import { Component, OnInit, ViewChild } from '@angular/core';
import { Todo } from 'src/app/models/todo-model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  selectedTodos: string[] = [];
  isFetching: boolean = false;
  filterString: string = '';
  todos: Todo[];
  subscription: Subscription;
  fromDatepicker: string = '';
  toDatepicker: string = '';
  order: string = 'title';
  reverse: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private todoService: TodoService) { }

  ngOnInit() {
    this.subscription = this.todoService.todosChanged
      .pipe(tap((res) => {
        this.isFetching = true;
      }))
      .subscribe(
        (todos: Todo[]) => {
          this.todos = todos;
          setTimeout(() => { this.isFetching = false; }, 1000);
        }
      );

    this.todos = this.todoService.getTodoItems();
  }

  onNewTodo() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onClearFilter() {
    this.toDatepicker = '';
    this.fromDatepicker = '';
    this.filterString = '';
    this.router.navigate(['/todos']);
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
    console.log(this.todos);
  }

  todoSelected(id: string) {    
    var index = this.selectedTodos.indexOf(id);
    if (index > -1) {
      this.selectedTodos.splice(index, 1);
    } else {
      this.selectedTodos.push(id);
    }
  }

  onDeleteTodos() {    
    this.todoService.deleteMultipleTodo(this.selectedTodos);
    this.selectedTodos = [];
  }
}
