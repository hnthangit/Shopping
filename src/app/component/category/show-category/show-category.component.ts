import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginatorComponent } from '../../paginator/paginator.component';
import { manufacturer } from 'src/app/model/manufacturer';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManufacturerService } from 'src/app/service/manufacturer.service';
import { FormBuilder } from '@angular/forms';
import { ModalSmComponent } from '../../modal-sm/modal-sm.component';

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.css']
})
export class ShowCategoryComponent implements OnInit {

  @ViewChild(PaginatorComponent, {static: true}) paginator: PaginatorComponent;

  public manufacturers: manufacturer[];
  public columnsToDisplay: string[] = ['id', 'name', 'description', 'address', 'action'];
  public totalPage: number;
  public currentPage: number;
  public entries: number;

  constructor(private manufacturerService: ManufacturerService, private fb: FormBuilder, private toastr: ToastrService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getAllManufacturersInit(0, 5, '', '');
    this.entries = 5;
  }

  manufacturerForm = this.fb.group({
    name: [''],
    address: [''],
  })

  onSubmit = (values) => {
    this.manufacturerService.getAllManufacturers(0, this.entries, this.manufacturerForm.value.name, this.manufacturerForm.value.address).subscribe(response => {
      this.manufacturers = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
      this.paginator.createListPage(0, this.totalPage);
    });
  }

  onChange = (value) => {
    this.entries=value;
    this.manufacturerService.getAllManufacturers(0, this.entries, this.manufacturerForm.value.name, this.manufacturerForm.value.address).subscribe(response => {
      this.manufacturers = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
      this.paginator.createListPage(0, this.totalPage);
    });
  }

  onPageChanged = (pageNumber: number) => {
    console.log("gia tri la"+pageNumber);
    this.getAllManufacturers(pageNumber, this.entries, this.manufacturerForm.value.name, this.manufacturerForm.value.address);
  }

  showSuccess() {
    this.toastr.success('Delete Success!', 'Notification', {
      closeButton: true,
      timeOut: 500000,
      enableHtml: true,
      disableTimeOut: true,
    });
  }

  delete = (manufacturerId: number, manufacturerName: string) => {
    // let isDelete = confirm("Do you want delete this item");
    // if (isDelete == true) {
    //   console.log("true");
      // this.manufacturerService.deleteManufacturer(manufacturerId).subscribe(
      //   response => {
      //     this.showSuccess();
      //     this.manufacturerService.getAllManufacturers(0, this.entries, this.manufacturerForm.value.name, this.manufacturerForm.value.address).subscribe(response => {
      //       this.manufacturers = response.data.list;
      //       this.totalPage = response.data.totalPage;
      //       this.currentPage = response.data.currentPage;
      //     });
      //   },
    //     error => {
    //       alert("Can't delete, this item have another product")
    //     });
    //   ;

    // }
    const modalRef = this.modalService.open(ModalSmComponent);
    modalRef.componentInstance.title = `Do you want delete '${manufacturerName}'`;
    modalRef.componentInstance.content = 'This action cannot be undone';
    modalRef.result.then(
      result => {
        if(result) {
          this.toastr.info(`Deleting...`, 'Notification', {
            closeButton: true,
            timeOut: 500000,
            enableHtml: true,
            disableTimeOut: true,
          });
          this.manufacturerService.deleteManufacturer(manufacturerId).subscribe(
            response => {
              this.showSuccess();
              this.manufacturerService.getAllManufacturers(0, this.entries, this.manufacturerForm.value.name, this.manufacturerForm.value.address).subscribe(response => {
                this.manufacturers = response.data.list;
                this.totalPage = response.data.totalPage;
                this.currentPage = response.data.currentPage;
              });
            },
            error => {
              this.toastr.error(`Can't delete, this item have another product`, 'Error!', {
                closeButton: true,
                timeOut: 500000,
                enableHtml: true,
                disableTimeOut: true,
              });
            });
        }
      }
    )
  }

  resetForm = () => {
    this.manufacturerForm.reset({
      name: [''],
      address: [''],
    })
  }

  getAllManufacturers = (pageNumber: number, size: number, manufacturerName: string, manufacturerAddress: string): any => {
    this.manufacturerService.getAllManufacturers(pageNumber, size, manufacturerName, manufacturerAddress).subscribe(response => {
      this.manufacturers = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
    });
  }

  getAllManufacturersInit = (pageNumber: number, size: number, manufacturerName: string, manufacturerAddress: string): any => {
    this.manufacturerService.getAllManufacturers(pageNumber, size, manufacturerName, manufacturerAddress).subscribe(response => {
      this.manufacturers = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
      this.paginator.createListPage(0, this.totalPage);
    });
  }

  totalPageArray(number: number): any[] {
    return Array(number);
  }

}
