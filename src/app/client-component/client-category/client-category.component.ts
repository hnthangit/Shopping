import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-client-category',
  templateUrl: './client-category.component.html',
  styleUrls: ['./client-category.component.css']
})
export class ClientCategoryComponent implements OnInit {

  public isCollapsed = false;

  public someRange=[6, 7];
  public page = 20;

  constructor(
    private fb: FormBuilder,
  ) { }

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


   });
  }

  form1 = this.fb.group({
    single: [[ 2, 8 ]],
  })
  

  onChange= ($event) => {
    console.log($event.target.value);
  }

}
