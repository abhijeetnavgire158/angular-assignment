import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/todo-model';
import { Router, ActivatedRoute } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @Output() todoSelected = new EventEmitter<string>();
  selectedTodos: string[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private todoService: TodoService
  ) { }

  ngOnInit() {
  }

  onEditTodo() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteTodo() {
    this.todoService.deleteTodo(this.todo.id);
    this.router.navigate(['/todos']);
  }

  multiTodoSelect(id: string) {    
    this.todoSelected.emit(id);
  }
}
