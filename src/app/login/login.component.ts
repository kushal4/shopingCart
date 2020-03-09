import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from "@angular/fire/auth";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{



constructor( public authService:AuthService,private route:ActivatedRoute){

}

ngOnInit(){

}



login(){
  return this.authService.GoogleAuth();
}


}
