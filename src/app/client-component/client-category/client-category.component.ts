import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-client-category',
  templateUrl: './client-category.component.html',
  styleUrls: ['./client-category.component.css']
})
export class ClientCategoryComponent implements OnInit {

  public isCollapsed = false;

  
  public page = 20;

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $('select').niceSelect();
  
      //--------- Accordion Icon Change ---------//
  
      $('.collapse').on('shown.bs.collapse', function(){
          $(this).parent().find(".lnr-arrow-right").removeClass("lnr-arrow-right").addClass("lnr-arrow-left");
      }).on('hidden.bs.collapse', function(){
          $(this).parent().find(".lnr-arrow-left").removeClass("lnr-arrow-left").addClass("lnr-arrow-right");
      });
  
    // Select all links with hashes
    $('.main-menubar a[href*="#"]')
      // Remove links that don't actually link to anything
      .not('[href="#"]')
      .not('[href="#0"]')
      .click(function(event) {
        // On-page links
        if (
          location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
          && 
          location.hostname == this.hostname
        ) {
          // Figure out element to scroll to
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
              scrollTop: target.offset().top-70
            }, 1000, function() {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) { // Checking if the target was focused
                return false;
              } else {
                $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              };
            });
          }
        }
      });

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

}
