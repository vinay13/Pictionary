import { Component } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Transfer , TransferObject } from  '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import * as _ from 'underscore';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public base64Image : string;
  public ImageFile;
  constructor(public navCtrl: NavController,
            public imagePicker : ImagePicker ,
            public cameraa  : Camera,
            private transfer : Transfer,
            private file : File) {}

//  public options;
//   ImagePick(){
//     this.imagePicker.getPictures(this.options).then((results) => {
//       for(var i = 0 ; i < results.length ; i++){
//         console.log('Image URI: ' + results[i]);
//       }
//     },(err) => {});
//   }

public ImagePick(){

    this.cameraa.getPicture({
        destinationType: this.cameraa.DestinationType.DATA_URL,
        sourceType        : this.cameraa.PictureSourceType.PHOTOLIBRARY
    }).then((imagedata)=>{
      this.base64Image = 'data:image/jpeg;base64,' + imagedata;
      this.ImageFile = imagedata ; 
    },(err)=>{
      console.log(err);
    });
}

  public data_response;
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
