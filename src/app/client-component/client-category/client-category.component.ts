import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ClientCategoryService } from 'src/app/service/client-category.service';
import { serverUrl } from 'src/app/constant/constant';
declare var $: any;

@Component({
  selector: 'app-client-category',
  templateUrl: './client-category.component.html',
  styleUrls: ['./client-category.component.css']
})
export class ClientCategoryComponent implements OnInit {

  public isCollapsed = false;
  public products = [];
  public category = [];
  public manufacturer = [];
  public someRange=[6, 7];

  public totalPage: number;
  public currentPage: number;
  public currentPageDisplay: number = 1;
  public page = 20;
  public entries: number;
  public url = `${serverUrl}images/`;
  public collectionSize: number;

  constructor(
    private fb: FormBuilder,
    private clientCategoryService: ClientCategoryService,
  ) { }

  ngOnInit() {
    $(document).ready(function(){
  
    //   //--------- Accordion Icon Change ---------//
  
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


   });
   this.entries = 12;
   this.getAllProductsInit(1, 12, '', 0, 0, 0, 0, 0);
  }

  form1 = this.fb.group({
    single: [[ 0, 100 ]],
  })

  productForm = this.fb.group({
    name: [''],
    priceFrom: [''],
    priceTo: [''],
    manufacturerId: [0],
    categoryId: [0],
    sortBy: [0],
  });
  

  onChange= ($event) => {
    console.log($event.target.value);
  }

  logForm1 = () => {
    console.log(this.form1.value)
  }

  onSortChange = ($event) => {
    //console.log($event.target.value);
    this.productForm.patchValue({
      sortBy: $event.target.value
    })

    this.getAllProducts(0, this.entries, this.productForm.value.name, this.productForm.value.priceFrom, this.productForm.value.priceTo, this.productForm.value.manufacturerId, this.productForm.value.categoryId, this.productForm.value.sortBy);
  }

  onEntriesChange = ($event) => {
    this.entries = $event.target.value;
    this.clientCategoryService.getAllProducts(0, this.entries, this.productForm.value.name, this.productForm.value.priceFrom, this.productForm.value.priceTo, this.productForm.value.manufacturerId, this.productForm.value.categoryId, this.productForm.value.sortBy).subscribe(response => {
      this.products = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
      this.currentPageDisplay = this.currentPage+1;
    });;
  }

  onPageChanged = (pageNumber: number) => {
    //console.log("gia tri la"+pageNumber);
    this.getAllProducts(pageNumber-1, this.entries, this.productForm.value.name, this.productForm.value.priceFrom, this.productForm.value.priceTo, this.productForm.value.manufacturerId, this.productForm.value.categoryId, this.productForm.value.sortBy);
  }

  getAllProducts = (pageNumber: number, size: number, productName: string, priceFrom: number, priceTo: number, manufacturerId: number, categoryId: number, sortBy: number): any => {
    this.clientCategoryService.getAllProducts(pageNumber, size, productName, priceFrom, priceTo, manufacturerId, categoryId, sortBy).subscribe(response => {
      this.products = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
    });
  }

  getAllProductsInit = (pageNumber: number, size: number, productName: string, priceFrom: number, priceTo: number, manufacturerId: number, categoryId: number, sortBy: number): any => {
    this.clientCategoryService.getAllProducts(pageNumber - 1, size, productName, priceFrom, priceTo, manufacturerId, categoryId, sortBy).subscribe(response => {
      this.products = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
      this.collectionSize = this.entries * this.totalPage;
      //this.paginator.createListPage(0, this.totalPage);
    });
  }
}
