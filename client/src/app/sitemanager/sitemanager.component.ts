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

  change(id, dis){
    this.id = id;
    this.dis = !dis;
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

}
