import { Component, Input } from '@angular/core';
import { DoctorsService } from '../doctors.service';
import { UsersService } from '../users.service';
import { Doctor } from '../Models/doctor.model';
import { ApiService } from '../api.service';
import { User } from '../Models/user.model';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrl: './doctors-list.component.css'
})
export class DoctorsListComponent {
  @Input() doctors: Doctor[] = []; 
  @Input() index: any;
  editStatus : boolean = false;
  editDateStatus : boolean = false;
  indexClientDuplicate : number | null = null;

  currentUser: User = new User;

  constructor(private doctorsService: DoctorsService, private usersService: UsersService, private apiService: ApiService){}

  ngOnInit() : void
  {
    this.currentUser = this.usersService.getCurrentUser();
  }

  edit()
  {
    this.editStatus = true;
  }

  saveUser()
  {
    this.editStatus = false;
    this.apiService.updateDoctor(this.doctors[this.index].id, this.doctors[this.index]).subscribe();
    if(this.indexClientDuplicate || this.indexClientDuplicate == 0)
    {
      this.apiService.updateDoctor(this.doctors[this.indexClientDuplicate].id, this.doctors[this.indexClientDuplicate]).subscribe();
    }
  }

  makeApp()
  { 
    for (const element of this.doctors) 
    {
      if(element.clientName === this.usersService.getCurrentUser().name && element.clientEmail === this.usersService.getCurrentUser().email)
        {
          this.indexClientDuplicate = this.doctors.indexOf(element);
        }
    }

    if(this.indexClientDuplicate || this.indexClientDuplicate == 0)
    {
      let currentDate: Date = new Date();
      currentDate.setHours(currentDate.getHours() + 2);

      this.doctors[this.indexClientDuplicate].clientName = "";
      this.doctors[this.indexClientDuplicate].clientEmail = "";
      this.doctors[this.indexClientDuplicate].appointmentDate = currentDate.toLocaleString();
      this.doctors[this.indexClientDuplicate].isClientEmpty = true;

      this.doctors[this.index].clientName = this.usersService.getCurrentUser().name;
      this.doctors[this.index].clientEmail = this.usersService.getCurrentUser().email;
      this.doctors[this.index].appointmentDate = currentDate.toLocaleString();
      this.doctors[this.index].isClientEmpty = false;

      this.apiService.updateDoctor(this.doctors[this.index].id, this.doctors[this.index]).subscribe();
      this.apiService.updateDoctor(this.doctors[this.indexClientDuplicate].id, this.doctors[this.indexClientDuplicate]).subscribe();

    }
    else
    {
      let currentDate: Date = new Date();
      currentDate.setHours(currentDate.getHours() + 2);

      this.doctors[this.index].clientName = this.usersService.getCurrentUser().name;
      this.doctors[this.index].clientEmail = this.usersService.getCurrentUser().email;
      this.doctors[this.index].appointmentDate = currentDate.toLocaleString();
      this.doctors[this.index].isClientEmpty = false;
      this.apiService.updateDoctor(this.doctors[this.index].id, this.doctors[this.index]).subscribe();
    }

    this.indexClientDuplicate = null;
  }

  editDate()
  {
    this.editDateStatus = true;
  }

  saveDate()
  {
    this.editDateStatus = false;
    this.apiService.updateDoctor(this.doctors[this.index].id, this.doctors[this.index]).subscribe();
    
    if(this.indexClientDuplicate || this.indexClientDuplicate == 0)
    {
      this.apiService.updateDoctor(this.doctors[this.indexClientDuplicate].id, this.doctors[this.indexClientDuplicate]).subscribe();
    }
  }

  cancelApp()
  {
    let currentDate: Date = new Date();
    currentDate.setHours(currentDate.getHours() + 2);

    this.doctors[this.index].clientName = "";
    this.doctors[this.index].clientEmail = "";
    this.doctors[this.index].appointmentDate = currentDate.toLocaleString();
    this.doctors[this.index].isClientEmpty = true;

    this.apiService.updateDoctor(this.doctors[this.index].id, this.doctors[this.index]).subscribe();
  }
}
