import { Component } from '@angular/core';
import { AddCategoryComponent } from './add-category/add-category.component';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  
  
  constructor() {}

  displayStyle:String = "none"; 

  openPopup() { 
  
    this.displayStyle = "block"; 
    
  } 


  
  



}
