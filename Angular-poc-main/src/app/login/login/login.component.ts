import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  title="loginForm";
  loginUser = "no user signed in";
  name='';
  email='';
  pass='';


  onCreate = () => {
    this.loginUser = "user signed in and data is " + "Name: "+ this.name +" Email: " + this.email;
    this.name = '';
    this.email='';
    this.pass=''; 
     }
 
}
