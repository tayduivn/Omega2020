import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController,Platform } from '@ionic/angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File,FileEntry } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Plugins } from '@capacitor/core';
import { apiBase } from '../api/apiBase';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  @Input() item;
  loading: any;

  constructor(private modalCtrl: ModalController,private api: apiBase,private loadingController: LoadingController,
              private platform: Platform,private transfer: FileTransfer,private file: File,private fileOpener: FileOpener) { 
    
  }

  ngOnInit() {
    console.log(this.item);
    if(this.item.Image != undefined)
    {
      console.log(this.item.Image.includes('http://'));
      this.item.image = this.item.Image.includes('http://') == true ?  this.item.Image : `${this.api.url}/images/${this.item.Image}`;
    }
  }

  async openFile(item) {
    setTimeout(async () => {
        this.loading =await this.loadingController.create({
          //cssClass: 'my-custom-class',
          message: 'Cargando...',
          duration: 120000
        });
    
        this.loading.present();
        
        console.log(item);
        const { Browser } = Plugins;
        if (this.platform.is('cordova')) {
          this.download(`${this.api.url}/images/${item.Image}`);
          //this.download(`http://192.168.0.16:5000/resources/${item.PathRecurso}`);
        } else {
          await Browser.open({ url: `${this.api.url}/images/${item.Image}` });
          this.loadingController.dismiss();
        }
    }, 300);
  }

  download(url) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    const extension = url.split('/').pop(); 
    const pathDownload = this.platform.is("android") ? this.file.dataDirectory  :  this.file.dataDirectory;
    //const pathDownload = this.platform.is("android") ? this.file.externalDataDirectory :  this.file.documentsDirectory;
    //const pathDownload = this.platform.is("android") ? this.file.externalRootDirectory + "download/" :  this.file.documentsDirectory;

    fileTransfer.download(url, pathDownload + this.item.ImageUser).then((entry) => {
        console.log('download complete: ' + entry.toURL());

        let files = entry as FileEntry;
        files.file(success =>{
            //success.name;

            this.fileOpener.open(pathDownload + this.item.ImageUser, success.type)
            .then(() => { console.log('File is opened'); this.loading.dismiss(); })
            .catch(e => console.log('Error opening file', e));

        });
    }, (error) => {
      // handle error
      console.log(error);
      alert(error.exception);
      this.loadingController.dismiss();
    });

  }

  closeModal (){
      console.log("cerar");
      this.modalCtrl.dismiss();
  }
}

