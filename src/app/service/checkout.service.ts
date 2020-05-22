import { Injectable } from '@angular/core';
import { serverUrl } from '../constant/constant';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
//import CryptoJS = require('crypto-js');

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  payment = (): any => {

    var url = "https://test-payment.momo.vn/gw_payment/transactionProcessor"
    var path = "/gw_payment/transactionProcessor"
    var partnerCode = "MOMONZ3C20200520"
    var accessKey = "w8iSLnvJJMuwLkbU"
    var serectkey = "tUUxP1iaCdHS50OskVmEapOsbxYfaHjT"
    var orderInfo = "Pay with MoMo"
    var returnUrl = "http://localhost:4200/client/cart"
    var notifyurl = "http://localhost:4200/client/cart"
    var amount = "10000"
    var orderId = "-88"
    var requestId = "0";
    var requestType = "captureMoMoWallet"
    var extraData = "";

    var rawSignature = "partnerCode=" + partnerCode + "&accessKey=" + accessKey + "&requestId=" + requestId + "&amount=" + amount + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&returnUrl=" + returnUrl + "&notifyUrl=" + notifyurl + "&extraData=" + extraData
    //puts raw signature
    console.log("--------------------RAW SIGNATURE----------------")
    console.log(rawSignature);

    var signature = CryptoJS.HmacSHA256(rawSignature, serectkey).toString(CryptoJS.enc.Hex);
    console.log("--------------------SIGNATURE----------------")
    console.log(signature)

    var body = JSON.stringify({
      partnerCode: partnerCode,
      accessKey: accessKey,
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      returnUrl: returnUrl,
      notifyUrl: notifyurl,
      extraData: extraData,
      requestType: requestType,
      signature: signature,
    })
    return this.http.post(url, body);
  }
}
