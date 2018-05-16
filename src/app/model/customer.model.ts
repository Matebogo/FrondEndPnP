import { Role } from "./role";

export class User
{
    userID?:number;
     firstname: string = '';
     surname: string = '';
     username: string = '';
     email: string = '';
     password: string = '';
     roles: Role[];
   
}