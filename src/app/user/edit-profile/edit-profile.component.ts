import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editProfile: FormGroup;
  url: any = '';
  formError: boolean = false;
  userCreated: boolean = false;
  isFetching: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {    
    //signup form controls and validations
    this.editProfile = new FormGroup({
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

  editUser() {
    if (!this.editProfile.valid) {
      this.formError = true;
      return false;
    }
    this.isFetching = true;
  }
}
