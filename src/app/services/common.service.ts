import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Users } from '../common';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) {
    // this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(data => {
    //   console.log("Api Data :>> ", data);
    // });
  }

  getUser() {
    return this.http.get(environment.apiUrl + `posts`)
  }

  postUser(user: Users) {
    return this.http.post(environment.apiUrl + `posts`, user)
  }

  updateUser(id: number, user: Users) {
    return this.http.put(environment.apiUrl + `posts/` + id, user)
  }

  patchUser(id: number, user: Users) {
    return this.http.patch(environment.apiUrl + `posts/` + id, user)
  }

  deleteUser(id: number) {
    return this.http.delete(environment.apiUrl + `posts/` + id)
  }


  // getPhotos() {
  //   return this.http.get(environment.apiUrl + `photos`)
  // }
}
