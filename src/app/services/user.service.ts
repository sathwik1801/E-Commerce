import { clippingParents } from '@popperjs/core';
import { login, signUp } from './../data-type';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  invalidUserAuth = new EventEmitter<boolean>;
  constructor(private router: Router, private http: HttpClient) { }
  userSignUp(user: signUp) {
    console.log(user);
    this.http.post("http://localhost:3000/users", user, { observe: 'response' })
      .subscribe((result) => {
        console.log(result);
        if (result) {
          localStorage.setItem("user", JSON.stringify(result.body));
          this.router.navigate(['']);
        }
      })
  }
  userLogin(data: login) {
    this.http.get<signUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, { observe: 'response' })
      .subscribe((result) => {
        if (result && result.body?.length) {
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['']);
          this.invalidUserAuth.emit(false);
        }
        else {
          this.invalidUserAuth.emit(true);
        }
      })
  }
  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['']);
    }
  }
}
