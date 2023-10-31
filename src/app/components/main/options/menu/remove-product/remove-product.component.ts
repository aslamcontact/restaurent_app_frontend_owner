
import { Component,Output,Input,EventEmitter, ViewChild,ElementRef} from '@angular/core';
import { Category,Product } from 'src/app/services/api/main/options/menu-api-parser.service';
import { MenuApiParserService } from 'src/app/services/api/main/options/menu-api-parser.service';

import {  MenuApiService } from 'src/app/services/api/main/options/menu-api.service'; 


@Component({
  selector: 'app-remove-product',
  templateUrl: './remove-product.component.html',
  styleUrls: ['./remove-product.component.css']
})
export class RemoveProductComponent {


  @Input()  productToDelete:String = ""; 
  @Input() category:Category|null=null
  @Output()   productRemoved=new EventEmitter<String>()
  @ViewChild('clear',{ read: ElementRef }) clear!: ElementRef<HTMLElement>
  displayStyle:String = "none";
  testOut:any;
  isDeleteProdutReq=false 
  isDeleteProductResSuccess=false
  apiError:String=""
  


  deleteProductReq:any= {  next:(response:any) =>this.deleteProductReqPocessing(response),                                                                      
                          error:(error:any) =>this.deleteProductReqError(error),
                         complete:()=>this.deleteProductReqComplete()}
 
  constructor( public menuApi:MenuApiService,
               public parser:MenuApiParserService) {
                
                 }

                 test()
                 {
                  this.category?.setProduct(new Product("aslam",4,5))
                  console.log(this.category?.getProductList())
                 }

    openPopup() { 
  
                  this.displayStyle = "block"; 
                  
                } 

  closePopup() {  
         this.apiError=''
         this.deleteProductReq=false
         this.isDeleteProductResSuccess=false
         this.productRemoved.emit('removed')
          this.clear.nativeElement.click()
        
         
  
          } 


  
  removeProduct()
  {
     this.isDeleteProdutReq=true
     this.isDeleteProductResSuccess=false
     let body:any
     
     let result:Product[]|undefined
     let newCategory:Category    
       result= this.category?.getProductList()
                   .filter(product=>product.getProductName()!==this.productToDelete)
            
      if(this.category&&result!==undefined)
      {
         newCategory=new Category(this.category.getCategoryName())
         newCategory.setProductList(result)
         body=this.parser.categoryToApi(newCategory)
         this.menuApi.updateCategory(body).subscribe(this.deleteProductReq)
      }  
      else
      {
        this.apiError=" is already used,use different name"
        this.isDeleteProdutReq=false
          
      }   
        
   
     
    
  } 


  
  
  
  private deleteProductReqPocessing(response:any)
  {
    
     this.apiError=''
     
     let testCategory:Category=this.parser.apiToCategory(response)
     this.testOut=JSON.stringify(testCategory)
                    
     
  }
                      
  private deleteProductReqError(exception:any)
   {
  
    this.apiError=exception.apiErrorMessage()
    this.isDeleteProductResSuccess=false
    
   }     
  
  
  
  private deleteProductReqComplete()
  {  
   this.isDeleteProductResSuccess=true   
   this.isDeleteProdutReq=false
   this.closePopup()
  }



}
