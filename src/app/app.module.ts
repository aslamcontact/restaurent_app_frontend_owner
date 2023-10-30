import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { MenuComponent } from './components/main/options/menu/menu.component';
import { AddCategoryComponent } from './components/main/options/menu/add-category/add-category.component';
import { RemoveCategoryComponent } from './components/main/options/menu/remove-category/remove-category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MenuApiService } from './services/api/main/options/menu-api.service';
import {  HttpClientModule } from '@angular/common/http';
import { MenuApiParserService } from './services/api/main/options/menu-api-parser.service';
import { ListCategoryComponent } from './components/main/options/menu/list-category/list-category.component';
import { AddImageComponent } from './components/main/options/menu/add-image/add-image.component';
import { ListProductsComponent } from './components/main/options/menu/list-products/list-products.component';
import { AddProductComponent } from './components/main/options/menu/add-product/add-product.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MenuComponent,
    AddCategoryComponent,
    RemoveCategoryComponent,
    ListCategoryComponent,
    AddImageComponent,
    ListProductsComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
      ],
  providers: [MenuApiService,MenuApiParserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
