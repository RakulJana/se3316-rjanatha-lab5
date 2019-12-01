import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { HttpService } from '../http.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private route: Router, private _http: HttpService) { }
  name: string=''; // values from the html
  pass: string = '';
  reply: string = '';

  ngOnInit() {
    
  }

  //register()
  registerUser(){
    let registerData = {
      name: this.name,
      pass: this.pass
    }
    console.log(registerData)
    // this passes in log in inofrmation
    this._http.register(registerData).subscribe(data => {
      var regData = data;
      console.log(regData["message"])
      // the the data is the same as res.json. it checks
      if(regData["message"] == "Invalid email field"){
        console.log(regData["message"])
        this.reply = regData["message"] + " please try again";
      }
      if(regData["message"] == "Empty email field"){
        console.log(regData["message"])
        this.reply = regData["message"] + " please try again";
      }
      if(regData["message"] == "Empty password field"){
        // since not yet verified we will leave it as registered
        this.reply = regData["message"] + " please try again";
      }
      if(regData["message"] == "already exists"){
        this.reply = regData["message"] + " please try again";
      }
      else{
        console.log(regData["message"])
        this.route.navigateByUrl("") // routes back to the home screen upon success
      }

  });
}
  // ADD LOGOUT BUTTON TO ERASE THE LOCAL KEY

}
