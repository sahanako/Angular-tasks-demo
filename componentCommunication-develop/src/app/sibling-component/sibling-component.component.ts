import { Component } from '@angular/core';
import { DataServiceService } from '../shared/data-service.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-sibling-component',
  templateUrl: './sibling-component.component.html',
  styleUrls: ['./sibling-component.component.css']
})
export class SiblingComponentComponent {
  // Message: string | undefined;

 
  
  // message:string | undefined;
  // subscription: Subscription | undefined;

  // constructor(private data: DataServiceService) { }

  // ngOnInit() {
  //   this.subscription = this.data.currentMessage.subscribe(message => this.message = message)
  // }

  // ngOnDestroy() {
  //   this.subscription?.unsubscribe();
  // }

  // newMessage() {
  //   this.data.changeMessage("Hello from Sibling")
  // }

}
