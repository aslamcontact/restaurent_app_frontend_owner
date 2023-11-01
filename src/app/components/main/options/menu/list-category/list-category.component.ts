import { JsonPipe } from '@angular/common';
import { Component, Output,EventEmitter } from '@angular/core';
import { Category, MenuApiParserService } from 'src/app/services/api/main/options/menu-api-parser.service';
import { MenuApiService } from 'src/app/services/api/main/options/menu-api.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent {

  @Output() triggerListProduct=new EventEmitter<String>()
  @Output() isEmptyCategory=new EventEmitter<Boolean>()
  displayStyle:String = "none"; 
  listOfCategory:Category[]=[]
  isAllCategoryReq=false
  allCategoryReq:any= {  next:(response:any) =>this.menuCategoryReqPocessing(response),                                                                      
                         error:(error:any) =>this.menuCategoryReqError(error),
                         complete:()=>this.menuCategoryReqComplete()}



  constructor( public menuApi:MenuApiService,
               public parser:MenuApiParserService){
                this.apiCall()
    
  }

  openPopup() { 
  
    this.displayStyle = "block"; 
    
  } 
  closePopup(event:any)
  {
    this.displayStyle=event
    this.apiCall()
  }
  apiCall()
  {
    this.isAllCategoryReq=true
    this.menuApi.getAllCategory().subscribe(this.allCategoryReq)
    
  }
  sentToListCategory(categoryName:String)
  {
    this.triggerListProduct.emit(categoryName)
    this.isEmptyCategory.emit(false)
  }



  private menuCategoryReqPocessing(response:any)
  {
     this.listOfCategory=[]
     response.forEach((category:any)=> 
                         {
                             
                             this.listOfCategory.push(new Category(category.name))
                         }
                     )

     console.log(JSON.stringify(this.listOfCategory))                
       
  }
                      
  private menuCategoryReqError(exception:any)
   {
    this.isAllCategoryReq=false
    console.log("api error "+exception)
   }     
  
  
  
  private menuCategoryReqComplete()
  {
    this.isAllCategoryReq=false
    console.log("api completes ")
    if(this.listOfCategory.length>0)
      this.sentToListCategory(this.listOfCategory[0].getCategoryName())
    else
       this.isEmptyCategory.emit(true)    
   
  }



}
