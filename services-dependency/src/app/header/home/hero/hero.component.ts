import { Component } from '@angular/core';
import { service } from 'src/app/services/service.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  providers:[service]
})
export class HeroComponent {

  constructor(private services : service){}
  onsubscribe(){  
    // let services = new service();
     this.services.onsubscribe('weekly')
  }
}
