import { Component ,Input,Output,EventEmitter} from '@angular/core';
import { MenuApiService } from 'src/app/services/api/main/options/menu-api.service';

@Component({
  selector: 'app-remove-category',
  templateUrl: './remove-category.component.html',
  styleUrls: ['./remove-category.component.css']
})
export class RemoveCategoryComponent {

  @Input()  categoryName:String = "";
  @Output()   categoryRemoved=new EventEmitter()
  apiError:String=""
  displayStyle:String = "none";
  isRemoveReq=false
  removeCategoryReq:any= {  next:(response:any) =>this.removeCategoryReqPocessing(response),                                                                      
                            error:(error:any) =>this.removeCategoryReqError(error),
                            complete:()=>this.removeCategoryReqComplete()}


constructor(public api:MenuApiService){}


closePopup() {  
    
    this.displayStyle="none"
    this.isRemoveReq=false
    this.apiError=""
  

   }
   
   openPopup() { 
  
    this.displayStyle = "block"; 
    
  } 



delete()
{
  this.isRemoveReq=true
  this.apiError=""
  this.api.removeCategory(this.categoryName).subscribe(this.removeCategoryReq)
  

}



private removeCategoryReqPocessing(response:any)
  {
                  
        
  }
                      
  private removeCategoryReqError(exception:any)
   {
      this.apiError="please try again later"
      this.isRemoveReq=true
      console.log("error"+exception)
   }     
  
  
  
  private removeCategoryReqComplete()
  {

    console.log("completes")
    
     this.isRemoveReq=false
     this.categoryRemoved.emit()
     this.closePopup()
        
   
  }


}
