import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-newsong',
  templateUrl: './newsong.component.html',
  styleUrls: ['./newsong.component.scss']
})
export class NewsongComponent implements OnInit {

  stitle: String = "";
  sartist: String = "";
  salbum: String = "";
  syear: number;
  strack: String = "";
  sgenre: String = "";
  reply: String = "";

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
      sgenre: this.sgenre
    }
    console.log(songSub);
    this._http.addSong(songSub).subscribe(data => {
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
