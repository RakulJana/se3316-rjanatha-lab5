import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'


@Component({
  selector: 'app-prac',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  disp: boolean = false;
  username: string=''; // values from the html
  password: string = '';
  
  
  // this creates an empty object that can be used to post data on that form
  
  
  constructor(private _http: HttpService) { }

  ngOnInit() {
  }
  display(){
    this.disp = true;
    //return this.disp;
  }
  
  submit(){
    console.log("submitted");
  }
  
}