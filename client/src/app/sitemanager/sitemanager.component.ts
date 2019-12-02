import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { HttpService } from '../http.service'

@Component({
  selector: 'app-sitemanager',
  templateUrl: './sitemanager.component.html',
  styleUrls: ['./sitemanager.component.scss']
})
export class SitemanagerComponent implements OnInit {

  constructor(private route: Router, private _http: HttpService) { }
  users: Object;
  id: String = "";
  dis: Boolean;
  ver: Boolean;


  ngOnInit() {
    this._http.getUsers().subscribe(data => {
      this.users = data
      console.log(this.users);
    })
    // initialization features 
    if(localStorage.username != null && localStorage.manager != null){
      console.log("welcome")
    }
    else {
      alert("You are restricted")
      this.route.navigateByUrl("register")
    }

  }

  policy(){
    this.route.navigateByUrl('smdmca')
  }
// changes to disability and verification only occur after log in and log out repeated
  changeDis(id, dis){
    this.id = id;
    this.dis = !dis; // toggles from whatever the component was initialized to before 
    let disType = {
      disabled: this.dis
    }
    console.log(this.dis);
    this._http.updateDisable(this.id, disType).subscribe(data => {
      //return this.dis;
      //this.search = data;
      //console.log(this.search)
      //this.display = false;
      window.location.reload();
    }
    
    );
  }

  changeVer(id, ver){
    this.id = id;
    this.ver = !ver;
    let verType = {
      verified: this.ver
    }
    console.log(this.dis);
    this._http.updateVerify(this.id, verType).subscribe(data => {
      //return this.dis;
      //this.search = data;
      //console.log(this.search)
      //this.display = false;
      window.location.reload();
    }
    
    );
  }

}
