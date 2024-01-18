import { Component, Input, ViewChild } from '@angular/core';
import { User } from '../../models/models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource!: any;
  ngOnInit(){
    console.log(this.dataSource?.length);

  }
  
 
}
