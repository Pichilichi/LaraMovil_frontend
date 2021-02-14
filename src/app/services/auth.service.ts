import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { User } from '../models/user';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://allsites.es/sales_in_api/public/api';
  token: any;
  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService,
    private navCtrl: NavController,
  ) { }

  login(data: any) {
    return new Promise(resolve => {
    this.http.post(this.apiUrl + '/login',
    {
    email: data.email,
    password: data.pass
    })
    .subscribe(data => {
    this.token = data;
    resolve(data);
    // this.navCtrl.navigateRoot('/tabs');
    }, err => {
    console.log(err);
    });
    });
   
  }

  register(data: any) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/register',
      {
      name: data.name,
      surname: data.surname,
      email: data.email,
      password: data.password,
      c_password: data.c_pass,
      cicle_id: data.cicle,
      })
      .subscribe(data => {
      this.token = data;
      resolve(data);
      }, err => {
      console.log(err);
      });
      });
  }

  getUsers(tok: any) {
    return new Promise(resolve => {
    this.http.get(this.apiUrl + '/users', {
    headers: new HttpHeaders().set('Authorization', 'Bearer ' + tok.data.token),
    })
    .subscribe(data => {
    resolve(data);
    }, err => {
    console.log(err);
    });
    });
   }

  // logout() {
  //   const headers = new HttpHeaders({
  //     'Authorization': this.token["token_type"]+" "+this.token["access_token"]
  //   });
  //   return this.http.get(this.env.API_URL + 'auth/logout', { headers: headers })
  //   .pipe(
  //     tap(data => {
  //       this.storage.remove("token");
  //       this.isLoggedIn = false;
  //       delete this.token;
  //       return data;
  //     })
  //   )
  // }

  // user() {
  //   const headers = new HttpHeaders({
  //     'Authorization': this.token["token_type"]+" "+this.token["access_token"]
  //   });
  //   return this.http.get<User>(this.env.API_URL + 'auth/user', { headers: headers })
  //   .pipe(
  //     tap(user => {
  //       return user;
  //     })
  //   )
  // }
  
  // getToken() {
  //   return this.storage.getItem('token').then(
  //     data => {
  //       this.token = data;
  //       if(this.token != null) {
  //         this.isLoggedIn=true;
  //       } else {
  //         this.isLoggedIn=false;
  //       }
  //     },
  //     error => {
  //       this.token = null;
  //       this.isLoggedIn=false;
  //     }
  //   );
  // }
}
