import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from '../constant/constant';
import { product } from '../model/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts = (pageNumber: number, size: number, productName: string, priceFrom: number, priceTo: number, manufacturerId: number): any => {
    let url = `${serverUrl}products?page=${pageNumber}&size=${size}`;
    if (productName != '') {
      url = url.concat(`&name=${productName}`);
    }
    if (priceFrom != 0) {
      url = url.concat(`&priceFrom=${priceFrom}`);
    }
    if (priceTo != 0) {
      url = url.concat(`&priceTo=${priceTo}`);
    }
    if (manufacturerId != 0) {
      url = url.concat(`&manufacturerId=${manufacturerId}`);
    }
    return this.http.get(url);
  }

  addProduct = (body: any): any => {
    const url = `${serverUrl}products`;
    return this.http.post(url, body);
  }

  updateProduct = (body: any): any => {
    const url = `${serverUrl}products`;
    return this.http.put(url, body);
  }

  deleteProduct= (id: number): any => {
    const url = `${serverUrl}products/${id}`;
    return this.http.delete(url);
  }

  getOneProduct = (id: number): Observable<product> => {
    const url = `${serverUrl}products/${id}`;
    return this.http.get<product>(url);
  }
}
