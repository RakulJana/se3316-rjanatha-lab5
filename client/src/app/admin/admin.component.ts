import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private route: Router, private _http: HttpService) { }
  songs: Object;
  ngOnInit() {
    if(localStorage.username == null){
      alert("no access")
      this.route.navigateByUrl("login")
    }

    this._http.getSongs().subscribe(data => {
      this.songs = data
      console.log(this.songs);
    });
  }

}
