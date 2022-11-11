import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { findIndex } from 'rxjs';
import { EditProduct } from './../../models/edit-product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private router:Router ) { }
//here i used the reactiveformsmodule to get the data from the inputs and collect the in the form group and sure that they are validate to send the data

  cartStorage!:EditProduct[]
  totalAmount:number = 0
  isvalid:boolean = false;
  ngOnInit(): void {
    //here we check if the local storage has value or not and if it has we fill the array with the array and get the total of the products
    if(localStorage.getItem("cart")) {
      this.cartStorage = JSON.parse(localStorage.getItem("cart")!)
      this.getTotal()
    }
  }
  //in this function we get all the total amount to display it to the user
getTotal(){
  this.totalAmount = 0
  for (let i = 0; i < this.cartStorage.length; i++) {
  this.totalAmount += this.cartStorage[i].Quantity * this.cartStorage[i].item.price
  }

  return this.totalAmount
}
//when the client change the quantity of the product here we modify the total in the local storage and in the property totalAmount
totalChanged(amount:number,id:number){
  for (let i = 0; i < this.cartStorage.length; i++) {
    if (this.cartStorage[i].item.id == id) {
        this.cartStorage[i].Quantity = amount

        localStorage.setItem("cart",JSON.stringify(this.cartStorage))
        alert("Total Amount Has Been Changed")
        this.getTotal()
    }
  }
}
theName:string = "";
theAddress:string = "";
theCredit:number = 0

//this is the submit function here we check if the form is valid with all requirements we send the data to the confirmation component and if not we notify the client to write down valid data
submit(){
    let finalData = {name:this.theName,TotalPrice:this.totalAmount}
        localStorage.setItem("finalData",JSON.stringify(finalData))
        this.router.navigate(["/confirmation"])

  // let pattern = /^[0-9]{16}$/;
  // let test = pattern.test(this.theCredit as unknown as string)
  // if (this.theName.length >= 3
  //   && this.theAddress.length >= 6 && test ) {
  //     let finalData = {name:this.theName,TotalPrice:this.totalAmount}
  //     localStorage.setItem("finalData",JSON.stringify(finalData))
  //     this.router.navigate(["/confirmation"])
  // }
  }
//this function is used to remove items from cart and count back the total amout again
  removeProduct(id:number){
    for (let i = 0; i < this.cartStorage.length; i++) {
      if (this.cartStorage[i].item.id == id) {
        alert("Item "+this.cartStorage[i].item.name +" Has Been Removed")
        let index = this.cartStorage.findIndex(x=>x.item.id == id)
        this.cartStorage.splice(index,1)
        localStorage.setItem("cart",JSON.stringify(this.cartStorage))
        this.getTotal()

      }
    }

  }
}
