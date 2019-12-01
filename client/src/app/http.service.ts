import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url: String = 'http://localhost:8080'
   
  constructor(private http: HttpClient) { }
  
  getSongs() {
    return this.http.get(this.url+'/open/songs')
  }
  getUsers() {
    return this.http.get(this.url+'/users')
  }
  updateDisable(id, newData){
    return this.http.put(this.url+'/edituserdis/'+id, newData)
  }
  getSongsID(id) {
    return this.http.get(this.url+'/open/songs/'+id)
  }
  logIn(userData: Object){
    return this.http.post(this.url+'/login', userData)
  }
  // this wil register a new user 
  register(registerData: Object){
    return this.http.post(this.url+'/register', registerData);
  }
  addSong(songData: Object){
    return this.http.post(this.url+'/auth/addsong', songData);
  }
  addBoth(songData: Object){
    return this.http.post(this.url+'/auth/addboth', songData);
  }
  search(name){
    return this.http.get(this.url+'/open/songs/search/'+name)
  }

  addRating(id: String, ratingData: Object){
    
    return this.http.post(this.url+'/auth/songs/addrating/'+id, ratingData)
  }
  addReview(id: String, ratingData: Object){
    return this.http.post(this.url+'/auth/songs/addreview/'+id, ratingData)
  }
}
