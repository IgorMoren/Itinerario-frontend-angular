import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Heroes } from '../interfaces/heroes';

@Injectable({
  providedIn: 'root'
})
export class LibreriaService {


  heroListApiUrl: string = 'https://marvelcdb.com/api/public/cards';

  apiUrl: string = 'https://marvelcdb.com/api/public/card';

  

  constructor( private http: HttpClient ) { }

  getHeroList() {
    
    return this.http.get(this.heroListApiUrl);

  }

  //Le pasare el codigo de la carta de heroe en cuestion

  
  getPeticionHttp( termino: string ) {
    
    return this.http.get<Heroes>(`${this.apiUrl}/${ termino }`);

  }

  /* getDatosHeroe() {
    return this.getPeticionHttp()
  
    }

  } */


}

