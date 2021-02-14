import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab3-admin',
  templateUrl: './tab3-admin.page.html',
  styleUrls: ['./tab3-admin.page.scss'],
})
export class Tab3AdminPage implements OnInit {

  data = {};
  token: any;
  offers = {};

  constructor(private http: HttpClient,private authService: AuthService,private alertController: AlertController) { 
    this.authService.getOffers(this.authService.token).then(data => {
      this.offers = data;
      //console.log(this.offers);
    });
  }

  eliminar($id){
    this.alertController.create({
      header: 'Cuidado',
      subHeader: 'No hay vuelta atras',
      message: '¿Estás seguro de que quieres borrar esta oferta?',
      buttons: [
        {
          text: 'Cancelar',
          handler:(data: any) => {
            console.log('Cancelado', data);
          }
        },
        {
          text: 'OK',
          handler:(data: any) =>{
            this.data = $id;
            console.log('Pum, borrado del mapa',this.data);
            this.authService.deleteOffers(this.authService.token, this.data).then(data => {
              this.authService.token = data;
            })
          }
        }
      ]
    }).then(res=>{
      res.present();
    });
    this.authService.getOffers(this.authService.token).then(data => {
      this.offers = data;
    });
  }

  ngOnInit() {
  }

}
