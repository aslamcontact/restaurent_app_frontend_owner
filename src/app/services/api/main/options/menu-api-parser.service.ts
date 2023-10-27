import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})



export class MenuApiParserService {

  constructor() { }


  apiToCategory(body:any):Category
  {
      let categoryName:String;
      let productList:Product[]=[]
      let newCategory:Category

      categoryName=body.name;
      body.categories
          .forEach(  (pro:any)=>
                       {
                        productList.push(new Product(pro.value,pro.price,pro.quantity))
                       }
                     
                  )
     newCategory=new Category(categoryName)      
     newCategory.setProductList(productList)
     return newCategory
  }


  categoryToApi(category:Category):any
  {
       let cat:CategoriesInterface[]=[]
       
       let body =  { name : '',
                     brand : 'testproduct1',
                     descriptions : [ ],
                     about : {},
                     categoryName : '',
                     categories : cat 
      } ;

          
         body.name=category.getCategoryName() as string
        category.getProductList().forEach(
              (product)=>
              {
                  
                    body.categories.push({value:product.getProductName() as string,
                                          price:product.getProductPrice(),
                                          quantity:product.getProductqty()})
              }
                                )   
                                
       return body                        

  }

}

interface CategoriesInterface{
  value:string
  price:Number
  quantity:Number

}


export class Category
{
 private categoryName:String=""
 private productList:Product[]=[]  
  constructor(categoryName:String,product?:Product){
    this.categoryName=categoryName
    if(product!=undefined)
    this.productList.push(product)
   
  }
  
  getCategoryName():String
  {
    return this.categoryName
  }
  getProductList():Product[]
  {
     return this.productList
  }
  setProductList(productList:Product[])
  {
    this.productList=productList
  }
  setProduct(newProduct:Product):Boolean
  {  let found:Product|undefined
     found=this.productList
               .find((prod)=>prod
                             .getProductName()===newProduct
                                                .getProductName())
   if(found===undefined){                        
     this.productList.push(newProduct)
     return true
   }
     return false
  }
  getProductByName(productName:String)
  {
    let found:Product|undefined
    found= this.productList.find((prod)=>prod
                                        .getProductName()===productName)
    return found
  }


}
export class Product
{
  private productName:String
  private productPrice:Number
  private productQty:Number
  constructor( productName:String,
               productPrice:Number,
               productQty:Number
               ){
             this.productName=productName
             this.productPrice=productPrice             
             this.productQty=productQty

               }

     getProductName():String
     {
        return this.productName
     }
     setProductName(productName:String)
     {
       this.productName=productName
     }
     
     setProductPrice(productPrice:Number)
     {
       this.productPrice=productPrice
     }

     getProductPrice():Number
     {
        return this.productPrice
     }

     setProductQty(productQty:Number)
     {
       this.productQty=productQty
     }

     getProductqty():Number
     {
        return this.productQty
     }

     
}
