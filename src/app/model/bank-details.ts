import { Customer } from "./customer";
import { Bank } from "./bank";

export class BankDetail{

    id: number;
    cardNumber: number;
    cardHolder:string;
    cvc: number;
    customer: Customer;
    userID: number;
}