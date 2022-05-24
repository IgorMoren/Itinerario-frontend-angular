import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LibreriaService {


  apiUrl: string = 'https://www.fruityvice.com/api/fruit/all';


  constructor( private http: HttpClient ) { }


  peticionHttp() {
    
    this.http.get(this.apiUrl).subscribe( resp => {
      console.log(resp);
    } )

  }



}
