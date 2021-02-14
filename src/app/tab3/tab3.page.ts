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
    this.authService.getOffers(this.authService.token).then(data => {
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
}
