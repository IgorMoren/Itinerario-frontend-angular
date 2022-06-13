import { Component, OnInit } from '@angular/core';
import { LibreriaService } from './services/libreria.service';
import { Heroes } from './interfaces/heroes';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

enum heroStats {
  hName = 'name',

  hThwart = 'thwart',

  hAttack = 'attack',

  hDefense = 'defense',

  hHand_size = 'hand_size',

  hHealth = 'health',
}

@Component({
  selector: 'app-libreria',
  templateUrl: './libreria.component.html',
  styleUrls: ['./libreria.component.sass'],
})
export class LibreriaComponent implements OnInit {
  /*Start chart values*/
  heroName: Heroes[heroStats.hName] = '';

  heroThwart: Heroes[heroStats.hThwart] = 0;

  heroAttack: Heroes[heroStats.hAttack] = 0;

  heroDef: Heroes[heroStats.hDefense] = 0;

  heroHand: Heroes[heroStats.hHand_size] = 0;

  heroHp: Heroes[heroStats.hHealth] = 0;
  /* End chart values  */

  /* Array of heroes from marvelc cdb api */
  heroList: Array<string> = ['Elige heroe:'];
  /* Array of heroes code from marvelc cdb api */
  heroCode: Array<string> = ['0'];

  heroListCode: any;

  backgroundHeroColor: string = '';

  backgroundHeroAlterColor: string = '';

  pointBackgroundColor: string = '';

  heroImgString: string = '';

  constructor(private libreriaService: LibreriaService) {}
  /* Configurando las opciones del chart, beginAtZero para que el origen se establezca en 0 y no en el valor mas pequeño:
  https://www.chartjs.org/docs/3.3.2/axes/radial/linear.html  */
  radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true,
      },
    },
  };

  radarChartLabels: string[] = [
    'Intervencion',
    'Ataque',
    'Defensa',
    'Tamaño de mano',
    'Vida',
  ];

  radarChartType: ChartType = 'radar';

  radarChartData!: ChartData<'radar'>;

  ngOnInit(): void {
    //Almacenar el valor del name para las cartas tipo heroe con el fin de crear el option de los heroes
    this.libreriaService.getHeroList().subscribe((heroList) => {
      var heroLista: any;
      heroLista = Object.values(heroList);
      //console.log(heroLista);

      for (let i = 0; i < heroLista.length; i++) {
        if (heroLista[i]['type_name'] === 'Hero') {
          //console.log(heroLista[i]);
          this.heroList.push(heroLista[i]['name']);
          this.heroCode.push(heroLista[i]['code']);
        }
      }
      /* Jugar con los indices de un array y otro, coincidiran el 
      primero de uno con el primero del otro */
      //console.log(this.heroList);

      //console.log(this.heroCode);

      this.pintaGrafico();
    });
  }

  pintaGrafico(event: any = '01001a') {
    /*Evento recoge con srcElement.value el valor del option.
Saco el indice de este y lo establezco en el indice de los codigos para obtener el 
code de la peticion Http */

    let indexHero: any;

    let indexHeroCode: any;

    /*Condicion if para que al cargar el componente reciba ese valor y muestre, 
  asi se evita el display de elementos vacios*/
    if (event == '01001a') {
      indexHeroCode = '01001a';
    } else {
      indexHero = this.heroList.indexOf(event.srcElement.value);
      //console.log( this.heroCode[indexHero]);

      indexHeroCode = this.heroCode[indexHero];
    }
    this.libreriaService.getPeticionHttp(indexHeroCode).subscribe((heroes) => {
      this.heroName = heroes[heroStats.hName];
      //console.log(this.heroName)

      this.heroThwart = heroes[heroStats.hThwart];
      //console.log('Intervencion:', this.heroThwart);

      this.heroAttack = heroes[heroStats.hAttack];
      //console.log('Ataque:', this.heroAttack);

      this.heroDef = heroes[heroStats.hDefense];
      //console.log('Def:', this.heroDef);

      this.heroHand = heroes[heroStats.hHand_size];
      //console.log('Mano:', this.heroHand);

      this.heroHp = heroes[heroStats.hHealth];
      //console.log('health: ', this.heroHp);

      /*Se añade al final al valor del color obtenido de la api segun: https://www.esthersola.com/transparencia-color-hexadecimal/
        para añadir transparencia al codigo de color hexadecimal*/
      this.backgroundHeroColor = `${heroes['meta']['colors']['0']}B3`;
      //console.log('colorback: ', this.backgroundHeroColor);

      this.backgroundHeroAlterColor = `${heroes['meta']['colors']['1']}B3`;
      //console.log('color linea: ', this.backgroundHeroAlterColor);

      this.pointBackgroundColor = heroes['meta']['colors']['2'];

      this.heroImgString = `https://marvelcdb.com${heroes['imagesrc']}`;
      //console.log( 'imagen', this.heroImgString);

      this.radarChartData = {
        labels: this.radarChartLabels,
        datasets: [
          {
            data: [
              this.heroThwart,
              this.heroAttack,
              this.heroDef,
              this.heroHand,
              this.heroHp,
            ],
            label: this.heroName,
            backgroundColor: [this.backgroundHeroColor],
            borderColor: [this.backgroundHeroAlterColor],
            pointBackgroundColor: [this.pointBackgroundColor],
          },
        ],
      };
    });
  }
}
