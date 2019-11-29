import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  songs: object;
  constructor(private _http: HttpService) { }
// this lets us use all the http services
  ngOnInit() {
    this._http.getSongs().subscribe(data => {
      this.songs = data;
      console.log(this.songs);
    })
  }

}
