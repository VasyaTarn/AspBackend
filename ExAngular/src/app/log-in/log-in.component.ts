import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LogInService } from '../log-in.service';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../api.service';
import { User } from '../Models/user.model';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  form! : FormGroup;

  logInForm : any = [];

  users: User[] = [];

  constructor(private logInFormServ: LogInService, private userService: UsersService, private router:Router, private apiService: ApiService)
  {
    this.logInForm = logInFormServ.formFields;
  }

  ngOnInit() : void
  {
    this.form = new FormGroup({
      logInData : new FormGroup({
        email : new FormControl("", [Validators.required, Validators.email]),
        password : new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]),
      })
    })

    this.apiService.getUsers().subscribe(result => {
      this.users = result;
      console.log(this.users);
    });

    
  }

  onSubmit() {
    const temp: any = [];
    temp.push(this.form.value);

    for (const element of this.users) {
      if ((temp[0].logInData.email == element.email) && (temp[0].logInData.password == element.password)) {
        this.userService.addCurrentUser(element);
        this.apiService.setUserCurrent(element.id).subscribe();
        alert("You have successfully logged in to your account");
        this.router.navigate(['']);
        this.userService.setLogInStatus(true);
        this.userService.setUserName(element.name);
        return; 
      }
    }

    alert("Invalid email or password");
  }

}
