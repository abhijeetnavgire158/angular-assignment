import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../shared/auth.guard';
import { TodosComponent } from './todos.component';
import { TodoStartComponent } from './todo-start/todo-start.component';
import { EditTodoItemComponent } from './edit-todo-item/edit-todo-item.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';

const routes: Routes = [
    {
        path: 'todos', canActivate: [AuthGuard], component: TodosComponent,
        children: [
            { path: '', canActivate: [AuthGuard], component: TodoStartComponent },
            { path: 'new', canActivate: [AuthGuard], component: EditTodoItemComponent },
            {
                path: ':id',
                canActivate: [AuthGuard],
                component: TodoDetailsComponent
            },
            {
                path: ':id/edit',
                canActivate: [AuthGuard],
                component: EditTodoItemComponent,
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TodoRoutingModule {}
