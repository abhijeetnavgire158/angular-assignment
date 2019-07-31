import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { CanDeactivateComponent } from '../can-deactivate.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-todo-item',
  templateUrl: './edit-todo-item.component.html',
  styleUrls: ['./edit-todo-item.component.css']
})
export class EditTodoItemComponent implements OnInit, CanDeactivateComponent {
  @ViewChild('reminderDatectrl', { static: false }) reminderDatectrl: FormControl;
  id: any;
  editMode = false;
  todoForm: FormGroup;
  attachedFile: any;
  isReminderChecked: boolean = false;
  categoriesList: string[];
  isChanges = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'],
        this.editMode = params['id'] != null;
      this.categoriesList = this.todoService.categoriesList;
      this.initForm();
    });
  }

  ngOnInit() {
  }

  get categoriesControls() {
    return (this.todoForm.controls.categories as FormArray).controls;
  }
  onReminderChange() {
    this.todoForm.controls['reminderDate'].setValue(null);
  }

  initForm() {
    let title = '';
    let todoDate = null;
    let selectedCategories = [];
    let isReminder = false;
    let reminderDate = null;
    let isPublic = false;
    let attached = '';

    if (this.editMode) {
      const todo = this.todoService.getTodoItem(this.id);
      title = todo.title;
      todoDate = todo.todoDate;
      isReminder = todo.isReminder;
      selectedCategories = todo.categories;
      this.isReminderChecked = todo.isReminder;
      reminderDate = todo.reminderDate;
      isPublic = todo.isPublic;
      attached = todo.attached;
      this.attachedFile = todo.attached;
    }
    this.todoForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      todoDate: new FormControl(todoDate, Validators.required),
      categories: new FormArray([]),
      isReminder: new FormControl(isReminder),
      reminderDate: new FormControl(reminderDate, this.reminderDateRequired.bind(this)),
      isPublic: new FormControl(isPublic),
      attached: new FormControl(attached)
    });

    this.addCheckboxes(selectedCategories);
  }

  private addCheckboxes(selectedCategories = []) {
    this.categoriesList.map((o, i) => {
      //below condition for edit form
      let isSelected = (i in selectedCategories && selectedCategories[i] == true) ? true : false;
      let control = null;
      if (isSelected) {
        control = new FormControl(i == i);
      } else {
        control = new FormControl(i == -1);
      }
      (this.todoForm.controls.categories as FormArray).push(control);
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
    this.isChanges = false;
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.attachedFile = reader.result;
      }
    }
  }

  onSubmit() {
    this.todoForm.patchValue({ attached: this.attachedFile });
    if (this.editMode) {
      this.todoService.updateTodo(this.id, this.todoForm.value);
    } else {
      this.todoService.addTodo(this.todoForm.value);
    }
    this.onCancel();
  }

  /*
  * If user select the "isReminder" then reminder date must be selected
  * control.value are null or ''(empty string)
  */
  reminderDateRequired(control: FormControl) {
    if (this.isReminderChecked && (control.value == null || control.value == '')) {
      return { 'reminderDateRequired': true }
    }

    return null;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    console.log('HHASHA');
    if (this.todoForm.dirty && this.todoForm.touched && this.isChanges) {
      return confirm('You have unsaved changes on this page. Do you want to leave this page and discard your changes or stay on this page?')
    }

    return true;
  }
}
