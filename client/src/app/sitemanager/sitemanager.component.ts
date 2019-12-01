import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-sitemanager',
  templateUrl: './sitemanager.component.html',
  styleUrls: ['./sitemanager.component.scss']
})
export class SitemanagerComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
    if(localStorage.username != null && localStorage.manager != null){
      console.log("welcome")
    }
    else {
      alert("You are restricted")
      this.route.navigateByUrl("register")
    }
  }

}
