import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../user.service';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent {

  Users: any;
  userForm: any;

  simpleDialog: MatDialogRef<DialogComponent> | undefined;
  message: string = '';

  constructor(private userService: UserService, private router: Router, private dialogModel: MatDialog) {

  }

  ngOnInit(): void {
    this.getAllUsers();

  }

  userEdit(id: any) {
    console.log(id)
    this.userService.editUser(id);
  }

  addUser() {
    this.userService.addUser();
  }
  displayedColumns: string[] = ['name', 'email', 'gender', 'phoneno', 'domain', 'Actions'];
  dataSource: any;

  getAllUsers() {
    this.userService.getAllUserJson().subscribe(data => {
      console.log('users', data)
      this.dataSource = data;
      console.log(this.dataSource)

    });

  }

  getUserById(Id: any) {
    this.userService.getUserById(Id).subscribe(data => {
      console.log(data)
      console.log(data.name)
      this.userForm.patchValue({
        Name: data.name,
        Gender: data.gender,
        Email: data.email,
        Phoneno: data.phoneno,
        DOB: data.dob,
        Domain: data.domain
      })
    })
  }

  deleteConfirm(Id: any) {
    const simpleDialog = this.dialogModel.open(DialogComponent)

    simpleDialog.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        // User confirmed the deletion by pressing "Yes"
        this.userService.deleteData(Id).subscribe(data => {
          console.log(data);
          console.log("deleted", data.id)
        });
        this.getAllUsers();
      }
    });
  }



}
