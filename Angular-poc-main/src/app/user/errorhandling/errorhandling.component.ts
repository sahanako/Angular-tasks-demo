import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-errorhandling',
  templateUrl: './errorhandling.component.html',
  styleUrls: ['./errorhandling.component.scss']
})
export class ErrorhandlingComponent {
  constructor(private router: Router) {
    setTimeout(() => {
      this.router.navigate(['/users']);
    }, 2000); 
  }
}
