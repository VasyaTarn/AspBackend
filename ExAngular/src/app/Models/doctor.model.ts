import { v4 as uuidv4 } from 'uuid';

let currentDate: Date = new Date();
currentDate.setHours(currentDate.getHours() + 2);

export class Doctor {
    id: string = uuidv4();
    firstName!: string;
    lastName!: string;
    middleName!: string;
    phoneNumber!: string;
    specialization!: string;
    clientName!: string;
    clientEmail!: string;
    isClientEmpty: boolean = true;
    appointmentDate: string = currentDate.toLocaleString();
  }