import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service'; 
import { MatTableDataSource,MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

declare var $:any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  Users: any;
  userForm: any;
  constructor(private router: Router, private userService: UserService) {
    
  }

  ngOnInit(): void {
    // this.fetchUsers();
    this.getAllUsers();
  }

  displayedColumns: string[] = ['name', 'email','gender','phoneno','domain','Actions']; // Define the columns you want to display
  dataSource: any;  

  getAllUsers(){
    this.userService.getAllUserJson().subscribe(data=>{
      console.log('users',data)
      this.dataSource = data;
      console.log(this.dataSource)

    })
  }

  getUserById(Id:any){
    this.userService.getUserById(Id).subscribe(data=>{
      console.log(data)
      console.log(data.name)
      this.userForm.patchValue({
        Name:data.name,
        Gender:data.gender,
        Email:data.email,
        Phoneno:data.phoneno,
        DOB:data.dob,
        Domain:data.domain
      })
    })
  }

  
}
