import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ManufacturerService } from 'src/app/service/manufacturer.service';
import { CategoryService } from 'src/app/service/category.service';
import { manufacturer } from 'src/app/model/manufacturer';
import { category } from 'src/app/model/category';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  public manufacturers: manufacturer[];
  public categories: category[];
  public images = [];
  public mainImage;
  private formData = new FormData();
  public url = "http://localhost:8080/shopping/images/";

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private manufacturerService: ManufacturerService,
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
    this.getProductInfo();
    this.getSelectBoxValue();
  }

  productInfoForm = this.fb.group({
    id: 0,
    name: ['', Validators.required],
    shortDescription: [''],
    fullDescription: [''],
    sku: [''],
    price: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
    manufacturerEntity: this.fb.group({
      id: ['', Validators.required]
    }),
    categoryEntity: this.fb.group({
      id: ['', Validators.required],
    }),

  });

  productSeoForm = this.fb.group({
    id: 0,
    url: ['', Validators.required],
    metaTitle: [''],
    metaKeyword: [''],
    metaDescription: [''],
  });

  productImageForm = this.fb.group({
    id: 0,
    image: [''],
  });

  getSelectBoxValue = () => {
    this.manufacturerService.getManufacturerSelect().subscribe(response => {
      this.manufacturers = response;
    })
    this.categoryService.getCategorySelect().subscribe(response => {
      this.categories = response;
    })
  }

  onSubmitInfo(values) {

    this.productService.updateProduct(values).subscribe(response => {
      this.showSuccess();
      this.router.navigate(['products']);
    });
  }

  onOptionsSelected(event) {
    let value = event.target.value;
    this.productInfoForm.patchValue({
      manufacturerEntity: {
        id: value,
      }
    });
    console.log(value);
  }

  onFileSelect(event) {
    //this.selectedFile = event.target.files[0];
    this.formData.append('files', event.target.files[0]);
  }

  showSuccess() {
    this.toastr.success('Update Prodct Success!', 'Notification', {
      closeButton: true,
    });
  }

  reset = () => {
    this.productInfoForm.reset();
  }

  sortImage = () => {
    return this.images.sort((a, b) => a.id - b.id);
  }

  getProductInfo = () => {
    const productId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.getOneProduct(productId).subscribe(response => {

      this.productInfoForm.patchValue({
        id: response['data'].id,
        name: response['data'].name,
        price: response['data'].price,
        sku: response['data'].sku,

        shortDescription: response['data'].shortDescription,
        fullDescription: response['data'].fullDescription,
        manufacturerEntity: {
          id: response['data'].manufacturerEntity.id
        },
        categoryEntity: {
          id: response['data'].categoryEntity.id
        },
      });

      this.productSeoForm.patchValue({
        id: response['data'].id,
        url: response['data'].url,
        metaTitle: response['data'].metaTitle,
        metaKeyword: response['data'].metaKeyword,
        metaDescription: response['data'].metaDescription,
      });

      this.productImageForm.patchValue({
        id: response['data'].id,
        image: response['data'].image,
      })

      this.images = response['data'].productImageSet;
      this.mainImage = response['data'].image;
    });
  }

}
