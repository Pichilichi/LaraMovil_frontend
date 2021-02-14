import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab4-admin',
  templateUrl: './tab4-admin.page.html',
  styleUrls: ['./tab4-admin.page.scss'],
})
export class Tab4AdminPage implements OnInit {

  data: any;
  articles = {};
  cicles = [];
  candis = [];
  id: number;
  ciclo:string;
  candi: number

  constructor(private http: HttpClient,
    private authService: AuthService,) {
      this.authService.getOffers(this.authService.token).then(data => {
        this.articles = data;
        this.data = this.articles
        this.setCicles(this.data)
      });
    
  }

  ngOnInit() {
  }

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = this.cicles;
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Ofertas por ciclos' }
  ];

  setCicles(data){
    this.cicles = []
    data.forEach(element => {
      this.ciclo = element.date_max
      this.cicles.push(this.ciclo.slice(0,7))
    });
  }

  setCandidates(data){
    this.candis = []
    data.forEach(element => {
      this.candi = element.num_candidates
      this.candis.push(this.candi)
    });
  }

  setTabla(){
    this.authService.getOffers(this.authService.token).then(data => {
      this.articles = data;
      this.data = this.filtrar(this.articles, this.id);
      this.setCicles(this.data)
      this.barChartLabels = this.cicles;
      this.barChartData = [
        { data: this.candis, label: 'Ofertas por ciclos' }
      ];
    });
  }

  filtrar(toSort: any, id){
    return toSort.data.filter((element) => element.cicle_id == id)
  }
}
