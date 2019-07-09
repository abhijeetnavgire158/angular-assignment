import { Injectable } from "@angular/core";
import { Todo } from '../models/todo-model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class TodoService {
    todosChanged = new Subject<Todo[]>();
    private todos: Todo[] = [];
    categoriesList: string[] = ['Done', 'Pending'];

    addTodo(newTodo: Todo) {
        this.todos.push(newTodo);
        this.todosChanged.next(this.todos.slice());
    }

    updateTodo(index: number, newTodo: Todo) {
        this.todos[index] = newTodo;
        this.todosChanged.next(this.todos.slice());
    }

    deleteTodo(index: number) {
        this.todos.splice(index, 1);
        this.todosChanged.next(this.todos.slice());
    }

    getTodoItem(index: number) {
        return this.todos[index];
    }

    getTodoItems() {
        return this.todos.slice();
    }
}