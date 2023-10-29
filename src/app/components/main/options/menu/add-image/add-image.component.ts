import { Component,Input } from '@angular/core';
import { MenuApiService } from 'src/app/services/api/main/options/menu-api.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent {

  @Input() categoryName:String="";
  @Input() imageName:String=""
  displayStyle:String = "none";
  fileToUpload:any;

  setImageReq:any= {  next:(response:any) =>this.setImageReqPocessing(response),                                                                      
                      error:(error:any) =>this.setImageReqError(error),
                      complete:()=>this.setImageReqComplete()}
  getAssignedImageReq:any= {  next:(response:any) =>this.getAssignedImageReqPocessing(response),                                                                      
                              error:(error:any) =>this.getAssignedImageReqError(error),
                              complete:()=>this.getAssignedImageReqComplete()}

  
   constructor(public menuApi:MenuApiService){}



   closePopup() {  
    
    this.displayStyle="none"
    //this.isRemoveReq=false
   // this.apiError=""
  

   }
   
   openPopup() { 
  
    this.displayStyle = "block"; 
    
  } 


  onFileSelected(event: Event) {
    let element = event.currentTarget as HTMLInputElement;
    this.fileToUpload = element.files?.item(0)
   }

   onSaveFile() {
    const formData: FormData = new FormData();
    formData.append('image', this.fileToUpload);
    
    this.menuApi.setImage(this.categoryName,this.imageName,formData).subscribe(this.setImageReq)
    }
   checkAssigned()
   {
      this.menuApi.getAssignedImage(this.categoryName).subscribe(this.getAssignedImageReq)
   }


 private setImageReqPocessing(response:any)
  {
                
    console.log(JSON.stringify(response))   
  }
                      
  private setImageReqError(exception:any)
   {
    console.log("api error "+exception)
   }     
  private setImageReqComplete()
  {
    console.log("api completes ")
        
  }



private getAssignedImageReqPocessing(response:any)
{
              
  console.log(JSON.stringify(response))   
}
                    
private getAssignedImageReqError(exception:any)
 {
  console.log("api error "+exception)
 }     
private getAssignedImageReqComplete()
{
  console.log("api completes ")
      
}

}




