import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  public productId: any;
  constructor(private route :ActivatedRoute,private productService: ProductService) { }
  productDetails: any;

  ngOnInit() {
    
    let id1 = this.route.snapshot.paramMap.get('id');
    this.productId = id1;
    
    this.Loadproduct(this.productId);
    

  }

  Loadproduct(productId :any) {
    this.productService.getProductById(productId).subscribe((res: any) => {
      this.productDetails = res.data;
      setInterval(() => {}, 5000);
    })
   



  }


}




// https://onlinetestapi.gerasim.in/api/Ecomm/GetProductById?id=272
// https://onlinetestapi.gerasim.in/api/Ecomm/GetProductById?id=260