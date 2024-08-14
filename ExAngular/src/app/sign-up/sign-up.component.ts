import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpService } from '../sign-up.service';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from '../Models/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})

export class SignUpComponent {
  form! : FormGroup;

  signUpForm : any = [];

  isDuplicate : boolean = false;

  user: User = new User;

  constructor(private signUpFormServ: SignUpService, private userSrvice: UsersService, private router:Router, private apiService: ApiService)
  {
    this.signUpForm = signUpFormServ.formFields;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      logInData: new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/)])
      })
    });
  };


  onSubmit()
  {
    const temp : any = [];
    temp.push(this.form.value);
    
    this.apiService.checkDuplicate(temp[0].logInData.email).subscribe(result => {
      this.isDuplicate = result;

      if(!this.isDuplicate && temp[0].logInData.password == temp[0].logInData.confirmPassword)
      {
        this.user.name = temp[0].logInData.name;
        this.user.email = temp[0].logInData.email;
        this.user.password = temp[0].logInData.password;
  
        this.apiService.addUser(this.user).subscribe();
        alert("You have successfully registered");
        this.router.navigate(['/logIn']);
      }
      else if(this.isDuplicate)
      {
        alert("The user with this email is already registered");
        this.isDuplicate = false;
      }
      else if(temp[0].logInData.password != temp[0].logInData.confirmPassword)
      {
        alert("Password not confirmed");
      }
    });


  }
}
