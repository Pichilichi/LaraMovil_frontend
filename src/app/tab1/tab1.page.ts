import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { getTestBed } from '@angular/core/testing';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  data: any;
  articles = {};
  cicle_id: string;
  changer = 1;
  
  constructor(private http: HttpClient,
    private authService: AuthService,) {
    this.data = '';
    // this.cicle_id = this.authService.token.data.cicle_id
    this.authService.getArticles().then(data => {
      this.articles = data;
      this.data = this.filtrar(this.articles)
      // this.data = this.getSorted(this.data)
    });
    
  }
  // filtroPorCiclo(elemento){
  //   return elemento.cicle_id = this.cicle_id
  // }
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
  show(){
    console.log(this.authService.token)
  }

  getSorted(toSort: any){
    return toSort.data.sort((a,b)=>a.created_at.localeCompare(b.created_at));
  }
  filtrar(toSort: any){
    return toSort.data.filter((element) => element.cicle_id == "3").sort((a,b)=>a.created_at.localeCompare(b.created_at));
  }

  getTodos(){
    this.changer += 1;
    if(this.changer%2 == 0){
      this.authService.getArticles().then(data => {
      this.articles = data;
      this.data = this.getSorted(this.articles)
    });
    }
    else{
      this.authService.getArticles().then(data => {
        this.articles = data;
        this.data = this.filtrar(this.articles)
      });
    }
  }

}
