import { Component,Input,Output,EventEmitter, OnInit, OnDestroy, SimpleChange, SimpleChanges } from '@angular/core';
import { DataServiceService } from '../shared/data-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.css']
})
export class ChildComponentComponent  {
  @Input() dataa : string ='';
  @Input('child') childName=''
  @Output() sendMessage = new EventEmitter<string>;
  message: string ="Hello from child to parent";

  sendmessage(){
      this.sendMessage.emit(this.message);
    }


  private names='';
  @Input()
  get name():string{
    return this.names
  }

  set name(name:string){
    this.names = (name && name.trim() || 'no name is set')
  }

  @Input() major =0
  @Input() minor=0
  changeLog: string[] = [];


  ngOnChanges(changes:SimpleChanges){
    const log:string[]=[]
    for (const propName in changes) {
      const changedProp = changes[propName];
      console.log(changedProp)
      const to = JSON.stringify(changedProp.currentValue)
      if(changedProp.isFirstChange()){
        log.push("initial value"+`${to}`)
      }else{
        const from = JSON.stringify(changedProp.previousValue)
        log.push("Changed " + `${propName}`+" from "+ `${from}`+" to"+ `${to}`)
      }

    }
      this.changeLog.push(log.join(', '))

  }


  // subscription: Subscription | undefined;

  // constructor(private data: DataServiceService) { }

  // ngOnInit() {
  //   this.subscription = this.data.currentMessage.subscribe(message => this.message = message)
  // }
  
  // ngOnDestroy() {
  //   this.subscription?.unsubscribe();
  // }
  // Message:string= 'Hello from child to parent'

 

}
