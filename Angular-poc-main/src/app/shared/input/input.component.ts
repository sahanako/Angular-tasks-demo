import { Component,Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidatorService } from 'src/app/validator.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})

export class InputComponent {
  hide=true
  @Input() control:FormControl = new FormControl();
  @Input() type='text';
  @Input() placeholder='';
  @Input() label=''

 

  
  
}
