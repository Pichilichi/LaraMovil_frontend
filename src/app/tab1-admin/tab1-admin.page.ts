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
    this.authService.activate(this.authService.token,this.data).then(data => {
      this.authService.token = data;
      //console.log(this.authService.token);
    })
    this.authService.getUsers(this.authService.token).then(data => {
      this.users = data;
    })
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
