import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgZone } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { UploadImageService } from '../../services/upload.service';
import { Transfer , TransferObject } from  '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import * as _ from 'underscore';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

public base64Image : string;
public ImageFile;
  constructor( public cameraa : Camera,
              public _uploadService : UploadImageService,
              private transfer : Transfer,
              private file : File) {
  
	  		      
  }


  takepic(){
    this.cameraa.getPicture({
        destinationType: this.cameraa.DestinationType.DATA_URL,
        targetWidth : 1000,
        targetHeight : 1000,
      encodingType: this.cameraa.EncodingType.JPEG,
       mediaType: this.cameraa.MediaType.PICTURE
    }).then((imagedata)=>{
      this.base64Image = 'data:image/jpeg;base64,' + imagedata;
      this.ImageFile = imagedata ; 
    },(err)=>{
      console.log(err);
    });
    }
  


  public data_response;
//  uploadPic(){
//        // let formData = new FormData();
//       let a =  { "file" : this.base64Image }
//       //formData.append("file",this.base64Image);
//       console.log(a);
//      // alert(formData);
//     this._uploadService.UploadImage( a ).subscribe(
//       (data) => { this.data_response = data ; alert(data)},
//       () => {console.log('pic uploaded thank u!'); alert(this.data_response);}
//     )
//   }



  uploadPic() {
    const fileTransfer: TransferObject = this.transfer.create();
    //let ft = new Transfer();
        let filename = _.uniqueId() + ".jpg";
        let options = {
            fileKey: 'file',
            fileName: filename,
            mimeType: 'image/jpeg',
            chunkedMode: false,
            headers: {
                'Content-Type' : undefined
            },
            params: {
                "file": filename
            }
        }; 
      
        fileTransfer.upload(this.base64Image, "https://yugma-testing.appspot.com/upload-file", options, false)
        .then((result: any) => {
           console.log('success');
           this.data_response = result ; 
           alert(result);
        }).catch((error: any) => {
            console.log(error);
        }); 
    }
  
}







  // takepic(){
  //   var options: CameraOptions = {
  //     destinationType : this.camera.DestinationType.DATA_URL,
  //       encodingType: this.camera.EncodingType.JPEG,
  //      mediaType: this.camera.MediaType.PICTURE,
  //      quality : 100

  //   };

  // this.camera.getPicture(options).then((imageData) => {
  //   // imageData is either a base64 encoded string or a file URI
  //  // If it's base64:
  //   let base64Image = 'data:image/jpeg;base64,' + imageData;
  //   this.zone.run(() => this.image = base64Image);
  //    }, (err) => {
  //         alert(err);
  // });


