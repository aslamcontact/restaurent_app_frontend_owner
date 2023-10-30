import { Component,Output,Input,EventEmitter, ViewChild,ElementRef} from '@angular/core';
import { Category,Product } from 'src/app/services/api/main/options/menu-api-parser.service';
import { MenuApiParserService } from 'src/app/services/api/main/options/menu-api-parser.service';

import {  MenuApiService } from 'src/app/services/api/main/options/menu-api.service'; 

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {


  @Input()  displayStyle:String = "none"; 
  @Input() category:Category|null=null
  @Output()   displayClose=new EventEmitter<String>()
  @ViewChild('clear',{ read: ElementRef }) clear!: ElementRef<HTMLElement>
  testOut:any;
  isProdutReq=false 
  isProductResSuccess=false
  apiError:String=""
  
  addNewProduct={
    categoryName:this.category?.getCategoryName(),
    productName:"",
    productPrice:0 ,
    productQty:0
  }

  addProductReq:any= {  next:(response:any) =>this.addProductReqPocessing(response),                                                                      
                         error:(error:any) =>this.addProductReqError(error),
                         complete:()=>this.addProductReqComplete()}
 
  constructor( public menuApi:MenuApiService,
               public parser:MenuApiParserService) {
                
                 }

                 test()
                 {
                  this.category?.setProduct(new Product("aslam",4,5))
                  console.log(this.category?.getProductList())
                 }


  closePopup() {  
         this.apiError=''
         this.isProductResSuccess=false
         this.displayClose.emit('none')
          this.clear.nativeElement.click()
         this.addNewProduct.productName=""
         this.addNewProduct.productPrice=0
         this.addNewProduct.productQty=0
         
  
          } 


  
  addProduct()
  {
     this.isProdutReq=true
     this.isProductResSuccess=false
     let body:any
     let isSameProductName:Boolean=false
     this.category?.getProductList()
                   .forEach(product => {

                    if(product.getProductName()===this.addNewProduct.productName)
                      isSameProductName=true             
                   });
if(!isSameProductName){
    let newProduct:Product=new Product( this.addNewProduct.productName,
                                         this.addNewProduct.productPrice,
                                         this.addNewProduct.productQty)
          let newCategory:Category
            if(this.category){                            
                newCategory=new Category(this.category.getCategoryName());
                newCategory.setProductList(this.category.getProductList()) 
                newCategory.setProduct(newProduct)
                body= this.parser.categoryToApi(newCategory)
            }
            
           
        this.menuApi.updateCategory(body).subscribe(this.addProductReq)
    }else {
      this.apiError=this.addNewProduct.productName+" is already used,use different name"
      this.isProdutReq=false
    }
   
     
    
  } 


  
  
  
  private addProductReqPocessing(response:any)
  {
    
     this.apiError=''
     
     let testCategory:Category=this.parser.apiToCategory(response)
     this.testOut=JSON.stringify(testCategory)
                    
     
  }
                      
  private addProductReqError(exception:any)
   {
  
    this.apiError=exception.apiErrorMessage()
    this.isProductResSuccess=false
    
   }     
  
  
  
  private addProductReqComplete()
  {  
   this.isProductResSuccess=true   
   this.isProdutReq=false
   this.closePopup()
  }





}
