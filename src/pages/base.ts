import { LoadingController } from "ionic-angular/components/loading/loading-controller";
import { ToastController } from "ionic-angular/components/toast/toast-controller";
import { Loading } from "ionic-angular/components/loading/loading";

export default abstract class BasePage {

  loader: Loading

  constructor(
    public toastCtrl: ToastController, 
    public loadingCtrl: LoadingController
  
  ){ }
    
    showToast(msg){
      this.toastCtrl.create({
        message : msg,
        duration : 3000
      })
      .present();
    }
  
    showLoading(msg){
      this.loader = this.loadingCtrl.create({ content: msg })
      this.loader.present();
    }
  
    hideLoading(){
      this.loader.dismiss();
    }
    
}// abstract class เป็นคลาสที่เอาไปใช้ธรรมดาไม่ได้ ต้องสืบทอดเท่านั้น
// export ให้ไฟล์อื่นดึงไปใช้ได้