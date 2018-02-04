import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import BasePage from '../base';

/**
 * Generated class for the EditMoviePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-movie',
  templateUrl: 'edit-movie.html',
})
export class EditMoviePage extends BasePage{
  id: string;
  uid: string;
  
  name: string;
  description: string;
  length: number;
  image: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore
  ) {
    super(toastCtrl, loadingCtrl);

    this.id = this.navParams.get('id');
    console.log(this.id);
  }

  ionViewDidLoad() {
    this.uid = this.firebaseAuth.auth.currentUser.uid;

    this.firebaseFirestore
    .collection('users')
    .doc(this.uid)
    .collection('Movies')
    .doc(this.id)
    .valueChanges()
    .subscribe((movie:any) => {
      this.name = movie.name;
      this.description = movie.description;
      this.length = movie.length;
      this.image = movie.img;
    })
  }
  
  save(){
    this.showLoading("Updating...")
    this.firebaseFirestore
      .collection('users')
      .doc(this.uid)
      .collection('Movies')
      .doc(this.id)
      .update({
        name: this.name,
        description: this.description,
        length: this.length,
        img: this.image
      })
      .then(() => {
        this.hideLoading();
        this.showToast("Updated successfully");
        this.navCtrl.pop();
      })
      .catch(error => {
        this.hideLoading();
        this.showToast(error);

      })
  }

}
