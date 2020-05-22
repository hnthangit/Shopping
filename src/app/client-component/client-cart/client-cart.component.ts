import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-cart',
  templateUrl: './client-cart.component.html',
  styleUrls: ['./client-cart.component.css']
})
export class ClientCartComponent implements OnInit {

  public cart = null;
  public url = "http://localhost:8080/shopping/images/";
  public isLogin = true;

  public totalPrice;

  constructor(
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      let date = params['errorCode'];
      console.log(date); // Print the parameter to the console. 
  });
   }

  ngOnInit() {
    this.getCartInfo();
    this.caculateTotalPrice();
  }

  removeItemFromCart(index: number) {
    this.cart.splice(index, 1);
    this.cartService.setItem('cart', JSON.stringify(this.cart));
    this.caculateTotalPrice();

  }

  getCartInfo = () => {
    this.cart = JSON.parse(localStorage.getItem('cart'));
  }

  updateCartQuantity = (index: number, type: number) => {
    if (type == 1) {
      this.cart[index].quantity++;
    } else {
      if (this.cart[index].quantity != 1)
        this.cart[index].quantity--;
    }

    this.cartService.setItem('cart', JSON.stringify(this.cart));

    this.caculateTotalPrice();
  }

  caculateTotalPrice = () => {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    let temp = 0;
    this.cart.forEach(element => {
      temp+= element.price * element.quantity
    });

    this.totalPrice = temp;
  }

}

