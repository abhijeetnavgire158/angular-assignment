import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  constructor(private userService: UserService, private http: HttpClient) { }

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
        console.log(this.users);
    });
  }

}
