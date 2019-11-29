import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

   
  constructor(private http: HttpClient, public url: 'https://localhost:8080/') { }
  
  getSongs(){
    return this.http.get('https://localhost:8080/open/songs')
  }
}
