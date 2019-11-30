import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-prac',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  disp: boolean = false;
  name: string=''; // values from the html
  pass: string = '';
  //userData: Object;
  
  
  // this creates an empty object that can be used to post data on that form
  
  
  constructor(private _http: HttpService, private route: Router) { }

  ngOnInit() {
  }
  display(){
    this.disp = true;
    //return this.disp;
  };

  logIn(){
    let userData = {
      name: this.name,
      pass: this.pass
    }
    console.log(userData)
    this._http.logIn(userData).subscribe(data => {
      var newData = data;
      if(newData["message"] == "Logged In"){
        localStorage.username = this.name;
        console.log(name);
        this.route.navigateByUrl("")
      }
      else{
        console.log("You are not in")
      }

  });
}
}
