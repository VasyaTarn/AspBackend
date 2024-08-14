import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DoctorFormService } from '../doctor-form.service';
import { DoctorsService } from '../doctors.service';
import { ApiService } from '../api.service';
import { Doctor } from '../Models/doctor.model';
import { lastValueFrom } from 'rxjs';
import { UsersService } from '../users.service';
import { User } from '../Models/user.model';

@Component({
  selector: 'app-add-doctors-form',
  templateUrl: './add-doctors-form.component.html',
  styleUrl: './add-doctors-form.component.css'
})
export class AddDoctorsFormComponent {
  form! : FormGroup

  doctorForm: any = [];

  isDuplicate : boolean = false;

  idValue : number = 0;

  doctors: Doctor[] = [];

  doctor: Doctor = new Doctor;

  isDeleting: boolean = false;

  currentUser: User = new User;

  constructor(private doctorFormService: DoctorFormService, private usersService: UsersService, private doctorsService:DoctorsService, private apiService: ApiService)
  {
    this.doctorForm = doctorFormService.formFields;
  }

  ngOnInit() : void
  {
    this.form = new FormGroup({
      doctorData : new FormGroup({
        firstName : new FormControl("", [Validators.required, Validators.maxLength(20), Validators.pattern(/^[a-zA-Z0-9]*$/)]),
        lastName : new FormControl("", [Validators.required, Validators.maxLength(20), Validators.pattern(/^[a-zA-Z0-9]*$/)]),
        middleName : new FormControl("", [Validators.maxLength(20), Validators.pattern(/^[a-zA-Z0-9]*$/)]),
        phoneNumber : new FormControl("+380", [Validators.required, Validators.maxLength(13), Validators.pattern(/^\+380\d{9}$/)]),
        specialization : new FormControl("", [Validators.required, Validators.maxLength(40), Validators.pattern(/^[a-zA-Z0-9]*$/)])
      })
    })

    this.apiService.getDoctors().subscribe(doctors => {
      this.doctors = doctors;
    });

    this.currentUser = this.usersService.getCurrentUser();
  }

  async onSubmit()
  {
    if (this.isDeleting) {
      return;
    }

    const temp : any = [];
    temp.push(this.form.value);

    for (const element of this.doctors) 
    {
      if(temp[0].doctorData.firstName == element.firstName && temp[0].doctorData.lastName == element.lastName && temp[0].doctorData.middleName == element.middleName && temp[0].doctorData.phoneNumber == element.phoneNumber && temp[0].doctorData.specialization == element.specialization)
      {
        this.isDuplicate = true;
      }
    }

    if(this.form && this.form.value && !this.isDuplicate)
    {
      let currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + 2);

      this.doctor = new Doctor;

      this.doctor.firstName = temp[0].doctorData.firstName;
      this.doctor.middleName = temp[0].doctorData.middleName;
      this.doctor.lastName = temp[0].doctorData.lastName;
      this.doctor.phoneNumber = temp[0].doctorData.phoneNumber;
      this.doctor.specialization = temp[0].doctorData.specialization;
      this.doctor.appointmentDate = currentDate.toLocaleString();

      await lastValueFrom(this.apiService.addDoctor(this.doctor));
      this.doctors = await lastValueFrom(this.apiService.getDoctors());
    }
    else
    {
      alert("This doctor is already on the list");
      this.isDuplicate = false;
    }
    
    
  }

  async deleteDoctor(index: number)
  {
    this.isDeleting = true;

    await lastValueFrom(this.apiService.deleteDoctor(this.doctors[index].id));
    this.doctors.splice(index, 1);

    this.isDeleting = false;
  }

}
