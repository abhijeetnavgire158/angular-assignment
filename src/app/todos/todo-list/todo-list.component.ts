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
  isFetching: boolean = false;
  filterString: string = '';
  todos: Todo[];
  subscription: Subscription;
  fromDatepicker: string = '';
  toDatepicker: string = '';

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

    console.log(this.todos);
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
}
