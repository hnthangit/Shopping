import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getUserInfo = (body: any) => {
    const url = `${serverUrl}clients/order`;
    return this.http.post(url, body);
  }
}
