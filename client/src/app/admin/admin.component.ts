import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { HttpService } from '../http.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private route: Router, private _http: HttpService) { }
  songs: Object;
  title: String="";
  display: Boolean = false;
  rating: number;
  reviewname: String = "";
  reviewdes: String = "";
  id: String = "";
  //ratings: Object;

  ngOnInit() {
    if(localStorage.username == null){
      alert("no access")
      this.route.navigateByUrl("login")
    }
// gets songs, so we can add reviews accordingly
    this._http.getSongs().subscribe(data => {
      this.songs = data
      console.log(this.songs);
    });
  }

  toggle(theId, titleForm){
    // toggles the form on display
    // this toggles the form, and passes in song id for the specifc csong we wish to add review for 
    console.log(this.display)
    this.title = titleForm;
    this.id = theId;
    if (this.display == false){
      this.display = true;
    }
    else {
      this.display = false;
    }
  }

  addRatingInfo(){
   // follows same concept as add review info
    let ratingData = {
      rating: this.rating,
      reviewname: this.reviewname
    }
    this._http.addRating(this.id, ratingData).subscribe(data => {
      //this.search = data;
      //console.log(this.search)
      this.display = false;
    }
    );
  }
  // this will add a review
  addReviewInfo(){
    // sets an object inside the function scope that will be passed to the back end
    let ratingData = {
      reviewdes: this.reviewdes,
      reviewname: this.reviewname
    }
    this._http.addReview(this.id, ratingData).subscribe(data => {
      //this.search = data;
      //console.log(this.search)
      this.display = false;
    }
    );
  }

  newSongButton(){
    this.route.navigateByUrl("newsong");
  }
  newSongMoreButton(){
    this.route.navigateByUrl("newsongmore");
  }

}
