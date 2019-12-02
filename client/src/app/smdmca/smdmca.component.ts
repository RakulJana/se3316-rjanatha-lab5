import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { HttpService } from '../http.service'

@Component({
  selector: 'app-smdmca',
  templateUrl: './smdmca.component.html',
  styleUrls: ['./smdmca.component.scss']
})
export class SmdmcaComponent implements OnInit {

  constructor(private route: Router, private _http: HttpService) { }
  dmca: Object;
  id: String;
  polOne: String = "";
  polTwo: string = "";
  polThree: string = "";
  display: Boolean = false;
  obs: Boolean = false;
  ngOnInit() {
    this._http.getDmca().subscribe(data => {
      this.dmca = data;
      console.log(this.dmca)
    })
    if(localStorage.username != null && localStorage.manager != null){
      console.log("welcome")
    }
    else {
      alert("You are restricted")
      this.route.navigateByUrl("home")
    }
  }

  edit(id){
    this.id = id;
    this.display = true;
  }
  addNew(){
    this.obs = true;
  }
  newPolicy(){
    let newPol = {
      policyOne: this.polOne,
      policyTwo: this.polTwo,
      policyThree: this.polThree
    }
    
      this._http.postDmca(newPol).subscribe(data => {
      window.location.reload();
    });
    
  }
  
  postChanges(){
    let changes = {
      policyOne: this.polOne,
      policyTwo: this.polTwo,
      policyThree: this.polThree
    }

    this._http.updatePol(this.id, changes).subscribe(data => {
      //return this.dis;
      //this.search = data;
      //console.log(this.search)
      //this.display = false;
      window.location.reload();
      
    }
    
    );
  }
}
