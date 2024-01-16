import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { UserListComponent } from '@user/user-list';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
})
export class UserDetailsComponent implements OnInit {
  user: any;
  date: any;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.params['id']; 
    this.userService.getCurrentData(userId).subscribe((result) => {
      console.log(result);
      this.user = result;
      
    })
  }

  // getUserById(id:any){
  //   this.route.params.subscribe((params) => {
  //     const userId = +params['id']; // Convert id to a number
  //     this.user = this.userService.getUserById(userId);
  //     console.log(this.user)
  //   });
  // }
}
