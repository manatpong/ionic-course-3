import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseAuth } from '@firebase/auth-types';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Loading } from 'ionic-angular/components/loading/loading';
import BasePage from '../base';
import { AngularFirestore } from 'angularfire2/firestore';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends BasePage{

  email: string = '';
  password: string = '';
  displayName: string = '';
  tel: string = '';
  age: number ;

  loader: Loading;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {
    super(toastCtrl,loadingCtrl)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){

    console.log(this.email,this.password,this.displayName,this.age,this.tel);
    this.showLoading("Registering...")
    this.firebaseAuth
    .auth
    .createUserWithEmailAndPassword(this.email,this.password)
    .then((user) => {
      user.updateProfile({
        displayName : this.displayName,
        photoURL : 'https://www.thewrap.com/wp-content/uploads/2015/11/Donald-Trump.jpg'
      })


      this.firebaseFirestore
        .collection('users')
        .doc(user.uid)
        .set({
          name : this.displayName,
          email : this.email,
          tel : this.tel,
          age : this.age
        })
        .then(data =>{

        })
        .catch(error => {

        })


      this.hideLoading();
    })

    .catch((error) => {
      this.hideLoading();
      this.showToast(error.message);
    })
  }

  // showToast(msg){
  //   this.toastCtrl.create({
  //     message : msg,
  //     duration : 3000
  //   })
  //   .present();
  // }

  // showLoading(msg){
  //   this.loader = this.loadingCtrl.create({ content: msg })
  //   this.loader.present();
  // }

  // hideLoading(){
  //   this.loader.dismiss();
  // }
}
