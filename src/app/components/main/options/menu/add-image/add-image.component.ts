import { Component,EventEmitter,Input,Output } from '@angular/core';
import { MenuApiService } from 'src/app/services/api/main/options/menu-api.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent {

  @Input() categoryName:String="";
  @Input() imageName:String=""
  @Output() isSetImage:any=new EventEmitter()
  displayStyle:String = "none";
  fileToUpload:any;
  apiError:String=""
  isNewImage:boolean=true
  isSetImageRed:boolean=false
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
    this.checkAssigned()
    
  } 


  onFileSelected(event: Event) {
    let element = event.currentTarget as HTMLInputElement;
    this.fileToUpload = element.files?.item(0)
   }

   onSaveFile() {
    this.isSetImageRed=true
    const formData: FormData = new FormData();
    formData.append('image', this.fileToUpload);
    
    this.menuApi.setImage(this.categoryName,this.imageName,formData).subscribe(this.setImageReq)
    }

    onUpdateFile() {
      this.isSetImageRed=true
      const formData: FormData = new FormData();
      formData.append('image', this.fileToUpload);
      
      this.menuApi.updateImage(this.categoryName,this.imageName,formData).subscribe(this.setImageReq)
      }

   checkAssigned()
   {
      this.menuApi.getAssignedImage(this.categoryName).subscribe(this.getAssignedImageReq)
       this.isSetImageRed=true
   }


 private setImageReqPocessing(response:any)
  {
             
    console.log(JSON.stringify(response))   
  }
                      
  private setImageReqError(exception:any)
   {
    this.isSetImageRed=false
    console.log("api error "+exception)
    this.apiError="Try Again Later"
   }     
  private setImageReqComplete()
  {
    this.isSetImageRed=false
    this.isSetImage.emit()
    this.closePopup()
        
  }



private getAssignedImageReqPocessing(response:any)
{
   response.forEach((imgName:any) => {
    
    if(imgName===this.imageName)this.isNewImage=false
   });
  console.log(JSON.stringify(response))   
}
                    
private getAssignedImageReqError(exception:any)
 {
  console.log("api error "+exception)
  
 }     
private getAssignedImageReqComplete()
{
  this.isSetImageRed=false
  console.log("api completes ")
  console.log(this.isNewImage)    
}

}




