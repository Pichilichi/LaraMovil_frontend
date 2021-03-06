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

  // data: any;
  articles = {};
  cicles : [];
  data: any;
  // candis = [];
  ids: [];
  ciclesSelect: string[]=[];
  // ciclo:string;
  // candi: number
  offers = [];
  offersByCicle: number[] = [];
  today = new Date(Date.now());

  constructor(private http: HttpClient,
    private authService: AuthService,) {
      // this.authService.getOffers(this.authService.token).then(data => {
      //   this.articles = data;
      //   this.data = this.articles
      //   this.setCicles(this.data)
      // });
      this.authService.getCicles().then(data => {
        this.data = data;
        // this.setCicles(this.data)
        this.cicles = this.data.data
      })
    
  }

  ngOnInit() {
  }

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Ofertas por ciclos'}
  ];


  crearGrafico(ciclos){
    var ciclesName: string[] = [];
    for(let i = 0; i < this.ids.length; i++) {
      for(let j = 0; j < ciclos.length; j++) {
        if(ciclos[j].id==this.ids[i]){
          ciclesName.push(ciclos[j].name); 
        }    
      }
    }
    
    this.barChartLabels = ciclesName;
    this.barChartData = [
      { data: this.offersByCicle, label: 'Ofertas por ciclos'}
    ];
  }

  // setCicles(data){
  //   this.cicles = data.data
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
    
    this.authService.getOffers(this.authService.token).then(data => {
        this.articles = data;
        this.offers = this.filtrarDate(this.articles);
        // console.log(this.offers);
        this.filtrarIds();
        console.log(this.ids);
        console.log(this.offersByCicle);
        this.crearGrafico(this.cicles);
      });

  // https://amoelcodigo.com/graficas-angular-ng2charts/
  }

  filtrar(toSort: any, id){
    return toSort.data.filter((element) => element.cicle_id == id)
  }

  filtrarIds(){
    for(let i = 0; i < this.ids.length; i++) {
      var num = this.offers.filter(offer => offer.cicle_id == this.ids[i]).length;
      this.offersByCicle.push(num);      
    }
    
  }

  filtrarDate(toSort: any){
    return toSort.data.filter((element) =>element.date_max >= "2020-08-12T00:00:00.000000Z");
  }

  resetValues(){
    this.ids = [];
    this.offersByCicle = [];
  }
}
