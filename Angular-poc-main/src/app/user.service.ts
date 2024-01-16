import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router,NavigationExtras  } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

// import { User } from './user/user.model'; // Import the user model

@Injectable({
  providedIn: 'root',
})
export class UserService {
 
  // private users: any[] = [];
  // private nextUserId: number = 1;
  readonly url ='http://localhost:3000/Users';
  button='Add';
  editActive: boolean =false;
  adddata: boolean=false;
  value: string='';
constructor(private http :HttpClient,private router:Router,private activatedRoute:ActivatedRoute){

}

  // getNextUserId(): number {
  //   return this.nextUserId;
  // }

  // addUser(user: any) {
  //   this.users.push(user);
  //   this.nextUserId++; // Increment the nextUserId when adding a user
  // }

  // getUsers(): any[] {
  //   return this.users;
  // }

  editUser(id:any){
    this.editActive=true
    console.log(id)
    this.message = 'Are sure you want to update data?'
    this.router.navigate(['/user/user-edit',id]);
  }

  addUser(){
    this.editActive=false
    this.router.navigate(['/user/add'])
  }
    message='Are sure you want to delete?';
    

  getUserById(id: any):Observable<any> {  
    return this.http.get(`${this.url}/${id}`);
  }

  addUserJson(User:any):Observable<any>{
    return this.http.post(`${this.url}`,User);
  }

  getAllUserJson():Observable<any>{
    return this.http.get(`${this.url}`)
  }

  getCurrentData(id:any):Observable<any>{
    return this.http.get(`${this.url}/${id}`)
  }

  updateData(id:any,data:any):Observable<any>{
    return this.http.put(`${this.url}/${id}`,data)
  }

  deleteData(id:any):Observable<any>{
    return this.http.delete(`${this.url}/${id}`)
  }
}
