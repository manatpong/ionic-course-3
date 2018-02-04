import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';



@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  name: string = '';
  email: string = '';
  photoUrl: string = '';
  age:number ;
  tel: string = '';

  uid: string = '';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore
  ) {
  }

  ionViewDidLoad() {
   this.email = this.firebaseAuth.auth.currentUser.email;
   this.name = this.firebaseAuth.auth.currentUser.displayName;
   this.photoUrl = this.firebaseAuth.auth.currentUser.photoURL;

   this.uid = this.firebaseAuth.auth.currentUser.uid; //ดึง uid มาก่อน จะได้เอา uid นี้ไป select ข้อมูลนั้นมา
   this.firebaseFirestore
      .collection('users')
      .doc(this.uid)
      .valueChanges()
      .subscribe((data:any) =>{
        this.age = data.age;
        this.tel = data.tel;
        console.log(data);
      })// ถ้าข้อมูลเปลี่ยนแปลง จาก function valueChanges ข้อมูลจะถูกส่งมาที่ subscribe ใช้คู่กัน
  }// เมื่อเปิดหน้านั้นเข้ามา

  logout(){
    //log out
    this.firebaseAuth.auth.signOut(); //log out all
  }

}
