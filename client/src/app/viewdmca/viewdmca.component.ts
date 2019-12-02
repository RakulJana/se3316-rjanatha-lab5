import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { HttpService } from '../http.service'

@Component({
  selector: 'app-viewdmca',
  templateUrl: './viewdmca.component.html',
  styleUrls: ['./viewdmca.component.scss']
})
export class ViewdmcaComponent implements OnInit {
  dmca: Object;
  constructor(private route: Router, private _http: HttpService) { }

  ngOnInit() {
    this._http.getDmca().subscribe(data => {
      this.dmca = data;
      console.log(this.dmca)
    })
  }

}
