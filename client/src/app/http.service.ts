import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

   
  constructor(private http: HttpClient) { }
  
  getSongs() {
    return this.http.get('http://localhost:8080/open/songs')
  }
  getSongsID(id) {
    return this.http.get('http://localhost:8080/open/songs/'+id)
  }
  logIn(userData: Object){
    return this.http.post('http://localhost:8080/login', userData)
  }
  // this wil register a new user 
  register(registerData: Object){
    return this.http.post('http://localhost:8080/register', registerData);
  }
  search(name){
    return this.http.get('http://localhost:8080/open/songs/search/'+name)
  }
}
