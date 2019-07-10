import { Injectable } from "@angular/core";
import { Todo } from '../models/todo-model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class TodoService {
    todosChanged = new Subject<Todo[]>();
    private todos: Todo[] = [];
    categoriesList: string[] = ['Done', 'Pending'];

    generateId(): string {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    addTodo(newTodo: Todo) {
        this.todos.push({...newTodo, id: this.generateId()});
        this.todosChanged.next(this.todos.slice());
    }

    updateTodo(id: string, newTodo: Todo) {
        let index = this.todos.findIndex((value) => value.id == id);
        this.todos[index] = {...newTodo, id: this.generateId()};
        this.todosChanged.next(this.todos.slice());
    }

    deleteTodo(id: string) {
        var filtered = this.todos.filter(function(value, index, arr){
            return value.id != id;        
        });
        this.todos = filtered;
        this.todosChanged.next(this.todos.slice());
    }

    deleteMultipleTodo(id: string[]) {
        var filtered = this.todos.filter(function(value, index, arr){
            return !id.includes(value.id);
        });
        this.todos = filtered;
        this.todosChanged.next(this.todos.slice());
    }

    getTodoItem(id: string) {
        return this.todos.find(x => x.id == id);
    }

    getTodoItems() {
        return this.todos.slice();
    }
}