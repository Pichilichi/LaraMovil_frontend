import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  data = {};
  token: any;
  users:any;

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { }
  ngOnInit() {
  }
  // Dismiss Login Modal
  dismissLogin() {
    this.modalController.dismiss();
    this.navCtrl.navigateRoot('/tabs');
  }
  // On Register button tap, dismiss login modal and open register modal
  async registerModal() {
    this.dismissLogin();
    const registerModal = await this.modalController.create({
      component: RegisterPage
    });
    return await registerModal.present();
  }

  login(){
    this.authService.login(this.data).then(data => {
      this.token = data;
      this.authService.getUsers(this.token).then(data => {
        this.users = data;
        if(this.token.data.type == 'client'){
            this.users.data.forEach(element => {
              if(this.token.data.id == element.id){
                if(element.actived == 1){
                  this.navCtrl.navigateRoot('/tabs');
                }
                else{
                  console.log('NO');
                }
              }
            });
        }
        else{
          this.navCtrl.navigateRoot('/tabs/tab3');
        }
        
      });
      
      // if(this.token.data.type == 'client'){
      //   
      // }
      // else{
      //   
      // }
      function verUser(users, id): boolean{
        toReturn: Boolean;
        users.data.forEach(element => {
          if(id == element.id){
            if(element.activated == 1){
              this.toReturn = true;
            }
            else{
              this.toReturn = false;
            }
          }
        });
        return this.toReturn;
    }
      });
  }

  
  // login(form: NgForm) {
  //   this.authService.login(form.value.email, form.value.password).subscribe(
  //     data => {
  //       this.alertService.presentToast("Logged In");
  //     },
  //     error => {
  //       console.log(error);
  //     },
  //     () => {
  //       this.dismissLogin();
  //       this.navCtrl.navigateRoot('/tabs');
  //     }
  //   );
  // }
}
