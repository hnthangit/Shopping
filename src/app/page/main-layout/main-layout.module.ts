import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MainLayoutRoutingModule } from "./main-layout-routing.module";
import { MainLayoutComponent } from "./main-layout.component";
import { ShowManufacturerComponent } from "src/app/component/manufacturer/show-manufacturer/show-manufacturer.component";
import { AddManufacturerComponent } from "src/app/component/manufacturer/add-manufacturer/add-manufacturer.component";
import { EditManufacturerComponent } from 'src/app/component/manufacturer/edit-manufacturer/edit-manufacturer.component';
import { ShowProductComponent } from "src/app/component/product/show-product/show-product.component";
import { AddProductComponent } from "src/app/component/product/add-product/add-product.component";
import { EditProductComponent } from 'src/app/component/product/edit-product/edit-product.component';
import { ShowCategoryComponent } from "src/app/component/category/show-category/show-category.component";
import { AddCategoryComponent } from "src/app/component/category/add-category/add-category.component";
import { ShowPostComponent } from "src/app/component/post/show-post/show-post.component";
import { AddPostComponent } from "src/app/component/post/add-post/add-post.component";
import { PaginatorComponent } from 'src/app/component/paginator/paginator.component';
import { MatTableModule } from "@angular/material/table";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { CdkTableModule } from "@angular/cdk/table";
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalSmComponent } from 'src/app/component/modal-sm/modal-sm.component';

@NgModule({
  declarations: [
    ShowManufacturerComponent,
    AddManufacturerComponent,
    EditManufacturerComponent,
    ShowProductComponent,
    AddProductComponent,
    EditProductComponent,
    ShowCategoryComponent,
    AddCategoryComponent,
    ShowPostComponent,
    AddPostComponent,
    MainLayoutComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    PaginatorComponent,
  ],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    MatTableModule,
    CdkTableModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    EditorModule,
    NgbModule,
  ],
  entryComponents:[
    ModalSmComponent
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ]
})
export class MainLayoutModule { }
