import { EventEmitter, Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { login, signUp } from '../data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(data: signUp) {
    this.http.post('http://localhost:3000/seller',
      data,
      { observe: 'response' }).subscribe((result) => {
        console.warn(result)
        if (result) {
          localStorage.setItem('seller', JSON.stringify(result.body))
          this.router.navigate(['seller-home'])
        }
      })
  }
  userLogin(data: login) {

    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, { observe: 'response' })
      .subscribe((result: any) => {
        console.warn(result);
        if (result && result.body && result.body.length) {
          localStorage.setItem("seller", JSON.stringify(result));
          this.router.navigate(['seller-home']);
          console.warn("user logged in");
        }
        else {
          console.warn("user login failed");
          this.isLoginError.emit(true);

        }
      })
  }
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['seller-home'])
    }
  }
}
