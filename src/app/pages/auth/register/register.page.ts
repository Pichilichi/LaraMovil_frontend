import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  data = {};
  token: any;

  constructor(private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { }
  
  ngOnInit() {
  }

  register(){
    // console.log(this.data);
    this.authService.register(this.data).then(data => {
      this.token = data;
      this.navCtrl.navigateRoot('/tabs');
      });
    console.log(this.token);
  }

  // // Dismiss Register Modal
  dismissRegister() {
    this.modalController.dismiss();
  }

  async loginModal() {
    const loginModal = await this.modalController.create({
      component: LoginPage,
    });
    return await loginModal.present();
  }

  // register(form: NgForm) {
  //   this.authService.register(form.value.fName, form.value.lName, form.value.email, form.value.password).subscribe(
  //     data => {
  //       this.authService.login(form.value.email, form.value.password).subscribe(
  //         data => {
  //         },
  //         error => {
  //           console.log(error);
  //         },
  //         () => {
  //           this.dismissRegister();
  //         }
  //       );
  //       this.alertService.presentToast(data['message']);
  //     },
  //     error => {
  //       console.log(error);
  //     },
  //     () => {
        
  //     }
  //   );
  // }
}
