// import { Component } from '@angular/core';
// import { AuthService } from '../auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss'],
//   providers:[AuthService]
// })
// export class LoginComponent {
//   uname:string='';
//   password:string='';
//   errmsg?:string;
//   constructor(private auth:AuthService,private router : Router){}
//   login(){  
//     if(this.uname.trim().length === 0){
//       this.errmsg = "Username is required"
//     }
//     else if(this.password.trim().length===0){
//       this.errmsg = "Password is required"
//     }
//     else{
//       this.errmsg='';
//       let res = this.auth.login(this.uname,this.password)
//       if(res === 200){
//         this.router.navigate(['home'])
//       }
//       else if (res === 404){
//         this.errmsg = "Inavlid user"
//       }
//     }
//   }
// }
