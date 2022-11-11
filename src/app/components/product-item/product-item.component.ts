import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { StoreServiceService } from 'src/app/Services/store-service.service';
import { IProduct } from 'src/app/models/iproduct';
import { EditProduct } from './../../models/edit-product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit,OnChanges {

  constructor(private storeServ:StoreServiceService) { }

  ngOnChanges(): void {

  }
  // this is the nested component we add the the input prop here to get the data from the parent to access it in the html file and the output prop to send the product we added to the cart to the parent
  @Input() recivedProdObj!:IProduct;
  @Output() prodSent:EventEmitter<EditProduct> = new EventEmitter();
  qte:number = 0
  theAlert:string = ""
  ngOnInit(): void {

  }
  //this is the same function as we mintioned it used here to loop in the select box to fill option box with data
  counter(i:number){
    return new Array(i);
  }
  //here we send the data to the parent component
  add(){

    this.prodSent.emit({item:this.recivedProdObj,Quantity:this.qte})
  }
  submitQte(q:number){
    this.theAlert = "You have Selected " + q+ " From " + this.recivedProdObj.name + " Item"
  }
}
