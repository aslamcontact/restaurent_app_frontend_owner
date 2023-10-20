import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { MenuComponent } from './components/main/options/menu/menu.component';
import { AddCategoryComponent } from './components/main/options/menu/add-category/add-category.component';
import { RemoveCategoryComponent } from './components/main/options/menu/remove-category/remove-category.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MenuComponent,
    AddCategoryComponent,
    RemoveCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
