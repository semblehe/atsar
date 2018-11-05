import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController,LoadingController, Loading, AlertController,ToastController,Toast } from 'ionic-angular';
import 'rxjs/add/operator/map';
@Component({
    selector: 'page-info',
    templateUrl: 'info.html'
})
export class InfoPage {
    loading: Loading;
    toast: Toast;

    constructor(private toastCtrl: ToastController, public navCtrl: NavController, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public http: Http) {
       }
}