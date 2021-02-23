import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { timestamp } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { element } from 'protractor';

@Component({
  selector: 'app-tab4-admin',
  templateUrl: './tab4-admin.page.html',
  styleUrls: ['./tab4-admin.page.scss'],
})
export class Tab4AdminPage implements OnInit {

  data: any;
  articles = {};
  cicles : any;
  // candis = [];
  ids: [];
  ciclo:string;
  // candi: number
  offers = [];
  offersByCicle: Number[] = [];
  today = new Date(Date.now());
  
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ["a", "b"];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37], label: 'Ofertas por ciclos' }
  ];

  constructor(private http: HttpClient,
    private authService: AuthService,) {
      // this.authService.getOffers(this.authService.token).then(data => {
      //   this.articles = data;
      //   this.data = this.articles
      //   this.setCicles(this.data)
      // });
      this.authService.getCicles().then(data => {
        this.cicles = data;
        console.log(data)
      })
    
  }

  ngOnInit() {
  }

  

  // setCicles(data){
  //   this.cicles = []
  //   data.forEach(element => {
  //     this.ciclo = element.date_max
  //     this.cicles.push(this.ciclo.slice(0,7))
  //   });
  // }

  // setCandidates(data){
  //   this.candis = []
  //   data.forEach(element => {
  //     this.candi = element.num_candidates
  //     this.candis.push(this.candi)
  //   });
  // }

  // setNumOffers(data){
  //   this.offers = []
  //   data.forEach(element => {
  //     this.offers = element.num_candidates
  //     this.offers.push(this.offers)
  //   });
  // }

  setTabla(){
    console.log(this.ids);
    this.authService.getOffers(this.authService.token).then(data => {
        this.articles = data;
        this.offers = this.filtrarDate(this.articles);
        console.log(this.offers);
      });
    this.filtrarIds(this.offers);

  }

  filtrarIds(offers){
    // this.ids.forEach(function(id){
    //   this.offersByCicle.push(this.filtrar(this.offers, id).length());
    // });
    // for(let i = 0; i < this.ids.length; i++) {
    //   this.offersByCicle.push(this.filtrar(this.offers, this.ids[i]).length());      
    // }
    // console.log(this.offersByCicle);
    this.ids.forEach((element) =>this.offersByCicle.push(this.filtrar(offers, element).length()) )
  }

  filterN(toSort: any){

  }

  filtrar(toSort: any, id){
    return toSort.data.filter((element) => element.cicle_id == id)
  }
  filtrarDate(toSort: any){
    return toSort.data.filter((element) =>element.date_max >= "2020-08-12T00:00:00.000000Z");
  }
}