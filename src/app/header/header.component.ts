import { Component, OnInit, Input } from '@angular/core';
import { MatMenuPanel } from '@angular/material';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input('matMenuTriggerFor') menu: MatMenuPanel<any>

  userData = { image: '', firstName: '', lastName: '' };
  isAuthenticated: boolean = false;
  
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.userAuth.subscribe((auth) => {
      this.isAuthenticated = false;
      if (auth) {
        this.isAuthenticated = true;
      }
    });

    this.userService.usersChanged.subscribe((users) => {
      this.userData = this.userService.getLoggedInUserInfo();
    });
  }

  onLogout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
