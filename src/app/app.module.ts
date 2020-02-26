import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowProductComponent } from './component/product/show-product/show-product.component';
import { AddProductComponent } from './component/product/add-product/add-product.component';
import { ShowCategoryComponent } from './component/category/show-category/show-category.component';
import { AddCategoryComponent } from './component/category/add-category/add-category.component';
import { ShowPostComponent } from './component/post/show-post/show-post.component';
import { AddPostComponent } from './component/post/add-post/add-post.component';
import { SwaggerComponent } from './component/swagger/swagger.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowProductComponent,
    AddProductComponent,
    ShowCategoryComponent,
    AddCategoryComponent,
    ShowPostComponent,
    AddPostComponent,
    SwaggerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
