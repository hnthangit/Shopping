import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
declare var $: any;
@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.css']
})
export class ClientHeaderComponent implements OnInit {

  public totalItem;

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit() {
    $(document).ready(function(){
      var window_width 	 = $(window).width(),
      window_height 		 = window.innerHeight,
      header_height 		 = $(".default-header").height(),
      header_height_static = $(".site-header.static").outerHeight(),
      fitscreen 			 = window_height - header_height;
    
      $(".fullscreen").css("height", window_height)
        $(".fitscreen").css("height", fitscreen);
    
      //------- Active Nice Select --------//
    
        // $('select').niceSelect();
    
    
        $('.navbar-nav li.dropdown').hover(function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
        }, function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
        });
    
        // $('.img-pop-up').magnificPopup({
        //     type: 'image',
        //     gallery:{
        //     enabled:true
        //     }
        // });
    
        // Search Toggle
        $("#search_input_box").hide();
        $("#search").on("click", function () {
            $("#search_input_box").slideToggle();
            $("#search_input").focus();
        });
        $("#close_search").on("click", function () {
            $('#search_input_box').slideUp(500);
        });
    
        /*==========================
        javaScript for sticky header
        ============================*/
          $(".sticky-header").sticky();
    
  
     });   
     this.getTotalItem();
    this.cartService.watchStorage().subscribe((data:string) => {
      this.getTotalItem();
      console.log('123');
    });
  }

  getTotalItem = () => {
    this.totalItem = 0
    if(localStorage.getItem('cart')!=null){
      let cart = JSON.parse(localStorage.getItem('cart'));
      cart.forEach(element => {
        this.totalItem +=element.quantity
      });
    }
  }



}
