import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowManufacturerComponent } from 'src/app/component/manufacturer/show-manufacturer/show-manufacturer.component';
import { ShowProductComponent } from 'src/app/component/product/show-product/show-product.component';
import { ShowCategoryComponent } from 'src/app/component/category/show-category/show-category.component';
import { MainLayoutComponent } from './main-layout.component';
import { AddManufacturerComponent } from 'src/app/component/manufacturer/add-manufacturer/add-manufacturer.component';
import { AddProductComponent } from 'src/app/component/product/add-product/add-product.component';
import { AddCategoryComponent } from 'src/app/component/category/add-category/add-category.component';
import { EditManufacturerComponent } from 'src/app/component/manufacturer/edit-manufacturer/edit-manufacturer.component';
import { EditProductComponent } from 'src/app/component/product/edit-product/edit-product.component';
import { AuthGuard } from 'src/app/auth/auth.guard';


const routes: Routes = [
  {
    path: 'admin', component: MainLayoutComponent,
    // canActivate: [AuthGuard],
    data: { animation: 'MainLayout'},
    children: [
      {
        path: 'manufacturers',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            data: { animation: 'ShowManfacturer'},
            component: ShowManufacturerComponent,
          },
          {
            path: 'add',
            data: { animation: 'AddManufacturer'},
            component: AddManufacturerComponent,
          },
          {
            path: 'edit/:id',
            data: { animation: 'EditManufacturer'},
            component: EditManufacturerComponent,
          },
        ]
      },
      {
        path: 'products',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            data: { animation: 'ShowProduct'},
            component: ShowProductComponent,
          },
          {
            path: 'add',
            data: { animation: 'AddProduct'},
            component: AddProductComponent,
          },
          {
            path: 'edit/:id',
            data: { animation: 'EditProduct'},
            component: EditProductComponent,
          },
        ]
      },
      {
        path: 'categories',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            data: { animation: 'MainLayout'},
            component: ShowCategoryComponent,
          },
          {
            path: 'add',
            data: { animation: 'MainLayout'},
            component: AddCategoryComponent,
          },
          {
            path: 'edit',
            data: { animation: 'MainLayout'},
            component: AddCategoryComponent,
          },
        ]
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
