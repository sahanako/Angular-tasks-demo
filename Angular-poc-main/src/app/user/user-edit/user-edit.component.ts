import { Component,Input,Output,EventEmitter, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { ValidatorService } from 'src/app/validator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit{
    hide = true;

 alert:boolean=false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private validatorService:ValidatorService,
    
  ) {}

  editForm=new FormGroup({
    name:new FormControl('',[Validators.required]),
    gender:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required]),
    dob:new FormControl('',),
    phoneno:new FormControl(''),
    domain:new FormControl(''),
    password:new FormControl(''),
    address:new FormControl(''),
    // project1:new FormControl(''),
    // project2:new FormControl(''),
    // project3:new FormControl('')
    
  })
  ngOnInit() {
    const userId = this.route.snapshot.params['id']; 
    this.userService.getCurrentData(userId).subscribe((result) => {
      console.log(result);
      console.log(result.project1)
   

      this.editForm = new FormGroup({
        name: new FormControl(result['name'], [Validators.required]),
        gender: new FormControl(result['gender'], [Validators.required]),
        email: new FormControl(result['email'], [
          Validators.required,
          (control: AbstractControl): ValidationErrors | null => this.validatorService.emailValidator, // Add custom email validator
        ]),
        dob: new FormControl(result['dob']),
        phoneno: new FormControl(result['phoneno'], [
          Validators.required,
          (control: AbstractControl): ValidationErrors | null => this.validatorService.validatePhoneNumber, // Add custom email validator
        ]),
        domain: new FormControl(result['domain']),
        password: new FormControl(result['password'], [
          Validators.required,
          (control: AbstractControl): ValidationErrors | null => this.validatorService.passwordValidator, // Add custom email validator
        ]),
        address: new FormControl(result['address']),
      //   project1: new FormControl(result['project1']),
      // project2: new FormControl(result['project2']),
      // project3: new FormControl(result['project3']),
      });
    })
    
  }

  updateConfirm(){
    Swal.fire({
      title: 'Do you want to save the changes?',

      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.updateData()
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
  updateData(){
    if(this.editForm.valid){
    this.userService.updateData(this.route.snapshot.params['id'],this.editForm.value).subscribe((result)=>{
      console.log(result)

      Swal.fire('Saved!', '', 'success').then(() => {
        this.router.navigate(['/users']);
      });
    })
  }
  }

}
