import { Role } from "./role";

export class Customer {
    id: number;
    firstname: string = '';
    surname: string = '';
    username: string = '';
    email: string = '';
    password: string = '';
   
    roles: Role[];
}