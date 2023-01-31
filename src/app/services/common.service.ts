import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../common';
// import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) {
    // this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(data => {
    //   console.log("Api Data :>> ", data);
    // });
  }

  getUser(): Observable<Users[]> {
    return this.http.get<Users[]>(environment.apiUrl + `posts`)
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

  getOwnapi() {
    return this.http.get(environment.ownapiurl)
  }

  deleteOwnDataDelete(rno: number) {
    return this.http.delete(environment.ownapiurl + "/" + rno)
  }

  // getPhotos() {
  //   return this.http.get(environment.apiUrl + `photos`)
  // }

  newgetUsers() {
    return this.http.get(environment.newUsersApi + `users`)
  }

  newUserDelete(id: any) {
    return this.http.delete(environment.newUsersApi + `users/` + id)
  }

  getProduct() {
    return this.http.get(environment.ecomApi + `products`)
  }

  deleteProduct(id: number) {
    return this.http.delete(environment.ecomApi + `products/` + id)
  }

  prosuctPatch() {
    return this.http.delete(environment.ecomApi)
  }

  // showTime(): Observable<Date> {
  //   return new Observable(
  //     observer => {
  //       setInterval(() =>
  //         observer.next(new Date()), 1000);
  //     }
  //   );
  // }
}
