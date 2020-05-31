import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ManufacturerService } from 'src/app/service/manufacturer.service';
import { CategoryService } from 'src/app/service/category.service';
import { FileService } from 'src/app/service/file.service';
import { PromotionService } from 'src/app/service/promotion.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.css']
})
export class AddPromotionComponent implements OnInit {

  dateValidator = () => {      //factory function
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      let selectDate = new Date(control.value.year, control.value.month - 1, control.value.day);
      if (currentDate > selectDate) {
        return { 'dateValidator': true }
      }
      return null;
    };
  }
  public manufacturers = [];
  public categories = [];

  public startDate = "";
  public endDate = "";
  public isPercent: boolean = true;
  public selectedProducts = [];
  public applyType = "CATEGORY";

  public selectedId;

  public imagePath;
  imgURL: any;

  private formData = new FormData();

  constructor(
    private fb: FormBuilder,
    private parserFormatter: NgbDateParserFormatter,
    private categoryService: CategoryService,
    private manufacturerService: ManufacturerService,
    private fileService: FileService,
    private promotionServe: PromotionService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getSelectBoxValue();
  }

  promotionForm = this.fb.group({
    name: ['', Validators.required],
    startDate: ['', [Validators.required, this.dateValidator()]],
    endDate: ['', [Validators.required, this.dateValidator()]],
    discountPercent: ['', [Validators.pattern('^[1-9][0-9]?$|^100$'), Validators.required]],
    discountNumber: [''],
    image: [''],
    type: ['CATEGORY'],
    typeId: [0],
  });

  onSubmit = () => {
    this.promotionForm.patchValue({
      startDate: this.startDate,
      endDate: this.endDate,
    })
    this.fileService.uploadImage(this.formData).subscribe(
      response1 => {
        //console.log(response['data']);
        if (response1['data'] != null) {
          this.promotionForm.patchValue({
            image: response1['data'],
          });
        }
        //console.log(this.productForm.value);
        this.promotionServe.addPromotion(this.promotionForm.value).subscribe(
          response2 => {
            this.promotionServe.addPromotionDetail(response2['data'], this.applyType, this.selectedId).subscribe(
              response3 => {
                this.showSuccess();
                this.router.navigate(['/admin/promotions']);
              }
            )

          });
      }
    )
  }

  showSuccess() {
    this.toastr.success("Add Promotion Success", 'Notification', {
      closeButton: true,
      enableHtml: true,
    });
  }

  onFileSelect(event) {
    this.previewImg(event.target.files[0]);
    this.formData.set('file', event.target.files[0]);
  }

  previewImg(file) {
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  deleteImage() {
    this.imgURL = null;
    this.formData.set('file', null);
  }

  onStartDateSelect = ($event) => {
    let date = this.parserFormatter.format(this.promotionForm.value.startDate);
    this.startDate = date;
  }

  onEndDateSelect = ($event) => {
    let date = this.parserFormatter.format(this.promotionForm.value.endDate);
    this.endDate = date;
  }

  selectManufacturer = ($event) => {
    this.selectedId = $event.target.value;
    this.promotionForm.patchValue({
      typeId: $event.target.value,
    })
  }

  selectCategory = ($event) => {
    this.selectedId = $event.target.value;
    this.promotionForm.patchValue({
      typeId: $event.target.value,
    })
  }

  onApplyTypeChange = ($event) => {
    let applyType = $event.target.value;
    this.applyType = applyType;
    this.promotionForm.patchValue({
      type: applyType
    })
  }

  onDiscountTypeChange = ($event) => {
    let discountType = $event.target.value;
    if (discountType == "PERCENT") {
      this.isPercent = true;
      this.promotionForm.patchValue({
        discountNumber: ''
      })

      this.promotionForm.get('discountPercent').setValidators([Validators.pattern('^[1-9][0-9]?$|^100$'), Validators.required]);
      this.promotionForm.get('discountPercent').updateValueAndValidity();
      this.promotionForm.get('discountNumber').clearValidators();
      this.promotionForm.get('discountNumber').updateValueAndValidity();
    } else {
      this.isPercent = false;
      this.promotionForm.patchValue({
        discountPercent: ''
      })

      this.promotionForm.get('discountPercent').clearValidators();
      this.promotionForm.get('discountPercent').updateValueAndValidity();
      this.promotionForm.get('discountNumber').setValidators([Validators.pattern('[1-9][0-9]*'), Validators.required]);
      this.promotionForm.get('discountNumber').updateValueAndValidity();
    }
  }

  getSelectBoxValue = () => {
    this.manufacturerService.getManufacturerSelect().subscribe(response => {
      this.manufacturers = response;
    })
    this.categoryService.getCategorySelect().subscribe(response => {
      this.categories = response;
    })
  }




}
