import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MenuApiService {

  private url:String="http://194.163.40.229:8088/api/v1/product/"
 // private url:String="http://localhost:8080/api/v1/product/"
  //"http://194.163.40.229:8088/api/v1/product/image/biryani/costal/"+this.productName
  
  private shopName:string="server"

  constructor(private http:HttpClient) { }  

    getShopName()
    {
       return this.shopName
    }
    
                         
      
  setCategory(body:any)
  {
    let path:string=this.url+"single";
    const headers = {'Content-Type':'application/json'};
      
             return   this.http
                    .post<any>(encodeURI(path),body,{headers})
                    .pipe( catchError(this.setCategoryhandler) );


  }

  updateCategory(body:any)
  {
    let path:string=this.url+"single";
    const headers = {'Content-Type':'application/json'};
      
             return   this.http
                    .put<any>(encodeURI(path),body,{headers})
                    .pipe( catchError(this.setCategoryhandler) );


  }
  removeCategory(categoryName:String)
  {
    let path:string=this.url+(categoryName as string)+"/"+this.shopName;
    console.log(path)
    return   this.http
    .delete<any>(encodeURI(path))
    .pipe( catchError(this.handleError) );

  }

  getAllCategory():any
  {
    let path:string=this.url+"filter/"+this.shopName;
         
    
        console.log(path)
             return   this.http
                    .get(encodeURI(path))
                    .pipe( catchError(this.handleError) );


  }
  
   getProductsByCategory(category:String) 
       {
        //http://194.163.40.229:8088/api/v1/product/gravy/testproduct1
         let path:string=""+this.url+category+"/"+this.shopName as string;
         console.log(path)
             return this.http
                         .get(encodeURI(path))
                         .pipe( catchError(this.handleError) );
       }

     
       getImage( 
                 category:String,
                 productName:String
              )
       {
         let path:string=""+this.url+"image/"+category+"/"+this.shopName+"/"+productName
         return path
       }
    
       setImage( category:String,
                 imageName:String,
                 body:FormData)
       {
       // 'http://194.163.40.229:8088/api/v1/product/image/category/shopname/image'
       
          let path:string=this.url+"image/"+category+"/"+this.shopName+"/"+imageName;                                                        
             return   this.http
                    .post<any>(encodeURI(path),body)
                    .pipe( catchError(this.handleError) );

          

       }
       

       updateImage( category:String,
                    imageName:String,
                    body:FormData)
         {
             // 'http://194.163.40.229:8088/api/v1/product/image/category/shopname/image'

             let path:string=this.url+"image/"+category+"/"+this.shopName+"/"+imageName;
 
                return   this.http
                             .put<any>(encodeURI(path),body)
                             .pipe(catchError(this.handleError));

         } 

       getAssignedImage( category:String)
       {
         //'http://194.163.40.229:8088/api/v1/product/image/assigned/biryani/testproduct'
        let Path:string=this.url+"image/assigned/"+category+"/"+this.shopName
         return this.http
                .get<any>(encodeURI(Path))
                .pipe(catchError(this.handleError))
 
       }



       private handleError(error: HttpErrorResponse)
       {
             if (error.status === 0) 
             {
                 // A client-side or network error occurred. Handle it accordingly.
                 console.error('An error occurred:', error.error);
             } else {
                       // The backend returned an unsuccessful response code.
                     // The response body may contain clues as to what went wrong.
                          console.error(`Backend returned code ${error.status}, body was: `,
                                         error.error);
                    }
   
   
   
   // Return an observable with a user-facing error message.
   
   return throwError(  
                       () => new Error('Something bad happened; please try again later.')
                    );
   
   
   }

private setCategoryhandler(error: HttpErrorResponse)
    {
      
        
          console.log(error.status)
          let apiException:CategoryException
          if (error.status === 0) 
              apiException=new CategoryException("please check your network connection")
          else if(error.status===409)  
          apiException=new CategoryException("category Already exist")
          else   
            apiException= new CategoryException("please try again later");                 
                 

         return throwError(() => apiException);

}


}


export class CategoryException extends Error
{
  constructor(msg: string) {
    super(msg);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, CategoryException.prototype);
}

apiErrorMessage() {
  return  this.message;
}
}

