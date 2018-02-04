import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AddMoviePage } from '../add-movie/add-movie';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import BasePage from '../base';
import { EditMoviePage } from '../edit-movie/edit-movie';
import { ChartPage } from '../chart/chart';
import { SetNotificationPage } from '../set-notification/set-notification';


/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  
  
})
export class ListPage extends BasePage{

  items = [];
  results = [];
  
  
  uid: string = '';
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    
  ) {
    super(toastCtrl, loadingCtrl);
  }

  ionViewDidLoad() {
    this.uid = this.firebaseAuth.auth.currentUser.uid;
    this.showLoading("Fetching data...");
    this.firebaseFirestore
    .collection('users')
    .doc(this.uid)
    .collection('Movies')
    .snapshotChanges()
    // .valueChanges()
    .subscribe((data:any) => {
      this.items = [];

      data.map(action => {
        this.items.push({
          id : action.payload.doc.id,
          data : action.payload.doc.data()
        })
        //  console.log(action.payload.doc.data());
      });

      

      this.hideLoading();

    },
  (error) => {
    this.hideLoading();
    this.showToast(error);
  })

  }

  navigateAddMovie(){
    this.navCtrl.push(AddMoviePage);
  }

  delete(movieId){
    //console.log(movieId);
    this.showLoading("Deleting...")
    this.firebaseFirestore
      .collection('users')
      .doc(this.uid)
      .collection('Movies')
      .doc(movieId)
      .delete()
      .then(() =>{ //ไม่มีพารามิเตอร์เปน () เปล่าๆ
        this.hideLoading;
        this.showToast("Deleted successfully");
      }) 
      .catch(error => {
        console.log('ddddd');
        this.hideLoading;
        this.showToast(error);
      })
  }

  edit(movieId){
    console.log(movieId);
    this.navCtrl.push(EditMoviePage,{
      id: movieId
    });
  }

  navigateChart(){
    this.navCtrl.push(ChartPage);
  }

  getItems(event){
    
    //console.log(event);
    let val = event.target.value; //การประกาศตัวแปรใน function ต้องใช้ let
    console.log(val);

    if(val == ''){
      this.results = this.items;
    }

    if(val && val.trim != '') //trim คือการตัดช่องว่างในคำเช่น lo v e -> love
    {
      this.results = this.items.filter((item) => {
        return (item.data.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
        
    }
  }

  navigateNotification(movie) {
    console.log(movie);
    this.navCtrl.push(SetNotificationPage, {
      movie: movie
    });

  }
  

}
