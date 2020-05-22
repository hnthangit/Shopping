import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/service/checkout.service';

@Component({
  selector: 'app-client-checkout',
  templateUrl: './client-checkout.component.html',
  styleUrls: ['./client-checkout.component.css']
})
export class ClientCheckoutComponent implements OnInit {

  public cart = null;
  public url = "http://localhost:8080/shopping/images/";
  public totalPrice;
  public paymentType = 'COD';

  constructor(
    private checkoutService: CheckoutService,
  ) { }

  ngOnInit() {
    this.getCartInfo();
    this.caculateTotalPrice();
  }

  payment = () => {
    this.checkoutService.payment().subscribe(
      response => {
        console.log(response);
        console.log(response.payUrl);
        window.open(response.payUrl, "_blank");
      }
    )
  }

  getCartInfo = () => {
    this.cart = JSON.parse(localStorage.getItem('cart'));
  }

  handleChange = ($event, paymentType: string) => {
    if($event.target.checked){
      this.paymentType = paymentType;
    }
  }

  caculateTotalPrice = () => {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    let temp = 0;
    this.cart.forEach(element => {
      temp+= element.price * element.quantity
    });

    this.totalPrice = temp;
  }

  codPayment = () => {

  }

  momoPayment = () => {
    
  }

}
