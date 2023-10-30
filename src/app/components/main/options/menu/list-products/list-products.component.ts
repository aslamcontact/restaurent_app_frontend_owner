import { Component, EventEmitter, Output } from '@angular/core';
import { Category, MenuApiParserService, Product } from 'src/app/services/api/main/options/menu-api-parser.service';
import { MenuApiService } from 'src/app/services/api/main/options/menu-api.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent {
  @Output() triggerList=new EventEmitter<String>()
  displayStyle:String = "none";

  category:Category|null=null
  categoryName:String=""
  productList:Product[]=[]

  allProductReq:any= {  next:(response:any) =>this.allProductReqPocessing(response),                                                                      
                        error:(error:any) =>this.allProductReqError(error),
                        complete:()=>this.allProductReqComplete()}
  constructor(public menuApi:MenuApiService,
              public parser:MenuApiParserService)
  {
    
  }

  openPopup() { 
  
    this.displayStyle = "block"; 
    
  } 
  closePopup(event:any)
  {
    this.displayStyle=event
    this.apiCall(this.categoryName)
  }

  apiCall(category:String)
  {
       this.menuApi
           .getProductsByCategory(category)
           .subscribe(this.allProductReq)
  }




  private allProductReqPocessing(response:any)
  {
    // this.listOfCategory=[]
    // response.forEach((category:any)=> 
                        // {
                             
                            // this.listOfCategory.push(new Category(category.name))
                        // }
                     //)

    // console.log(JSON.stringify(this.listOfCategory))   
     
      this.category= this.parser.apiToCategory(response)
      this.categoryName=this.category.getCategoryName()
      this.productList=this.category.getProductList()
              
       
  }
                      
  private allProductReqError(exception:any)
   {
    console.log("api error "+exception)
   }     
  
  
  
  private allProductReqComplete()
  {
    
    console.log("api completes ")
        
   
  }

}
