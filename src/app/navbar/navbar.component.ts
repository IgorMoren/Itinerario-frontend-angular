import { Component } from '@angular/core';
import { faHouse, faTowerBroadcast, faLightbulb, faFileCirclePlus, faBookOpen, faChartLine  } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent  {
 
  faHouse = faHouse;
  faTowerBroadcast = faTowerBroadcast;
  faLightbulb = faLightbulb;
  faFileCirclePlus = faFileCirclePlus;
  faBookOpen = faBookOpen;
  faChartLine = faChartLine;
  
}
