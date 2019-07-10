import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    const loggedInUser = this.userService.getLoggedInUserInfo();
    if (!loggedInUser) {
      return this.router.navigate(['/users']);
    }
    let firstName = loggedInUser.firstName;
    let lastName = loggedInUser.lastName;
    let gender = loggedInUser.gender;
    let address = loggedInUser.address;
    this.url = loggedInUser.image;
    //edit form controls and validations
    this.editProfile = new FormGroup({
      firstName: new FormControl(firstName, Validators.required),
      lastName: new FormControl(lastName, Validators.required),
      gender: new FormControl(gender, Validators.required),
      address: new FormControl(address, Validators.required),
      profileImage: new FormControl(null)
    });
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
    this.editProfile.value.profileImage = this.url;
    this.userService.updateUser(this.editProfile.value).subscribe((users) => {
      this.userService.usersChanged.next(users);
      this.isFetching = false;
      return this.router.navigate(['/users']);
    });
  }
}
