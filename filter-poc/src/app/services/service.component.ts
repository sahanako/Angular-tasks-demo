import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';
import { Router,NavigationExtras  } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
})
export class ServiceComponent {

  readonly url ='http://localhost:3000/Users';
  userdata :any[]=[]
  constructor(private http :HttpClient,private router:Router,private activatedRoute:ActivatedRoute){}

  getUserById(id: any):Observable<any> {  
    return this.http.get(`${this.url}/${id}`);
  }

  addUserJson(User:any):Observable<any>{
    return this.http.post(`${this.url}`,User);
  }

  getAllUserJson():Observable<any>{
    return this.http.get(`${this.url}`)
  }
}

