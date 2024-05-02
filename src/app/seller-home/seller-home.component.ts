import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[];
  deleteIcon = faTrash;
  editIcon = faEdit;
  
  productMessage: undefined | string;
  constructor(private product: ProductService, private http: HttpClient) { }
  ngOnInit(): void {
    this.list();
  }
  deleteProduct(id: number) {
    console.log(id);
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        console.log("id is", { id });
        this.productMessage = "Product is deleted successfully";
        this.list();
      }
    });
    setTimeout(() => {
      this.productMessage = undefined
    }, 3000);
  }
  list() {
    this.product.productList().subscribe((result) => {
      // console.warn(result);
      this.productList = result;
    })
  }
}
