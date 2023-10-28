// shared-data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Provided at the root level to create a singleton instance
})
export class SharedLoginUserNameService {
  private username: any;
  private cart: any;
  setLoginUserNameData(data: any): void {
    this.username = data;
  }

  getLoginUserNameData(): any {
    return this.username;
  }

  setCart(data: any){
    this.cart = data;
  }

  getCart(): any{
    return this.cart;
  }

}
