import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { TodosComponent } from './todos/todos.component';
import { TodoStartComponent } from './todos/todo-start/todo-start.component';
import { EditTodoItemComponent } from './todos/edit-todo-item/edit-todo-item.component';
import { TodoDetailsComponent } from './todos/todo-details/todo-details.component';

import { AuthGuard } from './shared/auth.guard';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'users', canActivate: [AuthGuard], component: UserComponent },
    { path: 'users/edit-profile', canActivate: [AuthGuard], component: EditProfileComponent },
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
    declarations: [],
    imports: [CommonModule, RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [],
})
export class AppRoutingModule { }