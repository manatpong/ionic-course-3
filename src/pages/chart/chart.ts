import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import BasePage from '../base';
// import { ViewChild } from '@angular/core/src/metadata/di';

/**
 * Generated class for the ChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})
export class ChartPage extends BasePage {
  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;
  uid: string;
  datas = [];
  labels = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
    super(toastCtrl, loadingCtrl)
  }

  ionViewDidLoad() {
    this.uid = this.firebaseAuth.auth.currentUser.uid;
    this.showLoading("Fetching data...");
    this.firebaseFirestore
      .collection('users')
      .doc(this.uid)
      .collection('Movies')
      .valueChanges()
      .subscribe(movies => {
        console.log(movies);
        this.datas = movies.map((movie: any) => {
          return movie.length;
        })

        this.labels = movies.map((movie: any) => {
          return movie.name;
        })

        console.log(this.datas);
        console.log(this.labels);

        this.lineChart = new Chart(this.lineCanvas.nativeElement, {

          type: 'line',
          data: {
            labels: this.labels,
            datasets: [
              {
                label: "Movie Statistics",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.datas,
                spanGaps: false,
              }
            ]
          }

        });
        // this.movies = [];
        // this.labels
        // data.map(action => {
        //   this.items.push({
        //     id : action.payload.doc.id,
        //     data : action.payload.doc.data()
        //   })
        //  console.log(action.payload.doc.data());
      });

    this.hideLoading();



  }



}
