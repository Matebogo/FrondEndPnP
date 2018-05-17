import { Supplier } from "./supplier";

export class Product
{
      productId?:number;
      productName :String = '';
      price?:number;
      quantity?: number;
      picture :String = '';
      totalQuantity?: number;
      badgeQuantity?:number;
      supplier?: Supplier;
      purchased:false;
}