import { v4 as uuidv4 } from 'uuid';

export class User {
    id: string = uuidv4();
    name!: string;
    email!: string;
    password!: string;
    isCurrentUser: boolean = false;
    role!: string;
  }