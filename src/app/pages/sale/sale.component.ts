import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  cartProducts: any[] = [];
  subtotal: number = 0;
  saleObj: any =
    {
      "SaleId": 0,
      "CustId": 370,
      "SaleDate": new Date(),
      "TotalInvoiceAmount": 0,
      "Discount": 0,
      "PaymentNaration": "Paytm",
      "DeliveryAddress1": "Plot no 147",
      "DeliveryAddress2": "Near School",
      "DeliveryCity": "Hyderabad",
      "DeliveryPinCode": "500056",
      "DeliveryLandMark": "School"
    }

  constructor(private productService: ProductService) {
     
  }
  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.productService.getCartItemsByCustId(370).subscribe((res: any) => {
      this.cartProducts = res.data;
      this.cartProducts.forEach(element => {
        this.subtotal = this.subtotal + element.productPrice;
      });
       
    })
  }
  RemoveItem(id: number) {
    this.productService.removeCartItemById(id).subscribe((res: any) => {
      if (res.result) {
        this.loadCart();
        this.productService.cartAddedSubject.next(true);
      }
    })
  }
  makeSale(){
    this.saleObj.TotalInvoiceAmount = this.subtotal;
    this.productService.cartAddedSubject.next(true);
    this.productService.makesale(this.saleObj).subscribe((res: any) => {
      if (res.result) {
        alert("Sale Success");
        
        this.productService.cartAddedSubject.next(true);
        this.loadCart();
      }
    })
    
  }
}
