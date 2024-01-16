import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, Input } from '@angular/core';
import { sideMenuList } from './side';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'scrollbar';
  @Input() menu: any;
  // items =[];
  // Data = [
  //   { column1: 'Data 1', column2: 'Data 2' , column3: 'Data 1', column4: 'Data 2',},
  //   { column1: 'Data 1', column2: 'Data 2' },
  //   { column1: 'Data 1', column2: 'Data 2' },
  //   { column1: 'Data 1', column2: 'Data 2' },

  //   { column1: 'Data 1', column2: 'Data 2' },
  //   { column1: 'Data 1', column2: 'Data 2' },
  //   { column1: 'Data 1', column2: 'Data 2' },
  //   { column1: 'Data 1', column2: 'Data 2' },
  //   { column1: 'Data 1', column2: 'Data 2' },
  //   { column1: 'Data 1', column2: 'Data 2' },
  //   { column1: 'Data 1', column2: 'Data 2' },
  //   { column1: 'Data 1', column2: 'Data 2' },
  // ];

ngOnInit(){
   this.menu = sideMenuList
  console.log(this.menu)
}
}
