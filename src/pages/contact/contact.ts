import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { Transfer , TransferObject } from  '@ionic-native/transfer';
import * as _ from 'underscore';
//declare let cordova;

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public listDIR : any;
  constructor(public navCtrl: NavController,
              private file : File,
              private fileChooser : FileChooser,
              private transfer : Transfer ) {}

  // ChooseFile(){
  //     this.file.listDir(this.file.dataDirectory,'/').then((files) =>
  //      { this.listDIR = files ;  alert(this.listDIR)}
  //      ).catch(
  //        (err) => { alert(err)}
  //      );
  // }
   public imageFile : any;  
   public data_response; 
  ChooseFile(){
      this.fileChooser.open()
        .then(uri => {console.log(uri); this.imageFile = uri } )
        .catch(e => console.log(e));
    }



  uploadPic() {
    const fileTransfer: TransferObject = this.transfer.create();
    //let ft = new Transfer();
        let filename = _.uniqueId();
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
      
        fileTransfer.upload(this.imageFile, "https://yugma-testing.appspot.com/upload-file", options, false)
        .then((result: any) => {
           console.log('success');
           this.data_response = result ; 
           alert(result);
        }).catch((error: any) => {
            console.log(error);
        }); 
    }
}


//  mimeType: 'image/jpeg/pdf/png',