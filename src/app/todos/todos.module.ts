import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TodosComponent } from './todos.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-list/todo-item/todo-item.component';
import { EditTodoItemComponent } from './edit-todo-item/edit-todo-item.component';
import { TodoStartComponent } from './todo-start/todo-start.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { MatInputsModule } from '../mat-inputs.module';
import { DateFilterPipe } from './filter/date-filter.pipe';
import { TitleFilterPipe } from './filter/title-filter.pipe';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { DropdownDirective } from '../shared/dropdown.directive';
import { OrderByPipe } from './filter/order-by.pipe';
import { TodoRoutingModule } from './todo-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        TodosComponent,
        TodoListComponent,
        TodoItemComponent,
        EditTodoItemComponent,
        TodoStartComponent,
        TodoDetailsComponent,
        DateFilterPipe,
        TitleFilterPipe,
        DropdownDirective,
        OrderByPipe
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        MatInputsModule,
        TodoRoutingModule,
        SharedModule
    ],
    exports: [
        TodosComponent,
        TodoListComponent,
        TodoItemComponent,
        EditTodoItemComponent,
        TodoStartComponent,
        TodoDetailsComponent,
        DateFilterPipe,
        TitleFilterPipe,
        LoadingSpinnerComponent,
        DropdownDirective,
        SharedModule
    ],
    providers: [],
})
export class TodosModule { }
