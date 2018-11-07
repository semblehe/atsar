import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController,LoadingController, Loading, AlertController,ToastController,Toast } from 'ionic-angular';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import 'rxjs/add/operator/map';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loading: Loading;
  toast: Toast;
  radio:any;
  track:any;
    m:any='0';
    t:any='0';
    s:any;
  promise:any;
  judul:any;
  test:any;
  constructor(private streamingMedia: StreamingMedia,private toastCtrl: ToastController,public navCtrl: NavController,public alertCtrl: AlertController,public loadingCtrl: LoadingController, public http: Http) {
this.getRadio();
      // window.localStorage.clear();
      console.log(this.track);

// console.log(window.localStorage.getItem('tr'));
//       console.log(window.localStorage.getItem('tra'));
  }


getRadio() {
        this.showLoading();

        let link = 'http://alilmu.net/mobile2/radio';

        this.http.get(link).map(res => res.json())
            .subscribe(data => {
                this.loading.dismiss();

                if (data.success) {
                    this.radio = data.radio;
                } else {
                    this.radio = [];
                }
            }, error => {
                this.loading.dismiss();
            });
    }

playb(a,b,c) {
       if(c) {
           if(window.localStorage.getItem('tr')=='1'){
               this.presentToast('Afwan, Mohon Tunggu',1);
               window.location.reload();
               window.localStorage.setItem('tr', '0');
           }
           this.m = '1';
           this.s = b;
           if (this.t != '0') {
               this.track.pause();
               this.track.currentTime = 0;
           }

           this.track = new Audio(a);
           this.track.play();
           this.promise = new Promise((resolve, reject) => {
               this.track.addEventListener('playing', () => {
                   resolve(true);
                   if(this.judul!=c) {
                       this.presentToast(c, 0);
                   }
                   this.t = '1';
                   this.m = b;
                   console.log(this.track);
               });

               this.track.addEventListener('error', () => {
                   reject(false);
               });
           });
           return this.promise;
       }else{
           this.presentToast('Afwan, Radio Tidak Sedang Siaran',1);
       }

    };


 play(a,b,c){
     let options: StreamingVideoOptions = {
         successCallback: () => { console.log('Video played') },
         errorCallback: (e) => { console.log('Error streaming') },
         orientation: 'landscape',
         shouldAutoClose: true,
         controls: false
     };
     this.streamingMedia.playAudio('http://manhajulanbiya.radioislam.my.id:8989/stream.mp3', options);
     console.log(a);
 }

pause() {
    this.judul = '0';
    try {
        this.toast.dismiss();
        console.log('b');
    } catch (e) {
        console.log('a');
    }
    this.m = '0';
    this.track.pause();
    this.track.currentTime = 0;
    window.localStorage.setItem('tr', '0');
}

refresh(){
    this.getRadio();
}
showLoading() {
  		this.loading = this.loadingCtrl.create({
  			content: 'Mohon tunggu...'
  		});
  		this.loading.present();
  	}

  	setAlert(t, m) {
  		let alert = this.alertCtrl.create({
  			title: t,
  			subTitle: m,
  			buttons: ['TUTUP']
  		});
  		alert.present();
  	}

presentToast(p,d) {
    this.judul=p;
    try {
        this.toast.dismiss();
    } catch(e) {
    }
    if(d==1){
        d=3000;
    }else{
        d=false;
    }
  this.toast = this.toastCtrl.create({
   message: p,
      showCloseButton: false,
      duration: d,
      // closeButtonText: 'Close',
      dismissOnPageChange: true,
      cssClass: "csstoast",

  });
        // this.toast.onDidDismiss(() => {
        //     // this.track.pause();
        //     // this.track.currentTime = 0;
        // });
  this.toast.present();
}

}
