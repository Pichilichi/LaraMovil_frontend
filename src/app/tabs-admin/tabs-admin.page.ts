import { Component, OnInit } from '@angular/core';
import { NavController, ModalController} from '@ionic/angular';
import { LoginPage } from '../pages/auth/login/login.page';
import { RegisterPage } from '../pages/auth/register/register.page';

@Component({
  selector: 'app-tabs-admin',
  templateUrl: './tabs-admin.page.html',
  styleUrls: ['./tabs-admin.page.scss'],
})
export class TabsAdminPage implements OnInit {

  constructor(
    private navCtrl : NavController,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  // register(){
  //   this.navCtrl.navigateRoot('/register');
  // }

  login(){
    this.navCtrl.navigateRoot('/login');
  }

  logout(){
    this.navCtrl.navigateRoot('/login');
  }


}
