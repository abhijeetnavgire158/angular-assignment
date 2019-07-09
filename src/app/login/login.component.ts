import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isFetching: boolean = false;
  loginForm: FormGroup;
  formError: boolean = false;
  errorMessage: string = 'An error occurred!';
  userLogin: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    //Check user is already logged In or not
    this.userService.checkLoggedInUser();
    this.userService.userAuth.subscribe((userData) => {
      if (userData) {
        this.router.navigate(['/users']);
      }
    });
    // this.userService.logout();
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  onLogin() {
    this.isFetching = true;
    this.userService.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((responseData) => {
        this.formError = false;
        this.errorMessage = '';
        this.userLogin = true;
        setTimeout(() => {
          this.isFetching = false;
          this.router.navigate(['/users']);
        }, 1000);
      }, (errorMessage) => {
        this.isFetching = false;
        this.formError = true;
        this.errorMessage = errorMessage
      });
  }

  onClear() {
    this.loginForm.reset();
    this.formError = false;
    this.userLogin = false;
  }
}
