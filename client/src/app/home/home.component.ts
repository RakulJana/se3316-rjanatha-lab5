import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // these are the objects that are used by the home screen
  // search so fpr the search field, songs is for the total songs, songId is for specific songs
  // ratingTotal will be for the total number of ratings per song, rating sum will be for the total sum of ratings for an individual song
  search: Object;
  songs: Object;
  songID: Object;
  ratingTotal: Number=0;
  ratingSum: Number = 0;
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
  // this function is used by a button to display all available reviews
  displayReview(){
    this.display = true;
  }
  // this function is intended to give more details about a song upon a button click
  more(_id: String)
  {
    console.log(_id);
    this._http.getSongsID(_id).subscribe(data => {
      this.songID = data
      
      console.log(this.songID["reviews"].length)
      console.log(this.songID["reviews"][0].rating)
      console.log(this.songID["reviews"][1].rating)
      console.log(this.songID["reviews"][2].rating)
      console.log(this.songID);

    
      // number of reviews is the size of the array
      // average rating is the average sum of rating / total size
    }
  );
}
// tis function passes in the search parameter to the back end from the search parameter in the fron end, entered by the usre
searchRes(name: String){
  console.log(name);
  this._http.search(name).subscribe(data => {
    this.search = data;
    console.log(this.search)
  }
);
}


}