import { Component, OnInit } from '@angular/core';
import { LibreriaService } from './services/libreria.service';


@Component({
  selector: 'app-libreria',
  templateUrl: './libreria.component.html',
  styleUrls: ['./libreria.component.sass']
})
export class LibreriaComponent implements OnInit {

  constructor( private libreriaService: LibreriaService  ) { }

  ngOnInit(): void {
    this.libreriaService.peticionHttp();
  }

    

}
