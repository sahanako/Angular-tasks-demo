import { Component } from '@angular/core';
import { service } from 'src/app/services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[service]
})
export class HomeComponent {
  data=''

  // onsubscribe(data:string){
  //   this.onsubscribe('weekly')
  // }

}
