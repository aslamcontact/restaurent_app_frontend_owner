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

  displayStyle:String = "none"; 
  listOfCategory:Category[]=[]
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
    this.menuApi.getAllCategory().subscribe(this.allCategoryReq)
  }
  sentToListCategory(categoryName:String)
  {
    this.triggerListProduct.emit(categoryName)
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
    console.log("api error "+exception)
   }     
  
  
  
  private menuCategoryReqComplete()
  {
    
    console.log("api completes ")
        
   
  }



}
