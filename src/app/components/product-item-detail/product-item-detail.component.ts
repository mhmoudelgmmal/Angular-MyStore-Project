import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreServiceService } from './../../Services/store-service.service';
import { IProduct } from 'src/app/models/iproduct';
import { EditProduct } from './../../models/edit-product';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {

  constructor(private _ActivatedRoute:ActivatedRoute, private StoreService:StoreServiceService) { }
  oneProd:IProduct[]=[]
  qte:number = 0
  cart:EditProduct[] = [];
  theAlert:string = ""
  ngOnInit(): void {
    //here we get the id of the specifyed product from url and get all the data of json file to display it in the product item detail component
    let oneProduct = this._ActivatedRoute.snapshot.params['id'];
    this.StoreService.getAllProducts().subscribe({
      next:(data)=>{
        this.oneProd = data
        this.oneProd = this.oneProd.filter(one =>one.id == oneProduct)

      }
    })
  }
// this function here i made because you said i have to use ngModelChange in the project so it's used here alert the user about the quantity selected from the item

  submitQte(q:number){
   this.theAlert = "You have Selected " + q+ " From " + this.oneProd[0].name + " Item"
  }

  //this function is used here to loop in the select box to fill option box with data
  counter(i:number){
    return new Array(i);
  }
  // here we check the local storage if it has this one or not if it so we replace it with the new one if not we add this new one with it and here we add all the informations of the product and the quantity of it
  cartAdd(){
    if (localStorage.getItem("cart")) {
      this.cart = JSON.parse(localStorage.getItem("cart")!)
      let store = this.cart.find(item=>item.item.id == this.oneProd[0].id)
      if (store) {
        alert("Item "+this.oneProd[0].name+" added before")
      }else{
        this.cart.push({item:this.oneProd[0],Quantity:this.qte})
        localStorage.setItem("cart",JSON.stringify(this.cart))
        alert("Item "+this.oneProd[0].name+" Added To Cart")
      }
    }else{
       this.cart.push({item:this.oneProd[0],Quantity:this.qte})
       localStorage.setItem("cart",JSON.stringify(this.cart))
       alert("Item "+this.oneProd[0].name+" Added To Cart")
    }
  }
}
