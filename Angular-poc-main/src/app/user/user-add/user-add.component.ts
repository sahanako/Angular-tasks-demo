import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorService } from '../../validator.service'; 

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent {
  hide = true;
  label = this.userService.button;
  value: string = this.userService.value;
  editUser: any;
  paramValue: any;
  // userForm!: FormGroup;
  editActive: boolean = false;
  button: string = '';
  showAlert=false
  alertMsg=''

  websites= [
    {value: 'ItSolutionStuff.com', viewValue: 'ItSolutionStuff.com'},
    {value: 'HDTuto.com', viewValue: 'HDTuto.com'},
    {value: 'Nicesnippets.com', viewValue: 'Nicesnippets.com'}
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private validatorService: ValidatorService,
    private route: ActivatedRoute
  ) {
   
    // userForm = new FormGroup({
    //   name: ['', Validators.required],
    //   gender: ['', Validators.required],
    //   address: ['', [Validators.required,Validators.maxLength(50)]],
    //   phoneno: [
    //     '',
    //     Validators.required,
    //     this.validatorService.validatePhoneNumber,
    //   ],
    //   email: ['', Validators.required, this.validatorService.emailValidator],
    //   dob: [null, Validators.required],
    //   password: [
    //     '',
    //    Validators.required,
    //     this.validatorService.passwordValidator
    //   ],
    //   website: ['', Validators.required],
    //   domain: ['Frontend'],
    // }
    // );
   
  }

  name=new FormControl('',[Validators.required,Validators.minLength(3)]);
  gender = new FormControl('',[Validators.required])
  project = new FormControl('',[Validators.required,Validators.maxLength(50)])
  phoneno = new FormControl('',[Validators.required,Validators.maxLength(13),Validators.minLength(10)])
  email = new FormControl('',[Validators.required,Validators.email])
  dob = new FormControl('',[Validators.required])
  password = new FormControl('',[Validators.required,Validators.pattern(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)]);
  website = new FormControl('',[Validators.required])
  domain = new FormControl('',[Validators.required])

  userForm = new FormGroup({
    name:this.name,
    gender:this.gender,
    project:this.project,
    phoneno :this.phoneno,
    email:this.email,
    dob:this.dob,
    password:this.password,
    website:this.website,
    domain:this.domain
  })
  

  ngOnInit() {
    this.route.params.subscribe(params => {
      const paramValue = params['id'];
      console.log(paramValue);
      console.log(this.router.url)

      if (this.router.url === '/user/user-edit/' + `${paramValue}`) {
        this.editActive = true;
        this.button = 'Update'
        this.value = 'Edit'
        console.log(this.router.url)
      } else if (this.router.url === '/user/add') {
        console.log("user add")
        this.editActive = false;
        this.button = "Add Data"
        this.value = "User"
        
      }
  })
  this.patchUserdata()
}

  patchUserdata() {
    if (this.editActive) {
      console.log(this.editActive)
      this.route.params.subscribe(params => {
        const paramValue = params['id'];
        console.log(paramValue);

        this.userService.getCurrentData(paramValue).subscribe(result => {
          console.log(result.password)
          this.userForm.patchValue(result);
        })
      });
    } else {
      this.userForm;
    }
  }
  reset() {
    this.userForm.reset()
  }
  onSubmit(event:Event) {
    event.preventDefault()
    if (this.button === 'Update') {
      console.log(this.button)
      console.log(this.userForm.valid)
      if(this.userForm.valid){

      this.userService.updateData(this.route.snapshot.params['id'], this.userForm.value).subscribe(result => {
        this.router.navigate(['/users']);
        this.userForm.reset();
      });
    } }
    else if (this.button === 'Add Data') {
      
      const userData = {
        ...this.userForm.value,
      };
      this.userService.addUserJson(userData).subscribe(data => {
        this.userForm.reset();
      });

      this.showAlert=true
      console.log(this.showAlert)
      this.alertMsg='User Added Successfully'
      // setTimeout(() => {
      //   this.router.navigate(['/users']);
      // }, 1000); 
    }
  }

  emailValid(){
    const presentEmail = this.userService.getAllUserJson().subscribe(data=>{
      console.log(data.email)
    })
    console.log(presentEmail)
     
 }

  validateControl(controlName: string) {
    const control = this.userForm.get(controlName);
    console.log(control)
    if (control) {
      const validationError = this.validatorService.validateFormControl(controlName, control.value);
      if (validationError) {
        control.setErrors(validationError);
      } else {
        control.setErrors(null);
      }
    }
  }

}



