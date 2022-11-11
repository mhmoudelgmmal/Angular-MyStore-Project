import { Component, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EditProduct } from 'src/app/models/edit-product';
import { IProduct } from 'src/app/models/iproduct';
import { StoreServiceService } from './../../Services/store-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private storeServ:StoreServiceService) { }




Products_arr:IProduct[] = []
cart:EditProduct[] = [];
  ngOnInit(): void {
    // at first i used the service to get the data of the project to put it in the array to do the proccess in it
    this.storeServ.getAllProducts().subscribe({
      next:(data)=>{
        this.Products_arr = data

      }
    })
  }
  counter(i:number){
    return new Array(i);
  }
// here we use the collected data to store the data in the local storage to access it even we refreshed the page and to get the all over the project an while navigate
  cartAdd(e:EditProduct){
    if (localStorage.getItem("cart")) {
      this.cart = JSON.parse(localStorage.getItem("cart")!)
      let store = this.cart.find(item=>item.item.id == e.item.id)
      if (store) {
        alert("Item "+ e.item.name +" Added Before")
        console.log(e)
      }else{
        this.cart.push(e)
        localStorage.setItem("cart",JSON.stringify(this.cart))
        alert(" Item "+e.item.name+" Added")
      }
    }else{
      this.cart.push(e)
      localStorage.setItem("cart",JSON.stringify(this.cart))
      alert("Item "+e.item.name+" Added")
    }
  }
}
