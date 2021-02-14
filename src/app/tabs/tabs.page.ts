import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoginPage } from '../pages/auth/login/login.page';
import { RegisterPage } from '../pages/auth/register/register.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private menu: MenuController,
    private authService: AuthService,
    private navCtrl: NavController,
  ) { 
    this.menu.enable(false);
  }
  // ionViewWillEnter() {
  //   this.authService.getToken().then(() => {
  //     if(this.authService.isLoggedIn) {
  //       this.navCtrl.navigateRoot('/dashboard');
  //     }
  //   });
  // }

  register(){
    this.navCtrl.navigateRoot('/register');
  }

  login(){
    this.navCtrl.navigateRoot('/login');
  }

  async loginModal() {
    const loginModal = await this.modalController.create({
      component: LoginPage,
    });
    return await loginModal.present();
  }
  async registerModal() {
    const registerModal = await this.modalController.create({
      component: RegisterPage,
    });
    return await registerModal.present();
  }
  
  ngOnInit() {
  }
}
