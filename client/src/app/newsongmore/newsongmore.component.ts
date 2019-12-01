import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-newsongmore',
  templateUrl: './newsongmore.component.html',
  styleUrls: ['./newsongmore.component.scss']
})
export class NewsongmoreComponent implements OnInit {

  
  stitle: String = "";
  sartist: String = "";
  salbum: String = "";
  syear: number;
  strack: String = "";
  sgenre: String = "";
  reply: String = "";
  rating: number;
  reviewname: String = "";
  reviewdes: String = "";

  //songSub: Object;

  constructor(private route: Router, private _http: HttpService) { }


  ngOnInit() {
    if(localStorage.username == null){
      alert("no access")
      this.route.navigateByUrl("login")
    }
  }

  submit(){
    // creates a local object
    let songSub = {
      stitle: this.stitle,
      sartist: this.sartist,
      salbum: this.stitle,
      syear: this.syear,
      strack: this.strack,
      sgenre: this.sgenre,
      rating: this.rating,
      reviewname: this.reviewname,
      reviewdes: this.reviewdes,
      
    }
    console.log(songSub);
    this._http.addBoth(songSub).subscribe(data => {
      var newData = data;
      console.log(newData)
      // the the data is the same as res.json. it checks
      if(newData["message"] == "Empty title field"){
        console.log(newData["message"])
        this.reply = newData["message"] + " please add the title again";
      }
      if(newData["message"] == "Empty artist field"){
        //console.log(newData["message"])
        this.reply = newData["message"] + " please add the artist again";
        console.log(this.reply)
      }
      // checks to see if it is submitted correctly
      if(newData["message"]=="success") {
        this.route.navigateByUrl("admin")
      }
  });
  }


}
