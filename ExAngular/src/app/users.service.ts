import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../app/Models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: any[] = [];

  private currentUser: User = new User;

  private logInStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userNameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  addUser(user: any) {
    this.users.push(user);
  }

  getUsers() {
    return this.users;
  }

  addCurrentUser(user: User)
  {
    this.currentUser = user;
  }

  getCurrentUser()
  {
    return this.currentUser;
  }

  setLogInStatus(status: boolean) {
    this.logInStatusSubject.next(status);
  }

  getLogInStatus() {
    return this.logInStatusSubject.asObservable();
  }


  setUserName(name: string) {
    this.userNameSubject.next(name);
  }

  getUserName() {
    return this.userNameSubject.asObservable();
  }

  setEmptyCurrentUser()
  {
    this.currentUser = new User;
  }
}
