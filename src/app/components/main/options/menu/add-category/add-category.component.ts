import { CurrencyPipe, JsonPipe } from '@angular/common';
import { Component,Output,Input,EventEmitter, ViewChild,ElementRef} from '@angular/core';
import { Category,Product } from 'src/app/services/api/main/options/menu-api-parser.service';
import { MenuApiParserService } from 'src/app/services/api/main/options/menu-api-parser.service';

import {  MenuApiService } from 'src/app/services/api/main/options/menu-api.service'; 

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})

export class AddCategoryComponent {

  @Input()  displayStyle:String = "none"; 
  @Output()   displayClose=new EventEmitter<String>()
  @ViewChild('clear',{ read: ElementRef }) clear!: ElementRef<HTMLElement>
  testOut:any;
  isCategoryReq=false 
  isCategorySuccess=false
  apiError:String=""
  
  addNewCategory={
    categoryName:"",
    productName:"",
    productPrice:0 ,
    productQty:0
  }

  addCategoryReq:any= {  next:(response:any) =>this.menuCategoryReqPocessing(response),                                                                      
                         error:(error:any) =>this.menuCategoryReqError(error),
                         complete:()=>this.menuCategoryReqComplete()}
 
  constructor( public menuApi:MenuApiService,
               public parser:MenuApiParserService) {  }


  closePopup() {  
         this.apiError=''
         this.isCategorySuccess=false
         this.displayClose.emit('none')
          this.clear.nativeElement.click()
         
         this.addNewCategory.productName=""
         this.addNewCategory.categoryName=""
         this.addNewCategory.productPrice=0
         this.addNewCategory.productQty=0
  
          } 


  
  addCategory()
  {
     this.isCategoryReq=true
     this.isCategorySuccess=false
     let body:any
     let category:any
     category=new Category( this.addNewCategory.categoryName,
                            new Product( this.addNewCategory.productName,
                                        this.addNewCategory.productPrice,
                                        this.addNewCategory.productQty))
                                            
           body= this.parser.categoryToApi(category)
        this.menuApi.setCategory(body).subscribe(this.addCategoryReq)
        
   
     
    
  } 


  
  
  
  private menuCategoryReqPocessing(response:any)
  {
    
     this.apiError=''
     
     let testCategory:Category=this.parser.apiToCategory(response)
     this.testOut=JSON.stringify(testCategory)
                    
     
  }
                      
  private menuCategoryReqError(exception:any)
   {
  
    this.apiError=exception.apiErrorMessage()
    this.isCategoryReq=false
    
   }     
  
  
  
  private menuCategoryReqComplete()
  {  
   this.isCategorySuccess=true   
   this.isCategoryReq=false
   this.closePopup()
  }







}