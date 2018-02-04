import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import BasePage from '../base';

/**
 * Generated class for the AddMoviePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-movie',
  templateUrl: 'add-movie.html',
})
export class AddMoviePage extends BasePage{

  name: string = '';
  description: string = '';
  length: number;
  image: string = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  
  ) {

    super(toastCtrl,loadingCtrl)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMoviePage');
  }

  create(){
    this.showLoading("Creating...")
      this.firebaseFirestore
        .collection('users')
        .doc(this.firebaseAuth.auth.currentUser.uid)
        .collection('Movies')
        .add({
          name : this.name,
          description : this.description,
          length : this.length,
          img : this.image
        })
        .then(data =>{
          this.hideLoading();
          this.navCtrl.pop();
        })
        .catch(error => {
          this.hideLoading();
        })


      //
  }

}
