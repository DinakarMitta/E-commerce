import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{

  productList: any [] = [];
  cartObj: any = {
      "CartId": 0,
      "CustId": 370,
      "ProductId": 0,
      "Quantity": 1,
      "AddedDate": "2024-01-18T13:17:43.229Z"
    }
  

  constructor(private productservice: ProductService, private router : Router ) {

  }
  ngOnInit(): void {
     
    this.loadAllProducts();
  }

  loadAllProducts() {
     
    this.productservice.getAllProducts().subscribe((result: any)=>{
      this.productList = result.data;

    })
  }
  addItemToCart(productId: number) {
     
    this.cartObj.ProductId = productId;
    this.productservice.addToCart(this.cartObj).subscribe((result: any)=>{
      if(result.result) {
        alert("Product Added To Cart");
        this.productservice.cartAddedSubject.next(true);
      }

    })

  }
  onBtnClick(product: any){
    this.router.navigate(['/productDetails',product.categoryId]);
  }

}
