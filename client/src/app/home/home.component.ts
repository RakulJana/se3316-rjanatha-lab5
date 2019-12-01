import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router} from '@angular/router'

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
  ratingTotal: number=0;
  ratingSum: number = 0;
  averageRating: number = 0;
  reviews: [];
  display: Boolean = false;
  value: Boolean = false;
  sm: Boolean = false;

  constructor(private _http: HttpService, private route: Router) { }

  ngOnInit() {
    if(localStorage.username != null && localStorage.manager != null){
      this.sm = true;
      this.value = true;
    }
    if(localStorage.username == null){
      this.value = false;
      //this.sm = true;
      
    }else if (localStorage.username != null){
      this.value = true;
      //this.sm = true;
    }
    
    
    
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
      var ratingLocal = this.songID["reviews"];
 
      for(var i = 0; i < ratingLocal.length; i++){
        if(ratingLocal[i].rating == null || ratingLocal[i].rating ==="undefined" || ratingLocal[i].rating == NaN)
        {
          console.log("not added")
        } else {
          // this will add the sum and create a counter to divide by to get the avergae rating for a song
          this.ratingSum = ratingLocal[i].rating + this.ratingSum;
          //console.log(this.ratingSum)
          this.ratingTotal++;
          //console.log(this.ratingTotal);
        }
        this.averageRating = this.ratingSum / this.ratingTotal;
      }
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

loggedIn(){
  if(localStorage.username == null){
    console.log("not auth")
  }else {
    console.log(this.value)
    return this.value = true;
    
  }
}

reroute(){
  
  this.route.navigateByUrl("admin")
}
smRoute(){
  this.route.navigateByUrl("sitemanager")
}


}