import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceService } from '../service/service.service';
import { Summary } from '../index';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  data:any=[];
  constructor(private service : ServiceService,private http:HttpClient){}
  
      getdata(){
        this.service.getNowPlaying().subscribe((data)=>{
          console.log(data);
          
        })
      }
    }
