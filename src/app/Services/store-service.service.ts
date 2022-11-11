import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreServiceService {

  constructor(private http:HttpClient) { }

  getAllProducts():Observable<any>{
    return this.http.get('./assets/data.json')
  }

}
