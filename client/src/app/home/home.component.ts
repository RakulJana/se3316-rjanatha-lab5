import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  songs: Object;
  songID: Object;
  reviews: [];
  display: Boolean = false;

  constructor(private _http: HttpService) { }

  ngOnInit() {
    this._http.getSongs().subscribe(data => {
      this.songs = data
      console.log(this.songs);
    }
  );
  }
  more(_id: String)
  {
    console.log(_id);
    this._http.getSongsID(_id).subscribe(data => {
      this.songID = data
      console.log(this.songID["reviews"][0].rating)
      console.log(this.songID);
    }
  );
  }
  

}