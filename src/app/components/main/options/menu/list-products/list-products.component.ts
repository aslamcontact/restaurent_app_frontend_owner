import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category, MenuApiParserService, Product } from 'src/app/services/api/main/options/menu-api-parser.service';
import { MenuApiService } from 'src/app/services/api/main/options/menu-api.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent {
  @Input() isEmptyCategory:boolean=true
  displayStyle:String = "none";
  category:Category|null=null
  categoryName:String=""
  productList:Product[]=[]
  apiError:String=""
  isAllProductReq:Boolean=false
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
  categoryEmpty(event:any)
  {
       this.isEmptyCategory=event
      if(this.isEmptyCategory===true) this.productList=[]
  }
  
  apiCall(category:String)
  {
       this.apiError=''
              this.isAllProductReq=true
       this.menuApi
           .getProductsByCategory(category)
           .subscribe(this.allProductReq)
  }




  private allProductReqPocessing(response:any)
  {
    
     
      this.category= this.parser.apiToCategory(response)
      this.categoryName=this.category.getCategoryName()
      this.productList=this.category.getProductList()
              
       
  }
                      
  private allProductReqError(exception:any)
   {
    this.isAllProductReq=false
    this.apiError=exception
    console.log("api error "+exception)
   }     
  
  
  
  private allProductReqComplete()
  {
    this.isAllProductReq=false
    
    console.log("api completes ")
        
   
  }

}
