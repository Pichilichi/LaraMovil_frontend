import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

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
      this.data = this.filtrar1(this.articles)
    });
    this.authService.getCicles().then(data => {
      this.cicles = data;
    })
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

  change(){
    if(this.id == 0){ 
      this.authService.getOffers(this.authService.token).then(data => {
        this.articles = data;
        this.data = this.filtrar1(this.articles)
      });
    }
    else{
      this.data = this.filtrar(this.articles, this.id);
    }
    
  }

  filtrar(toSort: any, id){
    return toSort.data.filter((element) => element.cicle_id == id)
  }
  filtrar1(toSort: any){
    return toSort.data.filter((element) => element.deleted == 0)
  }

  verOferta(id: number){
    this.navCtrl.navigateRoot('/offer/'+id);
  }

  aplicar(id){
    this.toSend = [this.authService.token.data.id, id]
    this.authService.aplicar(this.authService.token, this.toSend).then(data => {
      console.log(data);
    });
    this.toSend = [];
  }
}
