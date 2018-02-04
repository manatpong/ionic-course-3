import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import BasePage from '../base';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { stringify } from '@firebase/util';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';


/**
 * Generated class for the SetNotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-set-notification',
  templateUrl: 'set-notification.html',
})
export class SetNotificationPage extends BasePage{

  date: string;
  time: string;

  movie: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public localNotifications: LocalNotifications,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
    super(toastCtrl,loadingCtrl)
    this.movie = this.navParams.get('movie');
    console.log(this.movie);
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetNotificationPage');
  }

  set(){
    
    let parsedDateTime = Date.parse(this.date + ' ' + this.time);
    let datetime = new Date(parsedDateTime);

    console.log(datetime.toDateString())

    this.localNotifications.schedule({
      id: 1,
      text: 'คุณมีนัดดูหนังเรื่อง ',
      firstAt : datetime,
      every: 'minute'
    });
    //alert(JSON.stringify(this.localNotifications.get(1)));
    //this.showToast(JSON.stringify(this.localNotifications.get(1)));
  }

  turnOff(){
    this.localNotifications.cancelAll()
    // .then(() => {
    //   alert()
    // })
  }

  
}
