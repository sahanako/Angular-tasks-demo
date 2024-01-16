import { Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class ValidatorService implements OnInit {
  userId: string | null | undefined;
  constructor(private userService : UserService,private router :Router,private route : ActivatedRoute) {
    this.userService = userService
    
  }
ngOnInit(){
 
}

  validateFormControl(controlName: string, controlValue: any): { [key: string]: any } | null {
    switch (controlName) {
      case 'phoneno':
        return this.validatePhoneNumber(controlValue);
      case 'email':
        return this.emailValidator(controlValue);
        case 'password':
          return this.passwordValidator(controlValue);
        case 'Projects':
          return this.atLeastOneCheckboxSelectedValidator(controlValue);

      // Add more cases for other form controls as needed
      default:
        return null; // No validation for unknown control names
    }
  }

  async validatePhoneNumber(control: FormControl): Promise<{ [key: string]: any } | null> {
    const phoneNumberPattern = /^[6-9]\d*$/; // Updated regex pattern
    let value = control.value;
    const trimmedValue = control.value.trim();

    if (phoneNumberPattern.test(trimmedValue)) {
      if(value >11){
      value = value.replace(/^[0-9]/g, ' ')
    }}else{
      return { invalidPhoneNumber: true };

    }
  
    return null;
  }

  emailValidator = (control: FormControl): Promise<{ [key: string]: any } | null> => {
    return new Promise((resolve) => {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const email = control.value;
  
      // Check email pattern first
      if (!emailPattern.test(email.trim())) {
        resolve({ invalidEmail: true });
      } else if (this.userService.editActive ===false ) {
        console.log(this.userService.editActive)
        // If email pattern is valid and it's not in edit mode, check for duplicate email
        this.userService.getAllUserJson().subscribe((data) => {
          const isEmailPresent = data.some((user: { email: string }) => user.email === email);
          if (isEmailPresent) {
            resolve({ emailPresent: "Email is already present" });
          } else {
            resolve(null);
          }
        });
      } else if(this.userService.editActive === true) {
        
          
        resolve(null);
     
      }
    });
  };
  


  passwordValidator = (control: FormControl) => {
    return new Promise((resolve) => {
      const passwordPattern =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
      if (control.value.length > 8) {
        resolve({
          invalidPassword: 'Password must not exceed 8 characters.',
        });
      } else if (passwordPattern.test(control.value)) {
        resolve(null); // Validation passes
      } else {
        resolve({
          invalidPassword:
            'Password must be at least 8 characters long and contain at least one letter, one number, and one special character (@$!%*?&).',
        });
      }
    });
  };
  

  atLeastOneCheckboxSelectedValidator(control: AbstractControl): ValidationErrors | null {
    const project1 = control.get('project1')?.value;
    const project2 = control.get('project2')?.value;
    const project3 = control.get('project3')?.value;

    if (!project1 && !project2 && !project3) {
      return { noCheckboxSelected: true };
    }

    return null;
  }
}
