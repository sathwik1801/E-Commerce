import { Component, OnInit } from '@angular/core';
import { login, signUp } from '../data-type';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  showLogin = false;
  constructor(private seller: SellerService) { }
  authError: string = "";
  ngOnInit(): void {
    this.seller.reloadSeller()
  }
  signUp(data: signUp): void {
    console.warn(data);
    this.seller.userSignUp(data);
  }
  login(data: login): void {
    this.authError = "";
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = "Email or Password is incorrect";
      }
    });
  }
  openLogin() {
    this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false;
  }
}
