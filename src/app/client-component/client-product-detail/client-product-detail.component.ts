import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { element } from 'protractor';
import { ClientHeaderComponent } from '../client-header/client-header.component';
import { CartService } from 'src/app/service/cart.service';
import { serverUrl } from 'src/app/constant/constant';
declare var $: any;

@Component({
  selector: 'app-client-product-detail',
  templateUrl: './client-product-detail.component.html',
  styleUrls: ['./client-product-detail.component.css']
})
export class ClientProductDetailComponent implements OnInit {
  active = 1;
  customOptions: OwlOptions = {
    items: 1,
    autoplay: false,
    autoplayTimeout: 5000,
    loop: true,
    nav: false,
    dots: true
  }
  public url = `${serverUrl}images/`;
  public product: any = null;
  public images = [];
  public productAttributes = [];
  public quantity;
  public originalPrice: number;
  public totalPrice: number;

  private selectedAttributes = [];
  public listAttributes = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    // private headerComp: ClientHeaderComponent,
    private cartService: CartService,
  ) { }

  ngOnInit() {
    this.quantity = 1;
    this.getClientProductInfo(); 
  }

  onChange = ($event) => {
    let id = $event.target.value;
    if (id.startsWith('0')) {
      id = id.substr(1);
      let name;
      this.listAttributes.forEach(element => {
        if (element.id == id) {
          name = element.name;
        }
      });
      this.selectedAttributes = this.selectedAttributes.filter(element => element.name != name);

      let tempPrice = 0;
      this.selectedAttributes.forEach(element => {
        tempPrice += element.price;
      });

      this.totalPrice = this.originalPrice + tempPrice;

      //console.log(this.selectedAttributes);
    } else {

      let name;
      this.listAttributes.forEach(element => {
        if (element.id == this.getAttributeId(id)) {
          name = element.name;
        }
      });
      if (!this.selectedAttributes.some(element => element.id == id)) {
        if (!this.selectedAttributes.some(element => element.name == name)) {
          let value;
          value = this.getAttributeValue(id);

          let price;
          price = this.getAttributePrice(id);

          let selectedAttribute = { id: id, name: name, value: value, price: price };
          this.selectedAttributes.push(selectedAttribute);

          //console.log(this.selectedAttributes);
          let tempPrice = 0;
          this.selectedAttributes.forEach(element => {
            tempPrice += element.price;
          });

          this.totalPrice = this.originalPrice + tempPrice;
        } else {
          this.selectedAttributes = this.selectedAttributes.filter(element => element.name != name);

          let value;
          value = this.getAttributeValue(id);

          let price;
          price = this.getAttributePrice(id);

          let selectedAttribute = { id: id, name: name, value: value, price: price };
          this.selectedAttributes.push(selectedAttribute);

          //console.log(this.selectedAttributes);
          let tempPrice = 0;
          this.selectedAttributes.forEach(element => {
            tempPrice += element.price;
          });

          this.totalPrice = this.originalPrice + tempPrice;
        }
      }
    }

  }

  getAttributeId = (id: any): any => {
    let value;
    for (const key in this.productAttributes) {
      if (this.productAttributes.hasOwnProperty(key)) {
        const element = this.productAttributes[key];
        element.forEach(childElement => {
          if (childElement.id == id) {
            value = childElement.attributeId;
          }
        });
      }
    }
    return value;
  }

  getAttributeValue = (id: any): any => {
    let value;
    for (const key in this.productAttributes) {
      if (this.productAttributes.hasOwnProperty(key)) {
        const element = this.productAttributes[key];
        element.forEach(childElement => {
          if (childElement.id == id) {
            value = childElement.value;
          }
        });
      }
    }
    return value;
  }

  getAttributePrice = (id: any): any => {
    let value;
    for (const key in this.productAttributes) {
      if (this.productAttributes.hasOwnProperty(key)) {
        const element = this.productAttributes[key];
        element.forEach(childElement => {
          if (childElement.id == id) {
            value = childElement.price;
          }
        });
      }
    }
    return value;
  }

  objectsEqual = (o1, o2) => {
    return Object.keys(o1).length === Object.keys(o2).length
      && Object.keys(o1).every(p => o1[p] === o2[p]);
  }
  arraysEqual = (a1, a2): boolean => {
    return a1.length === a2.length && a1.every((o, idx) => this.objectsEqual(o, a2[idx]));
  }

  addToCart = () => {
    if (localStorage.getItem('cart') == null) {
      let cart = [];
      let product = { id: this.product.id, name: this.product.name, image: this.product.image, quantity: this.quantity, price: this.totalPrice, attribute: this.selectedAttributes };
      cart.push(product);

      this.cartService.setItem('cart', JSON.stringify(cart));
      //localStorage.setItem('cart', JSON.stringify(cart));

    } else {
      let cart = JSON.parse(localStorage.getItem('cart'));
      let product = { id: this.product.id, name: this.product.name, image: this.product.image, quantity: this.quantity, price: this.totalPrice, attribute: this.selectedAttributes };
      //console.log(product);
      let check: boolean = false;
      let duplicateItem: number = 0;
      cart.forEach(element => {
        if (element.id == product.id) {
          if (this.arraysEqual(element.attribute, product.attribute) == true) {
            duplicateItem++;
            element.quantity+=this.quantity;
          }
        }
      });

      if (duplicateItem == 0) {
        cart.push(product);
      }

      this.cartService.setItem('cart', JSON.stringify(cart));
      //localStorage.setItem('cart', JSON.stringify(cart));

    }

  }


  sortImageArray = () => {
    return this.images.sort((a, b) => a.displayOrder - b.displayOrder);
  }
  groupBy(xs, f) {
    return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
  }
  getClientProductInfo = () => {
    const productUrl = this.activatedRoute.snapshot.paramMap.get('url');
    this.productService.getClientProductInfo(productUrl).subscribe(
      response => {
        this.product = response['data'];
        this.images = response['data'].productImageSet;
        this.productAttributes = this.groupBy(response['data'].productAttributeSet, (c) => c.attributeId)
        this.originalPrice = response['data'].price;
        this.totalPrice = response['data'].price;
        this.listAttributes = response['data'].attributeList;
        // $(document).ready(function() {
        //   $('select').niceSelect();
        // });
      }
    )
  }

}
