import { Component, ViewChild,AfterViewInit, SimpleChanges,ChangeDetectorRef } from '@angular/core';
import { ChildComponentComponent } from '../child-component/child-component.component';
import { DataServiceService } from '../shared/data-service.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-parent-component',
  templateUrl: './parent-component.component.html',
  styleUrls: ['./parent-component.component.css'],
  
})
export class ParentComponentComponent  {

  parentMessage = 'Hello from parent to child';
  childMessage = 'Hello World'
  childmessage=''
  names=['sahana','   ','supreett            ']

  minor = 0
  major=25

  newmajor(){
    this.major++
    this.minor=0
  }

  newminor(){
    this.minor++
        // console.log(this.minor)

  }

@ViewChild(ChildComponentComponent) child:any;
  Message: string | undefined;

  ngAfterViewInit(){
    this.childmessage=this.child.message;
    this.cdRef.detectChanges();
  }

    ngOnChanges(change:SimpleChanges){
      console.log(change)
    }
   receiveMessage($event: any){ 
    this.childMessage=$event
  }
  // subscription: Subscription | undefined;

  constructor(private cdRef: ChangeDetectorRef) { }

  // ngOnInit() {
  //   this.subscription = this.data.currentMessage.subscribe(message => this.message = message)
  // }
  
  // ngOnDestroy() {
  //   this.subscription?.unsubscribe();
  // }
 
}
