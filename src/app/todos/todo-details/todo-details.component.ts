import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo-model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {
  todo: Todo;
  id: any;
  categoriesList: string[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private todoService: TodoService
  ) {
    this.categoriesList = this.todoService.categoriesList;

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.todo = this.todoService.getTodoItem(this.id);
      if (!this.todo) {
        router.navigate(['/todos']);
      }
    });
  }

  ngOnInit() {
  }

  onEditTodo() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteTodo() {
    this.todoService.deleteTodo(this.id);
    this.router.navigate(['/todos']);
  }
}
