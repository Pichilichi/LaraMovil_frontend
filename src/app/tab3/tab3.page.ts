import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  toSend = [];
  data: any;
  articles = {};
  cicles = {};
  id: number;

  constructor(private http: HttpClient,
    private authService: AuthService,
    private navCtrl: NavController,) {
      this.data = '';
    // this.cicle_id = this.authService.token.data.cicle_id
    this.authService.getOffersApplied(this.authService.token, this.authService.token.data.id).then(data => {
      this.articles = data;
      this.data = this.articles
    });
  }

  verOferta(id: number){
    this.navCtrl.navigateRoot('/offer/'+id);
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.data.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  desaplicar(id){
    this.toSend = [this.authService.token.data.id, id]
    this.authService.desaplicar(this.authService.token, this.toSend).then(data => {
      console.log(data);
    });
    this.toSend = [];
    this.authService.getOffersApplied(this.authService.token, this.authService.token.data.id).then(data => {
      this.articles = data;
      this.data = this.articles
    });
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.authService.getOffersApplied(this.authService.token, this.authService.token.data.id).then(data => {
      this.articles = data;
      this.data = this.articles
    });

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
