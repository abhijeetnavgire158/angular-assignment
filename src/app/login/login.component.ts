import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formError: boolean = false;
  userLogin: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  onLogin() {    
    this.userService.loginUser(this.loginForm.value.email, this.loginForm.value.password);
  }

  onClear() {
    this.loginForm.reset();
    this.formError = false;
    this.userLogin = false;
  }

  

}
