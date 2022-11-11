import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FinalData } from 'src/app/models/final-data';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(private router:Router) { }
  //if every thing is doing well we get to this component then we put the data from the local storage to the array and access it in the html tags
  final:FinalData[] = []
  ngOnInit(): void {
    this.final.push(JSON.parse(localStorage.getItem("finalData")!))

  }
  //this function when pressing the button it clear all data in the local storage and navigate us to product list component
  clearstorage(){
    localStorage.clear()
    alert("Cart has been cleared")
    this.router.navigate(["/product-list"])
  }
}
