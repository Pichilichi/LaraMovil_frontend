import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tab1-admin',
  templateUrl: './tab1-admin.page.html',
  styleUrls: ['./tab1-admin.page.scss'],
})
export class Tab1AdminPage implements OnInit {

  data = {};
  token: any;
  users = {};

  constructor(private http: HttpClient,private authService: AuthService,) { 
    this.authService.getUsers(this.authService.token).then(data => {
      this.users = data;
    });
  }



  activate($id){
    this.data = $id;
    console.log(this.data);
    this.authService.activate(this.authService.token,this.data);
    this.authService.getUsers(this.authService.token).then(data => {
      this.users = data;
    })
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.authService.getUsers(this.authService.token).then(data => {
      this.users = data;
    })

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  // getAllUsers(){
  //    this.authService.getUsers(this.authService.token).then(data =>{
  //      this.users = data;
  //      console.log(this.users);
  //    })
  // }

  ngOnInit() {
   
  }

}
