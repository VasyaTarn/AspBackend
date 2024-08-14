import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { userInfo } from 'os';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{
  userName: string = "";
  logInStatus: boolean = false;

  constructor(private users: UsersService, private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.updateUserInfo();
  }

  updateUserInfo() {
    this.users.getUserName().subscribe((name: string) => {
      this.userName = name;
    });
    this.users.getLogInStatus().subscribe((status: boolean) => {
      this.logInStatus = status;
    });

    this.apiService.getCurrentUser().subscribe(user => {
      this.users.addCurrentUser(user);
      this.users.setLogInStatus(true);
      this.userName = user.name;
    });
  }

  logout()
  {
    this.apiService.resetAllUserCurrent().subscribe();
    this.users.setEmptyCurrentUser();
    this.users.setLogInStatus(false);
    this.router.navigate([""]);

  }
}
