import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  url: any = '';
  formError: boolean = false;
  userCreated: boolean = false;
  
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    //signup form controles and validations
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      profileImage: new FormControl(null)
    })
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.url = reader.result;
      }     
    }
  }

  signup() {
    if (!this.signUpForm.valid) {
      this.formError = true;
      return false;
    }

    const newUser = new User(
      this.signUpForm.value.email,
      this.signUpForm.value.password,
      this.signUpForm.value.firstName,
      this.signUpForm.value.lastName,
      this.signUpForm.value.address,
      this.signUpForm.value.gender,
      this.url
    );    
    
    this.userService.saveUser(newUser).subscribe((responseData) => {
        this.formError = false;
        this.userCreated =true;
        this.signUpForm.reset();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 500);
        
    });    
  }
}
