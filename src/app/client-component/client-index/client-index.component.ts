import { Component, OnInit, AfterViewInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
declare var $: any;

@Component({
  selector: 'app-client-index',
  templateUrl: './client-index.component.html',
  styleUrls: ['./client-index.component.css']
})
export class ClientIndexComponent implements OnInit {
  customOptions: OwlOptions = {
    items:1,
    autoplay:false,
    autoplayTimeout: 5000,
    loop:true,
    nav:true,
    navText:["<img src='assets/client-assets/img/banner/prev.png'>","<img src='assets/client-assets/img/banner/next.png'>"],
    dots:false,
  }
  constructor() { }

  ngOnInit() {
    // this.loadScript('../assets/client-assets/js/owl.carousel.min.js');
    // Search Toggle
    
    $(document).ready(function(){

        /*=================================
        Javascript for banner area carousel
        ==================================*/

        // $(".active-banner-slider").owlCarousel({
        //     items:1,
        //     autoplay:false,
        //     autoplayTimeout: 5000,
        //     loop:true,
        //     nav:true,
        //     navText:["<img src='assets/client-assets/img/banner/prev.png'>","<img src='assets/client-assets/img/banner/next.png'>"],
        //     dots:false,
        // });
      // $(".owl-next").replaceWith("<div class='owl-next'><img src='assets/client-assets/img/banner/next.png'></div>");
      // $(".owl-prev").replaceWith("<div class='owl-prev'><img src='assets/client-assets/img/banner/prev.png'></div>");
    
        /*=================================
        Javascript for product area carousel
        ==================================*/
        // $(".active-product-area").owlCarousel({
        //     items:1,
        //     autoplay:false,
        //     autoplayTimeout: 5000,
        //     loop:true,
        //     nav:true,
        //     navText:["<img src='assets/client-assets/img/product/prev.png'>","<img src='assets/client-assets/img/product/next.png'>"],
        //     dots:false
        // });
    
        /*=================================
        Javascript for single product area carousel
        ==================================*/
        // $(".s_Product_carousel").owlCarousel({
        //   items:1,
        //   autoplay:false,
        //   autoplayTimeout: 5000,
        //   loop:true,
        //   nav:false,
        //   dots:true
        // });
        
        /*=================================
        Javascript for exclusive area carousel
        ==================================*/
        // $(".active-exclusive-product-slider").owlCarousel({
        //     items:1,
        //     autoplay:false,
        //     autoplayTimeout: 5000,
        //     loop:true,
        //     nav:true,
        //     navText:["<img src='assets/client-assets/img/product/prev.png'>","<img src='assets/client-assets/img/product/next.png'>"],
        //     dots:false
        // });
    
        //--------- Accordion Icon Change ---------//
    
      //   $('.collapse').on('shown.bs.collapse', function(){
      //       $(this).parent().find(".lnr-arrow-right").removeClass("lnr-arrow-right").addClass("lnr-arrow-left");
      //   }).on('hidden.bs.collapse', function(){
      //       $(this).parent().find(".lnr-arrow-left").removeClass("lnr-arrow-left").addClass("lnr-arrow-right");
      //   });
    
      // // Select all links with hashes
      // $('.main-menubar a[href*="#"]')
      //   // Remove links that don't actually link to anything
      //   .not('[href="#"]')
      //   .not('[href="#0"]')
      //   .click(function(event) {
      //     // On-page links
      //     if (
      //       location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      //       && 
      //       location.hostname == this.hostname
      //     ) {
      //       // Figure out element to scroll to
      //       var target = $(this.hash);
      //       target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      //       // Does a scroll target exist?
      //       if (target.length) {
      //         // Only prevent default if animation is actually gonna happen
      //         event.preventDefault();
      //         $('html, body').animate({
      //           scrollTop: target.offset().top-70
      //         }, 1000, function() {
      //           // Callback after animation
      //           // Must change focus!
      //           var $target = $(target);
      //           $target.focus();
      //           if ($target.is(":focus")) { // Checking if the target was focused
      //             return false;
      //           } else {
      //             $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
      //             $target.focus(); // Set focus again
      //           };
      //         });
      //       }
      //     }
      //   });
  
      //   $(document).ready(function() {
      //       $('#mc_embed_signup').find('form').ajaxChimp();
      //   });   

      //     $('.quick-view-carousel-details').owlCarousel({
      //         loop: true,
      //         dots: true,
      //         items: 1,
      //     })
   
      //   //-------- Have Cupon Button Text Toggle Change -------//
    
      //   $('.have-btn').on('click', function(e){
      //       e.preventDefault();
      //       $('.have-btn span').text(function(i, text){
      //         return text === "Have a Coupon?" ? "Close Coupon" : "Have a Coupon?";
      //       })
      //       $('.cupon-code').fadeToggle("slow");
      //   });
    
      //   $('.load-more-btn').on('click', function(e){
      //       e.preventDefault();
      //       $('.load-product').fadeIn('slow');
      //       $(this).fadeOut();
      //   });
  
     });

  }

  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

}
