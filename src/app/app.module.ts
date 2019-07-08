import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { 
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatIconModule,
  MatRadioModule,
  MatTableModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule
  }
   from '@angular/material';

import { MatMenuModule} from '@angular/material/menu';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { TodosComponent } from './todos/todos.component';
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import { TodoItemComponent } from './todos/todo-list/todo-item/todo-item.component';
import { EditTodoItemComponent } from './todos/edit-todo-item/edit-todo-item.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { TodoStartComponent } from './todos/todo-start/todo-start.component';
import { TodoDetailsComponent } from './todos/todo-details/todo-details.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AuthGuard } from './shared/auth.guard';
import { DateFilterPipe } from './todos/filter/date-filter.pipe';
import { TitleFilterPipe } from './todos/filter/title-filter.pipe';


const routes: Routes = [
  { path: '', component: AppComponent },
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'users', canActivate: [AuthGuard], component: UserComponent},
  {
    path: 'todos',
    canActivate: [AuthGuard],
    component: TodosComponent,
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
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    UserComponent,
    TodosComponent,
    TodoListComponent,
    TodoItemComponent,
    EditTodoItemComponent,
    LoadingSpinnerComponent,
    TodoStartComponent,
    TodoDetailsComponent,
    DropdownDirective,
    DateFilterPipe,
    TitleFilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    MatMenuModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatTableModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
