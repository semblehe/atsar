import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController,LoadingController, Loading, AlertController,ToastController,Toast } from 'ionic-angular';
import 'rxjs/add/operator/map';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loading: Loading;
  toast: Toast;
  radio:any;
  track:any='1';
  test:any='0';
  promise:any;
  constructor(private toastCtrl: ToastController,public navCtrl: NavController,public alertCtrl: AlertController,public loadingCtrl: LoadingController, public http: Http) {
this.getRadio();
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

play(a,b,c) {
        if(this.track!='1'){
                this.track.pause();
                this.track.currentTime = 0;
        }
        this.track = new Audio(a);
        this.track.play();
        this.promise = new Promise((resolve, reject) => {
            this.track.addEventListener('playing', () => {
                resolve(true);
                    this.presentToast(c);
                    this.test = '1';
                    console.log(this.toast);
            });

            this.track.addEventListener('error', () => {
                reject(false);
            });
        });
        return this.promise;
    };

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

presentToast(p) {
    try {
        this.toast.dismiss();
        console.log('b');
    } catch(e) {
        console.log('a');
    }
  this.toast = this.toastCtrl.create({
   message: p,
      showCloseButton: true,
      // duration: duration,
      closeButtonText: 'Close',
      dismissOnPageChange: true,
      cssClass: "csstoast",

  });
        this.toast.onDidDismiss(() => {
            // this.track.pause();
            // this.track.currentTime = 0;
        });
  this.toast.present();
}

}
