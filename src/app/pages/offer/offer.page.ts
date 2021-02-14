import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {

  id: number
  data: any;
  articles = {};
  
  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private navCtrl: NavController,) {
      this.id = parseInt(this.route.snapshot.paramMap.get('id'));
      this.authService.getOffers(this.authService.token).then(data => {
        this.articles = data;
        this.data = this.filtrar(this.articles)
      })
   }

  ngOnInit() {
    
  }

  verId(){
    console.log(this.id)
  }

  filtrar(toSort: any){
    return toSort.data.filter((element) => element.id == this.id);
  }

  volver(){
    this.navCtrl.navigateRoot('/tabs/tab1');
  }
}
