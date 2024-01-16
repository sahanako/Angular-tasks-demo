import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { UserComponent } from '../user.component';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private userService : UserService,
    private router : Router) {     
    }
   message=this.userService.message
    ngOnInit(){
      
    }
    
    confirm(){
      this.dialogRef.close(true);

    }
    close(): void {
    this.dialogRef.close(false);
    }
}
