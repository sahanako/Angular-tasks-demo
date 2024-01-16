import { Directive, HostListener, ElementRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { UserAddComponent } from './user-add/user-add.component';
@Directive({
  selector: '[appNumericInput]'
})
export class NumericInputDirective {
  userForm: any;
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: KeyboardEvent) {
    
    const input = event.target as HTMLInputElement;
    const value = input.value;
    console.log(value)
    input.value = value.replace(/[^0-9]/g, '');

    input.value = value.replace(/[^a-zA-Z]/g, '');

     // Remove non-numeric characters
  }

  validate(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (value && !/^\d+$/.test(value)) {
      return { invalidPhoneNumber: true };
    }
    return null;
  }
}
