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
  reply: string = '';
  //userData: Object;
  
  
  // this creates an empty object that can be used to post data on that form
  
  
  constructor(private _http: HttpService, private route: Router) { }

  ngOnInit() {
  }
  display(){
    this.disp = true;
    //return this.disp;
  };
  register(){
    this.route.navigateByUrl("register")
  }
// I create an object that will be passed over to the back end
  logIn(){
    let userData = {
      name: this.name,
      pass: this.pass
    }
    console.log(userData)
    // this passes in log in inofrmation
    this._http.logIn(userData).subscribe(data => {
      var newData = data;
      // checks to see if disabled, added an alert
      if(newData["message"] == "Disabled user"){
        console.log(newData["message"])
        this.reply = "You are a disabled user, please contact the SM, rjanatha@uwo.ca, to be re-enabled"
        //this.reply = newData["message"] + " please try again";
      }
      // the the data is the same as res.json. it checks
      if(newData["message"] == "Invalid email field"){
        console.log(newData["message"])
        this.reply = newData["message"] + " please try again";
      }
      if(newData["message"] == "Empty email field"){
        console.log(newData["message"])
        this.reply = newData["message"] + " please try again";
      }
      if(newData["message"] == "Empty password field"){
        // since not yet verified we will leave it as registered
        this.reply = newData["message"] + " please try again";
      }
      if(newData["message"] == "Wrong Password"){
        // since not yet verified we will leave it as registered
        this.reply = newData["message"] + " please try again";
      }
      //Site Manager User
      // if user is already verified, then the site manager priviledge will come up 
      if(newData["message"] == "Site Manager User"){
        localStorage.username = this.name;
        localStorage.manager = this.pass; // if pass word exists, this is a site manager
        console.log(name);

        this.route.navigateByUrl("")
      }


      if(newData["message"] == "Logged In"){
        // i set a local storage of the username within the browser, to be able to access authorized urls
        
        localStorage.username = this.name;
        console.log(name);

        this.route.navigateByUrl("")
      }
      

  });
}
}
